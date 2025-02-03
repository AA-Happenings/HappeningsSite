import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from "./App";
import MainPageView from "./components/MainPageView";
import Event from "./components/Event";
import LoginPage from "./components/LoginPage";
import FaqPage from "./components/FaqPage"; // Import FaqPage
import RulesPage from "./components/RulesPage"; // Import the RulesPage
import RegisterPage from "./components/RegisterPage"; // Import the RegisterPage
import ForgotPasswordPage from "./components/ForgotPasswordPage"; // Import the ForgotPasswordPage
import MyEvents from "./components/MyEvents";
import SAinfo from "./components/SAinfo";
import "./index.css";
import "./DialogButton.css";
import Profile from "./components/profile";
import AdminPage from "./components/AdminPage"
import "./BurgerMenu.css";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, 
    children: [
      {
        path: "/",
        element: <MainPageView />,
      },
    ],
  },
  {
    path: "/event/:id",
    element: <App />,
    children: [
      {
        path: "/event/:id",
        element: <Event />,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/forgot-password", // Add route for Forgot Password Page
    element: <ForgotPasswordPage />,
  },
  {

    path: "/faq", // FAQ route definition
    element: <App />,
    children: [
      {
        path: "/faq",
        element: <FaqPage />
      },
    ],
  },
  {
    path: "/rules",
    element: <App />,
    children: [
      {
        path: "/rules",
        element: <RulesPage />,
      },
    ],
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/myevents",
    element: <MyEvents />,
  },
  {
    path: "/info",
    element: <SAinfo />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/adminpage",
    element: <AdminPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
