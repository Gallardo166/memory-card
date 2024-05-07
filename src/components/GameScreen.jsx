import { useState } from "react";
import shuffle from "../shuffle";
import Timer from "./Timer";
import fetchPokemon from "../fetch";

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
  const dialog = document.querySelector("dialog");

  function handleShufflePokemonList() {
    const newList = [...shuffle(pokemonList)];
    setPokemonList(newList);
  }

  function handleChangeClickedIds(newId) {
    const newClickedIds = [...clickedIds, newId];
    setClickedIds(newClickedIds);
  }

  function handleChangeStatus(status) {
    setStatus(status);
  }

  return (
    <>
      <h1>{mode}</h1>
      <h2>{score}</h2>
      {timer !== 999 ? (
        <Timer
          startTime={timer}
          handleChangeStatus={handleChangeStatus}
        ></Timer>
      ) : null}
      {status === "playing" ? (
        <button onClick={() => handleChangeScreen("start")}>Back</button>
      ) : null}
      {pokemonList.map((pokemon) => (
        <button
          key={pokemon.id}
          onClick={() => {
            if (clickedIds.filter((id) => id === pokemon.id).length === 0) {
              if (score < pokemonList.length - 1) {
                handleShufflePokemonList();
                handleChangeClickedIds(pokemon.id);
              } else {
                handleChangeClickedIds(pokemon.id);
                dialog.showModal();
                setStatus("win");
                if (score > highScore) {
                  handleChangeHighScore(mode, score);
                }
              }
            } else {
              dialog.showModal();
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
      <dialog>
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
                if (mode === 'custom') {handleChangeTimer(timer)}
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
    </>
  );
}
