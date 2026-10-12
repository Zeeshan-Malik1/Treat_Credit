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

  const fullReview = document.createElement('dialog');
  fullReview.className = 'full-review';
  fullReview.setAttribute('aria-labelledby', 'full-review-author');
  fullReview.innerHTML = '<button type="button" class="full-review-close" aria-label="Close full review">&times;</button><span class="eyebrow">GOOGLE REVIEW</span><h2 id="full-review-author"></h2><p class="full-review-text"></p>';
  document.body.append(fullReview);
  fullReview.querySelector('button').addEventListener('click', () => fullReview.close());
  section.classList.add('reviews-enhanced');
  const expandable = [...reviewTrack.children].map(card => {
    const quote = card.querySelector('blockquote');
    const author = card.querySelector('figcaption strong').textContent;
    const text = quote.innerText;
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'review-read-more';
    button.textContent = 'Read full review';
    button.setAttribute('aria-label', `Read full review by ${author}`);
    button.addEventListener('click', () => {
      pause();
      fullReview.querySelector('h2').textContent = author;
      fullReview.querySelector('p').textContent = text;
      fullReview.showModal();
    });
    quote.after(button);
    return {quote, button};
  });
  new ResizeObserver(() => {
    expandable.forEach(({quote, button}) => { button.hidden = quote.scrollHeight <= quote.clientHeight + 1; });
  }).observe(reviewTrack);

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
      timer = setInterval(() => move(1), 3000);
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
