import React, {useState, useEffect} from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

function PlantPage() {
  const [plants, setPlants] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    fetch('http://127.0.0.1:6001/plants')
    .then(r => r.json())
    .then((plants) => setPlants(plants))
  }, [])

  const handleSearchChange = (event) => {
    setSearchInput(event.target.value);
  };

  const filteredPlants = plants.filter(plant =>
    plant.name.toLowerCase().includes(searchInput.toLowerCase())
  );

  
 

  const handleAddPlant = (newPlant) => {
    fetch("http://localhost:6001/plants", {
    method: 'POST',
    headers: {
      'Content-Type': 'Application/JSON'
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

  const handleDeletePlant = (plantId) => {
    fetch(`http://127.0.0.1:6001/plants/${plantId}`, {
      method: 'DELETE',
    })
    setPlants(plants.filter(plant => plant.id !== plantId));
  }

  return (
    <main>
      <NewPlantForm onAddPlant={handleAddPlant}/>
      <Search onSearchChange={handleSearchChange}/>
      <PlantList plants={filteredPlants} onDelete={handleDeletePlant}/>
    </main>
  );
}

export default PlantPage;
