import classNames from "classnames/bind";
import styles from "./HomeLayout.module.scss";
const cx = classNames.bind(styles);

import Header from "../Components/Home/Header";
import { PrivateRouterProps } from "../../interfaces/childrendInterface";
import { useEffect, useState } from "react";
import channel from "../../utils/realtime/channel";
import { accountService } from "../../services/accountService";
import { ToastSucess } from "../../utils/toast";
import FloatingButton from "../../Components/FloatingButton/FloatingButton";
import Chat from "../../Components/Chat/Chat";


const HomeLayout = ({ children, permistion }: PrivateRouterProps) => {
  console.log(permistion);
 
  const [isOpen, setIsOpen] = useState(false);
  const [chatId, setChatId] = useState<number | null>(null);
  const handleSetModal = () => {
    setIsOpen(!isOpen);
  };
  const authenticated = accountService.accountValue;
  useEffect(() => {
    const channels = channel.channel(
      `flash-notifications.${accountService?.accountValue?.user?.id}`
    );
    channels.listen(
      "FlashNotifyEvent",
      (data: { message: string; time: string }) => {
        ToastSucess(data.message);
        console.log(data);
      }
    );
    return () => {
      channels.stopListening("FlashNotifyEvent");
    };
  }, [accountService]);

  
    
  return (
    <div className={cx("container")}>
      <Header />
      <div className={cx("main")}>{children}</div>
      <FloatingButton setModal={handleSetModal} setChatId={setChatId} />
      {isOpen && authenticated && <Chat setModal={handleSetModal} chatId={chatId} userId={authenticated?.user?.id} right="20px"  bottom="0"  minW="800px" />}
    </div>
  );
};

export default HomeLayout;
