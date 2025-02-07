const db = require('../database/connection');

/** Classe modelo de Vaga */ 
class ModelVaga{
    /**  Busca uma vaga pelo código */
    async findByCod(cod_vaga){
        const args = [cod_vaga];
        const sql = `
            SELECT * FROM Vaga WHERE cod_vaga = ?
        `;
        const [result] = await db.query(sql, args);
        return result[0]; // Retorna o primeiro resultado
    }

    /** Busca todas as vagas cadastradas no estacionamento  */
    async findAll(){
        const sql = `
            SELECT * FROM Vaga
        `;
        const [result] = await db.query(sql);
        return result; // Retorna todos as tuplas encontradas
    }

    /** Cria uma vaga */
    async create(cod_vaga, tipo_veic, situacao){
        // Array dos valores a serem inseridos
        const args = [cod_vaga, tipo_veic, situacao];
        const sql = `
            INSERT INTO Vaga (cod_vaga, tipo_veic, situacao) VALUES (?, ?, ?)
        `;
        const [result] = await db.query(sql, args);
        console.log('resultado create', result);
        return result[0]; // Retorna o primeiro resultado
    }

    /** Atualiza uma vaga */
    async update(cod_vaga, tipo_veic, situacao){
        const args = [tipo_veic, situacao, cod_vaga];
        const sql = `
            UPDATE Vaga SET tipo_veic = ?, situacao = ? WHERE cod_vaga = ?
        `;
        const [result] = await db.query(sql, args);
        return { linhasAfetadas: result.affectedRows}; // Retorna o número de linhas atualizadas
    }

    /** Exclui uma vaga */
    async delete(cod_vaga){
        const args = [cod_vaga];
        const sql = `
            DELETE FROM Vaga WHERE cod_vaga = ?
        `;
        const [result] = await db.query(sql, args);
        return { linhasAfetadas: result.affectedRows}; // Retorna o número de linhas excluídas
    }
};

module.exports = new ModelVaga()