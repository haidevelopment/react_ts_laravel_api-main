import AdminLayout from "../Layouts/AdminLayout/AdminLayout";
import HomeLayout from "../Layouts/HomeLayout";
import FormAttribute from "../Pages/Admin/@Attriburte/Attribute/Form/FormAttribute";
import ListAttribute from "../Pages/Admin/@Attriburte/Attribute/List/ListAttribute";
import BrandForm from "../Pages/Admin/@Brand/BrandForm/BrandForm";
import ListBrand from "../Pages/Admin/@Brand/ListBrand/ListBrand";
import Create from "../Pages/Admin/@Category/Create";
import Edit from "../Pages/Admin/@Category/Edit";
import List from "../Pages/Admin/@Category/List";
import Dashboard from "../Pages/Admin/@DashBoard/DashBoard";
import CreateProduct from "../Pages/Admin/@Products/CreateProduct/CreateProduct";
import EditProduct from "../Pages/Admin/@Products/EditProduct/EditProduct";
import ListProduct from "../Pages/Admin/@Products/ListProduct/ListProduct";
import Cart from "../Pages/Home/Cart";
import Checkout from "../Pages/Home/Checkout/Checkout";

import ProductDetail from "../Pages/Home/Detail/ProductDetail/ProductDetail";
import Home from "../Pages/Home/Home/Home";
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
];
export { router };
