import React from 'react';

const Card = React.forwardRef(({ title, description, image, onClick, className, showDetails }, ref) => {
  return (
    <div className={className} onClick={onClick} ref={ref}>
      <img src={image} alt={title} className="card-image" />
      {showDetails && (
        <div className="card-content">
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
      )}
    </div>
  );
});

export default Card;
