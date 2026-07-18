import Script from "next/script";

const THEME_INIT_SCRIPT = `
(function () {
  try {
    var stored = localStorage.getItem("theme");
    var theme = stored === "light" || stored === "dark"
      ? stored
      : (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    document.documentElement.classList.toggle("dark", theme === "dark");
  } catch (e) {}
})();
`;

export function ThemeScript() {
  return (
    <Script id="theme-init" strategy="beforeInteractive">
      {THEME_INIT_SCRIPT}
    </Script>
  );
}
