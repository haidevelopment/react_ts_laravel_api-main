import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "boxicons/css/boxicons.min.css";
import { Provider } from "react-redux";
import { store } from "./store/store.ts";
import { TourProvider } from "@reactour/tour";
import App from "./App.tsx";

const steps = [
  {
    selector: ".logo-step",
    content: "Đây là logo độc quyền của trang web bán đổ TOKYO LIFE",
  },
  {
    selector: ".search-step",
    content: "Đây là thanh tìm kiếm . Bạn có thể tìm kiếm sản phẩm bằng cách nhập tên sản phẩm muốn tìm",
  },
  {
    selector: ".cart-step",
    content: "Đây là nơi chứa các sản phẩm của giỏ hàng . Khi bạn nhấn vào nó sẽ cho bạn đến trang giỏ hàng ",
  },
  {
    selector: ".auth-step",
    content: "Đây là nơi bạn có thể đăng nhập tài khoản của mình để mua hàng ",
  },
  {
    selector: ".coupon-step",
    content: "Đây là các mã giảm giá bạn có thể nhấn copy để sử dụng khi thanh toán đơn hàng ! ",
  },
  {
    selector: ".product-step",
    content: "Đây là nơi bạn có thể lựa chọn các sản phẩm mình yêu thích",
  },
];

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <TourProvider
        steps={steps}
      >
        <App />
      </TourProvider>
    </Provider>
  </React.StrictMode>
);
