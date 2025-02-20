export const routes = {
  home: "/",
  cart: "/cart",
  login: "/login",
  detail: "/detail/:id",
  checkout:"/checkout",
  order:"/order",
  thank:"/thankyou",
  product:"/product",
};
export const routesAdmin = {
  admin: "/admin",
  //category
  category: "/admin/category",
  categoryCreate: "/admin/create-category",
  categoryEdit: "/admin/edit-category/:id",
  //product
  product: "/admin/product",
  productCreate: "/admin/create-product",
  productEdit: "/admin/edit-product/:id",
 inventory:"/admin/inventory",
  //attribute
  attribute:'/admin/attribute',
  createAttribute:'/admin/attribute/create',
  editAttribute:'/admin/attribute/edit/:id',
  //brand
  brand:"/admin/brand",
  addBrand:"/admin/brand/create",
  editBrand:"/admin/brand/edit/:id",
  //coupon
  coupon:"/admin/coupon",
  addCoupon:"/admin/coupon/create",
  editCoupon:"/admin/coupon/edit/:id",
  // order
  order:"/admin/order",
  orderDetail:"/admin/order/detail/:id",
  //messages
  messenger:"/admin/messenger"
};
