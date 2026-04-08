import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Toolbar } from './Toolbar';
import styles from './Editor.module.css';
import { CheckIcon } from '../icons/icons';

export function Editor({ note, saveStatus, onTitleChange, onContentChange }) {
  const editorRef = useRef(null);

  useEffect(() => {
    if (editorRef.current && note && editorRef.current.innerHTML !== note.content) {
      editorRef.current.innerHTML = note.content || '';
    }
  }, [note?.id]);

  function handleInput() {
    if (editorRef.current) {
      onContentChange(editorRef.current.innerHTML);
    }
  }

  return (
    <>
      <div className={styles.editorTopbar}>
        <input
          className={styles.titleInput}
          value={note.title}
          onChange={(e) => onTitleChange(e.target.value)}
          placeholder="Название заметки"
          aria-label="Заголовок заметки"
        />
        <div
          className={saveStatus ? `${styles.saveStatus} ${styles.visible}` : styles.saveStatus}
          aria-live="polite"
        >
          <CheckIcon />
          Сохранено
        </div>
      </div>

      <Toolbar editorRef={editorRef} />

      <div className={styles.editorContent}>
        <div
          ref={editorRef}
          className={styles.richEditor}
          contentEditable
          suppressContentEditableWarning
          data-placeholder="Начните писать заметку…"
          onInput={handleInput}
          spellCheck
          aria-label="Тело заметки"
          aria-multiline="true"
        />
      </div>
    </>
  );
}

Editor.propTypes = {
  note: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
  }).isRequired,
  saveStatus: PropTypes.bool.isRequired,
  onTitleChange: PropTypes.func.isRequired,
  onContentChange: PropTypes.func.isRequired,
};
