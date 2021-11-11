const pokemon = [
  { name: 'pikachu' },
  { name: 'bulbasaur' },
  { name: 'squirtle' },
  { name: "charmander" }
]
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('pokemon')
    .truncate()
    .then(function () {
      return knex('pokemon').insert(pokemon);
    });
};

exports.pokemon = pokemon
