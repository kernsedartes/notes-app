import { useState, useEffect, useCallback, useRef } from 'react';
import { loadNotes, saveNotes } from '../utils/storage';
import { createNote, DEFAULT_NOTE } from '../utils/helpers';

const AUTOSAVE_DELAY_MS = 500;

export function useNotes() {
  const [notes, setNotes] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const [saveStatus, setSaveStatus] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const saveTimer = useRef(null);
  const statusTimer = useRef(null);

  useEffect(() => {
    const stored = loadNotes();
    if (stored && stored.length > 0) {
      setNotes(stored);
      setActiveId(stored[0].id);
    } else {
      setNotes([DEFAULT_NOTE]);
      setActiveId(DEFAULT_NOTE.id);
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;

    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => {
      saveNotes(notes);
      setSaveStatus(true);
      if (statusTimer.current) clearTimeout(statusTimer.current);
      statusTimer.current = setTimeout(() => setSaveStatus(false), 1800);
    }, AUTOSAVE_DELAY_MS);

    return () => {
      clearTimeout(saveTimer.current);
      clearTimeout(statusTimer.current);
    };
  }, [notes, loaded]);

  const selectNote = useCallback((id) => {
    setActiveId(id);
  }, []);

  const addNote = useCallback(() => {
    const note = createNote();
    setNotes((prev) => [note, ...prev]);
    setActiveId(note.id);
    return note.id;
  }, []);

  const updateTitle = useCallback((title) => {
    setNotes((prev) =>
      prev.map((n) =>
        n.id === activeId ? { ...n, title, updatedAt: Date.now() } : n
      )
    );
  }, [activeId]);

  const updateContent = useCallback((content) => {
    setNotes((prev) =>
      prev.map((n) =>
        n.id === activeId ? { ...n, content, updatedAt: Date.now() } : n
      )
    );
  }, [activeId]);

  const deleteNote = useCallback((id) => {
    setNotes((prev) => {
      const next = prev.filter((n) => n.id !== id);
      if (activeId === id) {
        setActiveId(next.length > 0 ? next[0].id : null);
      }
      return next;
    });
  }, [activeId]);

  return {
    notes,
    activeId,
    saveStatus,
    selectNote,
    addNote,
    updateTitle,
    updateContent,
    deleteNote,
  };
}
