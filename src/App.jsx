// src/App.jsx

import { useState, useEffect } from 'react';
import * as petService from './services/petService';

import PetList from './components/PetList';
import PetDetails from './components/PetDetails';
import PetForm from './components/PetForm';

import './App.css';

const App = () => {

  const [petList, setPetList] = useState([]);
  const [selected, setSelected] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const pets = await petService.index();
        if (pets.error) {
          throw new Error(pets.error);
        }

        setPetList(pets);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPets();
  }, []);

  // IIFE syntax(?)
  // useEffect((() => {
  //   const fetchPets = async () => {
  //     const data = await petService.index();
  //     setPetList(data.pets);
  //   }
  // })(), []);

  const updateSelected = (pet) => {
    setSelected(pet);
  }

  const handleFormView = (pet) => {
    if (!pet.name) setSelected(null);
    setIsFormOpen(!isFormOpen);
  };

  const handleAddPet = async (formData) => {
    try {
      const newPet = await petService.create(formData);

      if (newPet.error) {
        throw new Error(newPet.error);
      }

      setPetList([...petList, newPet]);
      setIsFormOpen(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdatePet = async (formData, petId) => {
    try {
      const updatedPet = await petService.updatePet(formData, petId);

      if (updatedPet.err) {
        throw new Error(updatedPet.err);
      }

      const updatedPetList = petList.map((pet) => pet._id !== updatedPet._id ? pet : updatedPet);
      // creates new list with selected's values swapped out for updatedPet values
      setPetList([...updatedPetList]);
        // [...spread] - spread operator within [] otherwise returned object is not an array
      setSelected(updatedPet); // re-renders PetDetails Component
      setIsFormOpen(false);
    } catch (err) {
      console.log(err);
    }
  }

  const handleRemovePet = async (petId) => {
    try {
      
      const deletedPet = await petService.deletePet(petId);

      if (deletedPet.error) {
        throw new Error(deletedPet.error);
      }

      const updatedPetList = petList.filter((pet) => pet._id !== deletedPet._id);
      setPetList([...updatedPetList]);
      setSelected(null);
      setIsFormOpen(false);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <PetList
        petList={petList}
        updateSelected={updateSelected}
        handleFormView={handleFormView}
        isFormOpen={isFormOpen}
      />
      {
        isFormOpen ? (
          <PetForm
            handleAddPet={handleAddPet}
            handleUpdatePet={handleUpdatePet}
            selected={selected}
          />
        ) : (
          <PetDetails
            selected={selected}
            handleFormView={handleFormView}
            handleRemovePet={handleRemovePet}
          />
        )
      }
    </>
  );

};

export default App;
