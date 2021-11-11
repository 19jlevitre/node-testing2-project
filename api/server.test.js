const server = require('./server')
const request = require('supertest')
const db = require('../data/db-config')

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

describe('[GET] /pokemon', () => {
  test('responds with all the pokemon', async () => {
    const res = await request(server).get('/pokemon')
    expect(res.status).toBe(200)
    expect(res.body).toHaveLength(4)
  })
})

describe('[GET] /pokemon/:id', () => {
  test('responds with pikachu', async () => {
    const res = await request(server).get('/pokemon/1')
    expect(res.body).toMatchObject({ id: 1, name: 'pikachu' })
  })
})

describe('[POST] /pokemon', () => {
  test('responds with new pokemon', async () => {
    const res = await request(server)
      .post('/pokemon').send({ name: 'charizard' })
    expect(res.body).toMatchObject({name: "charizard" })
  })
  test('responds with status 201', async () => {
    const res = await request(server).post('/pokemon').send({name: "charizard"})
    expect(res.status).toBe(200)
  })
})

describe('[DELETE] /pokemon/:id', () => {
    test('deletes pokemon from db', async () => {
     await request(server)
        .delete('/pokemon/1')
        const res = await request(server).get('/pokemon')
      expect(res.body).toHaveLength(3)
    })
    test('responds with amount of pokemon deleted', async () => {
      const res = await request(server).delete('/pokemon/1')
      expect(res.body).toBe(1)
    })
  })
