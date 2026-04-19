import { LANDING_CATEGORIES } from "./demoData";

export function LandingCategories() {
  return (
    <section id="categories">
      <div className="container">
        <div className="section-head-center">
          <div className="eyebrow">Find your thing</div>
          <h2 className="section-title">Browse by category</h2>
          <p className="section-sub">
            From fitness to language learning — there&apos;s a challenge for
            whatever you&apos;re trying to build.
          </p>
        </div>

        <div className="cat-grid">
          {LANDING_CATEGORIES.map((c) => (
            <div key={c.title} className={`cat-tile ${c.tileClass}`}>
              <span className="emoji">{c.emoji}</span>
              <h3>{c.title}</h3>
              <div className="count">{c.count}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
