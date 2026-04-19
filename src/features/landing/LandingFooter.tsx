import { Link } from "react-router-dom";

export function LandingFooter() {
  return (
    <footer>
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link className="logo" to="/">
              <span className="logo-mark">🦉</span>
              Streak
            </Link>
            <p>
              Build habits with real people near you. Show up together, stick
              together.
            </p>
            <div className="footer-social">
              <a className="social-btn" href="#" title="Twitter">
                𝕏
              </a>
              <a className="social-btn" href="#" title="Instagram">
                IG
              </a>
              <a className="social-btn" href="#" title="TikTok">
                TT
              </a>
              <a className="social-btn" href="#" title="Discord">
                DC
              </a>
            </div>
          </div>

          <div className="footer-col">
            <h4>Product</h4>
            <ul>
              <li>
                <a href="#berlin">Challenges</a>
              </li>
              <li>
                <a href="#categories">Categories</a>
              </li>
              <li>
                <a href="#how">How it works</a>
              </li>
              <li>
                <a href="#">Pricing</a>
              </li>
              <li>
                <a href="#">Mobile app</a>
              </li>
              <li>
                <a href="#">Changelog</a>
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Cities</h4>
            <ul>
              <li>
                <a href="#">Berlin</a>
              </li>
              <li>
                <a href="#">Hamburg</a>
              </li>
              <li>
                <a href="#">Munich</a>
              </li>
              <li>
                <a href="#">Vienna</a>
              </li>
              <li>
                <a href="#">Zurich</a>
              </li>
              <li>
                <a href="#">All cities</a>
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Community</h4>
            <ul>
              <li>
                <a href="#friends">How friendships work</a>
              </li>
              <li>
                <a href="#">Community guidelines</a>
              </li>
              <li>
                <a href="#">Host a challenge</a>
              </li>
              <li>
                <a href="#">Success stories</a>
              </li>
              <li>
                <a href="#">Blog</a>
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Company</h4>
            <ul>
              <li>
                <a href="#">About us</a>
              </li>
              <li>
                <a href="#">Careers</a>
              </li>
              <li>
                <a href="#">Press kit</a>
              </li>
              <li>
                <a href="#">Contact</a>
              </li>
              <li>
                <a href="#">Support</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <div>© 2026 Streak. Made with 🔥 in Berlin.</div>
          <div>
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="#">Cookies</a>
            <a href="#">Imprint</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
