import React, { useState } from "react";
import style from './BaseMessenger.module.scss';
import classNames from "classnames/bind";
import SideBar from "./SideBar.tsx/SideBar";
import MainChat from "./MainChat/MainChat";
import { roomAdminApi } from "../../../interfaces/admin/Api";
const cx = classNames.bind(style);
const BaseMessenger:React.FC = () => {
  const [chatId,setChatId] = useState<roomAdminApi | null>(null);
  return (
    <div className={cx("chat-container")}>
  
    <SideBar setChatIdGlobal={setChatId} />

    <MainChat chatId={chatId}/>
  </div>
  );
}

export default BaseMessenger;
