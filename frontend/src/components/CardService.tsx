import React from 'react';
import '../css/card.css'
const CardService = ({description, image}) => {
  return (
    <div className="card">
      <img src={image} className="card-image" />
      <div className="card-content-overlay bg-black" >
        <p className='nunito-sans-regular text-white nunito-sans-regular' 
          style={{fontSize:'18px'}}>
          {description}
        </p>
      </div>
    </div>
  );
};

export default CardService;