// O mysql2 suporta promises, então podemos usar async/await para simplificar o código.
const mysql = require('mysql2');

    const connection = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "", // Senha do MySQL (caso tenha)
        database: "sistema_estacionamento"
    }).promise(); // Adicionando o suporte nativo do mysql2 para promises

module.exports = connection;

