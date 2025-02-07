const express = require("express");
const routerRotativo = express.Router();
const apiRotativo = require("../api/rotativo");
const authMiddleware = require('../middleware/auth');

// Rotas do usuario por si só (funcionários com qualquer cargo podem acessar)
routerRotativo.get('/:cod', authMiddleware(), apiRotativo.findByCod)
routerRotativo.get('/', authMiddleware(), apiRotativo.findAll)
routerRotativo.post('/', authMiddleware(), apiRotativo.create)
routerRotativo.put('/:cod', authMiddleware(), apiRotativo.update)
routerRotativo.delete('/:cod', authMiddleware(), apiRotativo.delete)

module.exports = routerRotativo

