// Keep the original reviews available for swiping and without JavaScript.
const reviewTrack = document.querySelector('#review-cards');
if (reviewTrack) {
  const section = reviewTrack.closest('.reviews');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const controls = document.createElement('div');
  controls.className = 'review-controls';
  controls.setAttribute('aria-label', 'Review navigation');
  controls.innerHTML = '<button type="button" class="arrow" aria-label="Previous reviews" aria-controls="review-cards">&#8592;</button><button type="button" class="review-toggle" aria-controls="review-cards">Pause reviews</button><button type="button" class="arrow" aria-label="Next reviews" aria-controls="review-cards">&#8594;</button>';
  reviewTrack.before(controls);
  const [previous, toggle, next] = controls.querySelectorAll('button');
  let paused = reducedMotion.matches;
  let hovered = false;
  let visible = false;
  let timer;

  function move(direction) {
    const cards = reviewTrack.children;
    const step = cards[1].offsetLeft - cards[0].offsetLeft;
    const max = reviewTrack.scrollWidth - reviewTrack.clientWidth;
    let left = (Math.round(reviewTrack.scrollLeft / step) + direction) * step;
    if (direction > 0 && reviewTrack.scrollLeft >= max - 2) left = 0;
    if (direction < 0 && reviewTrack.scrollLeft <= 2) left = max;
    reviewTrack.scrollTo({left, behavior: reducedMotion.matches ? 'instant' : 'smooth'});
  }

  function sync() {
    clearInterval(timer);
    toggle.textContent = paused ? 'Play reviews' : 'Pause reviews';
    if (!paused && !hovered && visible && !document.hidden) {
      timer = setInterval(() => move(1), 6500);
    }
  }
  function pause() { paused = true; sync(); }
  toggle.addEventListener('click', () => { paused = !paused; sync(); });
  previous.addEventListener('click', () => { pause(); move(-1); });
  next.addEventListener('click', () => { pause(); move(1); });
  reviewTrack.addEventListener('pointerenter', event => {
    if (event.pointerType === 'mouse') { hovered = true; sync(); }
  });
  reviewTrack.addEventListener('pointerleave', () => { hovered = false; sync(); });
  reviewTrack.addEventListener('pointerdown', pause);
  reviewTrack.addEventListener('wheel', pause, {passive: true});
  section.addEventListener('focusin', event => { if (event.target !== toggle) pause(); });
  reducedMotion.addEventListener('change', () => { paused = reducedMotion.matches; sync(); });
  document.addEventListener('visibilitychange', sync);
  new IntersectionObserver(entries => {
    visible = entries[0].isIntersecting;
    sync();
  }, {threshold: 0.15}).observe(reviewTrack);
  sync();
}
