import { useState } from "react";
import fetchPokemon from "../fetch";

export default function CustomScreen({ handleChangeScreen, handleChangePokemonList, handleChangeTimer }) {
  const [cardAmount, setCardAmount] = useState(25);
  const [timer, setTimer] = useState(999);

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <label htmlFor="card-amount">Card amount:</label>
        <input
          id="card-amount"
          type="number"
          value={cardAmount}
          min="12"
          max="50"
          onChange={(e) => {
            setCardAmount(e.target.value);
          }}
        />
        <label htmlFor="time-limit">Time Limit: </label>
        <select name="time-limit" id="time-limit" onChange={(e) => setTimer(e.target.value)}>
          <option value="infinity">&infin;</option>
          <option value="120">120s</option>
          <option value="100">100s</option>
          <option value="80">80s</option>
          <option value="60">60s</option>
          <option value="45">45s</option>
        </select>
      </form>
      <button
        disabled={cardAmount > 50 || cardAmount < 12}
        onClick={async () => {
          handleChangeScreen("loading");
          const pokemonList = await fetchPokemon(cardAmount);
          handleChangePokemonList(pokemonList);
          handleChangeTimer(timer);
          handleChangeScreen("game");
        }}
      >
        Start
      </button>
    </>
  );
}
