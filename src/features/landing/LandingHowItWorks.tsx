export function LandingHowItWorks() {
  return (
    <section className="bg-alt" id="how">
      <div className="container">
        <div className="section-head-center">
          <div className="eyebrow">How it works</div>
          <h2 className="section-title">Three steps. No excuses.</h2>
          <p className="section-sub">
            Setting up a challenge takes less time than deciding what to watch
            tonight.
          </p>
        </div>

        <div className="steps-grid">
          <div className="step">
            <div className="step-num">1</div>
            <div className="step-illus">🎯</div>
            <h3>Pick your challenge</h3>
            <p>
              Join something happening in your city or spin up your own. Set the
              days, the duration, and what counts as &quot;showing up.&quot;
            </p>
          </div>
          <div className="step">
            <div className="step-num">2</div>
            <div className="step-illus">👥</div>
            <h3>Bring your people</h3>
            <p>
              Invite friends, coworkers, or open it up to your neighborhood.
              Accountability hits different when someone&apos;s watching.
            </p>
          </div>
          <div className="step">
            <div className="step-num">3</div>
            <div className="step-illus">🔥</div>
            <h3>Check in daily</h3>
            <p>
              Tap the button. Drop a photo, a comment, a high five. Watch the
              streak grow — and the habit with it.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
