<?php

namespace App\Http\Controllers\API\ChatAPI;

use App\Events\SendMessagesEvent;
use App\Http\Controllers\Controller;
use App\Models\Messenger;
use App\Models\RoomMessenger;
use GuzzleHttp\Psr7\Message;
use Illuminate\Http\Request;

class ChatController extends Controller
{
    public function getOrCreateRoom(Request $request)
    {
        $customer_id = $request->customer_id;
        $admin_id = $request->admin_id;

        $room = RoomMessenger::where(function ($query) use ($customer_id, $admin_id) {
            $query->where('customer_id', $customer_id)
                ->where('admin_id', $admin_id);
        })->orWhere(function ($query) use ($customer_id, $admin_id) {
            $query->where('customer_id', $admin_id)
                ->where('admin_id', $customer_id);
        })->first();

        if (!$room) {
            $room = RoomMessenger::create([
                'customer_id' => $customer_id,
                'admin_id' => $admin_id,
            ]);
        }

        return response()->json(['room_id' => $room->id]);
    }

    public function getMessagesInRoom($room_id)
    {
        $messages = Messenger::with('user')->where('chat_id', $room_id)
            ->orderBy('created_at')
            ->get();

        return response()->json($messages);
    }
    public function sendMessages(Request $request)
    {
        $obj = Messenger::create($request->all());
        $data = Messenger::with('user')->where('id', $obj->id)->first();
        broadcast(new SendMessagesEvent($data));
        return response()->json($data);
    }
    public function getChatAdminPages()
    {
        $obj = RoomMessenger::with('user')->orderBy('created_at', 'DESC')->get();
        return response()->json($obj);
    }
}
