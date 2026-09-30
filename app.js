(() => {
  const slides = window.SLIDES || [];
  const img = document.getElementById('slide');
  const bar = document.querySelector('#progress span');
  const counter = document.getElementById('counter');
  const pauseBtn = document.getElementById('pause');
  const params = new URLSearchParams(location.search);
  const seconds = Math.max(5, Number(params.get('seconds')) || 18);
  const shuffle = params.get('shuffle') === '1';
  document.documentElement.style.setProperty('--seconds', seconds + 's');
  if (shuffle) slides.sort(() => Math.random() - 0.5);
  let i = 0, timer = null, paused = false, failures = 0;

  slides.forEach(src => { const p = new Image(); p.src = src; });

  function resetProgress(){
    bar.classList.remove('run');
    void bar.offsetWidth;
    if (!paused) bar.classList.add('run');
  }
  function schedule(){
    clearTimeout(timer);
    if (!paused) timer = setTimeout(() => show(i + 1), seconds * 1000);
  }
  function show(n){
    if (!slides.length) return;
    i = (n + slides.length) % slides.length;
    img.classList.add('out');
    const next = new Image();
    next.onload = () => {
      img.src = slides[i];
      requestAnimationFrame(() => img.classList.remove('out'));
      failures = 0;
      counter.textContent = `${i + 1} / ${slides.length}`;
      resetProgress();
      schedule();
    };
    next.onerror = () => { failures++; if (failures < slides.length) show(i + 1); };
    next.src = slides[i];
  }
  function togglePause(){
    paused = !paused;
    pauseBtn.textContent = paused ? '▶' : 'Ⅱ';
    pauseBtn.setAttribute('aria-label', paused ? 'Resume slideshow' : 'Pause slideshow');
    resetProgress(); schedule();
  }
  document.getElementById('next').onclick = () => show(i + 1);
  document.getElementById('prev').onclick = () => show(i - 1);
  pauseBtn.onclick = togglePause;
  document.getElementById('full').onclick = () => document.fullscreenElement ? document.exitFullscreen() : document.documentElement.requestFullscreen();
  addEventListener('keydown', e => {
    if (e.key === 'ArrowRight' || e.key === ' ') { e.preventDefault(); show(i + 1); }
    else if (e.key === 'ArrowLeft') show(i - 1);
    else if (e.key.toLowerCase() === 'p') togglePause();
    else if (e.key.toLowerCase() === 'f') document.getElementById('full').click();
  });
  // TV hardening: keep the screen awake, and reload every few hours so
  // anything you push to GitHub shows up on the TV without touching it.
  const reloadHours = Math.max(1, Number(params.get('reload')) || 4);
  async function wake(){ try { if ('wakeLock' in navigator) await navigator.wakeLock.request('screen'); } catch(e){} }
  wake(); document.addEventListener('visibilitychange', () => { if (!document.hidden) wake(); });
  setTimeout(() => location.reload(), reloadHours * 3600 * 1000);

  show(0);
})();
