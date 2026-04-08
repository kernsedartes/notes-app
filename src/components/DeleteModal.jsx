import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styles from './DeleteModal.module.css';

export function DeleteModal({ note, onConfirm, onCancel }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    dialog.showModal();
    return () => { if (dialog.open) dialog.close(); };
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    dialog.addEventListener('cancel', onCancel);
    return () => dialog.removeEventListener('cancel', onCancel);
  }, [onCancel]);

  function handleDialogClick(e) {
    if (e.target === dialogRef.current) onCancel();
  }

  return (
    <dialog
      ref={dialogRef}
      className={styles.modal}
      aria-labelledby="modal-title"
      onClick={handleDialogClick}
    >
      <h3 id="modal-title">Удалить заметку?</h3>
      <p>
        «{note.title || 'Без названия'}» будет удалена навсегда.
        Это действие нельзя отменить.
      </p>
      <div className={styles.modalActions}>
        <button className={styles.btnCancel} onClick={onCancel}>Отмена</button>
        <button className={styles.btnDanger} onClick={onConfirm} autoFocus>
          Удалить
        </button>
      </div>
    </dialog>
  );
}

DeleteModal.propTypes = {
  note: PropTypes.shape({
    title: PropTypes.string,
  }).isRequired,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};
