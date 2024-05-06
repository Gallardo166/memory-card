export default function GameScreen({ handleChangeScreen, mode, pokemonList }) {
  console.log(pokemonList);
  return (
    <>
      <h1>{mode}</h1>
      {pokemonList.map((pokemon) => (
        <div>
          <img src={pokemon.imageUrl} />
          <h3>{pokemon.name}</h3>
        </div>
      ))}
    </>
  );
}
