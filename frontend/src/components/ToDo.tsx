import React, { useState } from 'react';
import Add from '../assets/Add';
import ToDoCard from './ToDoCard';

interface Todo {
  id: number;
  completed: boolean;
}

const ToDo: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [text, setText] = useState('Agrega tareas!');
  const [isEditing, setIsEditing] = useState(false);

  const handleAddTodo = () => {
    const newTodoItem: Todo = {
      id: Date.now(),
      completed: false,
    };

    setTodos([...todos, newTodoItem]);
  };

  const handleDeleteTodo = (id: number) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  const handleTextClick = () => {
    setIsEditing(true);
  };

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      setIsEditing(false);
    }
  };

  return (
    <>
      <div className="container">
        <div className="row justify-content-center text-center ">
          <div className="col-md m-2 p-2">
            <div onClick={handleTextClick} className="mb-2 p-2 ">
              {isEditing ? (
                <input
                  type="text"
                  className="form-control"
                  value={text}
                  onChange={handleTextChange}
                  onKeyDown={handleKeyDown}
                  autoFocus
                />
              ) : (
                <div>{text}</div>
              )}
            </div>
            <ul style={{ listStyleType: 'none' }} className="p-0">
              {todos.map((todo) => (
                <li className="container " key={todo.id}>
                  <ToDoCard id={todo.id} onDelete={handleDeleteTodo} />
                </li>
              ))}
            </ul>
            <button className="btn p-2 m-2 " onClick={handleAddTodo}>
              <Add size="36" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ToDo;
