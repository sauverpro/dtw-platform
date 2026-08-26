import { useLayoutEffect } from "react";
import { Outlet } from "react-router-dom";
import { SiteProvider } from "./store/SiteContext";

/**
 * Wraps every /sponsor route. The `sponsor-page` class on <html> is what limits
 * the sponsorship section's dark document-level styling to these routes so it
 * cannot leak into the light-themed main site; see src/index.css. It is applied
 * in a layout effect so the theme is in place before the first paint.
 *
 * SiteProvider lives here too, which keeps its CMS fetch from running on
 * main-site routes.
 */
export default function SponsorLayout() {
  useLayoutEffect(() => {
    const root = document.documentElement;
    root.classList.add("sponsor-page");
    return () => root.classList.remove("sponsor-page");
  }, []);

  return (
    <SiteProvider>
      <Outlet />
    </SiteProvider>
  );
}
