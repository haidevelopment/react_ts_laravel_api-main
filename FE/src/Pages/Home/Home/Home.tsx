import classNames from "classnames/bind";
import styles from "./Home.module.scss";
import SliderBanner from "./SliderBanner";
import CategoryHome from "./CategoryHome";
import VoucherList from "./VoucherList/VoucherList";
import ProductList from "./ProductList/ProductList";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { useEffect } from "react";
import { getProducts } from "../../../Features/Slices/productSlice";
const cx = classNames.bind(styles);
const Home = () => {
  const dispatch = useAppDispatch();
  const { products } = useAppSelector((state) => state.product);
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);
  console.log(products);
  
  return (
    <div>
      <SliderBanner />
      <section className={cx("main")}>
        <h2>Tết An Lành</h2>
        <CategoryHome />
        <VoucherList />
        <ProductList type="nomal" data={products} />
      </section>
    </div>
  );
};

export default Home;
