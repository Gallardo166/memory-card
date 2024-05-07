import { useState } from "react";
import StartScreen from "./components/StartScreen";
import LoadingScreen from "./components/LoadingScreen";
import GameScreen from "./components/GameScreen";
import CustomScreen from "./components/CustomScreen";
import "./App.css";

function App() {
  const [screen, setScreen] = useState("start");
  const [mode, setMode] = useState(null);
  const [pokemonList, setPokemonList] = useState(null);
  const [highScores, setHighScores] = useState({easy: 0, medium: 0, hard: 0, custom: 0});
  const [timer, setTimer] = useState(999);

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

  function handleChangeHighScore(mode, score) {
    const newHighScores = {...highScores, [mode]: score};
    setHighScores(newHighScores);
  }

  function handleChangeTimer(time) {
    setTimer(time);
  }

  return (
    <>
      {screen === "start" ? (
        <StartScreen
          handleChangeScreen={handleChangeScreen}
          handleChangeMode={handleChangeMode}
          handleChangePokemonList={handleChangePokemonList}
          highScores={highScores}
        ></StartScreen>
      ) : null}
      {screen === "loading" ? (
        <LoadingScreen handleChangeScreen={handleChangeScreen}></LoadingScreen>
      ) : null}
      {screen === "game" ? (
        <GameScreen
          handleChangeScreen={handleChangeScreen}
          handleChangeHighScore={handleChangeHighScore}
          handleChangeTimer={handleChangeTimer}
          handleChangePokemonList={handleChangePokemonList}
          mode={mode}
          timer={timer}
          highScore={highScores[mode]}
          initialPokemonList={pokemonList}
        ></GameScreen>
      ) : null}
      {screen === "custom" ? (
        <CustomScreen
          handleChangeScreen={handleChangeScreen}
          handleChangePokemonList={handleChangePokemonList}
          handleChangeTimer={handleChangeTimer}
        ></CustomScreen>
      ) : null}
    </>
  );
}

export default App;
