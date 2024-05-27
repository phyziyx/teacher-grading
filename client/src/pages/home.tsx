import { Link } from "react-router-dom";
import routes from "../utils/routes";

function Home() {
  return (
    <>
      {routes.map((route) => {
        return (
          <>
            <Link key={route.name} to={route.path as string}>
              {route.name}
            </Link>
            <br />
          </>
        );
      })}
    </>
  );
}

export default Home;
