import { useState } from "react";
import shuffle from "../shuffle";
import Timer from "./Timer";
import fetchPokemon from "../fetch";
import "../styles/GameScreen.css";

export default function GameScreen({
  handleChangeScreen,
  handleChangeHighScore,
  handleChangeTimer,
  handleChangePokemonList,
  mode,
  timer,
  highScore,
  initialPokemonList,
}) {
  const [pokemonList, setPokemonList] = useState(initialPokemonList);
  const [clickedIds, setClickedIds] = useState([]);
  const [status, setStatus] = useState("playing");
  const score = clickedIds.length;

  function handleShufflePokemonList() {
    const newList = [...shuffle(pokemonList)];
    setPokemonList(newList);
  }

  function handleChangeClickedIds(newId) {
    if (arguments.length === 0) {
      setClickedIds([]);
      return;
    }
    const newClickedIds = [...clickedIds, newId];
    setClickedIds(newClickedIds);
  }

  function handleChangeStatus(status) {
    setStatus(status);
  }

  return (
    <div className="game-screen">
      <div className="game-header">
        <div className="left">
          <h1>{mode}</h1>
          <h1>{score}</h1>
        </div>
        <div className="right">
          {timer !== 999 && status === "playing" ? (
            <Timer
              startTime={timer}
              handleChangeStatus={handleChangeStatus}
              handleChangeClickedIds={handleChangeClickedIds}
            ></Timer>
          ) : null}
          {status === "playing" ? (
            <button
              onClick={() => {
                const quitGameDialog = document.querySelector(".quit-game");
                quitGameDialog.showModal();
              }}
            >
              Back
            </button>
          ) : null}
        </div>
      </div>
      <div className="instructions">Click each pokemon once!</div>
      <div className={`cards-${mode.toLowerCase()}`}>
        {pokemonList.map((pokemon) => (
          <button
            className="card"
            key={pokemon.id}
            onClick={() => {
              if (clickedIds.filter((id) => id === pokemon.id).length === 0) {
                if (score < pokemonList.length - 1) {
                  handleShufflePokemonList();
                  handleChangeClickedIds(pokemon.id);
                } else {
                  const gameOverDialog = document.querySelector(".game-over");
                  handleChangeClickedIds(pokemon.id);
                  gameOverDialog.showModal();
                  setStatus("win");
                  if (score + 1 > highScore) {
                    handleChangeHighScore(mode, score + 1);
                  }
                }
              } else {
                const gameOverDialog = document.querySelector(".game-over");
                gameOverDialog.showModal();
                setStatus("lose");
                if (score > highScore) {
                  handleChangeHighScore(mode, score);
                }
              }
            }}
          >
            <img src={pokemon.imageUrl} />
            <h3>{pokemon.name}</h3>
          </button>
        ))}
      </div>
      <dialog className="game-over">
        <p>Score: {score}</p>
        <p>Best: {score > highScore ? score : highScore}</p>
        {status === "win" ? <p>You win!</p> : null}
        {status === "lose" ? (
          <>
            <p>You lose!</p>
            <button
              onClick={async () => {
                handleChangeScreen("loading");
                const pokemonList = await fetchPokemon(
                  initialPokemonList.length
                );
                handleChangePokemonList(pokemonList);
                handleChangeScreen("game");
                if (mode === "custom") {
                  handleChangeTimer(timer);
                }
              }}
            >
              Play again
            </button>
          </>
        ) : null}
        {status !== "playing" ? (
          <button
            onClick={() => {
              handleChangeScreen("start");
            }}
          >
            Back
          </button>
        ) : null}
      </dialog>
      <dialog className="quit-game">
        <p>Are you sure you want to quit?</p>
        <button
          onClick={() => {
            const quitGameDialog = document.querySelector(".quit-game");
            quitGameDialog.close();
          }}
        >
          No
        </button>
        <button
          onClick={() => {
            handleChangeScreen("start");
          }}
        >
          Yes
        </button>
      </dialog>
    </div>
  );
}
