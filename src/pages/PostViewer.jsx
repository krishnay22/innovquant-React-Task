import { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar";
import PostList from "../components/PostList";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";
import useNotes from "../hooks/useNotes";

const PostViewer = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 9;
  const { addNote, editNote, deleteNote, clearAllNotes } = useNotes();

  const fetchPosts = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts"
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setPosts(data);
      setFilteredPosts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    const filtered = posts.filter((post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPosts(filtered);
    setCurrentPage(1);
  }, [searchTerm, posts]);

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const currentPosts = filteredPosts.slice(
    startIndex,
    startIndex + postsPerPage
  );

  const handleSearchChange = (term) => {
    setSearchTerm(term);
  };

  const handleRetry = () => {
    fetchPosts();
  };

  const handleClearAllNotes = () => {
    clearAllNotes();
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gray-50 relative">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <SearchBar
            searchTerm={searchTerm}
            onSearchChange={handleSearchChange}
          />
          <button
            onClick={handleClearAllNotes}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 text-sm"
          >
            Clear All Notes
          </button>
        </div>

        {error && <ErrorMessage message={error} onRetry={handleRetry} />}

        {loading && !error ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <LoadingSpinner />
          </div>
        ) : (
          <>
            <div className="mb-4 text-gray-600">
              Showing {startIndex + 1}-
              {Math.min(startIndex + postsPerPage, filteredPosts.length)} of{" "}
              {filteredPosts.length} posts
            </div>

            <PostList
              posts={currentPosts}
              onNoteAdd={addNote}
              onNoteEdit={editNote}
              onNoteDelete={deleteNote}
            />

            {filteredPosts.length === 0 && searchTerm && (
              <div className="text-center py-12 text-gray-500">
                No posts found matching "{searchTerm}"
              </div>
            )}

            {totalPages > 1 && (
              <div className="flex flex-wrap justify-center items-center gap-1 sm:gap-2 mt-8">
                {/* First Page */}
                <button
                  onClick={() => setCurrentPage(1)}
                  disabled={currentPage === 1}
                  className="px-2 sm:px-3 py-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
                  title="First page"
                >
                  &laquo;
                </button>

                {/* Previous Page */}
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  className="px-2 sm:px-3 py-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
                  title="Previous page"
                >
                  &lsaquo;
                </button>

                {/* Page Numbers */}
                {(() => {
                  const pages = [];
                  const showPages = 3; // Show 3 pages on mobile, more on desktop
                  let startPage = Math.max(
                    1,
                    currentPage - Math.floor(showPages / 2)
                  );
                  let endPage = Math.min(totalPages, startPage + showPages - 1);

                  if (endPage - startPage < showPages - 1) {
                    startPage = Math.max(1, endPage - showPages + 1);
                  }

                  // Show first page if not in range
                  if (startPage > 1) {
                    pages.push(
                      <button
                        key={1}
                        onClick={() => setCurrentPage(1)}
                        className="px-2 sm:px-3 py-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 text-sm font-medium"
                      >
                        1
                      </button>
                    );
                    if (startPage > 2) {
                      pages.push(
                        <span
                          key="dots1"
                          className="px-1 text-gray-400 text-sm"
                        >
                          ...
                        </span>
                      );
                    }
                  }

                  // Show page range
                  for (let i = startPage; i <= endPage; i++) {
                    pages.push(
                      <button
                        key={i}
                        onClick={() => setCurrentPage(i)}
                        className={`px-2 sm:px-3 py-2 rounded-lg text-sm font-medium ${
                          currentPage === i
                            ? "bg-blue-500 text-white shadow-sm"
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                      >
                        {i}
                      </button>
                    );
                  }

                  // Show last page if not in range
                  if (endPage < totalPages) {
                    if (endPage < totalPages - 1) {
                      pages.push(
                        <span
                          key="dots2"
                          className="px-1 text-gray-400 text-sm"
                        >
                          ...
                        </span>
                      );
                    }
                    pages.push(
                      <button
                        key={totalPages}
                        onClick={() => setCurrentPage(totalPages)}
                        className="px-2 sm:px-3 py-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 text-sm font-medium"
                      >
                        {totalPages}
                      </button>
                    );
                  }

                  return pages;
                })()}

                {/* Next Page */}
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className="px-2 sm:px-3 py-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
                  title="Next page"
                >
                  &rsaquo;
                </button>

                {/* Last Page */}
                <button
                  onClick={() => setCurrentPage(totalPages)}
                  disabled={currentPage === totalPages}
                  className="px-2 sm:px-3 py-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
                  title="Last page"
                >
                  &raquo;
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default PostViewer;
