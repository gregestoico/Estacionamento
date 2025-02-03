const mysql = require("mysql");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "", // Senha do MySQL (caso tenha)
    database: "sistema_estacionamento"
});

connection.connect(err => {
    if (err) {
        console.error("Erro ao conectar ao MySQL:", err);
    } else {
        console.log("Conectado ao MySQL!");
    }
});

module.exports = connection;

