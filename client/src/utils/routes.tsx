import Admin from "../pages/admin";
import Home from "../pages/home";
import Student from "../pages/student";
import { MyRouteObject } from "../types";

const routes: MyRouteObject[] = [
  {
    name: "Home",
    path: "/",
    element: <Home />,
  },
  {
    name: "Admin Panel",
    path: "admin",
    element: <Admin />,
  },
  {
    name: "Student Panel",
    path: "student",
    element: <Student />,
  },
] as const;

export default routes;
