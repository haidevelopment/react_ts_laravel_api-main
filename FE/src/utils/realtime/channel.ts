import Echo from "laravel-echo";
import Pusher from "pusher-js";

window.Pusher = Pusher;

const channel = new Echo({
    broadcaster: "pusher",
    key: "5dacede854451642c5a1",
    cluster: "ap1",
    forceTLS: true,
});

export default channel;
