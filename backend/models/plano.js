const db = require('../database/connection');

/** Classe modelo de Plano */ 
class ModelPlano{
    /**  Busca um plano pelo código */
    async findByCod(cod_plano){
        const args = [cod_plano];
        const sql = `
            SELECT * FROM Plano WHERE cod_plano = ?
        `;
        const [result] = await db.query(sql, args);
        return result[0]; // Retorna o primeiro resultado
    }

    /** Busca todos os planos cadastrados  */
    async findAll(){
        const sql = `
            SELECT * FROM Plano
        `;
        const [result] = await db.query(sql);
        return result; // Retorna todos as tuplas encontradas
    }

    /** Cria um plano */
    async create(cod_plano, turno, preco_mensal){
        // Array dos valores a serem inseridos
        const args = [cod_plano, turno, preco_mensal];
        const sql = `
            INSERT INTO Plano (cod_plano, turno, preco_mensal) VALUES (?, ?, ?)
        `;
        const [result] = await db.query(sql, args);
        return { linhasAfetadas: result.affectedRows}; // Retorna o número de linhas criadas
    }

    /** Atualiza um plano mensal */
    async update(cod_plano, turno, preco_mensal){
        const args = [turno, preco_mensal, cod_plano];
        const sql = `
            UPDATE Plano SET turno = ?, preco_mensal = ? WHERE cod_plano = ?
        `;
        const [result] = await db.query(sql, args);
        return { linhasAfetadas: result.affectedRows}; // Retorna o número de linhas atualizadas
    }

    /** Exclui um plano mensal */
    async delete(cod_plano){
        const args = [cod_plano];
        const sql = `
            DELETE FROM Plano WHERE cod_plano = ?
        `;
        const [result] = await db.query(sql, args);
        return { linhasAfetadas: result.affectedRows}; // Retorna o número de linhas excluídas
    }
};

module.exports = new ModelPlano()