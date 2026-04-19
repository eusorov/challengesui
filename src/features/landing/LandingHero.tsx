import { Link } from "react-router-dom";

export function LandingHero() {
  return (
    <section className="hero" id="top">
      <div className="container hero-inner">
        <div>
          <div className="hero-badge">🔥 12,000+ streaks running</div>
          <h1>
            Build habits with <em>real people</em> near you.
          </h1>
          <p className="lede">
            Start a challenge, invite your friends, and check in daily. The ones
            who show up together, stick together.
          </p>
          <div className="hero-cta">
            <Link className="btn btn-primary btn-xl" to="/register">
              Join for free
            </Link>
            <a className="btn btn-outline btn-xl" href="#how">
              See how it works
            </a>
          </div>
          <div className="hero-meta">
            <div className="avatars">
              <div className="av av-g">SM</div>
              <div className="av av-r">JK</div>
              <div className="av av-b">AL</div>
              <div className="av av-gd">TR</div>
              <div className="av av-p">+</div>
            </div>
            <span>Loved by habit-builders in 40+ cities</span>
          </div>
        </div>

        <div className="hero-visual">
          <div className="float-badge fb-1">
            <span className="emoji">🔥</span> 12 day streak!
          </div>
          <div className="float-badge fb-2">
            <span className="emoji">🎉</span> Jamie checked in
          </div>
          <div className="float-badge fb-3">
            <span className="emoji">💪</span> +30 XP
          </div>

          <div className="phone">
            <div className="phone-screen">
              <div className="phone-streak">
                <div>
                  <div className="big">12</div>
                  <div className="lbl">Day streak</div>
                </div>
                <div className="flame">🔥</div>
              </div>
              <div className="phone-card">
                <div className="icon g">🏃</div>
                <div className="body">
                  <div className="title">Morning run club</div>
                  <div className="bar">
                    <div className="bar-fill bf-g" style={{ width: "70%" }} />
                  </div>
                </div>
              </div>
              <div className="phone-card">
                <div className="icon r">📚</div>
                <div className="body">
                  <div className="title">Read 20 pages</div>
                  <div className="bar">
                    <div className="bar-fill bf-r" style={{ width: "50%" }} />
                  </div>
                </div>
              </div>
              <div className="phone-card">
                <div className="icon b">💧</div>
                <div className="body">
                  <div className="title">8 glasses of water</div>
                  <div className="bar">
                    <div className="bar-fill bf-b" style={{ width: "90%" }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
