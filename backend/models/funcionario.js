const db = require('../database/connection');

// Classe modelo de Funcionário
class ModelFuncionario{
    // Busca um funcionário pelo CPF
    async findByCpf(cpf){
        const args = [cpf];
        const sql = `
            SELECT * FROM Funcionario WHERE cpf_func = ?
        `;
        const [result] = await db.query(sql, args);
        return result[0]; // Retorna o primeiro resultado
    }

    // Cria um funcionário\
    async create(cpf, nome, email, senha, cargo){
        // Array dos valores a serem inseridos
        const args = [cpf, nome, email, senha, cargo];
        const sql = `
            INSERT INTO Funcionario (cpf_func, nome_func, email_func, senha, cargo) VALUES (?, ?, ?, ?, ?)
        `;
        const [result] = await db.query(sql, args);
        console.log('resultado create', result);
        return result[0]; // Retorna o primeiro resultado
    }

    // Busca um funcionário pelo email
    async findByEmail(email){
        const args = [email];
        const sql = `
            SELECT * FROM Funcionario WHERE email_func = ?
        `;
        const [result] = await db.query(sql, args);
        return result[0]; // Retorna o primeiro resultado
    }

    // Busca todos os funcionários
    async findAll(){
        const sql = `
            SELECT * FROM Funcionario
        `;
        const [result] = await db.query(sql);
        return result; // Retorna todos as tuplas encontradas
    }

    // Atualiza um funcionário
    async update(cpf, nome, email, cargo, senha){
        const args = [nome, email, cargo, senha, cpf];
        console.log('args', args);
        const sql = `
            UPDATE Funcionario SET nome_func = ?, email_func = ?, cargo = ?, senha = ? WHERE cpf_func = ?
        `;
        const [result] = await db.query(sql, args);
        return result[0]; // Retorna o primeiro resultado
    }

    // Exclui um funcionário
    async delete(cpf){
        const args = [cpf];
        const sql = `
            DELETE FROM Funcionario WHERE cpf_func = ?
        `;
        const [result] = await db.query(sql, args);
        return result[0]; // Retorna o primeiro resultado
    }

    // Busca um funcionário pelo CPF e cargo
    async findByCpfAndCargo(cpf, cargo){
        const args = [cpf, cargo];
        const sql = `
            SELECT * FROM Funcionario WHERE cpf_func = ? AND cargo = ?
        `;
        const [result] = await db.query(sql, args);
        return result[0]; // Retorna o primeiro resultado
    }
};

module.exports = new ModelFuncionario()