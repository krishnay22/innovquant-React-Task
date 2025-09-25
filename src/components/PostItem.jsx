import { useState, useEffect } from "react";
import PropTypes from "prop-types";

const PostItem = ({ post, onPostClick }) => {
  const [noteCount, setNoteCount] = useState(0);
  const [recentNote, setRecentNote] = useState("");

  useEffect(() => {
    const notes = JSON.parse(localStorage.getItem("postNotes") || "{}");
    const postNotes = notes[post.id] || [];

    if (Array.isArray(postNotes)) {
      setNoteCount(postNotes.length);
      if (postNotes.length > 0) {
        const latest = postNotes[postNotes.length - 1];
        setRecentNote(latest.text);
      }
    } else if (postNotes) {
      setNoteCount(1);
      setRecentNote(postNotes);
    } else {
      setNoteCount(0);
      setRecentNote("");
    }
  }, [post.id]);

  return (
    <div
      onClick={() => onPostClick(post)}
      className="group bg-white rounded-2xl p-6 border border-gray-100 hover:border-gray-200 hover:shadow-xl transition-all duration-300 cursor-pointer backdrop-blur-sm"
    >
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 capitalize leading-tight group-hover:text-blue-600 transition-colors">
          {post.title.length > 15
            ? `${post.title.slice(0, 15)}...`
            : post.title}{" "}
        </h3>
        <div className="flex items-center space-x-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onPostClick(post);
            }}
            className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-medium hover:bg-blue-600 transition-colors"
          >
            Add Notes
          </button>
        </div>
      </div>

      <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
        {post.body}
      </p>

      {recentNote && (
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-3 mb-4">
          <div className="flex items-start space-x-2">
            <svg
              className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
            <div>
              <p className="text-xs text-blue-600 font-semibold mb-1">
                Recent Note:
              </p>
              <p className="text-xs text-blue-800 font-medium">
                {recentNote.length > 50
                  ? `${recentNote.substring(0, 50)}...`
                  : recentNote}
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between pt-2 border-t border-gray-50">
        {noteCount > 0 && (
          <div className="flex items-center space-x-1 bg-blue-50 text-blue-600 px-2 py-1 rounded-full text-xs font-medium">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
            </svg>
            <span>Total Notes: {noteCount}</span>
          </div>
        )}
        <div className="flex items-center space-x-1 text-blue-500">
          <span className="text-xs font-medium">View Details</span>
          <svg
            className="w-3 h-3 group-hover:translate-x-0.5 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

PostItem.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    userId: PropTypes.number.isRequired,
  }).isRequired,
  onPostClick: PropTypes.func.isRequired,
};

export default PostItem;
