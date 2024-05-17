import React from 'react';
import Todo from './ToDo';

const ToDoContainer: React.FC = () => {
  return (
    <>
      <div className="container">
        <div className="row justify-content-center text-center ">
          <div className="col-md m-2">
            <Todo />
          </div>

          <div className="col-md m-2">
            <Todo />
          </div>
          <div className="col-md m-2">
            <Todo />
          </div>
          <div className="col-md m-2">
            <Todo />
          </div>
        </div>
      </div>
    </>
  );
};

export default ToDoContainer;
