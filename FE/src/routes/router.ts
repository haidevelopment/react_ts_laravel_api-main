import AdminLayout from "../Layouts/AdminLayout/AdminLayout";
import HomeLayout from "../Layouts/HomeLayout";
import Create from "../Pages/Admin/@Category/Create";
import Edit from "../Pages/Admin/@Category/Edit";
import List from "../Pages/Admin/@Category/List";
import Dashboard from "../Pages/Admin/@DashBoard/DashBoard";
import CreateProduct from "../Pages/Admin/@Products/CreateProduct/CreateProduct";
import EditProduct from "../Pages/Admin/@Products/EditProduct/EditProduct";
import ListProduct from "../Pages/Admin/@Products/ListProduct/ListProduct";
import Cart from "../Pages/Home/Cart";
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
];
export { router };
