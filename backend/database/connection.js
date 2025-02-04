const mysql = require("mysql2/promise");

const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "", // Defina a senha do MySQL, se houver
    database: "sistema_estacionamento",
    waitForConnections: true,
    connectionLimit: 10, // Número máximo de conexões simultâneas
    queueLimit: 0
});

module.exports = pool;

