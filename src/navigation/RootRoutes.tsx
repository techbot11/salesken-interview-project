import Login from "../pages/Login";
import { Redirect } from "react-router-dom";
import Signup from "../pages/Signup";
import Home from "../pages/Home";

export const errorRoute = {
  component: () => <Redirect to="/404" />,
};

const publicRoutes = [
  {
    path: "/login",
    component: Login,
    name: "login",
  },
  {
    path: "/sign-up",
    component: Signup,
    name: "Signup",
  },
];

const authRoutes = [
  {
    path: "/",
    component: Home,
    name: "Home",
  },
];

const routes: Array<{
  path: String;
  component: any;
  name?: string;
}> = [...publicRoutes, ...authRoutes];

export default routes;
