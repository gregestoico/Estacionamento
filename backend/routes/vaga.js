const express = require("express");
const routerVaga = express.Router();
const apiVaga = require("../api/vaga");
const authMiddleware = require('../middleware/auth');

// Rotas do usuario por si só (funcionários com qualquer cargo podem acessar)
routerVaga.get('/:cod', authMiddleware(), apiVaga.findByCod)
routerVaga.get('/', authMiddleware(), apiVaga.findAll)
routerVaga.post('/', authMiddleware(), apiVaga.create)
routerVaga.put('/:cod', authMiddleware(), apiVaga.update)
routerVaga.delete('/:cod', authMiddleware(), apiVaga.delete)

module.exports = routerVaga

