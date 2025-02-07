const express = require("express");
const routerEntrada = express.Router();
const apiEntrada = require("../api/entrada");
const authMiddleware = require('../middleware/auth');

// Rotas do usuario por si só (funcionários com qualquer cargo podem acessar)
routerEntrada.get('/:cod', authMiddleware(), apiEntrada.findByCod)
routerEntrada.get('/', authMiddleware(), apiEntrada.findAll)
routerEntrada.post('/', authMiddleware(), apiEntrada.create)
routerEntrada.put('/:cod', authMiddleware(), apiEntrada.update)
routerEntrada.delete('/:cod', authMiddleware(), apiEntrada.delete)

module.exports = routerEntrada

