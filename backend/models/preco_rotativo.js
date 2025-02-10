const db = require('../database/connection');

/** Classe modelo de Preco do Rotativo */ 
class ModelPrecoRotativo{
    /**  Busca um valor da tabela de rotativo pelo tipo de veículo */
    async findByTipo(tipo_veic){
        const args = [tipo_veic];
        const sql = `
            SELECT * FROM Preco_Rotativo WHERE tipo_veic = ?
        `;
        const [result] = await db.query(sql, args);
        return result[0]; // Retorna o primeiro resultado
    }

    /** Busca todos os valores da tabela  */
    async findAll(){
        const sql = `
            SELECT * FROM Preco_Rotativo
        `;
        const [result] = await db.query(sql);
        return result; // Retorna todos as tuplas encontradas
    }

    /** Cria um valor pelo tipo de veículo */
    async create(tipo_veic, valor_hora){
        // Array dos valores a serem inseridos
        const args = [tipo_veic, valor_hora];
        const sql = `
            INSERT INTO Preco_Rotativo (tipo_veic, valor_hora) VALUES (?, ?)
        `;
        const [result] = await db.query(sql, args);
        return { linhasAfetadas: result.affectedRows}; // Retorna o número de linhas inseridas
    }

    /** Atualiza um valor por tipo de veículo */
    async update(tipo_veic, valor_hora){
        const args = [valor_hora, tipo_veic];
        const sql = `
            UPDATE Preco_Rotativo SET valor_hora = ? WHERE tipo_veic = ?
        `;
        const [result] = await db.query(sql, args);
        return { linhasAfetadas: result.affectedRows}; // Retorna o número de linhas atualizadas
    }

    /** Exclui um valor por tipo */
    async delete(tipo_veic){
        const args = [tipo_veic];
        const sql = `
            DELETE FROM Preco_Rotativo WHERE tipo_veic = ?
        `;
        const [result] = await db.query(sql, args);
        return { linhasAfetadas: result.affectedRows}; // Retorna o número de linhas excluídas
    }
};

module.exports = new ModelPrecoRotativo()