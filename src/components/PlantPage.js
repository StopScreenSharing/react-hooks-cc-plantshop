import React, {useState, useEffect} from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

function PlantPage() {
  const [plants, setPlants] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:6001/plants')
    .then(r => r.json())
    .then((plants) => setPlants(plants))
  }, [])

  const handleAddPlant = (newPlant) => {
    fetch('http://127.0.0.1:6001/plants', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: newPlant.name,
      image: newPlant.image,
      price: newPlant.price
    })
  })
  .then(response => response.json())
  .then(addedPlants => {
    setPlants([...plants, addedPlants]);
  });
  };

  return (
    <main>
      <NewPlantForm onAddPlant={handleAddPlant}/>
      <Search />
      <PlantList plants={plants}/>
    </main>
  );
}

export default PlantPage;
