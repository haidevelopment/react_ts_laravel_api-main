import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import style from "./MainChat.module.scss";
import { FaPaperPlane, FaSmile } from "react-icons/fa";
import { Message, roomAdminApi } from "../../../../interfaces/admin/Api";
import instance from "../../../../utils/Requests/instance";
import { accountService } from "../../../../services/accountService";
import channel from "../../../../utils/realtime/channel";

const cx = classNames.bind(style);

interface Props {
  chatId: roomAdminApi | null;
}

const MainChat: React.FC<Props> = ({ chatId }) => {
  const [messages, setMessages] = useState<Message[] | null>(null);
  const [messageText, setMessageText] = useState<string>("");

  useEffect(() => {
    if (!chatId) return;

    (async () => {
      try {
        const res = await instance.get(`/chat/messages/${chatId.id}`);
        setMessages(res.data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    })();
  }, [chatId]);
  useEffect(() => {
    if (!chatId) return;

   

    const channels = channel
      .channel(`send-messages.${chatId?.id}`)
      .listen("SendMessagesEvent", (e: Message) => {
        setMessages((prevMessages) => [...(prevMessages || []), e]);
      });

    return () => {
      channels.stopListening("SendMessagesEvent");
      channel.leave(`send-messages.${chatId?.id}`);
    };
  }, [chatId]);
  const handleSendMessage = async() => {

    if (!messageText.trim()) return;
    const data = {
      chat_id: chatId?.id,
      sender_id: accountService?.accountValue?.user?.id,
      type: "text",
      messages: messageText,
    };
    await instance.post("/chat/send", data);

    setMessageText("");
  };

  return (
    <div className={cx("chat-main")}>
      {chatId ? (
        <>
          <div className={cx("chat-header")}>
            <span>{chatId?.user?.last_name}</span>
          </div>
          <div className={cx("chat-messages")}>
            {messages?.map((mes) => (
              <div
                key={mes?.id}
                className={cx("message", {
                  sent: mes.user?.id === accountService.accountValue?.user?.id,
                  received:
                    mes.user?.id !== accountService.accountValue?.user?.id,
                })}
              >
                <div className={cx("bubble")}>{mes?.messages}</div>
              </div>
            ))}
          </div>
          <div className={cx("chat-input")}>
            <button className={cx("emoji-button")}>
              <FaSmile />
            </button>
            <input
              type="text"
              placeholder="Send a message..."
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
            />
            <button className={cx("send-button")} onClick={handleSendMessage}>
              <FaPaperPlane />
            </button>
          </div>
        </>
      ) : (
        <div className={cx("null-chat")}>
          <img
            src="https://images.vexels.com/media/users/3/223274/isolated/preview/278b0a1e8ce1e77990cd391555662653-message-icon-flat.png"
            width={400}
            alt=""
          />
          <div className={cx("text")}>Quản lí tin nhắn khách hàng của bạn!</div>
        </div>
      )}
    </div>
  );
};

export default MainChat;
