import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Products from "./page/products/Products.jsx";
import AboutUs from "./page/about-us/AboutUs.jsx";
import Layout from "./Components/layout/Layout.jsx";
import ProductDetails from "./page/product-details/ProductDetails.jsx";
import {ErrorNotFound} from "./Components/ErrorNotFound.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorNotFound />,
    children: [
      {
        path: "/",
        element: <App />
      },
      {
        path: "/products",
        element: <Products />
      },
      {
        path: "/about-us",
        element: <AboutUs />
      },
      {
        path: "/product-details",
        element: <ProductDetails />
      }
    ]
  }
  // {
  //   path: "/products",
  //   element: <Products />
  // },
  // {
  //   path: "/about-us",
  //   element: <AboutUs />
  // }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
