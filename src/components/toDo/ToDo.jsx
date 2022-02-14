import React, { useState, useEffect } from "react";
import "./ToDo.scss";
import {
  createPokemon,
  deletePokemon,
  updatePokemon,
  getPokemons,
} from "../../functions/pokemon";
import { ToDoList } from "./ToDoList";
import { UpdatePokemon } from "../update/UpdatePokemon";

export function ToDo() {
  const [allPokemons, setAllPokemons] = useState([]);
  const [crud, setCrud] = useState(false);
  const [viewedPopup, setViewedPopup] = useState(false);
  const [updateId, setUpdateId] = useState();
  const updateText = "Update";
  const createText = "Create";
  const deleteText = "Delete";

  /*
   * Om man har skapat/updaterat/raderat en pokémon
   * ska listan över pokémons uppdateras.
   */
  useEffect(() => {
    const get = async () => {
      let pokemons = await getPokemons();
      setAllPokemons(pokemons);
    };

    get();
  }, [crud]);

  /*
   * Anropa funktionerna för att skapa/ta bort en pokémon.
   */
  const actionCreateDelete = async (action, id = null) => {
    if (action === createText) {
      await createPokemon();
    } else if (action === deleteText) {
      deletePokemon(id);
    }

    setCrud(!crud);
  };

  /*
   * Kallar till funktionen som uppdaterar
   * pokémonens längd och vikt. Sätter variabeln crud till
   * true/false för att useEffecten ovan ska triggas.
   * viewedPopup blir false, så att listan över pokémons visas.
   */
  const actionUpdate = (id, weight, height) => {
    updatePokemon(id, weight, height);
    setCrud(!crud);
    setViewedPopup(!viewedPopup);
  };

  /*
   * Sparar pokémon-id för att sedan skicka vidare det till
   * UpdatePokemon-komponenten.
   * viewedPopup blir true, så att uppdatera-formuläret visas.
   */
  const actionShowUpdateForm = (id) => {
    setUpdateId(id);
    setCrud(!crud);
    setViewedPopup(!viewedPopup);
  };

  return (
    <div className="todo-container">
      {!viewedPopup ? (
        <ToDoList
          allPokemons={allPokemons}
          callBack={actionCreateDelete}
          callBackUpdate={actionShowUpdateForm}
          createText={createText}
          deleteText={deleteText}
          updateText={updateText}
        />
      ) : (
        <UpdatePokemon
          callBack={actionUpdate}
          id={updateId}
          updateText={updateText}
        />
      )}
    </div>
  );
}
