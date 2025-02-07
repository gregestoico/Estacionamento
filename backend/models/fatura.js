const db = require('../database/connection');

/** Classe modelo de Fatura */ 
class ModelFatura{
    /**  Busca uma fatura pelo código */
    async findByCod(cod_fatura){
        const args = [cod_fatura];
        const sql = `
            SELECT * FROM Fatura WHERE cod_fatura = ?
        `;
        const [result] = await db.query(sql, args);
        return result[0]; // Retorna o primeiro resultado
    }

    /** Busca todos os faturas cadastrados  */
    async findAll(){
        const sql = `
            SELECT * FROM Fatura
        `;
        const [result] = await db.query(sql);
        return result; // Retorna todos as tuplas encontradas
    }

    /** Cria uma fatura */
    async create(cod_fatura, data_venc, data_pag, cpf_cli){
        // Array dos valores a serem inseridos
        const args = [cod_fatura, data_venc, data_pag, cpf_cli];
        const sql = `
            INSERT INTO Fatura (cod_fatura, data_venc, data_pag, cpf_cli) VALUES (?, ?, ?, ?)
        `;
        const [result] = await db.query(sql, args);
        return result[0]; // Retorna o primeiro resultado
    }

    /** Atualiza uma fatura */
    async update(cod_fatura, data_venc, data_pag, cpf_cli){
        const args = [data_venc, data_pag, cpf_cli, cod_fatura];
        const sql = `
            UPDATE Fatura SET data_venc = ?, data_pag = ?, cpf_cli = ?, WHERE cod_fatura = ?
        `;
        const [result] = await db.query(sql, args);
        return { linhasAfetadas: result.affectedRows}; // Retorna o número de linhas atualizadas
    }

    /** Exclui uma fatura */
    async delete(cod_fatura){
        const args = [cod_fatura];
        const sql = `
            DELETE FROM Fatura WHERE cod_fatura = ?
        `;
        const [result] = await db.query(sql, args);
        return { linhasAfetadas: result.affectedRows}; // Retorna o número de linhas excluídas
    }
};

module.exports = new ModelFatura()