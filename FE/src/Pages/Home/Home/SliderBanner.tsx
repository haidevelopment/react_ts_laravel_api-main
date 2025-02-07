import logo1 from "../../../assets/image/banner/logo-1.jpg";
import logo2 from "../../../assets/image/banner/logo-2.jpg";
import logo3 from "../../../assets/image/banner/logo-3.jpg";
import { Pagination, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import classNames from "classnames/bind";
import styles from "./Home.module.scss";
const cx = classNames.bind(styles);
const SliderBanner = () => {
  return (
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
  );
}

export default SliderBanner;
