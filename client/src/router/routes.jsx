import routeConfig from "../config/router";
import Auth from "../pages/auth/Auth";
import UpdateUser from "../pages/auth/UpdateUser.jsx";
import Cart from "../pages/cart/components/Cart";
import MyBill from "../pages/cart/components/MyBill.jsx";
import Category from "../pages/category/Category.jsx";
import Dashboard from "../pages/home/components/Dashboard";
import Bill from "../pages/manage/Bill.jsx";
import Home from "../pages/manage/Home";
import Product from "../pages/manage/Product";
import ProductSearch from "../pages/manage/ProductSearch.jsx";
import Users from "../pages/manage/User.jsx";
import ProductDetail from "../pages/product/components/ProductDetail";
import Search from "../pages/search/Search";

const routes = [
  {
    path: routeConfig.home,
    element: <Dashboard />,
    layout: "layout",
  },
  {
    path: routeConfig.cart,
    element: <Cart />,
    layout: "layout",
  },
  {
    path: routeConfig.productdetail,
    element: <ProductDetail />,
    layout: "layout",
  },
  {
    path: routeConfig.category,
    element: <Category/>,
    layout: "layout",
  },

  {
    path: routeConfig.updateUser,
    element: <UpdateUser />,
    layout: "layout",
  },

  {
    path: routeConfig.myBill,
    element: <MyBill />,
    layout: "layout",
  },

  {
    path: routeConfig.search,
    element: <Search />,
    layout: "layout",
  },
  {
    path: routeConfig.auth,
    element: <Auth />,
    layout: "layout",
  },
  {
    path: routeConfig.managementHome,
    element: <Home />,
    layout: "management",
  },
  {
    path: routeConfig.managementProduct,
    element: <Product />,
    layout: "management",
  },
  {
    path: routeConfig.managementUser,
    element: <Users />,
    layout: "management",
  },
  {
    path: routeConfig.managementProductSearch,
    element: <ProductSearch />,
    layout: "management",
  },
  {
    path: routeConfig.managementBill,
    element: <Bill />,
    layout: "management",
  },
];

export default routes;
