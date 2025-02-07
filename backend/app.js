require("dotenv").config();
const express = require("express");
const connection = require("./database/connection");
const cors = require("cors");
const bodyParser = require("body-parser");
// Routes
const routerFuncionario = require("./routes/funcionario");
const routerMensalista = require("./routes/mensalista");
const routerPlano = require("./routes/plano");
const routerFatura = require("./routes/fatura");
const routerRotativo = require("./routes/rotativo");
const routerVaga = require("./routes/vaga");
const routerVeiculo = require("./routes/veiculo");
const routerEntrada = require("./routes/entrada");

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
app.use('/api/funcionario', routerFuncionario);
app.use('/api/mensalista', routerMensalista);
app.use('/api/plano', routerPlano);
app.use('/api/fatura', routerFatura);
app.use('/api/rotativo', routerRotativo);
app.use('/api/vaga', routerVaga);
app.use('/api/veiculo', routerVeiculo);
app.use('/api/entrada', routerEntrada);


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