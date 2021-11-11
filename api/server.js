const express = require('express');
const server = express()
const Pokemon = require('./pokemon/pokemon-model')
server.use(express.json())

server.get("/", (req, res) => {
    res.status(200).json({ api: "up" });
  });

  server.get("/pokemon", (req, res) => {
    Pokemon.getAll()
      .then(pokemon => {
        res.status(200).json(pokemon);
      })
      .catch(error => {
        res.status(500).json(error);
      });
  });

  server.get("/pokemon/:id", async (req, res) => {
    res.json(await Pokemon.getById(req.params.id))
  });

  server.post("/pokemon", async (req, res) => {
    res.json(await Pokemon.insert(req.body))
  });

  server.delete("/pokemon/:id", async (req, res) => {
    res.json(await Pokemon.remove(req.params.id))
  });

module.exports = server