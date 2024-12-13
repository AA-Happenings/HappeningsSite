import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from "./App";
import CalendarView from './components/CalendarView';
import MainPageView from "./components/MainPageView";
import Event from "./components/Event";
import LoginPage from "./components/LoginPage";
import "./index.css";

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
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
