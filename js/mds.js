/* =========================
   MDS – Dyslexic Mode Toggle
   ========================= */

// Apply saved preference ASAP (before DOMReady)
(function () {
  try {
    if (localStorage.getItem('dyslexic') === '1') {
      document.documentElement.classList.add('dyslexic-on');
      document.body.classList.add('dyslexic-on');
    }
  } catch (_) {}
})();

// Bind after DOM is ready
(function () {
  function wire() {
    const btn = document.getElementById('dyslexicToggle');
    if (!btn) return;

    const setState = (on) => {
      document.documentElement.classList.toggle('dyslexic-on', on);
      document.body.classList.toggle('dyslexic-on', on);
      btn.setAttribute('aria-pressed', on ? 'true' : 'false');
      try { localStorage.setItem('dyslexic', on ? '1' : '0'); } catch (_) {}
    };

    // Initialize from class set above
    setState(document.documentElement.classList.contains('dyslexic-on'));

    btn.addEventListener('click', () => {
      const next = !document.documentElement.classList.contains('dyslexic-on');
      setState(next);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', wire);
  } else {
    wire();
  }
})();
