import classNames from "classnames/bind";
import styles from "./HomeLayout.module.scss";
const cx = classNames.bind(styles);

import Header from "../Components/Home/Header";
import { PrivateRouterProps } from "../../interfaces/childrendInterface";
const HomeLayout = ({ children ,permistion }: PrivateRouterProps) => {
  console.log(permistion);
  
  return (
    <div className={cx("container")}  >
      <Header />
      <div className={cx("main")}>{children}</div>
    </div>
  );
};

export default HomeLayout;
