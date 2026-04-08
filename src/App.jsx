import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Sidebar } from './components/Sidebar';
import { Editor } from './components/Editor';
import { DeleteModal } from './components/DeleteModal';
import { useNotes } from './hooks/useNotes';
import styles from './App.module.css';
import { EmptyIcon } from './icons/icons';

export default function App() {
  const {
    notes,
    activeId,
    saveStatus,
    selectNote,
    addNote,
    updateTitle,
    updateContent,
    deleteNote,
  } = useNotes();

  const [deleteTarget, setDeleteTarget] = useState(null);

  const activeNote = notes.find((n) => n.id === activeId) ?? null;

  const handleDeleteRequest = useCallback((note) => {
    setDeleteTarget(note);
  }, []);

  const handleDeleteConfirm = useCallback(() => {
    if (deleteTarget) deleteNote(deleteTarget.id);
    setDeleteTarget(null);
  }, [deleteTarget, deleteNote]);

  const handleDeleteCancel = useCallback(() => {
    setDeleteTarget(null);
  }, []);

  return (
    <div className={styles.app}>
      <Sidebar
        notes={notes}
        activeId={activeId}
        onSelect={selectNote}
        onAdd={addNote}
        onDelete={handleDeleteRequest}
      />

      <main className={styles.editorArea}>
        {activeNote ? (
          <Editor
            note={activeNote}
            saveStatus={saveStatus}
            onTitleChange={updateTitle}
            onContentChange={updateContent}
          />
        ) : (
          <EmptyState onAdd={addNote} />
        )}
      </main>

      {deleteTarget && (
        <DeleteModal
          note={deleteTarget}
          onConfirm={handleDeleteConfirm}
          onCancel={handleDeleteCancel}
        />
      )}
    </div>
  );
}

function EmptyState({ onAdd }) {
  return (
    <div className={styles.emptyState}>
      <EmptyIcon />
      <p>Выберите заметку</p>
      <small>или <button className={styles.linkBtn} onClick={onAdd}>создайте новую</button></small>
    </div>
  );
}

EmptyState.propTypes = {
  onAdd: PropTypes.func.isRequired,
};
