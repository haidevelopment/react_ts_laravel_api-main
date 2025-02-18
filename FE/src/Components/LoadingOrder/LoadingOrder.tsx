import styles from "./LoadingOrder.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);
const LoadingOrder = () => {
  return (
    <svg className={cx("truck")} viewBox="0 0 48 24" width="70px" height="50px">
      <g
        fill="none"
        stroke="#c92127"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1"
        transform="translate(0,2)"
      >
        <g className={cx("truck__body")}>
          <g strokeDasharray="105 105">
            <polyline
              className={cx("truck__outside1")}
              points="2 17,1 17,1 11,5 9,7 1,39 1,39 6"
            />
            <polyline
              className={cx("truck__outside2")}
              points="39 12,39 17,31.5 17"
            />
            <polyline
              className={cx("truck__outside3")}
              points="22.5 17,11 17"
            />
            <polyline
              className={cx("truck__window1")}
              points="6.5 4,8 4,8 9,5 9"
            />
            <polygon
              className={cx("truck__window2")}
              points="10 4,10 9,14 9,14 4"
            />
          </g>
          <polyline
            className={cx("truck__line")}
            points="43 8,31 8"
            strokeDasharray="10 2 10 2 10 2 10 2 10 2 10 26"
          />
          <polyline
            className={cx("truck__line")}
            points="47 10,31 10"
            strokeDasharray="14 2 14 2 14 2 14 2 14 18"
          />
        </g>
        <g strokeDasharray="15.71 15.71">
          <g className={cx("truck__wheel")}>
            <circle
              className={cx("truck__wheel-spin")}
              r="2.5"
              cx="6.5"
              cy="17"
            />
          </g>
          <g className={cx("truck__wheel")}>
            <circle
              className={cx("truck__wheel-spin")}
              r="2.5"
              cx="27"
              cy="17"
            />
          </g>
        </g>
      </g>
    </svg>
  );
};

export default LoadingOrder;
