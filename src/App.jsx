import { useState } from "react";
import StartScreen from "./components/StartScreen";
import LoadingScreen from "./components/LoadingScreen";
import GameScreen from "./components/GameScreen";
import "./App.css";

function App() {
  const [screen, setScreen] = useState("start");
  const [mode, setMode] = useState(null);

  function handleChangeScreen(targetScreen) {
    setScreen(targetScreen);
  }

  function handleChangeMode(targetMode) {
    setMode(targetMode);
  }

  return (
    <>
      {screen === "start" ? (
        <StartScreen handleChangeScreen={handleChangeScreen} handleChangeMode={handleChangeMode}></StartScreen>
      ) : null}
      {screen === "loading" ? (
        <LoadingScreen handleChangeScreen={handleChangeScreen}></LoadingScreen>
      ) : null}
      {screen === "game" ? (
        <GameScreen handleChangeScreen={handleChangeScreen} mode={mode}></GameScreen>
      ) : null}
    </>
  );
}

export default App;
