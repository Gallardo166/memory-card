import { useState } from "react";
import shuffle from "../shuffle";
import Timer from "./Timer";

export default function GameScreen({
  handleChangeScreen,
  handleChangeHighScore,
  mode,
  timer,
  highScore,
  initialPokemonList,
}) {
  const [pokemonList, setPokemonList] = useState(initialPokemonList);
  const [clickedIds, setClickedIds] = useState([]);
  const [status, setStatus] = useState("playing");
  const score = clickedIds.length;

  function handleChangePokemonList() {
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
                handleChangePokemonList();
                handleChangeClickedIds(pokemon.id);
              } else {
                handleChangeClickedIds(pokemon.id);
                setStatus("win");
              }
            } else {
              setStatus("lose");
            }
          }}
        >
          <img src={pokemon.imageUrl} />
          <h3>{pokemon.name}</h3>
        </button>
      ))}
      <div>
        {status === "win" ? <p>You win!</p> : null}
        {status === "lose" ? <p>You lose!</p> : null}
        {status !== "playing" ? (
          <button
            onClick={() => {
              handleChangeScreen("start");
              if (score > highScore) {
                handleChangeHighScore(mode, score);
              }
            }}
          >
            Back
          </button>
        ) : null}
      </div>
    </>
  );
}
