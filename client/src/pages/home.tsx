import { Link } from "react-router-dom";
import routes from "../utils/routes";
import Footer from "../components/Footer";

function Home() {
  return (
    <section className="section">
      <div className="container has-text-centered">
        <h1 className="title">Teacher Evaluation Portal</h1>
        <hr className="navbar-divider" />
        <div className="buttons is-justify-content-center">
          {routes
            .filter((route) => route.hidden !== true)
            .map((route, index) => {
              return (
                <Link key={index} to={route.path as string}>
                  <button
                    key={route.name}
                    className="button is-light is-primary"
                  >
                    {route.name}
                  </button>
                </Link>
              );
            })}
        </div>
        <hr className="navbar-divider" />
      </div>
      <Footer />
    </section>
  );
}

export default Home;
