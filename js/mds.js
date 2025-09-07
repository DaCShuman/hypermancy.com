/* =========================
   MDS – Dyslexic Mode Toggle
   ========================= */

// Apply saved preference ASAP (runs before DOMContentLoaded when script is deferred)
(function () {
  try {
    if (localStorage.getItem('dyslexic') === '1') {
      document.documentElement.classList.add('dyslexic-on');
    }
  } catch (e) {}
})();

window.addEventListener('DOMContentLoaded', function () {
  const btn = document.getElementById('dyslexicToggle');
  if (!btn) return;

  const setState = (on) => {
    document.documentElement.classList.toggle('dyslexic-on', on);
    document.body.classList.toggle('dyslexic-on', on);
    btn.setAttribute('aria-pressed', on ? 'true' : 'false');
    try { localStorage.setItem('dyslexic', on ? '1' : '0'); } catch (e) {}
  };

  // Initialize button state based on class applied above
  setState(document.documentElement.classList.contains('dyslexic-on'));

  btn.addEventListener('click', () => {
    const on = !document.documentElement.classList.contains('dyslexic-on');
    setState(on);
  });
});
