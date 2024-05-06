export default function StartScreen({ handleChangeScreen, handleChangeMode }) {
  return (
    <div className="start-screen">
      <h1>Memory Game</h1>
      <button
        onClick={() => {
          handleChangeScreen("loading");
          handleChangeMode("easy");
        }}
      >
        Easy
      </button>
      <button
        onClick={() => {
          handleChangeScreen("loading");
          handleChangeMode("medium");
        }}
      >
        Medium
      </button>
      <button
        onClick={() => {
          handleChangeScreen("loading");
          handleChangeMode("hard");
        }}
      >
        Hard
      </button>
      <button
        onClick={() => {
          handleChangeScreen("loading");
          handleChangeMode("custom");
        }}
      >
        Custom
      </button>
    </div>
  );
}
