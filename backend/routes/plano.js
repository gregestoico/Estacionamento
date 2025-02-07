const express = require("express");
const routerPlano = express.Router();
const apiPlano = require("../api/plano");
const authMiddleware = require('../middleware/auth');

// Rotas do usuario por si só (funcionários com qualquer cargo podem acessar)
routerPlano.get('/:cod', authMiddleware(), apiPlano.findByCod)
routerPlano.get('/', authMiddleware(), apiPlano.findAll)
routerPlano.post('/', authMiddleware(), apiPlano.create)
routerPlano.put('/:cod', authMiddleware(), apiPlano.update)
routerPlano.delete('/:cod', authMiddleware(), apiPlano.delete)

module.exports = routerPlano

