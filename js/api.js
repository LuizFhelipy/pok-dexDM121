const getPokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`

const generatePokemonPromises = () => Array(150).fill().map((_, index) =>
  (fetch(getPokemonUrl(index + 1)).then(response => response.json()))
)

const pokemonPromises = generatePokemonPromises()	