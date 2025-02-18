import classNames from "classnames/bind";
import style from "./Header.module.scss";
const cx = classNames.bind(style);
import logo from "../../../../assets/image/logo/svg-logo-tokyo.svg";
import { FaSearch, FaShoppingCart, FaTruck } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import ModalAuth from "../../../../Components/ModalAuth";
import { accountService } from "../../../../services/accountService";
import BoxForm from "./BoxForm/BoxForm";
import AuthBox from "./@AuthBox/AuthBox";
import { useAppSelector } from "../../../../hooks/useAppSelector";
import { useAppDispatch } from "../../../../hooks/useAppDispatch";
import { getCategories } from "../../../../Features/Slices/categorySlice";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

const Header = () => {
  const token = accountService.accountValue;
  const [isOpen, setIsOpen] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const dispatch = useAppDispatch();
  const { categories } = useAppSelector((state) => state.category);
  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);
  const closeModal = () => {
    setIsOpen(false);
  };
  const openModal = () => {
    setIsOpen(true);
  };
  useEffect(() => {
    if (token) {
      setAuthenticated(true);
    }
  }, [token]);
  const handleUnAuthenticated = () => {
    setAuthenticated(false);
    accountService.clearAccount();
  };

  return (
    <header className={cx("header-container")}>
      <div className={cx("header-top")}>
        <div className={cx("logo")}>
          <Link to="/">
            <img src={logo} alt="tokyo-life-logo" />
          </Link>
        </div>
        <div className={cx("search")}>
          <input type="text" placeholder="Tìm kiếm..." />{" "}
          <button>
            <FaSearch />
          </button>
        </div>
        <div className={cx("navigation")}>
          <Link to="/cart" className={cx("navigation-link")}>
            <FaShoppingCart />
            <div className={cx("gates")}>3</div>
          </Link>
          <Link to="/tracking" className={cx("navigation-link")}>
            <FaTruck />
          </Link>
          {!token && !authenticated ? (
            <BoxForm onOpen={openModal} />
          ) : (
            <AuthBox authenticated={handleUnAuthenticated} />
          )}
        </div>
      </div>
      <div className={cx("header-bottom")}>
        <nav className={cx("nav")}>
          <Swiper
            modules={[Autoplay]}
            spaceBetween={2}
            slidesPerView={8}
            autoplay={{
              delay: 2000,
              disableOnInteraction: false, 
            }}
            loop={true}
          >
            {categories?.original?.map((c) => (
              <SwiperSlide key={c?.id}>
                <div className={cx("category-item")}>{c?.name}</div>
              </SwiperSlide>
            ))}
          </Swiper>
        </nav>
      </div>
      {isOpen && <ModalAuth onClose={closeModal} />}
    </header>
  );
};

export default Header;
