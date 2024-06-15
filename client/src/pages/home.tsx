import { Link } from "react-router-dom";
import routes from "../utils/routes";

function Home() {
  return (
    <section className="section">
      <div className="container has-text-centered">
        <h1 className="title">Teacher Evaluation Portal</h1>
        <div className="buttons is-justify-content-center">
          {routes
            .filter((route) => route.shown !== false)
            .map((route, index) => {
              return (
                <button key={index} className="button is-light is-primary">
                  <Link key={route.name} to={route.path as string}>
                    {route.name}
                  </Link>
                </button>
              );
            })}
        </div>
      </div>
    </section>
  );
}

export default Home;
