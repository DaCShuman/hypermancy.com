// Apply saved preference ASAP (prevents a flash)
(() => {
  try {
    if (localStorage.getItem('dyslexic') === '1') {
      document.documentElement.classList.add('dyslexic-on');
    }
  } catch (e) {}
})();

// Wire up the dyslexic toggle + optional nav explainers
window.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('dyslexicToggle');
  if (btn){
    const setState = (on) => {
      document.documentElement.classList.toggle('dyslexic-on', on);
      document.body.classList.toggle('dyslexic-on', on);
      btn.setAttribute('aria-pressed', on ? 'true' : 'false');
      try { localStorage.setItem('dyslexic', on ? '1' : '0'); } catch (e) {}
    };
    setState(document.documentElement.classList.contains('dyslexic-on'));
    btn.addEventListener('click', () => setState(!document.documentElement.classList.contains('dyslexic-on')));
  }

  // Description panel binder (works for any nav with data-explain-target)
  const navs = Array.from(document.querySelectorAll('nav.button-bar[data-explain-target]'));
  function bind(nav, panel){
    const text = panel.querySelector('.explain-text');
    let hideTimer;
    const show = (desc) => {
      clearTimeout(hideTimer);
      text.textContent = desc || '';
      panel.classList.add('show');
      panel.setAttribute('aria-hidden','false');
    };
    const scheduleHide = () => {
      clearTimeout(hideTimer);
      hideTimer = setTimeout(() => {
        panel.classList.remove('show');
        panel.setAttribute('aria-hidden','true');
        text.textContent = '';
      }, 120);
    };
    nav.addEventListener('mouseover', e => {
      const link = e.target.closest('.nav-item, a[href]');
      if (!link || !nav.contains(link)) return;
      show(link.dataset.desc || link.title || link.textContent.trim());
    });
    nav.addEventListener('focusin', e => {
      const link = e.target.closest('.nav-item, a[href]');
      if (!link || !nav.contains(link)) return;
      show(link.dataset.desc || link.title || link.textContent.trim());
    });
    nav.addEventListener('mouseout', e => { if (!nav.contains(e.relatedTarget)) scheduleHide(); });
    nav.addEventListener('focusout', () => { if (!nav.contains(document.activeElement)) scheduleHide(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') scheduleHide(); });
  }
  navs.forEach(nav => {
    const panelId = nav.getAttribute('data-explain-target');
    const panel = document.getElementById(panelId);
    if (panel) bind(nav, panel);
  });
});
