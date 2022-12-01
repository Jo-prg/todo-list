import Todo from './Todo';

const TodoList = ({ todos, setTodos }) => {

  const updatedTodo = (todoId, newValue) => {
    if (!newValue.text || /^\s*$/.test(newValue.text)) {
      return;
    };

    setTodos(prev => prev.map(item => (item.id === todoId ? newValue : item))
    );
  };

  const removeTodo = id => {
    const removeArr = [...todos].filter(todo => todo.id !== id);

    setTodos(removeArr);
  };

  const completeTodo = id => {
    const updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        todo.isComplete = !todo.isComplete
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  return todos.map((todo) => (
    <div className={todo.isComplete ? 'todo-row complete' : 'todo-row'}
      key={todo.id}>
      <Todo
        todo={todo}
        completeTodo={completeTodo}
        removeTodo={removeTodo}
        updateTodo={updatedTodo}
      />
    </div>
  ))
}

export default TodoList;
