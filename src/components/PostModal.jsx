import { useState, useEffect } from "react";
import PropTypes from "prop-types";

const PostModal = ({
  post,
  isOpen,
  onClose,
  onNoteAdd,
  onNoteEdit,
  onNoteDelete,
}) => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  useEffect(() => {
    if (post) {
      const allNotes = JSON.parse(localStorage.getItem("postNotes") || "{}");
      const postNotes = allNotes[post.id] || [];
      // Handle both old format (string) and new format (array)
      if (Array.isArray(postNotes)) {
        setNotes(postNotes);
      } else if (typeof postNotes === "string" && postNotes.trim()) {
        // Convert old string format to new array format
        setNotes([
          {
            id: Date.now(),
            text: postNotes,
            createdAt: new Date().toISOString(),
          },
        ]);
      } else {
        setNotes([]);
      }
    }
  }, [post]);

  const handleAddNote = () => {
    if (newNote.trim()) {
      const noteObj = {
        id: Date.now(),
        text: newNote.trim(),
        createdAt: new Date().toISOString(),
      };
      const updatedNotes = [...notes, noteObj];
      setNotes(updatedNotes);
      onNoteAdd(post.id, updatedNotes);
      setNewNote("");
    }
  };

  const handleEditNote = (noteId) => {
    const note = notes.find((n) => n.id === noteId);
    setEditingId(noteId);
    setEditText(note.text);
  };

  const handleUpdateNote = () => {
    const updatedNotes = notes.map((note) =>
      note.id === editingId ? { ...note, text: editText.trim() } : note
    );
    setNotes(updatedNotes);
    onNoteEdit(post.id, updatedNotes);
    setEditingId(null);
    setEditText("");
  };

  const handleDeleteNote = (noteId) => {
    const updatedNotes = notes.filter((note) => note.id !== noteId);
    setNotes(updatedNotes);
    onNoteDelete(post.id, updatedNotes);
  };

  if (!isOpen || !post) return null;

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-8 max-w-3xl w-full max-h-[85vh] overflow-y-auto shadow-2xl border border-white/20">
        <div className="flex justify-between items-start mb-6">
          <h2 className="text-2xl font-semibold text-gray-900 capitalize leading-tight">
            {post.title}
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
          >
            <svg
              className="w-4 h-4 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <p className="text-gray-600 mb-8 leading-relaxed">{post.body}</p>

        <div className="border-t border-gray-100 pt-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-900">Notes</h3>
            <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-sm font-medium">
              {notes.length} {notes.length === 1 ? "note" : "notes"}
            </span>
          </div>

          <div className="mb-6">
            <textarea
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              placeholder="What's on your mind?"
              className="w-full p-4 border border-gray-200 rounded-2xl resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              rows="3"
            />
            <button
              onClick={handleAddNote}
              className="mt-3 bg-blue-500 text-white px-6 py-2.5 rounded-full hover:bg-blue-600 transition-colors font-medium"
            >
              Add Note
            </button>
          </div>

          <div className="space-y-4">
            {notes.map((note) => (
              <div
                key={note.id}
                className="bg-gray-50/50 backdrop-blur-sm p-4 rounded-2xl border border-gray-100"
              >
                {editingId === note.id ? (
                  <div>
                    <textarea
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      className="w-full p-3 border border-gray-200 rounded-xl resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      rows="3"
                    />
                    <div className="flex gap-3 mt-3">
                      <button
                        onClick={handleUpdateNote}
                        className="bg-green-500 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-green-600 transition-colors"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        className="bg-gray-400 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-500 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <p className="text-gray-800 mb-3 leading-relaxed">
                      {note.text}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-500 font-medium">
                        {new Date(note.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                      <div className="flex gap-3">
                        <button
                          onClick={() => handleEditNote(note.id)}
                          className="text-blue-500 text-sm font-medium hover:text-blue-600 transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteNote(note.id)}
                          className="text-red-500 text-sm font-medium hover:text-red-600 transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
            {notes.length === 0 && (
              <div className="text-center py-12">
                <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                </div>
                <p className="text-gray-500 font-medium">No notes yet</p>
                <p className="text-gray-400 text-sm mt-1">
                  Add your first note above to get started
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

PostModal.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    userId: PropTypes.number.isRequired,
  }),
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onNoteAdd: PropTypes.func.isRequired,
  onNoteEdit: PropTypes.func.isRequired,
  onNoteDelete: PropTypes.func.isRequired,
};

export default PostModal;
