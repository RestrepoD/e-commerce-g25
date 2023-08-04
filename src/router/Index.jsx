import { createBrowserRouter } from "react-router-dom";
import { homeLoader } from "./Loaders/homeLoader";
import App from "../App";
import Login from "../pages/Login/Login";
import Home from "../pages/Home/Home";
import ProtectedRoute from "../components/common/ProtectedRoute/ProtectedRoute";
import Purchases from "../pages/Purchases/Purchases";
import Profile from "../pages/Profile/Profile";
import ProductDetails from "../components/Home/ProductDetails/ProductDetails";

export const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/",
        loader: homeLoader,
        element: <Home />,
      },
      {
        path: "/purchases",
        element: (
          <ProtectedRoute>
            <Purchases />
          </ProtectedRoute>
        ),
      },
      {
        path: "/profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
      {
        path: "/product/:productId",
        element: <ProductDetails />,
      },
    ],
  },
  {
    path: "*",
    element: <p>Nothing here</p>,
  },
]);
