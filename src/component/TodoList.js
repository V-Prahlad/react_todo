import React, { useState, useEffect } from 'react';

import { FcCheckmark } from 'react-icons/fc';

function TodoList() {
  const [input, setInput] = useState();
  const [listItem, setListItem] = useState(() => {
    let savedInput = localStorage.getItem('listItem');
    let value = JSON.parse(savedInput);
    return value || [];
  });

  useEffect(() => {
    // storing input name
    localStorage.setItem('listItem', JSON.stringify(listItem));
  }, [listItem]);

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = () => {
    var arr = [...listItem];
    arr.push({ name: input, completed: false });
    setListItem(arr);
  };

  const handleChecked = (index) => {
    const arr = [...listItem];
    arr[index].completed = !arr[index].completed;
    setListItem(arr);
  };

  const removeItem = (index) => {
    const newItems = [...listItem];
    newItems.splice(index, 1);
    setListItem(newItems);
  };

  return (
    <div id="todo">
      <div className="todo__input">
        <input
          value={input}
          type="text"
          onChange={handleChange}
          placeholder="Enter task Name..."
        />
        <button onClick={handleSubmit} type="submit">
          Add
        </button>
      </div>

      <div className="todo__data">
        <span>
          {listItem.map((item, key) => {
            return (
              <li className={item.completed ? 'checked-todo' : ''}>
                {item.name}
                <FcCheckmark
                  className="checked"
                  onClick={() => handleChecked(key)}
                />
                <button onClick={() => removeItem(key)}>Remove</button>
              </li>
            );
          })}
        </span>
      </div>
    </div>
  );
}

export default TodoList;
