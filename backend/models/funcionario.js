const db = require('../database/connection');
const cargos = ['Gerente', 'Atendente'];

/** Classe modelo de Mensalista */ 
class ModelFuncionario{
    /** Busca um funcionário pelo CPF */
    async findByCpf(cpf){
        const args = [cpf];
        const sql = `
            SELECT * FROM Funcionario WHERE cpf_func = ?
        `;
        const [result] = await db.query(sql, args);
        return result[0]; // Retorna o primeiro resultado
    }

    /** Busca um funcionário pelo CPF e cargo */
    async findByCpfAndCargo(cpf, cargo){
        const args = [cpf, cargo];
        const sql = `
            SELECT * FROM Funcionario WHERE cpf_func = ? AND cargo = ?
        `;
        const [result] = await db.query(sql, args);
        return result[0]; // Retorna o primeiro resultado
    }

    /** Busca um funcionário pelo email */
    async findByEmail(email){
        const args = [email];
        const sql = `
            SELECT * FROM Funcionario WHERE email_func = ?
        `;
        const [result] = await db.query(sql, args);
        return result[0]; // Retorna o primeiro resultado
    }

    /** Busca todos os funcionários cadastrados */
    async findAll(){
        const sql = `
            SELECT * FROM Funcionario
        `;
        const [result] = await db.query(sql);
        return result; // Retorna todos as tuplas encontradas
    }

    /** Cria um funcionário */
    async create(cpf, nome, email, senha, cargo){
        console.log('funcionario: ', cpf, nome, email, senha, cargo); // debug
        // Array dos valores a serem inseridos
        const args = [cpf, nome, email, senha, cargo];
        const sql = `
            INSERT INTO Funcionario (cpf_func, nome_func, email_func, senha, cargo) VALUES (?, ?, ?, ?, ?)
        `;
        const [result] = await db.query(sql, args);
        return { linhasAfetadas: result.affectedRows}; // Retorna o número de linhas criadas
    }

    /** Atualiza um funcionário */
    async update(cpf, nome, email, cargo, senha){
        const args = [nome, email, cargo, senha, cpf];
        const sql = `
            UPDATE Funcionario SET nome_func = ?, email_func = ?, cargo = ?, senha = ? WHERE cpf_func = ?
        `;
        const [result] = await db.query(sql, args);
        return { linhasAfetadas: result.affectedRows}; // Retorna o número de linhas atualizadas
    }

    /** Exclui um funcionário */
    async delete(cpf){
        const args = [cpf];
        const sql = `
            DELETE FROM Funcionario WHERE cpf_func = ?
        `;
        const [result] = await db.query(sql, args);
        return { linhasAfetadas: result.affectedRows}; // Retorna o número de linhas excluídas
    }

    /** Retorna os cargos cadastrados */
    findCargos(){
        return cargos; // Retorna todos os cargos
    }
};

module.exports = new ModelFuncionario()