import TodoList from '../components/TodoList';

const TodoPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <TodoList />
      </div>
    </div>
  );
};

export default TodoPage;