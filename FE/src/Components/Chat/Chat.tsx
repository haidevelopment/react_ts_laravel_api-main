import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./Chat.module.scss";
import { FaSmile, FaEllipsisH, FaPlus, FaPaperPlane } from "react-icons/fa";
import instance from "../../utils/Requests/instance";
import { Message } from "../../interfaces/admin/Api";
import channel from "../../utils/realtime/channel";

const cx = classNames.bind(styles);

interface Props {
  setModal: () => void;
  chatId: number | null;
  userId: number;
  minW?: string;
  top?: string;
  right?: string;
  left?: string;
  bottom?: string;
}


const Chat: React.FC<Props> = ({ setModal, chatId, userId, minW, left, right, top, bottom }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [messageInput, setMessageInput] = useState("");

  useEffect(() => {
    if (!chatId) return;

    (async () => {
      try {
        const res = await instance.get(`/chat/messages/${chatId}`);
        setMessages(res.data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    })();

    const channels = channel
      .channel(`send-messages.${chatId}`)
      .listen("SendMessagesEvent", (e: Message) => {
        setMessages((prevMessages) => [...prevMessages, e]);
      });

    return () => {
      channels.stopListening("SendMessagesEvent");
      channel.leave(`send-messages.${chatId}`);
    };
  }, [chatId]);

  const handleSendMessage = async () => {
    if (!messageInput.trim()) return;

    const data = {
      chat_id: chatId,
      sender_id: userId,
      type: "text",
      messages: messageInput,
    };

    await instance.post("/chat/send", data);
    setMessageInput("");
  };

  return (
    <div
      className={cx("chat")}
      style={{
        ...(minW && { minWidth: minW }),
        ...(top && { top }),
        ...(left && { left }),
        ...(right && { right }),
        ...(bottom && { bottom }),
      }}
    >
      <button className={cx("close-button")} onClick={setModal}>
        x
      </button>
      <div className={cx("chat__conversation-board")}>
        {messages.map(({ id, sender_id, messages, user }) => (
          <div
            key={id}
            className={cx("chat__conversation-board__message-container", {
              reversed: sender_id === userId,
            })}
          >
            <div className={cx("chat__conversation-board__message__person")}>
              <div className={cx("chat__conversation-board__message__person__avatar")}>
                <img src="https://randomuser.me/api/portraits/men/9.jpg" alt="" />
              </div>
              <span className={cx("chat__conversation-board__message__person__nickname")}>
                {user?.first_name || "Unknown"}
              </span>
            </div>
            <div className={cx("chat__conversation-board__message__context")}>
              <div className={cx("chat__conversation-board__message__bubble")}>
                <span>{messages}</span>
              </div>
            </div>
            <div className={cx("chat__conversation-board__message__options")}>
              <button className={cx("chat__conversation-board__message__option-button", "emoji-button")}>
                <FaSmile />
              </button>
              <button className={cx("chat__conversation-board__message__option-button", "more-button")}>
                <FaEllipsisH />
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className={cx("chat__conversation-panel")}>
        <div className={cx("chat__conversation-panel__container")}>
          <button className={cx("chat__conversation-panel__button", "add-file-button")}>
            <FaPlus />
          </button>
          <button className={cx("chat__conversation-panel__button", "emoji-button")}>
            <FaSmile />
          </button>
          <input
            className={cx("chat__conversation-panel__input")}
            type="text"
            placeholder="Type a message..."
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
          />
          <button className={cx("chat__conversation-panel__button", "send-message-button")} onClick={handleSendMessage}>
            <FaPaperPlane />
          </button>
        </div>
      </div>
    </div>
  );
};


export default Chat;
