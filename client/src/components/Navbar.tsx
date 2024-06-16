import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <Link className="navbar-item" to="/">
          <b>Teacher Evaluation Site</b>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
