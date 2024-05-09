import { useState } from "react";
import { saveProgress, getProgress, clearProgress } from "./localStorage";
import StartScreen from "./components/StartScreen";
import LoadingScreen from "./components/LoadingScreen";
import GameScreen from "./components/GameScreen";
import CustomScreen from "./components/CustomScreen";
import "./App.css";

function App() {
  const [screen, setScreen] = useState("start");
  const [mode, setMode] = useState(null);
  const [pokemonList, setPokemonList] = useState(null);
  const [highScores, setHighScores] = useState(getProgress());
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
    if (arguments.length === 0) {
      clearProgress();
      setHighScores(getProgress());
      return;
    }
    const newHighScores = {...highScores, [mode.toLowerCase()]: score};
    saveProgress(newHighScores);
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
          handleChangeTimer={handleChangeTimer}
          handleChangePokemonList={handleChangePokemonList}
          handleChangeHighScore={handleChangeHighScore}
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
          highScore={highScores[mode.toLowerCase()]}
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
