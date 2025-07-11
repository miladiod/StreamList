import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit, faCheck } from '@fortawesome/free-solid-svg-icons';

const StreamList = () => {
  const [input, setInput] = useState('');
  // Each item will now have a unique 'id'
  const [items, setItems] = useState([]);
  // isEditing will now store the 'id' of the item being edited, not its index
  const [isEditing, setIsEditing] = useState(null);
  const [editInput, setEditInput] = useState('');

  // Add a new movie with a unique ID
  const addItem = (e) => {
    e.preventDefault(); // Prevent page reload
    if (input.trim() === '') return;

    const newItem = {
      id: Date.now(), // Simple unique ID generation (e.g., timestamp)
      title: input,
      completed: false,
    };
    setItems([...items, newItem]);
    setInput('');
  };

  // Remove item by its unique ID
  const removeItem = (idToRemove) => {
    const updatedItems = items.filter((item) => item.id !== idToRemove);
    setItems(updatedItems);
  };

  // Start editing an item by its unique ID
  const startEditing = (idToEdit) => {
    const itemToEdit = items.find((item) => item.id === idToEdit);
    if (itemToEdit) {
      setIsEditing(idToEdit); // Store the ID of the item being edited
      setEditInput(itemToEdit.title);
    }
  };

  // Save edited item by its unique ID
  const saveEdit = (idToSave) => {
    const updatedItems = items.map((item) =>
      item.id === idToSave ? { ...item, title: editInput } : item
    );
    setItems(updatedItems);
    setIsEditing(null); // Exit editing mode
    setEditInput(''); // Clear edit input
  };

  // Toggle completion status by unique ID
  const toggleComplete = (idToToggle) => {
    const updatedItems = items.map((item) =>
      item.id === idToToggle ? { ...item, completed: !item.completed } : item
    );
    setItems(updatedItems);
  };

  return (
    <main className="streamlist-container">
      <h2>Welcome to StreamList App</h2>
      <p> Here are the best sites for watching and renting movies online!</p>

      <div className="input-group">
        <input
          type="text"
          id="myInput"
          placeholder="Title..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="button" onClick={addItem} className="addBtn">
          Add
        </button>
      </div>

      <ul id="myUL">
        {items.map((item) => (
          // Use item.id as the key for robust list rendering
          <li
            key={item.id}
            className="movie-item"
            style={{ textDecoration: item.completed ? 'line-through' : 'none' }}
          >
            {isEditing === item.id ? ( // Compare with item.id
              <>
                <input
                  type="text"
                  value={editInput}
                  onChange={(e) => setEditInput(e.target.value)}
                />
                <button
                  onClick={() => saveEdit(item.id)} // Pass item.id
                  title="Save"
                  className="icon-btn save-btn"
                >
                  <FontAwesomeIcon icon={faCheck} />
                </button>
              </>
            ) : (
              <>
                <input
                  type="checkbox"
                  checked={item.completed}
                  onChange={() => toggleComplete(item.id)} // Pass item.id
                />

                <span
                  className="movie-title"
                  style={{ textDecoration: item.completed ? 'line-through' : 'none' }}
                >
                  {item.title}
                </span>
                <button
                  onClick={() => startEditing(item.id)} // Pass item.id
                  title="Edit"
                  className="icon-btn edit-btn"
                >
                  <FontAwesomeIcon icon={faEdit} />
                </button>

                <button
                  onClick={() => removeItem(item.id)} // Pass item.id
                  title="Delete"
                  className="icon-btn delete-btn"
                >
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
