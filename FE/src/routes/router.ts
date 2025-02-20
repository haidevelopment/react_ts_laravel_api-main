import AdminLayout from "../Layouts/AdminLayout/AdminLayout";
import HomeLayout from "../Layouts/HomeLayout";
import FormAttribute from "../Pages/Admin/@Attriburte/Attribute/Form/FormAttribute";
import ListAttribute from "../Pages/Admin/@Attriburte/Attribute/List/ListAttribute";
import BaseMessenger from "../Pages/Admin/@BaseMessenger/BaseMessenger";
import BrandForm from "../Pages/Admin/@Brand/BrandForm/BrandForm";
import ListBrand from "../Pages/Admin/@Brand/ListBrand/ListBrand";
import Create from "../Pages/Admin/@Category/Create";
import Edit from "../Pages/Admin/@Category/Edit";
import List from "../Pages/Admin/@Category/List";
import Dashboard from "../Pages/Admin/@DashBoard/DashBoard";
import OrderAdmin from "../Pages/Admin/@Order/OrderAdmin";
import OrderDetail from "../Pages/Admin/@Order/OrderDetail/OrderDetail";
import CreateProduct from "../Pages/Admin/@Products/CreateProduct/CreateProduct";
import EditProduct from "../Pages/Admin/@Products/EditProduct/EditProduct";
import ListProduct from "../Pages/Admin/@Products/ListProduct/ListProduct";
import ProductInventory from "../Pages/Admin/@Products/StockStatus/ProductInventory";
import VoucherForm from "../Pages/Admin/@Voucher/VoucherForm/VoucherForm";
import VoucherList from "../Pages/Admin/@Voucher/VoucherList/VoucherList";
import Cart from "../Pages/Home/Cart";
import Checkout from "../Pages/Home/Checkout/Checkout";

import ProductDetail from "../Pages/Home/Detail/ProductDetail/ProductDetail";
import Home from "../Pages/Home/Home/Home";
import Order from "../Pages/Home/Order/Order";
import ProductPages from "../Pages/Home/ProductPages/ProductPages";
import ThankYou from "../Pages/Home/ThankYou/Thankyou";
import { routes, routesAdmin } from "../config/router";

const router = [
  //client
  {
    path: routes.home,
    component: Home,
    layout: HomeLayout,
    authenticate: false,
    permistion: false,
  },
  {
    path: routes.cart,
    component: Cart,
    layout: HomeLayout,
    authenticate: true,
    permistion: false,
  },
  {
    path: routes.detail,
    component: ProductDetail,
    layout: HomeLayout,
    authenticate: false,
    permistion: false,
  },
  {
    path: routes.checkout,
    component: Checkout,
    layout: HomeLayout,
    authenticate: true,
    permistion: false,
  },
  {
    path: routes.order,
    component: Order,
    layout: HomeLayout,
    authenticate: true,
    permistion: false,
  },
  {
    path: routes.thank,
    component: ThankYou,
    layout: HomeLayout,
    authenticate: true,
    permistion: false,
  },
  {
    path: routes.product,
    component: ProductPages,
    layout: HomeLayout,
    authenticate: false,
    permistion: false,
  },
  //admin
  {
    path: routesAdmin.admin,
    component: Dashboard,
    layout: AdminLayout,
    authenticate: true,
    permistion: true,
  },
  //category
  {
    path: routesAdmin.category,
    component: List,
    layout: AdminLayout,
    authenticate: true,
    permistion: true,
  },
  {
    path: routesAdmin.categoryCreate,
    component: Create,
    layout: AdminLayout,
    authenticate: true,
    permistion: true,
  },
  {
    path: routesAdmin.categoryEdit,
    component: Edit,
    layout: AdminLayout,
    authenticate: true,
    permistion: true,
  },
  //product
  {
    path: routesAdmin.product,
    component: ListProduct,
    layout: AdminLayout,
    authenticate: true,
    permistion: true,
  },
  {
    path: routesAdmin.productCreate,
    component: CreateProduct,
    layout: AdminLayout,
    authenticate: true,
    permistion: true,
  },
  {
    path: routesAdmin.productEdit,
    component: EditProduct,
    layout: AdminLayout,
    authenticate: true,
    permistion: true,
  },
  {
    path: routesAdmin.inventory,
    component: ProductInventory,
    layout: AdminLayout,
    authenticate: true,
    permistion: true,
  },
  // attribute
  {
    path: routesAdmin.attribute,
    component: ListAttribute,
    layout: AdminLayout,
    authenticate: true,
    permistion: true,
  },
  {
    path: routesAdmin.createAttribute,
    component: FormAttribute,
    layout: AdminLayout,
    authenticate: true,
    permistion: true,
  },
  {
    path: routesAdmin.editAttribute,
    component: FormAttribute,
    layout: AdminLayout,
    authenticate: true,
    permistion: true,
  },
  //brand
  {
    path: routesAdmin.brand,
    component: ListBrand,
    layout: AdminLayout,
    authenticate: true,
    permistion: true,
  },
  {
    path: routesAdmin.addBrand,
    component: BrandForm,
    layout: AdminLayout,
    authenticate: true,
    permistion: true,
  },
  {
    path: routesAdmin.editBrand,
    component: BrandForm,
    layout: AdminLayout,
    authenticate: true,
    permistion: true,
  },
  //coupon
  {
    path: routesAdmin.coupon,
    component: VoucherList,
    layout: AdminLayout,
    authenticate: true,
    permistion: true,
  },
  {
    path: routesAdmin.addCoupon,
    component: VoucherForm,
    layout: AdminLayout,
    authenticate: true,
    permistion: true,
  },
  {
    path: routesAdmin.editCoupon,
    component: VoucherForm,
    layout: AdminLayout,
    authenticate: true,
    permistion: true,
  },
  //order
  {
    path: routesAdmin.order,
    component: OrderAdmin,
    layout: AdminLayout,
    authenticate: true,
    permistion: true,
  },
  {
    path: routesAdmin.orderDetail,
    component: OrderDetail,
    layout: AdminLayout,
    authenticate: true,
    permistion: true,
  },
  //messages
  {
    path: routesAdmin.messenger,
    component: BaseMessenger,
    layout: AdminLayout,
    authenticate: true,
    permistion: true,
  },
];
export { router };
