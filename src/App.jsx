import { useState } from "react";
import StartScreen from "./components/StartScreen";
import LoadingScreen from "./components/LoadingScreen";
import GameScreen from "./components/GameScreen";
import "./App.css";

function App() {
  const [screen, setScreen] = useState("start");
  const [mode, setMode] = useState(null);
  const [pokemonList, setPokemonList] = useState(null);

  function handleChangeScreen(targetScreen) {
    setScreen(targetScreen);
  }

  function handleChangeMode(targetMode) {
    setMode(targetMode);
  }

  function handleChangePokemonList(list) {
    const newList = list.map((pokemon) => {
      const newObject = { ...pokemon };
      return newObject;
    });
    setPokemonList(newList);
  }

  return (
    <>
      {screen === "start" ? (
        <StartScreen
          handleChangeScreen={handleChangeScreen}
          handleChangeMode={handleChangeMode}
          handleChangePokemonList={handleChangePokemonList}
        ></StartScreen>
      ) : null}
      {screen === "loading" ? (
        <LoadingScreen handleChangeScreen={handleChangeScreen}></LoadingScreen>
      ) : null}
      {screen === "game" ? (
        <GameScreen
          handleChangeScreen={handleChangeScreen}
          mode={mode}
          pokemonList={pokemonList}
        ></GameScreen>
      ) : null}
    </>
  );
}

export default App;
