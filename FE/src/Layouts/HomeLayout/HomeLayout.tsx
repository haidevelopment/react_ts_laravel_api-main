import classNames from "classnames/bind";
import styles from "./HomeLayout.module.scss";
const cx = classNames.bind(styles);

import Header from "../Components/Home/Header";
import { PrivateRouterProps } from "../../interfaces/childrendInterface";
import { useEffect } from "react";
import channel from "../../utils/realtime/channel";
import { accountService } from "../../services/accountService";
import { ToastSucess } from "../../utils/toast";

const HomeLayout = ({ children, permistion }: PrivateRouterProps) => {
  console.log(permistion);

  useEffect(() => {
    const channels = channel.channel(
      `flash-notifications.${accountService.accountValue.user.id}`
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
    </div>
  );
};

export default HomeLayout;
