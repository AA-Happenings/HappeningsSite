import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from "./App";
import MainPageView from "./pages/MainPageView";
import Event from "./pages/EventPage";
import LoginPage from "./pages/LoginPag";
import FaqPage from "./pages/FaqPage"; // Import FaqPage
import RulesPage from "./pages/RulesPage"; // Import the RulesPage
import RegisterPage from "./pages/RegisterPage"; // Import the RegisterPage
import ForgotPasswordPage from "./pages/ForgotPasswordPage"; // Import the ForgotPasswordPage
import MyEvents from "./pages/MyEventsPage";
import SAinfo from "./pages/SAinfo";
import "../index.css";
import "./styles/DialogButton.css";
import Profile from "./pages/ProfilePage";
import AdminPage from "./pages/AdminPage"
import "./styles/BurgerMenu.css";
import { AuthContextProvider } from "./context/authContext";
import Login from "./pages/LoginTestPage";
import Signup from "./pages/SignupTestPage";

/*
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
  {
    path: "/logintest",
    element: <Login />,
  },
  {
    path: "/signuptest",
    element: <Signup />,
  },
]);
*/

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // Wraps all pages that need a layout (Navbar, TopBar)
    children: [
      { index: true, element: <MainPageView /> },
      { path: "event/:id", element: <Event /> },
      { path: "faq", element: <FaqPage /> },
      { path: "rules", element: <RulesPage /> },
      { path: "myevents", element: <MyEvents /> },
      { path: "info", element: <SAinfo /> },
      { path: "profile", element: <Profile /> },
      { path: "adminpage", element: <AdminPage /> },
    ],
  },
  { path: "/login", element: <LoginPage /> },
  { path: "/forgot-password", element: <ForgotPasswordPage /> },
  { path: "/register", element: <RegisterPage /> },
  { path: "/logintest", element: <Login /> },
  { path: "/signuptest", element: <Signup /> },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContextProvider>
    <RouterProvider router={router} />
    </AuthContextProvider>
  </React.StrictMode>
);
