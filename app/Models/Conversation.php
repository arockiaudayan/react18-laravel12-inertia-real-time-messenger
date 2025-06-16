<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Conversation extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id1',
        'user_id2',
        'last_message_id',
    ];
    public function user1()
    {
        return $this->belongsTo(User::class, 'user_id1');
    }
    public function user2()
    {
        return $this->belongsTo(User::class, 'user_id2');
    }
    public function lastMessage()
    {
        return $this->belongsTo(Message::class, 'last_message_id');
    }
    public function messages()
    {
        return $this->hasMany(Message::class);
    }

    public static function getConversationForSideBar(User $user)
    {
        $users = User::getUserExceptUser($user) ?? collect();
        $groups = Group::getGroupsForUser($user) ?? collect();

        return $users->map(function(User $user){
            return $user->toConversationArray();
        })->concat($groups->map(function(Group $group){
            return $group->toConversationArray();
        }));
    }

    public static function updateConversationWithMessage($userId1,$userId2,$message){

        $conversation = Conversation::where(function ($query) use ($userId1,$userId2) {
            $query->where('user_id1', $userId1)
                ->where('user_id2', $userId2);
        })->orWhere(function ($query) use ($userId1,$userId2) {
            $query->where('user_id1', $userId2)
                ->where('user_id2', $userId1);
        })->first();

        if($conversation){
            $conversation->last_message_id = $message->id;
            $conversation->save();
        }else{
            $conversation = new Conversation();
            $conversation->user_id1 = $userId1;
            $conversation->user_id2 = $userId2;
            $conversation->last_message_id = $message->id;
            $conversation->save();
        }
    }

}
