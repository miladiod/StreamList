import React, { useState } from 'react';

const StreamList = () => {
  const [items, setItems] = useState([]);
  const [input, setInput] = useState('');

  const addItem = () => {
    if (input.trim() === '') {
      alert('You must write something!');
      return;
    }

    setItems([...items, input]);
    setInput('');
  };

  const removeItem = (indexToRemove) => {
    const updatedItems = items.filter((_, index) => index !== indexToRemove);
    setItems(updatedItems);
  };

  return (
    <main>
      <h2>My StreamList</h2>
      <div id="myDIV" className="header">
        <input
          type="text"
          id="myInput"
          placeholder="Title..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
       <button type="button" onClick={addItem} className="addBtn">Add</button>
      </div>

      <ul id="myUL">
        {items.map((item, index) => (
          <li key={index}>
            {item}
            <span className="close" onClick={() => removeItem(index)}>&times;</span>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default StreamList;