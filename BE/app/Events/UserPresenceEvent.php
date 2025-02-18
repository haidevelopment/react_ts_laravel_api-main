<?php

namespace App\Events;

use App\Models\User;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Queue\SerializesModels;

class UserPresenceEvent implements ShouldBroadcast
{
    use SerializesModels;

    public $user;

    public function __construct(User $user)
    {
        $this->user = $user;
    }

    public function broadcastOn()
    {
        return new PresenceChannel('presence-user-online');
    }

    public function broadcastAs()
    {
        return 'user.presence';
    }

    public function broadcastWith()
    {
        return [
            'id' => $this->user->id,
            'name' => $this->user->name,
            'email' => $this->user->email,
            'created_at' => $this->user->created_at,
            'updated_at' => $this->user->updated_at,
            // Nếu user có avatar hoặc các thông tin khác thì thêm vào đây
        ];
    }
}
