import { useState } from "react";
import shuffle from "../shuffle";

export default function GameScreen({ handleChangeScreen, mode, initialPokemonList }) {

  const [pokemonList, setPokemonList] = useState(initialPokemonList);

  function handleChangePokemonList() {
    const newList = [...shuffle(pokemonList)];
    setPokemonList(newList);
  }

  return (
    <>
      <h1>{mode}</h1>
      {pokemonList.map((pokemon) => (
        <button
          key={pokemon.id}
          onClick={() => {
            handleChangePokemonList();
          }}
        >
          <img src={pokemon.imageUrl} />
          <h3>{pokemon.name}</h3>
        </button>
      ))}
    </>
  );
}
