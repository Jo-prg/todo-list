import { useEffect, useState, useRef } from 'react';
import SearchFilter from 'react-filter-search';
import Todo from './Todo';

// bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import { InputGroup, FormControl } from 'react-bootstrap'

const SearchList = ({ todos, setTodos, sort, handleSortClick }) => {
  const [searchInput, setSearchInput] = useState('');

  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return; // return early if first render
    }
    if ((todos.length) !== 0) {
      todos.reverse();
    }
  }, [sort], [searchInput]);

  const updatedTodo = (todoId, newValue) => {
    if (!newValue.text || /^\s*$/.test(newValue.text)) {
      return;
    };

    setTodos(prev => prev.map(item => (item.id === todoId ? newValue : item)));
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

  return (
    <div className="search-container">
      <div className="searchbar-and-btn">
        <InputGroup className="searchbar">
          <InputGroup.Text>🔍</InputGroup.Text>
          <FormControl
            placeholder="Search"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </InputGroup>
        <button id="btn-sort" className="todo-button " onClick={handleSortClick}>{sort ? "Ascending" : "Decending"}</button>
      </div>

      <div className="search-results">
        <SearchFilter
          value={searchInput}
          data={todos}
          renderResults={results => (
            <div>
              {results.map((todo) => (
                <div className={todo.isComplete ? 'todo-row complete' : 'todo-row'}
                  key={todo.id}>
                  <Todo
                    todo={todo}
                    completeTodo={completeTodo}
                    removeTodo={removeTodo}
                    updateTodo={updatedTodo}
                  />
                </div>))}
            </div>
          )}
        />
      </div>
    </div>
  );
}

export default SearchList;
