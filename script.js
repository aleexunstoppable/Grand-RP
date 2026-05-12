// Copy command text to clipboard
function copyCmd(button) {
  const text = button.previousElementSibling.innerText;
  navigator.clipboard.writeText(text).then(() => {
    const original = button.innerText;
    button.innerText = '✓ COPIED';
    button.classList.add('copied');
    setTimeout(() => {
      button.innerText = original;
      button.classList.remove('copied');
    }, 1400);
  }).catch(() => {
    button.innerText = 'ERROR';
    setTimeout(() => { button.innerText = 'COPY'; }, 1400);
  });
}

// ESC to go back
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') window.location.href = 'index.html';
});
