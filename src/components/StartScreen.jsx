import fetchPokemon from "../fetch";

export default function StartScreen({
  handleChangeScreen,
  handleChangeMode,
  handleChangePokemonList,
}) {
  return (
    <div className="start-screen">
      <h1>Memory Game</h1>
      <button
        onClick={async () => {
          handleChangeScreen("loading");
          handleChangeMode("easy");
          const pokemonList = await fetchPokemon(4);
          handleChangePokemonList(pokemonList);
          handleChangeScreen("game");
        }}
      >
        Easy
      </button>
      <button
        onClick={async () => {
          handleChangeScreen("loading");
          handleChangeMode("medium");
          const pokemonList = await fetchPokemon(8);
          handleChangePokemonList(pokemonList);
          handleChangeScreen("game");
        }}
      >
        Medium
      </button>
      <button
        onClick={async () => {
          handleChangeScreen("loading");
          handleChangeMode("hard");
          const pokemonList = await fetchPokemon(12);
          handleChangePokemonList(pokemonList);
          handleChangeScreen("game");
        }}
      >
        Hard
      </button>
      <button
        onClick={async () => {
          handleChangeScreen("loading");
          handleChangeMode("custom");
          const pokemonList = await fetchPokemon(20);
          handleChangePokemonList(pokemonList);
          handleChangeScreen("game");
        }}
      >
        Custom
      </button>
    </div>
  );
}
