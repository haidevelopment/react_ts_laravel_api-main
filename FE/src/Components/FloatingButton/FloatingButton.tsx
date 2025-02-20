import { useState } from "react";
import classNames from "classnames/bind";
import styles from "./FloatingButton.module.scss";
import {
  FaShareAlt,
  FaTimes,
  FaTwitter,
  FaFacebookF,
  FaPaperPlane,
  FaInstagram,
  FaComments,
} from "react-icons/fa";
import { accountService } from "../../services/accountService";
import { ToastError } from "../../utils/toast";
import instance from "../../utils/Requests/instance";

const cx = classNames.bind(styles);
interface props {
  setModal: () => void;
  setChatId: React.Dispatch<React.SetStateAction<number | null>>;
}
interface ChatRoomResponse {
  room_id: number;
}
const FloatingButton: React.FC<props> = ({ setModal, setChatId }) => {
  const [isActive, setIsActive] = useState(false);
  const authenticated = accountService?.accountValue;
  const handleChatApi = async () => {
    if (authenticated) {
      const data = {
        customer_id: authenticated?.user?.id,
        admin_id: 1,
      };

      const res = await instance.post<ChatRoomResponse>("/chat/room", data);
      if (res) {
        setChatId(res.data.room_id);
        setModal();
      }
    } else {
      ToastError("Bạn vui lòng đăng nhập để mở chat trực tiếp !");
    }
  };
  return (
    <section className={cx("sectionWrapper")}>
      <div className={cx("floatingActionButton")}>
        <div
          className={cx("shareBtn", { active: isActive })}
          onClick={() => setIsActive(!isActive)}
        >
          {isActive ? (
            <FaTimes className={cx("closeIcon")} />
          ) : (
            <FaShareAlt className={cx("shareIcon")} />
          )}
        </div>

        <ul className={cx({ active: isActive })}>
          <li>
            <FaTwitter className="icon" />
          </li>
          <li>
            <FaFacebookF className="icon" />
          </li>
          <li>
            <FaComments className="icon" onClick={handleChatApi} />
          </li>
          <li>
            <FaPaperPlane className="icon" />
          </li>
          <li>
            <FaInstagram className="icon" />
          </li>
        </ul>
      </div>
    </section>
  );
};

export default FloatingButton;
