require("dotenv").config();
const express = require("express");
const connection = require("./database/connection");
const cors = require("cors");
const bodyParser = require("body-parser");
// Routes
const funcionarioRouter = require("./routes/funcionario");
// const mensalistaRouter = require("./routes/mensalista");
// const planoRouter = require("./routes/plano");
// const faturaRouter = require("./routes/fatura");
// const rotativoRouter = require("./routes/rotativo");
// const vagaRouter = require("./routes/vaga");
// const veiculoRouter = require("./routes/veiculo");
// const entradaRouter = require("./routes/entrada");

// API do funcionario, dedicada para login
const apiFuncionario = require("./api/funcionario");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// Rotas
// Rota de login (pública)
app.use("/api/login", apiFuncionario.login);

// Rotas protegidas
app.use('/api/funcionario', funcionarioRouter);
// app.use('/api/mensalista', mensalistaRouter);
// app.use('/api/plano', planoRouter);
// app.use('/api/fatura', faturaRouter);
// app.use('/api/rotativo', rotativoRouter);
// app.use('/api/vaga', vagaRouter);
// app.use('/api/veiculo', veiculoRouter);
// app.use('/api/entrada', entradaRouter);


// Verificando a conexão com o banco de dados
connection.query('SELECT 1')
    .then(() => {
        app.listen(PORT, () => {
            console.log("Conectado ao MySQL!");
            console.log(`Servidor rodando na porta ${PORT}`);
        });
    })
    .catch(err => {
        console.error("Erro ao conectar ao MySQL:", err);
    });