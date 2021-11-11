const Pokemon = require('./pokemon-model')
const db = require('../../data/db-config')
const { pokemon } = require('../../data/seeds/add-pokemon')

test('is testing environment', () => {
  expect(process.env.NODE_ENV).toBe('testing')
})

beforeAll(async () => {
  await db.migrate.rollback()
  await db.migrate.latest()
})

beforeEach(async () => {
  await db.seed.run()
})

afterAll(async () => {
  await db.destroy()
})

describe('pokemon model', () => {
  describe('getAll()', () => {
    let data
    beforeEach(async () => {
      data = await Pokemon.getAll()
    })
    test('resolves all pokemons in the db', async () => {
      expect(data.length).toBe(4)
      expect(data).toHaveLength(4)
    })
    test('resolves the correct shapes', async () => {
      expect(data).toMatchObject(pokemon)
    })
  })
  describe('getById()', () => {
    test('returns the correct pokemon', async () => {
      
      const data = await Pokemon.getById('1')
      expect(data).toMatchObject({ id: 1, name: 'pikachu' })
    })
  })
  describe('insert()', () => {

  })
})