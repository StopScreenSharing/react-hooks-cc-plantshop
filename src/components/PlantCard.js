import React, {useState} from "react";

function PlantCard({ plant, onDelete }) {
  const [isInStock, setIsInStock] = useState(true);

  const handleClick = () => {
    setIsInStock(!isInStock)
  }

  const handleDeleteClick = () => {
    onDelete(plant.id);
  };

  return (
    <li className="card" data-testid="plant-item">
      <img src={plant.image} alt={plant.name} />
      <h4>{plant.name}</h4>
      <p>Price: {plant.price}</p>
      {isInStock ? (
        <button className="primary" onClick={handleClick}>In Stock</button>
      ) : (
        <button onClick={handleClick}>Out of Stock</button>
      )}
      <button onClick={handleDeleteClick}>Delete Plant</button>
    </li>
  );
}

export default PlantCard;
