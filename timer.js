(() => {
  const duration = 25000;
  let remaining = duration;
  let deadline = 0;
  let running = false;
  let interval = null;
  const start = document.querySelector('#timer-start');
  const reset = document.querySelector('#timer-reset');
  const display = document.querySelector('#timer-display');
  const cue = document.querySelector('#breath-cue');
  const status = document.querySelector('#timer-status');
  const orbit = document.querySelector('#timer-orbit');
  const ring = document.querySelector('#ring-progress');
  const next = document.querySelector('#timer-continue');

  function render() {
    const seconds = Math.ceil(remaining / 1000);
    display.textContent = `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`;
    ring.style.strokeDashoffset = String(100 * (1 - remaining / duration));
    const phase = ((duration - remaining) % 10000) / 1000;
    const expansion = phase < 4 ? phase / 4 : 1 - (phase - 4) / 6;
    orbit.style.setProperty('--breath-scale', String(0.86 + expansion * 0.14));
    if (running) cue.textContent = phase < 4 ? 'Breathe in gently' : 'Breathe out slowly';
  }
  function tick() {
    if (!running) return;
    // Read elapsed time instead of counting callbacks, including time in other tabs.
    remaining = Math.max(0, deadline - performance.now());
    render();
    if (remaining === 0) {
      running = false;
      clearInterval(interval);
      interval = null;
      cue.textContent = 'a little space, just for you';
      status.textContent = 'Your 25 seconds are complete. Continue whenever you’re ready.';
      start.textContent = 'Take another 25 seconds';
      next.textContent = 'Continue to my little reminders →';
      next.classList.add('ready');
      next.hidden = false;
    }
  }
  start.addEventListener('click', () => {
    if (running) {
      tick();
      if (!running) return;
      running = false;
      clearInterval(interval);
      interval = null;
      cue.textContent = 'take your time';
      start.textContent = 'Resume my moment';
      status.textContent = 'Paused. Pick up again whenever you’re ready.';
      return;
    }
    if (remaining === 0) remaining = duration;
    running = true;
    deadline = performance.now() + remaining;
    start.textContent = 'Pause my moment';
    reset.disabled = false;
    status.textContent = 'Let this be a moment without expectations.';
    next.hidden = true;
    next.classList.remove('ready');
    render();
    interval = setInterval(tick, 100);
  });
  reset.addEventListener('click', () => {
    clearInterval(interval);
    interval = null;
    running = false;
    remaining = duration;
    start.textContent = 'Start my 25 seconds';
    reset.disabled = true;
    cue.textContent = 'a small moment of stillness';
    status.textContent = 'No rush. This time belongs to you.';
    next.hidden = true;
    next.classList.remove('ready');
    render();
  });
  document.addEventListener('visibilitychange', () => { if (!document.hidden) tick(); });
  render();
})();
