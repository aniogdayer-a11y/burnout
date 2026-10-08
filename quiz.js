const questions = [
  { question: 'You’re feeling overwhelmed because you have too many school activities. What should you do?', answers: ['Take a short break and organize your priorities.', 'Force yourself to finish everything without resting.', 'Ignore your feelings and keep stressing yourself.'], correct: 0 },
  { question: 'You studied all night and now you’re mentally exhausted. What’s the best choice?', answers: ['Continue studying without sleeping.', 'Get enough sleep and allow yourself to recover.', 'Drink coffee and ignore your exhaustion.'], correct: 1 },
  { question: 'You made a mistake in an important activity. How should you respond?', answers: ['Blame yourself for everything.', 'Give up because you failed once.', 'Learn from your mistake and try again.'], correct: 2 },
  { question: 'Your friend notices you’re stressed and offers to listen. What should you do?', answers: ['Talk to someone you trust about how you feel.', 'Pretend everything is okay even when you’re struggling.', 'Avoid everyone because you’re overwhelmed.'], correct: 0 },
  { question: 'You’ve been working hard for several days. How can you avoid burnout?', answers: ['Ignore your physical and emotional needs.', 'Set healthy boundaries and make time for rest.', 'Keep working until you cannot continue anymore.'], correct: 1 }
];
let current = 0;
let answered = false;
const next = document.querySelector('#next');
const feedback = document.querySelector('#feedback');
const closing = document.querySelector('#closing');
function showQuestion(focus = false) {
  answered = false;
  const item = questions[current];
  document.querySelector('#question-count').textContent = `Question ${current + 1} of 5`;
  document.querySelector('#quiz-progress').value = current;
  document.querySelector('#question').textContent = item.question;
  document.querySelector('#answers').replaceChildren(...item.answers.map((answer, index) => {
    const button = document.createElement('button');
    button.className = 'answer';
    button.innerHTML = `<span class="answer-letter" aria-hidden="true">${'ABC'[index]}</span><span>${answer}</span>`;
    button.addEventListener('click', () => selectAnswer(index, button));
    return button;
  }));
  feedback.textContent = '';
  feedback.className = 'feedback';
  next.disabled = true;
  next.textContent = current === 4 ? 'Finish my reset' : 'Next question →';
  if (focus) document.querySelector('#question').focus({ preventScroll: true });
}
function selectAnswer(index, button) {
  if (answered) return;
  document.querySelectorAll('.answer').forEach(answer => answer.classList.remove('incorrect'));
  if (index !== questions[current].correct) {
    button.classList.add('incorrect');
    feedback.className = 'feedback retry';
    feedback.textContent = 'It’s okay, try again. Think about what gives you care, rest, or support.';
    window.showBonkReaction(button);
    return;
  }
  answered = true;
  button.classList.add('correct');
  feedback.className = 'feedback';
  feedback.textContent = 'You did well! Choosing kindness for yourself is a lovely place to start.';
  document.querySelector('#quiz-progress').value = current + 1;
  document.querySelectorAll('.answer').forEach(answer => { answer.disabled = true; });
  next.disabled = false;
  window.showPrizeReaction();
}
next.addEventListener('click', () => {
  if (!answered) return;
  if (current < questions.length - 1) { current++; showQuestion(true); }
  else {
    closing.hidden = false;
    next.disabled = true;
    next.textContent = 'Reset complete';
    closing.scrollIntoView({ behavior: reducedMotion.matches ? 'instant' : 'smooth' });
    document.querySelector('#closing-title').focus({ preventScroll: true });
  }
});
showQuestion();
