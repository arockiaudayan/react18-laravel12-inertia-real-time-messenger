<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class MessageResource extends JsonResource
{

    public static $wrap = false;
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id'=> $this->id,
            'message'=> $this->message,
            'sender_id'=> $this->sender_id,
            'receiver_id'=> $this->receiver_id,
            'group_id'=> $this->group_id,
            'created_at'=> $this->created_at,
            'updated_at'=> $this->updated_at,
            'sender'    =>new UserResource($this->sender),
            'attachments' => MessageAttachmentResource::collection($this->attachments),
        ];
    }
}
