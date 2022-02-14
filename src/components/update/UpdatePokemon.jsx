import React, { useState, useEffect } from "react";
import "../toDo/ToDo.scss";
import "../update/UpdatePokemon.scss";
import { getPokemonObject } from "../../functions/pokemon";

export function UpdatePokemon({ callBack, id, updateText }) {
  const [pokemon, setPokemon] = useState({});
  const [height, setHeight] = useState(0);
  const [weight, setWeight] = useState(0);
  const [errorMessage, setErrorMessage] = useState(false);

  /**
   * Hämtar information om den pokémonen
   * som ska uppdateras.
   */
  useEffect(() => {
    let pokemonObject = getPokemonObject(id);
    setPokemon(pokemonObject);
    setHeight(pokemonObject.height);
    setWeight(pokemonObject.weight);
  }, [id]);

  /*
   * Validera att användaren har skrivit in korrekta värden. Värden under 0
   * eller tom input kommer ej att godkännas.
   */
  const validate = (event) => {
    event.preventDefault();
    if (weight > 0 && height > 0) {
      callBack(pokemon.id, weight, height);
    } else {
      setErrorMessage(true);
    }
  };

  return (
    <div>
      <div className={errorMessage ? "update-pokemon-error" : "hidden"}>
        Weight and height must be more than 0.
      </div>
      <h2 className="update-pokemon-heading">Update {pokemon.name}</h2>
      <form
        onSubmit={(event) => validate(event)}
        className="update-pokemon-form"
      >
        <label className="update-pokemon-label" min="0">
          Weight (kg)
        </label>
        <input
          type="number"
          className="update-pokemon-input"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
        ></input>
        <label className="update-pokemon-label" min="0">
          Height (m)
        </label>
        <input
          type="number"
          className="update-pokemon-input"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
        ></input>
        <button type="submit" className="button update-pokemon-button">
          <p className="button-text update-pokemon-button-text">{updateText}</p>
        </button>
      </form>
    </div>
  );
}
