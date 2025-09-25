import { useState } from 'react';
import PropTypes from 'prop-types';
import PostItem from './PostItem';
import PostModal from './PostModal';

const PostList = ({ posts, onNoteAdd, onNoteEdit, onNoteDelete }) => {
  const [selectedPost, setSelectedPost] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const handlePostClick = (post) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPost(null);
    setRefreshKey(prev => prev + 1);
  };

  const handleNoteAdd = (postId, notesArray) => {
    onNoteAdd(postId, notesArray);
    setRefreshKey(prev => prev + 1);
  };

  const handleNoteEdit = (postId, notesArray) => {
    onNoteEdit(postId, notesArray);
    setRefreshKey(prev => prev + 1);
  };

  const handleNoteDelete = (postId, notesArray) => {
    onNoteDelete(postId, notesArray);
    setRefreshKey(prev => prev + 1);
  };
  if (posts.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No posts found</h3>
          <p className="text-gray-500">Posts will appear here when available</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {posts.map(post => (
            <PostItem 
              key={`${post.id}-${refreshKey}`}
              post={post} 
              onPostClick={handlePostClick}
            />
          ))}
        </div>
      </div>
      
      <PostModal
        post={selectedPost}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onNoteAdd={handleNoteAdd}
        onNoteEdit={handleNoteEdit}
        onNoteDelete={handleNoteDelete}
      />
    </>
  );
};

PostList.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    userId: PropTypes.number.isRequired
  })).isRequired,
  onNoteAdd: PropTypes.func.isRequired,
  onNoteEdit: PropTypes.func.isRequired,
  onNoteDelete: PropTypes.func.isRequired
};

export default PostList;