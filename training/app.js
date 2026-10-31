const form = document.getElementById('application-form');
const button = form.querySelector('button[type="submit"]');
let prepared = false;
form.addEventListener('input', () => { prepared = false; button.textContent = 'Записаться на тренинг ↗'; });
form.addEventListener('submit', async (event) => {
  event.preventDefault();
  if (!form.reportValidity()) return;
  const data = new FormData(form);
  const name = data.get('name').trim();
  const contact = data.get('contact').trim();
  const status = document.getElementById('form-status');
  if (!name || !contact) { status.textContent = 'Укажите имя и контакт для связи.'; return; }
  const field = document.getElementById('request-text');
  if (prepared) {
    const telegram = window.open('https://t.me/parkinapsy', '_blank', 'noopener');
    try { await navigator.clipboard.writeText(field.value); status.textContent = 'Заявка скопирована. Вставьте её в переписку с Ольгой и отправьте. Если Telegram не открылся, адрес: t.me/parkinapsy'; }
    catch { field.focus(); field.select(); status.textContent = 'Скопируйте выделенный текст вручную и отправьте Ольге: t.me/parkinapsy'; }
    return;
  }
  field.value = 'Здравствуйте! Хочу записаться на тренинг «Новая ветка реальности» Центра самопознания «Жизнь» 21–22 ноября.\nИмя: ' + name + '\nКонтакт: ' + contact + '\nФормат: ' + data.get('format') + '\n' + data.get('message').trim();
  document.getElementById('prepared').hidden = false;
  prepared = true;
  button.textContent = 'Скопировать и перейти к записи в Telegram ↗';
  status.textContent = 'Проверьте заявку ниже. Нажмите эту же кнопку, чтобы скопировать текст и открыть Telegram. Заявка ещё не отправлена.';
});
