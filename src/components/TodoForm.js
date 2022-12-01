import { useState, useEffect, useRef } from 'react';

function TodoForm(props) {
  const [input, setInput] = useState(props.edit ? props.edit.value : '');

  const minTwoDigits = (n) => {
    return (n < 10 ? '0' : '') + n;
  }

  const getCurrentTime = (separator = ':') => {

    let newDate = new Date()
    let hours = newDate.getHours();
    let minutes = newDate.getMinutes();
    let seconds = newDate.getSeconds();
    // let milliseconds = newDate.getTime();

    return `${hours}${separator}${minTwoDigits(minutes)}${separator}${minTwoDigits(seconds)}`;
  }

  const inputRef = useRef(null)

  useEffect(() => {
    inputRef.current.focus();
  });

  const handleChange = e => {
    setInput(e.target.value);
  }

  const handleSubmit = e => {
    e.preventDefault();

    props.onSubmit({
      id: Math.floor(Math.random() * 10000),
      text: input,
      time: getCurrentTime()
    });

    setInput('');
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      {props.edit ? (
        <>
          <input
            type="text"
            placeholder="Update your item"
            value={input}
            name="text"
            className="todo-input"
            onChange={handleChange}
            ref={inputRef}
          />
          <button className="todo-button edit">Update</button>
        </>
      ) :

        (
          <>
            <input
              type="text"
              placeholder="Add a todo"
              value={input}
              name="text"
              className="todo-input"
              onChange={handleChange}
              ref={inputRef}
            />
            <button className="todo-button">Add Todo</button>
          </>
        )}

    </form>
  );
}

export default TodoForm;
