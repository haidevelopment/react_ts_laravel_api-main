import logo1 from "../../../assets/image/banner/logo-1.jpg";
import logo2 from "../../../assets/image/banner/logo-2.jpg";
import logo3 from "../../../assets/image/banner/logo-3.jpg";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import classNames from "classnames/bind";
import styles from "./Home.module.scss";
const cx = classNames.bind(styles);

const Home = () => {
  return (
    <div>
      <section className={cx("slideshow")}>
        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={{ delay: 2000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          loop={true}
        >
          <SwiperSlide>
            <img src={logo1} alt="Slide 1" className={cx("slide")} />
          </SwiperSlide>
          <SwiperSlide>
            <img src={logo2} alt="Slide 2" className={cx("slide")} />
          </SwiperSlide>
          <SwiperSlide>
            <img src={logo3} alt="Slide 2" className={cx("slide")} />
          </SwiperSlide>
        </Swiper>
      </section>

      <section className={cx("main")}>
        <h2>ĐÁNG XINH ĐÓN GIÁNG SINH</h2>
        <div className={cx("products")}>
          <div className={cx("product")}>
            <img src={logo1} alt="Product 1" />
            <p>Sản phẩm 1</p>
          </div>
          <div className={cx("product")}>
            <img src={logo1} alt="Product 2" />
            <p>Sản phẩm 2</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
