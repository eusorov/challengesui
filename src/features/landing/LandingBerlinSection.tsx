import { Link } from "react-router-dom";
import { LANDING_CHALLENGE_TILES } from "./demoData";

export function LandingBerlinSection() {
  return (
    <section className="bg-alt" id="berlin">
      <div className="container">
        <div className="berlin-head">
          <div>
            <div className="city-chip">
              <span className="dot" />
              Berlin
            </div>
            <h2 className="section-title">Challenges near you</h2>
            <p className="section-sub">
              Real people, real places. Jump into something happening in your city
              this week.
            </p>
          </div>
          <button type="button" className="btn btn-outline">
            Change city ↓
          </button>
        </div>

        <div className="challenge-grid">
          {LANDING_CHALLENGE_TILES.map((t) => (
            <div key={t.title} className="ch-tile">
              <div className="ch-tile-top">
                <div className={`ch-tile-icon ${t.iconClass}`}>{t.icon}</div>
                <div className="ch-tile-host">
                  <div className={`mini-av ${t.hostAvatarClass}`}>
                    {t.hostInitials}
                  </div>
                  {t.hostLabel}
                </div>
              </div>
              <h3>{t.title}</h3>
              <p className="desc">{t.description}</p>
              <div className="ch-tile-meta">
                {t.pills.map((p) => (
                  <span key={p.label} className={`pill ${p.className}`}>
                    {p.label}
                  </span>
                ))}
              </div>
              <div className="ch-tile-footer">
                <div className="ch-tile-people">
                  <div className="avatars">
                    {t.people.map((p) => (
                      <div key={p.initials} className={`a ${p.avClass}`}>
                        {p.initials}
                      </div>
                    ))}
                  </div>
                  {t.joinedLabel}
                </div>
                <Link className="ch-join" to="/register">
                  Join
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="berlin-more">
          <Link className="btn btn-outline btn-lg" to="/register">
            See all 47 challenges in Berlin →
          </Link>
        </div>
      </div>
    </section>
  );
}
