const getPokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`
const generatePokemonPromises = () => Array(150).fill().map((_, index) =>
  (fetch(getPokemonUrl(index + 1)).then(response => response.json()))
)

const generateHTML = pokemons => {
  return pokemons.reduce((accumulator, { name, id, types }) => {
    const elementTypes = types.map(typeInfo => typeInfo.type.name)
    const pokemonId = ("000" + id).substr(-3)

    accumulator += `
      <li class="card ${elementTypes[0]}">
      <img class="card-image alt="${name}" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${id}.png"</img>
        <h2 class="card-title">${name}</h2>
        <h4 class="pokemon-id">#${pokemonId}</h4>
      </li>
    `
    return accumulator
  }, "")
}

const insertPokemonsIntoPage = pokemons => {
  const ul = document.querySelector('[data-js="pokedex"]')
  ul.innerHTML = pokemons
}

const pokemonPromises = generatePokemonPromises()

Promise.all(pokemonPromises)
  .then(generateHTML)
  .then(insertPokemonsIntoPage)