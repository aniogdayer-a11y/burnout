(() => {
  const trigger = document.querySelector('#fresh-start');
  const dialog = document.querySelector('#fresh-dialog');
  const messages = document.querySelector('#fresh-messages');
  const closeAll = document.querySelector('#fresh-close');
  const notes = [
    ['rest-reminder.exe', 'Beh, pahinga ka rin.', 'Hindi ka robot. Kahit phone ni-lo-lowbat, ikaw pa kaya? Recharge muna. Deserve mo ’yan.'],
    ['gentle-update.exe', 'Teh, hindi ka behind.', 'Iba-iba tayo ng timeline. Small steps count, kahit ikaw lang ang nakakapansin.'],
    ['proud-of-you.exe', 'Boi, ang layo mo na!', 'Dati iniisip mo kung kakayanin mo. Look at you now, still trying. Give yourself some credit.'],
    ['kindness-delivery.exe', 'Beh, one thing at a time.', 'Hindi kailangang ma-solve buong buhay tonight. Isang maliit na step bukas? Enough na muna.'],
    ['permission-to-rest.exe', 'Teh, worth it ka.', 'Kahit walang crossed-out task today, you still deserve care. Hindi grades o productivity ang value mo.'],
    ['tomorrow-loading.exe', 'Boi, fresh start tayo.', 'May room pa to learn, magkamali, at sumubok ulit. Rest tonight, then try at your own pace tomorrow.']
  ];
  let timers = [];

  function addNote([file, title, copy], index, still) {
    if (!dialog.open) return;
    const card = document.createElement('article');
    card.className = `motivation-window${still ? ' still' : ''}`;
    card.style.setProperty('--tilt', `${[-2, 1.5, -1, 1, -1.5, 2][index]}deg`);

    const bar = document.createElement('div');
    bar.className = 'window-bar';
    const label = document.createElement('span');
    label.textContent = `✿ ${file}`;
    const dismiss = document.createElement('button');
    dismiss.textContent = '×';
    dismiss.setAttribute('aria-label', `Dismiss: ${title}`);
    dismiss.addEventListener('click', () => { card.remove(); closeAll.focus({ preventScroll: true }); });
    bar.append(label, dismiss);

    const heading = document.createElement('h3');
    heading.textContent = title;
    const text = document.createElement('p');
    text.textContent = copy;

    card.append(bar, heading, text);
    messages.appendChild(card);
  }

  trigger.addEventListener('click', () => {
    if (dialog.open) return;
    timers.forEach(clearTimeout);
    timers = [];
    messages.replaceChildren();
    dialog.showModal();
    dialog.scrollTop = 0;

    const still = matchMedia('(prefers-reduced-motion: reduce)').matches || document.documentElement.classList.contains('motion-paused');
    notes.forEach((note, index) => {
      if (still || index === 0) addNote(note, index, still);
      else timers.push(setTimeout(() => addNote(note, index, still), index * 450));
    });
  });

  closeAll.addEventListener('click', () => dialog.close());
  dialog.addEventListener('close', () => {
    timers.forEach(clearTimeout);
    timers = [];
    messages.replaceChildren();
    trigger.focus({ preventScroll: true });
  });
})();
