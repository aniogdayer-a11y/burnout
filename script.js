const reminders = [
  ['cloud', 'A little cloud gently floating', 'It’s Okay to Slow Down.', 'You don’t have to figure everything out today. Life isn’t a race, and taking things slowly doesn’t mean you’re falling behind. Sometimes, slowing down is exactly what you need to move forward again.'],
  ['plant', 'A happy plant gently growing', 'Growth Takes Time.', 'Just like plants, you need time, patience, and care to grow. You may not notice your progress every day, but that doesn’t mean you’re not improving. Trust yourself and appreciate every little step.'],
  ['tea', 'A cozy cup of tea with rising steam', 'Rest Is Productive Too.', 'You deserve to rest without feeling guilty. Your worth isn’t measured by how much work you finish in a day. Taking a break allows your mind and body to recharge so you can return feeling better.'],
  ['heart', 'A little pink heart softly beating', 'Be Kind to Yourself.', 'You’re doing your best with what you have right now, and that matters. Stop being too hard on yourself for things you cannot control. You deserve the same kindness and understanding you give to others.'],
  ['sunrise', 'A smiling sun rising over soft hills', 'Tomorrow Is Another Chance.', 'One difficult day doesn’t define your entire journey. Tomorrow brings new opportunities to try again, improve, and become better. Don’t let today’s struggles convince you that your future cannot be brighter.'],
  ['moon', 'A sleepy moon with twinkling stars', 'You Don’t Have to Be Strong All the Time.', 'It’s okay to feel tired, emotional, or overwhelmed. You don’t always need to pretend that everything is fine. Sometimes, acknowledging your feelings is the first step toward understanding what you truly need.'],
  ['butterfly', 'A butterfly fluttering its lavender wings', 'Small Progress Is Still Progress.', 'Even the smallest achievement deserves recognition. You don’t have to accomplish something extraordinary every day. What matters is that you’re growing, learning, and continuing at your own pace.'],
  ['balloon', 'A rosy balloon gently floating', 'You’re Doing Better Than You Think.', 'Look how far you’ve come, even through the days when everything felt difficult. You’ve survived challenges you once thought you couldn’t handle. Be proud of yourself for continuing, because your efforts matter.']
];
const reminderList = document.querySelector('#reminder-list');
if (reminderList) reminderList.innerHTML = reminders.map(([asset, alt, title, copy], i) => {
  const artwork = i === 0
    ? `<div class="reminder-embed"><div class="tenor-animation"><div class="tenor-gif-embed" data-postid="9747136" data-share-method="host" data-aspect-ratio="1.70588" data-width="100%"><a href="https://tenor.com/view/sloth-walking-slow-slow-mo-asi-cuando-gif-9747136">Sloth Walking Slow GIF</a> from <a href="https://tenor.com/search/sloth-gifs">Sloth GIFs</a></div></div><p class="embed-paused">Sloth animation hidden while animations are paused.</p></div>`
    : i === 1
      ? `<div class="reminder-embed"><div class="tenor-animation"><div class="tenor-gif-embed" data-postid="5431200430644733626" data-share-method="host" data-aspect-ratio="1.245" data-width="100%"><a href="https://tenor.com/view/globkins-the-globkins-watering-plants-garden-gif-5431200430644733626">Globkins The Globkins GIF</a> from <a href="https://tenor.com/search/globkins-gifs">Globkins GIFs</a></div></div><p class="embed-paused">Watering-plants animation hidden while animations are paused.</p></div>`
      : i === 2
        ? `<div class="reminder-embed"><div class="tenor-animation"><div class="tenor-gif-embed" data-postid="5684151" data-share-method="host" data-aspect-ratio="1.78571" data-width="100%"><a href="https://tenor.com/view/lazy-unproductive-productive-nothing-to-do-list-gif-5684151">Everyday Goals GIF</a> from <a href="https://tenor.com/search/lazy-gifs">Lazy GIFs</a></div></div><p class="embed-paused">Everyday Goals animation hidden while animations are paused.</p></div>`
        : i === 3
          ? `<div class="reminder-embed"><div class="tenor-animation"><div class="tenor-gif-embed" data-postid="10093638665144252398" data-share-method="host" data-aspect-ratio="1" data-width="100%"><a href="https://tenor.com/view/health-penguin-self-care-goals-mental-health-gif-10093638665144252398">Health Penguin GIF</a> from <a href="https://tenor.com/search/health-gifs">Health GIFs</a></div></div><p class="embed-paused">Penguin animation hidden while animations are paused.</p></div>`
          : i === 4
            ? `<div class="reminder-embed"><div class="tenor-animation"><div class="tenor-gif-embed" data-postid="23923161" data-share-method="host" data-aspect-ratio="1.78771" data-width="100%"><a href="https://tenor.com/view/toy-story-rex-but-we-can-try-again-right-try-again-gif-23923161">Toy Story Rex GIF</a> from <a href="https://tenor.com/search/toy+story-gifs">Toy Story GIFs</a></div></div><p class="embed-paused">Toy Story Rex animation hidden while animations are paused.</p></div>`
            : i === 5
              ? `<div class="reminder-embed"><div class="tenor-animation"><div class="tenor-gif-embed" data-postid="16190692" data-share-method="host" data-aspect-ratio="1.48148" data-width="100%"><a href="https://tenor.com/view/akirambow-spoiled-rabbit-plump-little-chick-smile-person-cute-gif-16190692">Akirambow Spoiled Rabbit Sticker</a> from <a href="https://tenor.com/search/akirambow-stickers">Akirambow Stickers</a></div></div><p class="embed-paused">Rabbit animation hidden while animations are paused.</p></div>`
              : i === 6
                ? `<div class="reminder-embed"><div class="tenor-animation"><div class="tenor-gif-embed" data-postid="14500725" data-share-method="host" data-aspect-ratio="1.51659" data-width="100%"><a href="https://tenor.com/view/bu%E1%BB%93n-ng%E1%BB%A7-goodnight-sleepy-boss-baby-gif-14500725">Buồn Ngủ Goodnight GIF</a> from <a href="https://tenor.com/search/bu%E1%BB%93n+ng%E1%BB%A7-gifs">Buồn Ngủ GIFs</a></div></div><p class="embed-paused">Boss Baby animation hidden while animations are paused.</p></div>`
                : i === 7
                  ? `<div class="reminder-embed"><div class="tenor-animation"><div class="tenor-gif-embed" data-postid="8080543671806649652" data-share-method="host" data-aspect-ratio="1.07328" data-width="100%"><a href="https://tenor.com/view/peach-goma-peach-and-goma-peach-cat-goma-ok-gif-8080543671806649652">Peach Goma Peach And Goma GIF</a> from <a href="https://tenor.com/search/peach+goma-gifs">Peach Goma GIFs</a></div></div><p class="embed-paused">Peach Goma animation hidden while animations are paused.</p></div>`
                  : `<img src="assets/${asset}.gif" data-still="assets/${asset}.png" width="320" height="240" loading="lazy" alt="${alt}">`;
  return `<article class="reminder reveal"><span class="reminder-number">0${i + 1} / 08</span>${artwork}<h3>${title}</h3><p>${copy}</p></article>`;
}).join('');

const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
const motionToggle = document.querySelector('#motion-toggle');
let tenorLoaded = false;
function setMotion(paused) {
  document.documentElement.classList.toggle('motion-paused', paused);
  if (!paused && document.querySelector('.tenor-gif-embed') && !tenorLoaded) {
    const embedScript = document.createElement('script');
    embedScript.src = 'https://tenor.com/embed.js';
    embedScript.async = true;
    document.head.appendChild(embedScript);
    tenorLoaded = true;
  }
  document.querySelectorAll('img[data-still]').forEach(img => {
    if (!img.dataset.animated) img.dataset.animated = img.getAttribute('src');
    img.src = paused ? img.dataset.still : img.dataset.animated;
  });
  motionToggle.setAttribute('aria-pressed', String(paused));
  motionToggle.textContent = paused ? 'Play animations' : 'Pause animations';
}
motionToggle.addEventListener('click', () => setMotion(motionToggle.getAttribute('aria-pressed') !== 'true'));
reducedMotion.addEventListener('change', event => setMotion(event.matches));
setMotion(reducedMotion.matches);
if ('IntersectionObserver' in window && !reducedMotion.matches) {
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.remove('pending'); observer.unobserve(entry.target); }
  }), { threshold: 0.08 });
  document.querySelectorAll('.reveal').forEach(el => { el.classList.add('pending'); observer.observe(el); });
}
