const db = require("../database/connection");
const queries = require("../database/queries");

const autenticarFuncionario = (email, senha, callback) => {
    db.query(queries.buscarFuncionarioPorEmail, [email, senha], (err, result) => {
        if (err) return callback(err, null);
        callback(null, result.length > 0);
    });
};

module.exports = { autenticarFuncionario };

