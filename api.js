const pokeCard = document.querySelector('[data-poke-card]');
const pokeName = document.querySelector('[data-poke-name]');
const pokeImg = document.querySelector('[data-poke-img]');
const pokeImgContainer = document.querySelector('[data-poke-img-container]');
const pokeId = document.querySelector('[data-poke-id]');
const pokeTypes = document.querySelector('[data-poke-types]');
const pokeStats = document.querySelector('[data-poke-stats]');

const typeColors = {
    electric: '#FFEA70',
    normal: '#B09398',
    fire: '#FF675C',
    water: '#0596C7',
    ice: '#AFEAFD',
    rock: '#999799',
    flying: '#7AE7C7',
    grass: '#4A9681',
    psychic: '#FFC6D9',
    ghost: '#561D25',
    bug: '#A2FAA3',
    poison: '#795663',
    ground: '#D2B074',
    dragon: '#DA627D',
    steel: '#1D8A99',
    fighting: '#2F2F2F',
    default: '#2A1A1F',
};

const searchPokemon = event => {
    event.preventDefault();
    //We get te value input.
    const { value } = event.target.pokemon;
    fetch(`https://pokeapi.co/api/v2/pokemon/${value.toLowerCase()}`)
        //We get the answer and pass it to Json.
        .then(data => data.json())
        .then(response => renderPokemonData(response))
        .catch(err => renderNotFound());
}
//All character about pokemon.
const renderPokemonData = data => {
    //We get the dates of pokemon like img.
    const sprite = data.sprites.front_default;
    //we get stats and typos of pokemon.
    const { stats, types } = data;
    //we get the info of pokemon and save in her inputs.
    pokeName.textContent = data.name;
    pokeImg.setAttribute('src', sprite);
    pokeId.textContent = `N ${data.id}`;
    //The background color card.
    setCardColor(types);
    //Setear los typos de caract de pokemon.
    renderPokemonTypes(types);
    //Setear los stats de cada pokemon.
    renderPokemonStats(stats);
}

const setCardColor = types => {
    //Choose the background color.
    const colorOne = typeColors[types[0].type.name];
    const colorTwo = types[1] ? typeColors[types[1].type.name] : typeColors.default;
    pokeImg.style.background = `radial-gradient(${colorTwo} 33$, ${colorOne} 33%)`;
    pokeImg.style.backgroundSize = '5px 5px';
}

const renderPokemonTypes  = types => {
    pokeTypes.innerHTML = '';
    types.forEach(type => {
        //Create a div.
        const typeTextElement = document.createElement('div');
        //Do a color.
        typeTextElement.style.color = typeColors[type.type.name];
        //we provide content.
        typeTextElement.textContent = type.type.name;
        pokeTypes.appendChild(typeTextElement);
    });
}

const renderPokemonStats = stats => {
    pokeStats.innerHTML = '';
    stats.forEach(stat => {
        //Create a div.
        const statElement = document.createElement('div');
        const statElementName = document.createElement('div');
        const statElementAmount = document.createElement('div');
        //we provide content.
        statElementName.textContent = stat.stat.name;
        statElementAmount.textContent = stat.base_stat;
        //Al stateElemente we give 2 create element.
        statElement.appendChild(statElementName);
        statElement.appendChild(statElementAmount);
        //Al pokestats we giv statElement
        pokeStats.appendChild(statElement);
    });
}

const renderNotFound = () =>{
    pokeName.innerHTML = 'No encontrado';
    pokeImg.setAttribute('src', 'pokemon.jpg');
    pokeImg.style.background = '#fff';
    pokeTypes.innerHTML = '';
    pokeStats.innerHTML = '';
    pokeId.textContent = '';
}