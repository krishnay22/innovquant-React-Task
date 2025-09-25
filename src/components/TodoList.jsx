import { useState, useEffect } from 'react';

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('todoTasks') || '[]');
    setTasks(savedTasks);
  }, []);

  const saveTasks = (updatedTasks) => {
    setTasks(updatedTasks);
    localStorage.setItem('todoTasks', JSON.stringify(updatedTasks));
  };

  const addTask = () => {
    if (newTask.trim()) {
      const task = {
        id: Date.now(),
        text: newTask.trim(),
        completed: false
      };
      saveTasks([...tasks, task]);
      setNewTask('');
    }
  };

  const deleteTask = (id) => {
    saveTasks(tasks.filter(task => task.id !== id));
  };

  const toggleComplete = (id) => {
    saveTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const startEdit = (id, text) => {
    setEditingId(id);
    setEditText(text);
  };

  const saveEdit = () => {
    saveTasks(tasks.map(task => 
      task.id === editingId ? { ...task, text: editText } : task
    ));
    setEditingId(null);
    setEditText('');
  };

  const clearAll = () => {
    setTasks([]);
    localStorage.removeItem('todoTasks');
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.completed;
    if (filter === 'pending') return !task.completed;
    return true;
  });

  return (
    <div className="bg-white/70 backdrop-blur-sm p-8 rounded-2xl border border-slate-200 shadow-sm">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-slate-800 mb-2">Todo List</h2>
        <p className="text-slate-500 text-sm">Manage your daily tasks efficiently</p>
      </div>
      
      <div className="flex mb-6">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="What needs to be done?"
          className="flex-1 p-3 border border-slate-200 rounded-l-xl focus:ring-2 focus:ring-slate-400 focus:border-transparent transition-all"
          onKeyPress={(e) => e.key === 'Enter' && addTask()}
        />
        <button
          onClick={addTask}
          className="bg-slate-600 text-white px-6 py-3 rounded-r-xl hover:bg-slate-700 transition-colors font-medium"
        >
          Add Task
        </button>
      </div>

      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${filter === 'all' ? 'bg-slate-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
        >
          All ({tasks.length})
        </button>
        <button
          onClick={() => setFilter('pending')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${filter === 'pending' ? 'bg-slate-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
        >
          Pending ({tasks.filter(t => !t.completed).length})
        </button>
        <button
          onClick={() => setFilter('completed')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${filter === 'completed' ? 'bg-slate-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
        >
          Completed ({tasks.filter(t => t.completed).length})
        </button>
        <button
          onClick={clearAll}
          className="bg-rose-500 text-white px-4 py-2 rounded-full text-sm hover:bg-rose-600 ml-auto font-medium transition-colors"
        >
          Clear All
        </button>
      </div>

      <div className="space-y-3">
        {filteredTasks.map(task => (
          <div key={task.id} className="flex items-center gap-3 p-4 bg-slate-50/50 border border-slate-100 rounded-xl hover:bg-slate-50 transition-colors">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleComplete(task.id)}
              className="w-5 h-5 text-slate-600 rounded focus:ring-slate-400"
            />
            
            {editingId === task.id ? (
              <div className="flex-1 flex gap-2">
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  className="flex-1 p-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-slate-400 focus:border-transparent"
                />
                <button onClick={saveEdit} className="bg-emerald-500 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-emerald-600 transition-colors">
                  Save
                </button>
                <button onClick={() => setEditingId(null)} className="bg-slate-400 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-slate-500 transition-colors">
                  Cancel
                </button>
              </div>
            ) : (
              <>
                <span className={`flex-1 font-medium ${task.completed ? 'line-through text-slate-400' : 'text-slate-700'}`}>
                  {task.text}
                </span>
                <button
                  onClick={() => startEdit(task.id, task.text)}
                  className="bg-amber-500 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-amber-600 transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="bg-rose-500 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-rose-600 transition-colors"
                >
                  Delete
                </button>
              </>
            )}
          </div>
        ))}
        
        {filteredTasks.length === 0 && (
          <div className="text-center py-8">
            <div className="w-16 h-16 mx-auto mb-4 bg-slate-100 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-slate-500 font-medium">No tasks {filter !== 'all' ? `(${filter})` : ''} found</p>
            <p className="text-slate-400 text-sm mt-1">Add a new task to get started</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TodoList;