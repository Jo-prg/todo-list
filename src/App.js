import './App.css';
import { useState } from 'react';
import TodoForm from './components/TodoForm';
import SearchList from './components/SearchList';

function App() {
  const [todos, setTodos] = useState([]);

  const addTodo = todo => {
    if (!todo.text || /^\s*$/.test(todo.text)) {
      return
    }

    const newTodos = [todo, ...todos]

    setTodos(newTodos);
  };

  // Handles click of sort button
  const [sort, setSort] = useState(false);
  const handleSortClick = () => {
    if ((todos.length) !== 0) {
      setSort(!sort);
    }
  };

  return (
    <div className="todo-app">
      {/* <TodoList /> */}
      <h1>What's the Plan for Today?</h1>
      <TodoForm
        onSubmit={addTodo}
        todos={todos}
      />
      <SearchList
        todos={todos}
        setTodos={setTodos}
        sort={sort}
        handleSortClick={handleSortClick}
      />
    </div>
  );
}

export default App;
