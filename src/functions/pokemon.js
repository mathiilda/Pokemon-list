const pokemonApi = "https://pokeapi.co/api/v2/";
var allPokemons = [];
var allPokemonIds = [];

/*
 * Här randomiserar jag fram en siffra för att sedan kunna
 * få ut en random pokémon från listan.
 * Om det redan finns en pokémon med samma id i listan anropar
 * jag funktionen tills ett id som ej finns returneras från
 * randomiseringen.
 */
export function randomizePokemonId(max) {
  let pokemonId = Math.floor(Math.random() * max);

  if (allPokemonIds.includes(pokemonId)) {
    return randomizePokemonId(max);
  } else {
    allPokemonIds.push(pokemonId);
    return pokemonId;
  }
}

export async function getPokemonDetails(url) {
  return await fetch(url)
    .then((pokemonData) => pokemonData.json())
    .then(function (pokemonData) {
      return pokemonData;
    });
}

/*
 * Här skapar jag en pokemon genom att hämta ut alla pokemons av
 * typ 3 från API:et. Efter detta randomiserar jag fram ett unikt pokemon id, baserat
 * på hur många pokemons som finns i listan. Efter att jag har fått ut en specifik
 * pokémon anropar jag getPokemonDetails för att få ut mer information om
 * den specifika pokémonen. I detta fallet har jag valt att hämta pokémonens
 * vikt och längd. Efter detta skapar jag ett pokémonobjekt som jag lägger till
 * i listan med pokémons.
 */
export async function createPokemon() {
  return await fetch(pokemonApi + "type/3")
    .then((pokemonData) => pokemonData.json())
    .then(async function (pokemonData) {
      let pokemonId = randomizePokemonId(pokemonData.pokemon.length);
      let url = pokemonData.pokemon[pokemonId].pokemon.url;
      let pokemonDetails = await getPokemonDetails(url);
      let pokemonObject = {
        id: pokemonId,
        name: pokemonData.pokemon[pokemonId].pokemon.name,
        url: url,
        height: pokemonDetails.height,
        weight: pokemonDetails.weight,
      };
      allPokemons.push(pokemonObject);
    });
}

export function deletePokemon(id) {
  allPokemons = allPokemons.filter((pokemon) => pokemon.id !== id);
}

export function updatePokemon(id, newWeight, newHeight) {
  let index = allPokemons.findIndex((pokemon) => pokemon.id === id);
  allPokemons[index].weight = newWeight;
  allPokemons[index].height = newHeight;
}

export function getPokemons() {
  return allPokemons;
}

export function getPokemonObject(id) {
  return allPokemons.find((pokemon) => pokemon.id === id);
}

export function setAllPokemons(pokemons) {
  allPokemons = pokemons;
}
