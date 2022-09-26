const adaptSequenceNumber = (id) => {
	return ("000" + id).substr(-3)
}

const adaptStats = (value) => {
	return {
		'hp': 'HP',
		'attack': 'ATK',
		'defense': 'DEF',
		'special-attack': 'SATK',
		'special-defense': 'SDEF',
		'speed': 'SPD'
	}[value];
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

const buildPokemonDetailArray = pokemons => {	
	pokemonModalDetails = pokemons.map(pokemon => {
		const elementTypes = pokemon.types.map(typeInfo => typeInfo.type.name);
		const weight = pokemon.weight/10 + ' kg';
		const height = pokemon.height/10 + ' m';
		const abilities = pokemon.abilities.map(item => item.ability.name);
		const urlImage = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`;
		const stats = pokemon.stats.map(item => ({type: item.stat.name, value: item.base_stat}));
		
		return {
			id: pokemon.id,
			name: pokemon.name,
			mainType: elementTypes[0],
			types:elementTypes,
			weight: weight,
			height: height,
			abilities: abilities,
			stats: stats,
			image: urlImage
		};
		
	});

	return pokemons;
}

const insertPokemonsIntoPage = pokemons => {
  const ul = document.querySelector('[data-js="pokedex"]')
  ul.innerHTML = pokemons
}	