export const routes = {
  home: "/",
  cart: "/cart",
  login: "/login",
  detail: "/detail/:id",
  checkout:"/checkout"
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

  //attribute
  attribute:'/admin/attribute',
  createAttribute:'/admin/attribute/create',
  editAttribute:'/admin/attribute/edit/:id',
  //brand
  brand:"/admin/brand",
  addBrand:"/admin/brand/create",
  editBrand:"/admin/brand/edit/:id"
};
