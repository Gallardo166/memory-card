import fetchPokemon from "../fetch";

export default function StartScreen({
  handleChangeScreen,
  handleChangeMode,
  handleChangePokemonList,
  highScores
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
      <p>Highscore: {highScores.easy}</p>
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
      <p>Highscore: {highScores.medium}</p>
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
      <p>Highscore: {highScores.hard}</p>
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
      <p>Highscore: {highScores.custom}</p>
    </div>
  );
}
