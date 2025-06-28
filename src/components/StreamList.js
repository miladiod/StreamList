import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit, faCheck, faUndo } from '@fortawesome/free-solid-svg-icons';




const StreamList = () => {
  const [input, setInput] = useState('');
  const [items, setItems] = useState([]);
  const [isEditing, setIsEditing] = useState(null);
  const [editInput, setEditInput] = useState('');
  
  

  //Add a new movie
    const addItem = (e) => {
    e.preventDefault(); // Prevent page reload
    if (input.trim() === '') return;

     setItems([...items, { title: input, completed: false }]);
    setInput('');
  };

  //Remove item
  const removeItem = (indexToRemove) => {
    const updatedItems = items.filter((_, index) => index !== indexToRemove);
    setItems(updatedItems);
  };
 //Edit item
const startEditing = (index) => {
    setIsEditing(index);
    setEditInput(items[index].title);
  };
 //Save item
  const saveEdit = (index) => {
    const updatedItems = [...items];
    updatedItems[index].title = editInput;
    setItems(updatedItems);
    setIsEditing(null);
  };

  const toggleComplete = (index) => {
    const updatedItems = [...items];
    updatedItems[index].completed = !updatedItems[index].completed;
    setItems(updatedItems);
  };



  return (
    <main className="streamlist-container">
      <h2>My StreamList</h2>
      <p> Here are the best sites for watching and renting movies online!</p>
      
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
           <li key={index} className="movie-item" style={{ textDecoration: item.completed ? 'line-through' : 'none' }}>
            {isEditing === index ? (
              <>
                <input
                  type="text"
                  value={editInput}
                  onChange={(e) => setEditInput(e.target.value)}
                />
                {isEditing === index && (
                <button onClick={() => saveEdit(index)} title="Save" className="icon-btn save-btn">
                  <FontAwesomeIcon icon={faCheck} />
                </button>
)}
              </>
            ) : (
              <>
                <input
                  type="checkbox"
                  checked={item.completed}
                  onChange={() => toggleComplete(index)}
                  
                />

                <span className="movie-title" style={{ textDecoration: item.completed ? 'line-through' : 'none' }}>
                 {item.title}
                </span>
                <button onClick={() => startEditing(index)} title="Edit" className="icon-btn edit-btn">
                  <FontAwesomeIcon icon={faEdit} />
                </button>

                <button onClick={() => removeItem(index)} title="Delete" className="icon-btn delete-btn">
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </main>
  );
};

export default StreamList;