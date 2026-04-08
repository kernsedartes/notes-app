import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { stripHtml, formatDate } from '../utils/helpers';
import styles from './Sidebar.module.css';
import { NoteIcon, PlusIcon, SearchIcon, TrashIcon } from '../icons/icons';

export function Sidebar({ notes, activeId, onSelect, onAdd, onDelete }) {
  const [search, setSearch] = useState('');

  const filtered = search
    ? notes.filter((n) => {
        const q = search.toLowerCase();
        return (
          n.title.toLowerCase().includes(q) ||
          stripHtml(n.content).toLowerCase().includes(q)
        );
      })
    : notes;

  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebarHeader}>
        <div className={styles.appTitle}>
          <NoteIcon />
          Заметки
        </div>
        <button className={styles.btnNew} onClick={onAdd}>
          <PlusIcon /> Новая
        </button>
      </div>

      <div className={styles.searchWrap}>
        <div className={styles.searchWrapInner}>
          <SearchIcon className={styles.searchIcon} />
          <input
            className={styles.searchInput}
            placeholder="Поиск заметок…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className={styles.notesCount}>
        {filtered.length} заметок
        {filtered.length !== notes.length ? ` из ${notes.length}` : ''}
      </div>

      <div className={styles.notesList}>
        {filtered.map((note) => (
          <NoteItem
            key={note.id}
            note={note}
            isActive={note.id === activeId}
            canDelete={notes.length > 1}
            onSelect={onSelect}
            onDelete={onDelete}
          />
        ))}
        {filtered.length === 0 && (
          <p className={styles.notesEmpty}>Ничего не найдено</p>
        )}
      </div>
    </aside>
  );
}

Sidebar.propTypes = {
  notes: PropTypes.array.isRequired,
  activeId: PropTypes.string,
  onSelect: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};


function NoteItem({ note, isActive, canDelete, onSelect, onDelete }) {
  const preview = stripHtml(note.content).trim() || 'Пустая заметка';

  return (
    <div className={isActive ? `${styles.noteItem} ${styles.active}` : styles.noteItem}>
      <button className={styles.noteItemBtn} onClick={() => onSelect(note.id)}>
        <span className={styles.noteItemTitle}>{note.title || 'Без названия'}</span>
        <span className={styles.noteItemPreview}>{preview}</span>
        <span className={styles.noteItemDate}>{formatDate(note.updatedAt)}</span>
      </button>

      {canDelete && (
        <button
          className={styles.noteDeleteBtn}
          title="Удалить заметку"
          onClick={() => onDelete(note)}
        >
          <TrashIcon />
        </button>
      )}
    </div>
  );
}

NoteItem.propTypes = {
  note: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    updatedAt: PropTypes.number.isRequired,
  }).isRequired,
  isActive: PropTypes.bool.isRequired,
  canDelete: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};
