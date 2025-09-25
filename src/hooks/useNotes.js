import { useState, useEffect } from 'react';

const useNotes = () => {
  const [notes, setNotes] = useState({});

  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem('postNotes') || '{}');
    setNotes(savedNotes);
  }, []);

  const addNote = (postId, notesArray) => {
    const updatedNotes = { ...notes, [postId]: notesArray };
    setNotes(updatedNotes);
    localStorage.setItem('postNotes', JSON.stringify(updatedNotes));
  };

  const editNote = (postId, notesArray) => {
    const updatedNotes = { ...notes, [postId]: notesArray };
    setNotes(updatedNotes);
    localStorage.setItem('postNotes', JSON.stringify(updatedNotes));
  };

  const deleteNote = (postId, notesArray) => {
    if (notesArray.length === 0) {
      const updatedNotes = { ...notes };
      delete updatedNotes[postId];
      setNotes(updatedNotes);
      localStorage.setItem('postNotes', JSON.stringify(updatedNotes));
    } else {
      const updatedNotes = { ...notes, [postId]: notesArray };
      setNotes(updatedNotes);
      localStorage.setItem('postNotes', JSON.stringify(updatedNotes));
    }
  };

  const clearAllNotes = () => {
    setNotes({});
    localStorage.removeItem('postNotes');
  };

  return { notes, addNote, editNote, deleteNote, clearAllNotes };
};

export default useNotes;