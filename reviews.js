document.querySelectorAll('[data-reveal]').forEach(button => {
  button.addEventListener('click', () => {
    const selector = '[data-more-' + button.dataset.reveal + ']';
    const remaining = Array.from(document.querySelectorAll(selector)).filter(card => card.hidden);
    remaining.slice(0, 2).forEach(card => { card.hidden = false; });
    const hasMore = remaining.length > 2;
    button.setAttribute('aria-expanded', 'true');
    button.hidden = !hasMore;
  });
});