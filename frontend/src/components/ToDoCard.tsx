import React, { useState } from 'react';
import Close from '../assets/Close';

interface ToDoCardProps {
  id: number;
  onDelete: (id: number) => void;
}

const ToDoCard: React.FC<ToDoCardProps> = ({ id, onDelete }) => {
  const [checked, setChecked] = useState(false);

  const handleCheckboxChange = () => {
    setChecked((prevChecked) => !prevChecked);
  };

  const handleDeleteTodo = () => {
    onDelete(id);
  };

  const handleClickToDo = () => {
    alert('To do item clicked!');
  };
  return (
    <div className="container">
      <div className="row align-items-center">
        <div className="col-md-1 m-2 p-0">
          <input
            className="form-check-input p-0"
            type="checkbox"
            checked={checked}
            onChange={handleCheckboxChange}
          />
        </div>
        <div className="col-md d-flex align-items-center">
          <span
            className="text-center col-md"
            onClick={handleClickToDo}
            style={{
              textDecoration: checked ? 'line-through' : 'none',
            }}
          >
            To do name
          </span>
        </div>
        <div className="col-md-1 p-0">
          <button className="border-0 p-0" onClick={handleDeleteTodo}>
            <Close size="36" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ToDoCard;
