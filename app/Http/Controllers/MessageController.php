<?php
namespace App\Http\Controllers;

use App\Events\SocketMessage;
use App\Http\Requests\StoreMessageRequest;
use App\Http\Resources\MessageResource;
use App\Models\Conversation;
use App\Models\Group;
use App\Models\Message;
use App\Models\MessageAttachment;
use App\Models\User;
use Illuminate\Contracts\Cache\Store;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class MessageController extends Controller
{
    public function byUser(User $user)
    {
        $message = Message::where('sender_id', Auth::user()->id)
            ->Where('receiver_id', $user->id)
            ->orWhere('sender_id', $user->id)
            ->where('receiver_id', Auth::user()->id)
            ->latest()
            ->paginate(10);

        return inertia('Home', [
            'selectedConversation' => $user->toConversationArray(),
            'messages'              => MessageResource::collection($message),
        ]);
    }

    public function byGroup(Group $group)
    {

        $message = Message::where('group_id', $group->id)
            ->latest()
            ->paginate(10);

        return inertia('Home', [
            'selectedConversation' => $group->toConversationArray(),
            'messages'              => MessageResource::collection($message),
        ]);
    }

    public function loadOlder(Message $message)
    {
        if ($message->group_id) {
            $messages = Message::where('group_id', $message->group_id)
                ->where('created_at', '<', $message->created_at)
                ->latest()
                ->paginate(10);

        } else {
            $messages = Message::where('created_at', '<', $message->created_at)
                ->where(function ($query) use ($message) {
                    $query->where('sender_id', $message->sender_id)
                        ->orWhere('receiver_id', $message->receiver_id)
                        ->where('sender_id', $message->receiver_id)
                        ->where('receiver_id', $message->sender_id);
                })
                ->latest()
                ->paginate(10);
        }

        return MessageResource::collection($messages);
    }

    public function store(StoreMessageRequest $request)
    {
        $data              = $request->validated();
        $data['sender_id'] = Auth::user()->id;
        $receiverId        = $data['receiver_id'] ?? null;
        $groupId           = $data['group_id'] ?? null;

        $files = $data['attachments'] ?? [];

        $message = Message::create($data);

        $attachments = [];

        if ($files) {
            foreach ($files as $file) {
                $directory = 'attachments/' . Str::random(32);
                $modal     = [
                    'message_id' => $message->id,
                    'name'       => $file->getClientOriginalName(),
                    'mime'       => $file->getClientMimeType(),
                    'size'       => $file->getSize(),
                    'path'       => $file->store($directory, 'public'),
                ];

                $attachment    = MessageAttachment::create($modal);
                $attachments[] = $attachment;
            }
            $message->attachments = $attachments;
        }

        if($receiverId) {
            Conversation::updateConversationWithMessage($receiverId, Auth::user()->id, $message);
        }
        if($groupId) {
            Group::updateGroupWithMessage($groupId, $message);
        }

        SocketMessage::dispatch($message);

        return new MessageResource($message);
    }

    public function destroy(Message $message)
    {
        if($message->sender_id !== Auth::user()->id) {
            return response()->json(['message' => 'Forbidden'], 403);
        }
        $message->delete();

        return response('',204);
    }
}
