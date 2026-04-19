import { Link } from "react-router-dom";

export function LandingFriends() {
  return (
    <section id="friends">
      <div className="container friends-inner">
        <div className="friends-visual">
          <div className="reaction-badge rb-1">
            <span>❤️</span> 12 cheers
          </div>
          <div className="reaction-badge rb-2">
            <span>🏆</span> Badge unlocked
          </div>

          <div className="friend-chat">
            <div className="chat-header">
              <div className="av-stack">
                <div className="av av-g">MK</div>
                <div className="av av-r">JP</div>
                <div className="av av-b">LS</div>
              </div>
              <div className="ch-name">
                Tiergarten runs
                <span className="sub">● Live today</span>
              </div>
            </div>
            <div className="msg">
              <div className="av-sm av-g">MK</div>
              <div className="bubble">
                <strong>Maya</strong> checked in 🏃 &quot;Beat my 5k time!&quot;
              </div>
            </div>
            <div className="msg mine">
              <div className="av-sm av-r">ME</div>
              <div className="bubble">Lets gooo 🔥 same time tomorrow?</div>
            </div>
            <div className="msg">
              <div className="av-sm av-b">LS</div>
              <div className="bubble">
                <strong>Lukas</strong> &quot;count me in, bringing coffee after&quot;
              </div>
            </div>
          </div>
        </div>

        <div className="friends-text">
          <div className="eyebrow">Better together</div>
          <h2 className="section-title">Habits are a team sport.</h2>
          <p className="lede">
            Streak isn&apos;t a solo tracker that guilt-trips you. It&apos;s a
            place to find your people, cheer them on, and be cheered back.
          </p>
          <ul className="friends-list">
            <li>
              <span className="check" />
              Invite friends to any challenge in one tap
            </li>
            <li>
              <span className="check" />
              Chat, react, and celebrate in the group feed
            </li>
            <li>
              <span className="check" />
              See who else in your city shares your goal
            </li>
            <li>
              <span className="check" />
              Build real friendships through showing up
            </li>
          </ul>
          <Link className="btn btn-primary btn-lg" to="/register">
            Find your crew
          </Link>
        </div>
      </div>
    </section>
  );
}
