<?php

namespace Database\Seeders;

use App\Models\Conversation;
use App\Models\Group;
use App\Models\Message;
use App\Models\User;
use Carbon\Carbon;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::factory()->create([
            'name' => 'Arockia Udayan',
            'email' => 'udayan@udayan',
            'password' => bcrypt('123456789'),
            'is_admin'=> true,
        ]);

        User::factory()->create([
            'name' => 'Moni',
            'email' => 'moni@moni',
            'password' => bcrypt('123456789'),
        ]);

        user::factory(10)->create();

        for ($i = 0; $i < 5; $i++) {
            $group = Group::factory()->create([
                'owner_id' => 1,
            ]);
            $users = User::where('id', '!=', 1)->inRandomOrder()->limit(rand(2,5))->pluck('id');
            $group->users()->attach(array_unique([1,...$users]));
        }
        Message::factory(1000)->create();
        $messages = Message::whereNull('group_id')->orderBy('created_at')->get();

        $conversations = $messages->groupBy(function ($item) {
            return  collect([$item->sender_id, $item->receiver_id])->sort()->implode('-');
        })->map(function ($item) {
            return [
                'user_id1' =>$item->first()->sender_id,
                'user_id2' =>$item->first()->receiver_id,
                'last_message_id' =>$item->last()->id,
                'created_at' => new Carbon(),
                'updated_at' => new Carbon(),
            ];
        })->values();

        Conversation::insertOrIgnore($conversations->toArray());
    }
}
