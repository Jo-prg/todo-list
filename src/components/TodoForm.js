import { useState, useEffect, useRef } from 'react';

function TodoForm(props) {
  const [input, setInput] = useState(props.edit ? props.edit.value : '');
  const [category, setCategory] = useState();

  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
    console.log(props.categories);
  });

  const handleChange = e => {
    setInput(e.target.value);
    setCategory({ category: e.target.value });
  }

  const handleSubmit = e => {
    e.preventDefault();
    const newDate = new Date();

    props.onSubmit({
      id: Math.floor(Math.random() * 10000),
      text: input,
      time: newDate,
      category: category
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
          <select name="category-submit" className="category-submit" value={category} onChange={e => setCategory(e.target.value)} required>
            {props.categories.map((cat) => (
              <option value={cat.name}>{cat.name}</option>
            ))}
          </select>
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
            <select name="category-submit" className="category-submit" value={category} onChange={e => setCategory(e.target.value)} required>
              {props.categories.map((cat) => (
                <option value={cat.name}>{cat.name}</option>
              ))}
            </select>
            <button className="todo-button">Add Todo</button>
          </>
        )}

    </form>
  );
}

export default TodoForm;
