import { describe, it, expect } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import LandingPage from "./LandingPage";

function renderLanding() {
  return render(
    <MemoryRouter>
      <LandingPage />
    </MemoryRouter>,
  );
}

describe("LandingPage", () => {
  it("renders the hero headline from the Streak demo", () => {
    renderLanding();
    expect(
      screen.getByRole("heading", {
        name: /build habits with real people near you/i,
      }),
    ).toBeInTheDocument();
  });

  it("renders Berlin challenges section title", () => {
    renderLanding();
    expect(
      screen.getByRole("heading", { name: /challenges near you/i }),
    ).toBeInTheDocument();
  });

  it("renders footer brand tagline", () => {
    renderLanding();
    const footer = screen.getByRole("contentinfo");
    expect(
      within(footer).getByText(
        /build habits with real people near you\. show up together/i,
      ),
    ).toBeInTheDocument();
  });
});
