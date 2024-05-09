import "../styles/LoadingScreen.css";
import pikachu from "../assets/pikachu.gif";

export default function LoadingScreen({ handleChangeScreen, mode }) {
  return (
    <div className="loading-screen">
      <h1 className="loading"></h1>
      <img src={pikachu} alt="" className="gif"/>
    </div>
  );
}
