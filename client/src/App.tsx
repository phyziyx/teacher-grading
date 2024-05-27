import "./App.css";
import { createBrowserRouter, RouterProvider, Link } from "react-router-dom";
import { MyRouteObject } from "./types";
import Student from "./pages/student";
import Admin from "./pages/admin";

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

const router = createBrowserRouter(routes);

function App() {
  return <RouterProvider router={router} />;
}

function Home() {
  return (
    <>
      {routes.map((route) => {
        return (
          <>
            <Link to={route.path as string}>{route.name}</Link>
            <br />
          </>
        );
      })}
    </>
  );
}

export default App;
