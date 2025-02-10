const express = require("express");
const routerPrecoRotativo = express.Router();
const apiPrecoRotativo = require("../api/preco_rotativo");
const authMiddleware = require('../middleware/auth');

// Rotas do usuario por si só (funcionários com qualquer cargo podem acessar)
routerPrecoRotativo.get('/:tipo', authMiddleware(), apiPrecoRotativo.findByTipo)
routerPrecoRotativo.get('/', authMiddleware(), apiPrecoRotativo.findAll)
routerPrecoRotativo.post('/', authMiddleware(), apiPrecoRotativo.create)
routerPrecoRotativo.put('/:tipo', authMiddleware(), apiPrecoRotativo.update)
routerPrecoRotativo.delete('/:tipo', authMiddleware(), apiPrecoRotativo.delete)

module.exports = routerPrecoRotativo

