// Variables
let pokemonList = [];
let pokemonModalDetails = [];
let pokemonCurrentIndex = 0;
let toggles = {
	alphabeticallyToggle: null,
	numberToggle: null
};

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

const openModal = item => {
	const itemCard = item.target.closest('.card');
	const pokemon = pokemonModalDetails.find(item => item.id == itemCard.dataset.id);
	pokemonCurrentIndex = pokemonModalDetails.findIndex(item => item.id == itemCard.dataset.id);
	
	const modal = document.querySelector('#modal-container');

	modal.innerHTML = generateModalContent(pokemon);
	modal.style.display = 'block';
	
	if(pokemonCurrentIndex == 0) {
		const arrowPrev = document.querySelector('.wrapper-seletors .prev');
		arrowPrev.style.visibility = 'hidden';
	}
	
	if(pokemonCurrentIndex == pokemonModalDetails.length - 1) {
		const arrowNext = document.querySelector('.wrapper-seletors .next');
		arrowNext.style.visibility = 'hidden';
	}
}

const closeModal = () => {
	const modal = document.querySelector('#modal-container');
	modal.style.display = 'none';
}

const nextItemGallery = (item) => {
	const modal = document.querySelector('#modal-container');

	pokemonCurrentIndex = pokemonCurrentIndex + 1;
	modal.innerHTML = generateModalContent(pokemonModalDetails[pokemonCurrentIndex]);
	
	const arrowNext = document.querySelector('.wrapper-seletors .next');
	if(pokemonCurrentIndex == pokemonModalDetails.length - 1) {
		arrowNext.style.visibility = 'hidden';
	}
}

const previousItemGallery = (item) => {
	const modal = document.querySelector('#modal-container');
	pokemonCurrentIndex = pokemonCurrentIndex - 1;
	modal.innerHTML = generateModalContent(pokemonModalDetails[pokemonCurrentIndex]);
	
	const arrowPrev = document.querySelector('.wrapper-seletors .prev');
	if(pokemonCurrentIndex == 0) {
		arrowPrev.style.visibility = 'hidden';
	}
}

// Events listener
function activeListeners() {
	document.getElementById('sortAlpha').addEventListener('click', toggleAlphabeticallySort);
	document.getElementById('sortId').addEventListener('click', toggleIdSort);
	document.getElementById('searchbar').addEventListener('keyup', searchPokemon);
}

// Initializer
Promise.all(pokemonPromises)
  .then(p => pokemonList = p)
  .then(buildPokemonDetailArray)
  .then(generateHTML)
  .then(insertPokemonsIntoPage)
  .then(activeListeners);