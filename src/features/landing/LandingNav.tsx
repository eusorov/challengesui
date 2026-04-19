import { Link } from "react-router-dom";

export function LandingNav() {
  return (
    <nav className="topnav">
      <div className="nav-inner">
        <Link className="logo" to="/">
          <span className="logo-mark">🦉</span>
          Streak
        </Link>
        <div className="nav-links">
          <a href="#berlin">Challenges</a>
          <a href="#categories">Categories</a>
          <a href="#how">How it works</a>
          <a href="#friends">Community</a>
        </div>
        <div className="nav-cta">
          <Link className="btn btn-outline btn-nav" to="/login">
            Log in
          </Link>
          <Link className="btn btn-primary btn-nav" to="/register">
            Sign up
          </Link>
        </div>
      </div>
    </nav>
  );
}
