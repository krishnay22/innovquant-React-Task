import PropTypes from 'prop-types';

const Child = ({ message }) => {
  const characterCount = message.length;

  return (
    <div className="space-y-3">
      {message ? (
        <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-xl">
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0">
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-emerald-800 font-medium mb-1">Message Received:</p>
              <p className="text-emerald-700 text-sm mb-2">"{message}"</p>
              <p className="text-emerald-600 text-xs">
                Length: {characterCount} character{characterCount !== 1 ? 's' : ''}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl text-center">
          <div className="w-12 h-12 mx-auto mb-3 bg-slate-200 rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
          <p className="text-slate-500 text-sm font-medium">Waiting for message...</p>
          <p className="text-slate-400 text-xs mt-1">Type a message in the parent component</p>
        </div>
      )}
    </div>
  );
};

Child.propTypes = {
  message: PropTypes.string.isRequired
};

export default Child;