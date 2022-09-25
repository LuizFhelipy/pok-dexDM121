// Variables
let pokemonList = [];
let toggles = {
	alphabeticallyToggle: null,
	numberToggle: null
};

// API
const getPokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`
const generatePokemonPromises = () => Array(150).fill().map((_, index) =>
  (fetch(getPokemonUrl(index + 1)).then(response => response.json()))
)
const pokemonPromises = generatePokemonPromises()	

// Utils
const generateHTML = pokemons => {
  return pokemons.reduce((accumulator, { name, id, types }) => {
    const elementTypes = types.map(typeInfo => typeInfo.type.name)
    const pokemonId = ("000" + id).substr(-3)

    accumulator += `
      <li class="card ${elementTypes[0]}">
		<div>
			<div class="container-pokemon-id">
				<h4 class="pokemon-id ${elementTypes[0]}">#${pokemonId}</h4>
			</div>
			<img class="card-image alt="${name}" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png"</img>
		</div>
		<div class="container-name ${elementTypes[0]}">
			<h2 class="card-title">${name}</h2>
		</div>
      </li>
    `
    return accumulator
  }, "")
}

const sortItems = (list, sortType, field) => {
	const conditionalSort = (a, b, ruleNumberOne, ruleNumberTwo) => {
		if (a[field] < b[field]) return ruleNumberOne;
		if (a[field] > b[field]) return ruleNumberTwo;
		return 0;
	};
	
	const sortedList = sortType
		? list.sort((a, b) => conditionalSort(a, b, -1, 1))
		: list.reverse((a, b) => conditionalSort(a, b, 1, -1));
		
	return sortedList;
}

const insertPokemonsIntoPage = pokemons => {
  const ul = document.querySelector('[data-js="pokedex"]')
  ul.innerHTML = pokemons
}	

// Events Handler
function searchPokemon() {
  let input = document.getElementById('searchbar').value
  let cardsElements = document.getElementsByTagName('li');
  
  Array.from(cardsElements).forEach(cardItem => {
	 cardItem.style.display = !cardItem.innerHTML.toLowerCase().includes(input.toLowerCase())
		  ? "none"
		  : "list-item"; 
  });
}

function toggleAlphabeticallySort() {
	toggles.alphabeticallyToggle = !toggles.alphabeticallyToggle;
	const sortedList = toggles.alphabeticallyToggle ? sortItems(pokemonList, true, 'name') : sortItems(pokemonList, false, 'name');
	
	insertPokemonsIntoPage(generateHTML(sortedList));
}

function toggleIdSort() {
	toggles.numberToggle = !toggles.numberToggle;
	const sortedList = toggles.numberToggle ? sortItems(pokemonList, true, 'id') : sortItems(pokemonList, false, 'id');
	
	insertPokemonsIntoPage(generateHTML(sortedList));
}

// Events listener
document.getElementById('sortAlpha').addEventListener('click', toggleAlphabeticallySort);
document.getElementById('sortId').addEventListener('click', toggleIdSort);
document.getElementById('searchbar').addEventListener('keyup', searchPokemon)

// Initializer
Promise.all(pokemonPromises)
  .then(p => pokemonList = p)
  .then(generateHTML)
  .then(insertPokemonsIntoPage);