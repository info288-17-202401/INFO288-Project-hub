import React from 'react';
import Todo from './ToDo';

const ToDoContainer: React.FC = () => {
  return (
    <>
      <div className="container">
        <h1 className="text-center text-white text-uppercase ">To do list</h1>
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
