const generateHTML = pokemons => {
  return pokemons.reduce((accumulator, { name, id, types }) => {
    const elementTypes = types.map(typeInfo => typeInfo.type.name)
    const pokemonId = adaptSequenceNumber(id);
	
    accumulator += `
      <li class="card ${elementTypes[0]}" data-id="${id}" data-type="${elementTypes[0]}" onclick="openModal(event)">
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

const generateModalContent = pokemonItem => {
	return `
		<div id="modal" class="${pokemonItem.mainType}" data-id="${pokemonItem.id}">
			<div class="wrapper">
			 <div class="header">			
				<img class="back" onclick="closeModal()" src="./img/arrow-left2.svg"/>
				<h2>${pokemonItem.name}</h2>
				<h4>#${adaptSequenceNumber(pokemonItem.id)}</h4>
			 </div>
			 <div class="pokeball-image">
				<img src="./img/pokeball-white.png">
			 </div>
			 <div class="arrow-gallery">
				<div class="wrapper-seletors">
					<img class="prev" onclick="previousItemGallery(event)" src="./img/arrow-select-right.svg"/>
					<img class="next" onclick="nextItemGallery(event)" src="./img/arrow-select-right.svg"/>
				</div>
			 </div>
			 <div class="detail">
				<div class="pokemon-image">
					<img src="${pokemonItem.image}"/>
				</div>
				<ul class="types">
					${generateModalDetailType(pokemonItem)}
				</ul>
				<h3 class="color-${pokemonItem.mainType}">About</h3>
				<ul class="perfil-detail">
					${generateModalPerfilDetail(pokemonItem)}
				</ul>
				<h3 class="color-${pokemonItem.mainType} base-stats-title">Base Stats</h3>
				<ul class="perfil-stats">
					${generateModalStatsDetail(pokemonItem)}
				</ul>
			 </div>
			</div>
		</div>
	`
}

const generateModalStatsDetail = pokemonItem => {
	return pokemonItem.stats.reduce((accumulator, { type, value }) => {
		accumulator += `
			<li>
				<p class="color-${pokemonItem.mainType}">${adaptStats(type)}</p>
				<span class="bar"></span>
				<div class="stats-side-right">
					<label>${adaptSequenceNumber(value)}</label>
					<div class="container-progress-bar">
						<div class="progress-bar ${pokemonItem.mainType}" style="width:${value}px"></div>
					</div>
				</div>
			</li>
		`
		return accumulator
	}, "")
}

const generateModalDetailType = pokemonItem => {
	return pokemonItem.types.reduce((accumulator, type) => {
		accumulator += `
			<li class="${type}">
				${type}
			</li>
		`
		return accumulator
	}, "")
}

const generateModalPerfilDetail = pokemonItem => {
	const buildAbilities = () => {
		return pokemonItem.abilities.reduce((accumulator, ability) => {
			accumulator += `
				<p>${ability}</p>
			`
			return accumulator
		}, "")
	}
	
	return `
		<li>
			<div class="icon">
			    <img class="weight" src="./img/weight.svg"/>
				${pokemonItem.weight}
			</div>
			<h3>Weight</h3>
		</li>
		<li>
			<div class="icon">
				<img class="weight" src="./img/height.svg"/>
				${pokemonItem.height}
			</div>
			<h3>Height</h3>
		</li>
		<li>
			<div>
				${buildAbilities()}
			</div>
			<h3>Moves</h3>
		</li>
	`
	
}
