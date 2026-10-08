// Tenor lists this animation as 2.500 seconds. Start timing after image load.
// Source: https://tenor.com/view/bonk-gif-13392138837084579216
(() => {
  const dialog = document.querySelector('#bonk-dialog');
  const art = document.querySelector('#bonk-art');
  let timeout;
  let origin;
  let sequence = 0;

  function cleanup() {
    sequence++;
    clearTimeout(timeout);
    art.replaceChildren();
    origin?.focus({ preventScroll: true });
  }
  document.querySelector('#bonk-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('close', cleanup);
  window.showBonkReaction = button => {
    if (dialog.open) return;
    origin = button;
    const request = ++sequence;
    art.replaceChildren();
    dialog.showModal();
    // Respect the visitor's animation preference and retain the gentle message.
    if (document.documentElement.classList.contains('motion-paused')) return;
    const image = new Image();
    image.alt = 'Two cartoon penguins in a playful bonk animation';
    image.width = 320;
    image.height = 320;
    image.onload = () => {
      if (request !== sequence || !dialog.open) return;
      clearTimeout(timeout);
      art.replaceChildren(image);
      timeout = setTimeout(() => dialog.close(), 2500);
    };
    image.onerror = () => {
      if (request !== sequence || !dialog.open) return;
      clearTimeout(timeout);
      art.textContent = 'A little reminder: be kind to yourself.';
    };
    art.textContent = 'A little encouragement is on its way…';
    timeout = setTimeout(() => {
      if (request !== sequence || !dialog.open) return;
      sequence++;
      art.textContent = 'A little reminder: be kind to yourself.';
    }, 10000);
    // A fresh URL restarts the GIF for each incorrect answer.
    image.src = `https://media1.tenor.com/m/udpvUVcjpZAAAAAd/bonk.gif?play=${Date.now()}-${request}`;
  };
})();

(() => {
  const dialog = document.querySelector('#prize-dialog');
  const art = document.querySelector('#prize-art');
  const continueButton = document.querySelector('#prize-continue');
  const nextButton = document.querySelector('#next');
  function closePrize() { dialog.close(); }
  document.querySelector('#prize-close').addEventListener('click', closePrize);
  continueButton.addEventListener('click', closePrize);
  dialog.addEventListener('close', () => {
    art.replaceChildren();
    nextButton.focus({ preventScroll: true });
  });
  window.showPrizeReaction = () => {
    if (dialog.open) return;
    art.replaceChildren();
    if (!document.documentElement.classList.contains('motion-paused')) {
      // A fresh embed starts the reward each time without reloading other GIFs.
      const frame = document.createElement('iframe');
      frame.src = 'https://tenor.com/embed/15782516';
      frame.title = 'Your Prize reward animation from Tenor';
      frame.width = '320';
      frame.height = '320';
      frame.className = 'prize-animation';
      art.appendChild(frame);
    }
    dialog.showModal();
  };
})();
