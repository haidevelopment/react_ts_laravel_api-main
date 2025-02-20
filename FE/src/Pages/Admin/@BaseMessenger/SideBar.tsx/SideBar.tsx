import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import classNames from "classnames/bind";
import style from "./SideBar.module.scss";
import instance from "../../../../utils/Requests/instance";
import { roomAdminApi } from "../../../../interfaces/admin/Api";
import { accountService } from "../../../../services/accountService";
const cx = classNames.bind(style);
interface props {
  setChatIdGlobal: React.Dispatch<React.SetStateAction<roomAdminApi | null>>;
}
const SideBar: React.FC<props> = ({ setChatIdGlobal }) => {
  const [rooms, setRooms] = useState<roomAdminApi[] | null>(null);
  const [chatId, setChatId] = useState<roomAdminApi | null>(null);
  useEffect(() => {
    (async () => {
      const res = await instance.get("/chat/rooms");
      setRooms(res.data);
    })();
  }, []);
  const handleSetChatId = (id: roomAdminApi) => {
    setChatId(id);
    setChatIdGlobal(id);
  };
  return (
    <div className={cx("chat-sidebar")}>
      <div className={cx("sidebar-header")}>
        <span>{accountService.accountValue?.user?.last_name}</span>
        <button className={cx("add-button")}>
          <FaPlus />
        </button>
      </div>
      <div className={cx("chat-list")}>
        {rooms?.map((r) => (
          <div
            key={r?.id}
            className={cx("chat-item", { active: r?.id == chatId?.id })}
            onClick={() => handleSetChatId(r)}
          >
            <div className={cx("avatar")}>
              <img
                src="https://cellphones.com.vn/sforum/wp-content/uploads/2024/04/anh-tanjiro-37.jpg"
                alt=""
                width={40}
              />
            </div>
            <div className={cx("chat-info")}>
              <span className={cx("name")}>{r?.user?.last_name}</span>
              <div className={cx("last-message")}>Last message...</div>
            </div>
            <span className={cx("time")}>10:37AM</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SideBar;
