const pokemon = require("./pokemon");

var mockPokemons = [
  { id: 1, name: "butterfree", url: "test_url", height: 10, weight: 10 },
  { id: 2, name: "pidgey", url: "test_url", height: 10, weight: 10 },
];

test("randomizePokemonId", () => {
  let id = pokemon.randomizePokemonId(11);
  expect(id).toBeLessThan(11);
  expect(id).toBeGreaterThanOrEqual(0);
});

test("getPokemons", () => {
  expect(pokemon.getPokemons()).toEqual([]);

  pokemon.setAllPokemons(mockPokemons);
  expect(pokemon.getPokemons()).toEqual(mockPokemons);
});

test("deletePokemons", () => {
  pokemon.setAllPokemons(mockPokemons);
  pokemon.deletePokemon(mockPokemons[0].id);
  expect(pokemon.getPokemons()).toEqual([mockPokemons[1]]);
  expect(pokemon.getPokemons()).not.toEqual([mockPokemons[0]]);
});

test("updatePokemon", () => {
  pokemon.setAllPokemons(mockPokemons);
  pokemon.updatePokemon(mockPokemons[0].id, 12, 12);
  expect(pokemon.getPokemons()[0]).toEqual({
    id: 1,
    name: "butterfree",
    url: "test_url",
    height: 12,
    weight: 12,
  });
});

test("getPokemonObject", () => {
  pokemon.setAllPokemons(mockPokemons);
  expect(pokemon.getPokemonObject(mockPokemons[1].id)).toEqual(mockPokemons[1]);
});
