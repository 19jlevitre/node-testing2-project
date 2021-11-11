const db = require('../../data/db-config.js')

module.exports = {
  insert,
  getAll,
  getById,
  remove,
}

function getAll() {
  return db('pokemon')
}

function getById(id) {
  return db('pokemon').where('id', id ).first()
}

async function insert(pokemon) {
  // return db('pokemon').insert(pokemon, ['id', 'name']) // postgres
  return db('pokemon').insert(pokemon)
    .then(([id]) => {
      return getById(id)
    })
}

async function remove(id) {
    return db('pokemon').delete().where("id", id)
  }