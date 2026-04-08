export function generateId() {
  return 'note-' + Date.now() + '-' + Math.random().toString(36).slice(2, 7);
}

export function stripHtml(html) {
  const div = document.createElement('div');
  div.innerHTML = html;
  return div.textContent || div.innerText || '';
}

export function formatDate(timestamp) {
  const date = new Date(timestamp);
  const now = new Date();
  const diffSeconds = (now - date) / 1000;

  if (diffSeconds < 60) return 'только что';
  if (diffSeconds < 3600) return `${Math.floor(diffSeconds / 60)} мин. назад`;
  if (diffSeconds < 86400 && date.getDate() === now.getDate()) {
    return date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
  }
  return date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' });
}

export function createNote(overrides = {}) {
  return {
    id: generateId(),
    title: 'Новая заметка',
    content: '<p></p>',
    createdAt: Date.now(),
    updatedAt: Date.now(),
    ...overrides,
  };
}

export const DEFAULT_NOTE = createNote({
  id: 'note-welcome',
  title: 'Добро пожаловать в Заметки!',
  content:
    '<p>Это ваша первая заметка. <strong>Вы можете редактировать её</strong> прямо сейчас.</p>' +
    '<p>Используйте панель инструментов выше, чтобы форматировать текст: ' +
    'делать его <em>курсивным</em>, <strong>жирным</strong> или <u>подчёркнутым</u>.</p>' +
    '<p>Создавайте новые заметки кнопкой <strong>+ Новая</strong> в левом меню.</p>',
});
