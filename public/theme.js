(() => {
  if (window.websiteTheme) { window.websiteTheme.apply(); return; }
  const key = 'website-theme';
  const system = window.matchMedia('(prefers-color-scheme: dark)');
  let preference;
  try { preference = localStorage.getItem(key); } catch {}
  const current = () => preference === 'dark' || preference === 'light'
    ? preference : system.matches ? 'dark' : 'light';
  function apply(root = document) {
    const dark = current() === 'dark';
    root.documentElement.dataset.theme = current();
    root.querySelectorAll('.theme-toggle').forEach(button => {
      const label = `Switch to ${dark ? 'light' : 'dark'} mode`;
      button.setAttribute('aria-label', label);
      button.setAttribute('title', label);
      button.setAttribute('aria-pressed', String(dark));
    });
  }
  window.websiteTheme = { apply };
  apply();
  document.addEventListener('DOMContentLoaded', () => apply());
  document.addEventListener('astro:page-load', () => apply());
  document.addEventListener('astro:before-swap', event => apply(event.newDocument));
  document.addEventListener('click', event => {
    if (!(event.target instanceof Element) || !event.target.closest('.theme-toggle')) return;
    preference = current() === 'dark' ? 'light' : 'dark';
    try { localStorage.setItem(key, preference); } catch {}
    apply();
  });
  system.addEventListener('change', () => apply());
  window.addEventListener('storage', event => {
    if (event.key === key || event.key === null) {
      preference = event.newValue;
      apply();
    }
  });
})();
