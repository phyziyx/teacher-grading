import { Link } from "react-router-dom";
import routes from "../utils/routes";
import { Fragment } from "react/jsx-runtime";

function Home() {
  return (
    <>
      {routes.map((route, index) => {
        return (
          <Fragment key={index}>
            <Link key={route.name} to={route.path as string}>
              {route.name}
            </Link>
            <br />
          </Fragment>
        );
      })}
    </>
  );
}

export default Home;
