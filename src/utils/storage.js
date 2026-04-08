const STORAGE_KEY = 'notesapp-notes';

export function loadNotes() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (err) {
    console.error('[storage] Failed to load notes:', err);
    return null;
  }
}

export function saveNotes(notes) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
  } catch (err) {
    console.error('[storage] Failed to save notes:', err);
  }
}
