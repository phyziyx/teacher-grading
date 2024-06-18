import Home from "../pages/Home";
import Admin from "../pages/Admin";
import Student from "../pages/Student";
import { MyRouteObject } from "../types";
import Enrollments from "../pages/Enrollments";

const routes: MyRouteObject[] = [
  {
    name: "Home",
    path: "/",
    element: <Home />,
    hidden: true,
  },
  {
    name: "Admin Panel",
    path: "/admin",
    element: <Admin />,
  },
  {
    name: "Student Panel",
    path: "/student",
    element: <Student />,
  },
  {
    name: "Enrollments Panel",
    path: "/enrollments",
    element: <Enrollments />,
  },
] as const;

export default routes;
