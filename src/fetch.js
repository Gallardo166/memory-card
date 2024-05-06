export default async function fetchPokemon(count) {
  const fetchedIds = [];
  const pokemonList = [];

  for (let i = 0; i < count; i++) {
    let currentId = Math.floor(Math.random() * 1025) + 1;

    while (fetchedIds.filter((id) => id === currentId).length > 0) {
      currentId = Math.floor(Math.random() * 1025) + 1;
    }

    fetchedIds.push(currentId);
  }

  const responses = await Promise.allSettled(
    fetchedIds.map((id) => fetch(`https://pokeapi.co/api/v2/pokemon/${id}`))
  );

  for (const response of responses) {
    const pokemon = await response.value.json();
    pokemonList.push({
      id: pokemon.id,
      imageUrl: pokemon.sprites.front_default,
      name: pokemon.name,
    });
  }

  return pokemonList;
}
