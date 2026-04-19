import { Link } from "react-router-dom";

export function LandingBigJoin() {
  return (
    <section className="big-join" id="join">
      <div className="container">
        <div className="big-join-inner">
          <h2>Your first streak is one tap away.</h2>
          <p>
            Free forever. No credit card. Just show up tomorrow with someone who
            cares if you did.
          </p>
          <div className="cta-row">
            <Link className="btn btn-white btn-xl" to="/register">
              Sign up — it&apos;s free
            </Link>
            <a className="btn btn-gold btn-xl" href="#berlin">
              Browse challenges
            </a>
          </div>
          <div className="free-note">⚡ Takes 30 seconds · No app required</div>
        </div>
      </div>
    </section>
  );
}
