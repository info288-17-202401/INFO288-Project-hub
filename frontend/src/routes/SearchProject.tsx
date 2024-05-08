import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchProject: React.FC = () => {
  const [clickButton, setClickButton] = useState(false);
  const navigate = useNavigate();

  const onclickButton = () => {
    setClickButton(!clickButton);

    navigate('/teams');
  };

  return (
    <div
      className="text-light p-4 container d-flex justify-content-center align-items-center"
      style={{ minHeight: '80vh' }}
    >
      <div
        className="card p-4 text-light"
        style={{ backgroundColor: '#303339', width: '50%' }}
      >
        <div>
          <h2 className="mb-4 text-center">Token proyecto</h2>
        </div>
        <form>
          <div className="mb-3 text-center">
            <input type="text" name="token" className="form-control" />
          </div>
          <div style={{ width: '100%' }}>
            <button
              type="submit"
              className="btn text-white w-100"
              onClick={onclickButton}
              style={{ backgroundColor: '#5864f2' }}
            >
              Enviar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SearchProject;
