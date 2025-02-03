module.exports = {
    buscarFuncionarioPorEmail: "SELECT * FROM Funcionario WHERE email_func = ? AND senha = ?",
    inserirEntradaVeiculo: "INSERT INTO Entrada (cpf_cli, placa_veic, hora_entrada) VALUES (?, ?, ?)"
};

