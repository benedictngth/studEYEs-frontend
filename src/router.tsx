import { createBrowserRouter } from "react-router";
import Home from "./components/home";
import StatisticsPage from "./components/StatisticsPage";
import Signup from "./components/Signup";
import Signin from "./components/Signin";

export const router = createBrowserRouter([
  { path: "/dashboard", element: <Home /> },
  { path: "/about", element: <Home /> },
  { path: "/", element: <Signin /> },
  { path: "/signup", element: <Signup /> },
  { path: "/stats", element: <StatisticsPage /> },
]);
