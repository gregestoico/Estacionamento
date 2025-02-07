const db = require('../database/connection');

/** Classe modelo de Mensalista */ 
class ModelMensalista{
    /**  Busca um cliente mensalista pelo CPF */
    async findByCpf(cpf){
        const args = [cpf];
        const sql = `
            SELECT * FROM Mensalista WHERE cpf_cli = ?
        `;
        const [result] = await db.query(sql, args);
        return result[0]; // Retorna o primeiro resultado
    }

    /** Busca todos os clientes mensalistas  */
    async findAll(){
        const sql = `
            SELECT * FROM Mensalista
        `;
        const [result] = await db.query(sql);
        return result; // Retorna todos as tuplas encontradas
    }

    /** Cria um cliente mensalista */
    async create(cpf, nome, email, telefone, cod_plano){
        // Array dos valores a serem inseridos
        const args = [cpf, nome, email, telefone, cod_plano];
        const sql = `
            INSERT INTO Mensalista (cpf_cli, nome_cli, email_cli, telefone_cli, cod_plano) VALUES (?, ?, ?, ?, ?)
        `;
        const [result] = await db.query(sql, args);
        console.log('resultado create', result);
        return result[0]; // Retorna o primeiro resultado
    }

    /** Atualiza um cliente mensalista */
    async update(cpf, nome, email, telefone, cod_plano){
        const args = [nome, email, telefone, cod_plano, cpf];
        const sql = `
            UPDATE Mensalista SET nome_cli = ?, email_cli = ?, telefone_cli = ?, cod_plano = ? WHERE cpf_cli = ?
        `;
        const [result] = await db.query(sql, args);
        return { linhasAfetadas: result.affectedRows}; // Retorna o número de linhas atualizadas
    }

    /** Exclui um cliente mensalista */
    async delete(cpf){
        const args = [cpf];
        const sql = `
            DELETE FROM Mensalista WHERE cpf_cli = ?
        `;
        const [result] = await db.query(sql, args);
        return { linhasAfetadas: result.affectedRows}; // Retorna o número de linhas excluídas
    }
};

module.exports = new ModelMensalista()