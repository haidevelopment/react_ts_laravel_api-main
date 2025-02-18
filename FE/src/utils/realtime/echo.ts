import Echo from "laravel-echo";
import Pusher from "pusher-js";
import { accountService } from "../../services/accountService";
window.Pusher = Pusher;
const echo = new Echo({
  broadcaster: "pusher",
  key: "5dacede854451642c5a1",
  cluster: "ap1",
  wsHost: "ws-ap1.pusher.com",
  wsPort: 80,
  wssPort: 443,
  forceTLS: true,
  enabledTransports: ["ws", "wss"],
  authEndpoint: "http://127.0.0.1:8000/broadcasting/auth",
  auth: {
    headers: {
      Authorization: `Bearer ${accountService?.accountValue?.token}`,
    },
  },
});

export default echo;
