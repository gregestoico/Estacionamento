const express = require("express");
const routerEntrada = express.Router();
const apiEntrada = require("../api/entrada");
const authMiddleware = require('../middleware/auth');

// Rotas do usuario por si só (funcionários com qualquer cargo podem acessar)
routerEntrada.get('/:id', authMiddleware(), apiEntrada.findById)
routerEntrada.get('/', authMiddleware(), apiEntrada.findAll)
routerEntrada.post('/', authMiddleware(), apiEntrada.create)
routerEntrada.put('/:id', authMiddleware(), apiEntrada.update)
routerEntrada.delete('/:id', authMiddleware(), apiEntrada.delete)

module.exports = routerEntrada

