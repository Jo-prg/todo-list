import { useState } from 'react';
import TodoForm from './TodoForm';
import { RiCloseCircleLine } from 'react-icons/ri'
import { TiEdit } from 'react-icons/ti'

function Todo({ todo, completeTodo, removeTodo, updateTodo }) {
  const [edit, setEdit] = useState({
    id: null,
    value: ''
  })

  const minTwoDigits = (n) => {
    return (n < 10 ? '0' : '') + n;
  }

  const convertHours = (date, separator = ':') => {

    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();

    return `${hours}${separator}${minTwoDigits(minutes)}${separator}${minTwoDigits(seconds)}`;
  }

  const submitUpdate = value => {
    updateTodo(edit.id, value);
    setEdit({
      id: null,
      value: ''
    });
  };

  if (edit.id) {
    return <TodoForm edit={edit} onSubmit={submitUpdate} />
  }
  return (
    <>
      <div className="todo-info" onClick={() => completeTodo(todo.id)}>
        <div>{todo.text}</div>
        <div>{todo.category}</div>
        <div>{convertHours(todo.time)}</div>
      </div>

      <div className="icons">
        <RiCloseCircleLine
          onClick={() => removeTodo(todo.id)}
          className='delete-icon'
        />
        <TiEdit
          onClick={() => setEdit({ id: todo.id, value: todo.text })}
          className='edit-icon'
        />
      </div>
    </>

  )
}

export default Todo;
