const authService = require("../services/authService");

const login = (req, res) => {
    const { email, senha } = req.body;

    authService.autenticarFuncionario(email, senha, (err, success) => {
        if (err) {
            res.status(500).json({ message: "Erro no servidor" });
        } else if (success) {
            res.json({ success: true, message: "Login bem-sucedido!" });
        } else {
            res.json({ success: false, message: "E-mail ou senha incorretos" });
        }
    });
};

module.exports = { login };

