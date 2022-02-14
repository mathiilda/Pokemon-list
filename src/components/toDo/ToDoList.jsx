import React from "react";
import "./ToDo.scss";

export function ToDoList({
  allPokemons,
  callBack,
  callBackUpdate,
  createText,
  deleteText,
  updateText,
}) {
  return (
    <div>
      <div className="header">
        <h2>Pokémon list</h2>
        <button
          className="button create-button"
          onClick={() => callBack(createText)}
        >
          <p className="button-text create-button-text">{createText}</p>
        </button>
      </div>
      {allPokemons.length > 0 ? (
        allPokemons.map((p) => {
          return (
            <div className="pokemon-container" key={p.id}>
              <p className="pokemon-container-text">
                {p.name}: {p.weight}kg, {p.height}m
              </p>
              <div className="button-container">
                <button
                  className="button update-button"
                  onClick={() => callBackUpdate(p.id)}
                >
                  <p className="button-text update-button-text">{updateText}</p>
                </button>
                <button
                  className="button delete-button"
                  onClick={() => callBack(deleteText, p.id)}
                >
                  <p className="button-text delete-button-text">{deleteText}</p>
                </button>
              </div>
            </div>
          );
        })
      ) : (
        <p>The list is empty. Create a pokémon!</p>
      )}
    </div>
  );
}
