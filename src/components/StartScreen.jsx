import fetchPokemon from "../fetch";
import "../styles/StartScreen.css"

export default function StartScreen({
  handleChangeScreen,
  handleChangeMode,
  handleChangeTimer,
  handleChangePokemonList,
  handleChangeHighScore,
  highScores,
}) {
  return (
    <div className="start-screen">
      <h1 className="title">Memory Game</h1>
      <section className="game-modes">
        <button
          className="easy"
          onClick={async () => {
            handleChangeScreen("loading");
            handleChangeMode("Easy");
            handleChangeTimer(999);
            const pokemonList = await fetchPokemon(4);
            handleChangePokemonList(pokemonList);
            handleChangeScreen("game");
          }}
        >
          Easy
        </button>
        <p>Highscore: {highScores.easy}</p>
        <button
          className="medium"
          onClick={async () => {
            handleChangeScreen("loading");
            handleChangeMode("Medium");
            handleChangeTimer(120);
            const pokemonList = await fetchPokemon(8);
            handleChangePokemonList(pokemonList);
            handleChangeScreen("game");
          }}
        >
          Medium
        </button>
        <p>Highscore: {highScores.medium}</p>
        <button
          className="hard"
          onClick={async () => {
            handleChangeScreen("loading");
            handleChangeMode("Hard");
            handleChangeTimer(100);
            const pokemonList = await fetchPokemon(12);
            handleChangePokemonList(pokemonList);
            handleChangeScreen("game");
          }}
        >
          Hard
        </button>
        <p>Highscore: {highScores.hard}</p>
        <button
          className="custom"
          onClick={async () => {
            handleChangeScreen("custom");
            handleChangeMode("Custom");
          }}
        >
          Custom
        </button>
        <p>Highscore: {highScores.custom}</p>
      </section>
      <dialog>
        <p>Are you sure you want to delete your progress?</p>
        <button
          onClick={() => {
            const dialog = document.querySelector("dialog");
            dialog.close();
          }}
        >
          No
        </button>
        <button
          onClick={() => {
            const dialog = document.querySelector("dialog");
            handleChangeHighScore();
            dialog.close();
          }}
        >
          Yes
        </button>
      </dialog>
      <button
        className="clear-progress"
        onClick={() => {
          const dialog = document.querySelector("dialog");
          dialog.showModal();
        }}
      >
        Clear progress
      </button>
    </div>
  );
}
