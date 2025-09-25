import { useState } from 'react';
import PropTypes from 'prop-types';
import Child from './Child';

const Parent = () => {
  const [message, setMessage] = useState('');
  const [displayMessage, setDisplayMessage] = useState('');

  const handleUpdateMessage = () => {
    setDisplayMessage(message);
  };

  return (
    <div className="bg-white/70 backdrop-blur-sm p-8 rounded-2xl border border-slate-200 shadow-sm">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-slate-800 mb-2">Parent-Child Communication</h2>
        <p className="text-slate-500 text-sm">Demonstrate data flow between React components</p>
      </div>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Parent Message</label>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message here..."
            className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-400 focus:border-transparent transition-all"
          />
        </div>
        
        <button
          onClick={handleUpdateMessage}
          className="bg-slate-600 text-white px-6 py-3 rounded-xl hover:bg-slate-700 transition-colors font-medium"
        >
          Send to Child
        </button>
        
        <div className="mt-6 p-4 bg-slate-50 rounded-xl border border-slate-100">
          <h3 className="text-sm font-medium text-slate-700 mb-2">Child Component Output:</h3>
          <Child message={displayMessage} />
        </div>
      </div>
    </div>
  );
};

export default Parent;