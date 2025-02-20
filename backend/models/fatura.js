const db = require('../database/connection');

/** Classe modelo de Fatura */ 
class ModelFatura{
    /**  Busca uma fatura pelo código */
    async findByCod(cod_fatura){
        const args = [cod_fatura];
        const sql = `
            SELECT Fatura.*, Mensalista.nome_cli, Plano.turno, Plano.preco_mensal
            FROM Fatura
            JOIN Mensalista ON Fatura.cpf_cli = Mensalista.cpf_cli
            JOIN Plano ON Mensalista.cod_plano = Plano.cod_plano 
            WHERE cod_fatura = ?
        `;
        const [result] = await db.query(sql, args);
        return result[0]; // Retorna o primeiro resultado
    }

    /** Busca todas as faturas cadastradas  */
    async findAll(){
        const sql = `
            SELECT Fatura.*, Mensalista.nome_cli, Plano.turno, Plano.preco_mensal
            FROM Fatura
            JOIN Mensalista ON Fatura.cpf_cli = Mensalista.cpf_cli
            JOIN Plano ON Mensalista.cod_plano = Plano.cod_plano
            ORDER BY Fatura.data_venc ASC
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
        return { linhasAfetadas: result.affectedRows}; // Retorna o número de linhas inseridas
    }

    /** Atualiza uma fatura */
    async update(cod_fatura, data_venc, data_pag, cpf_cli){
        const args = [data_venc, data_pag, cpf_cli, cod_fatura];
        const sql = `
            UPDATE Fatura SET data_venc = ?, data_pag = ?, cpf_cli = ? WHERE cod_fatura = ?
        `;
        const [result] = await db.query(sql, args);
        return { linhasAfetadas: result.affectedRows}; // Retorna o número de linhas atualizadas
    }

    async updateHoraAtual(cod_fatura){
        const args = [cod_fatura];
        const sql = `
            UPDATE Fatura SET data_pag = NOW() WHERE cod_fatura = ?
        `;
        const [result] = await db.query(sql, args);
        return { linhasAfetadas: result.affectedRows}; // Retorna o número de linhas atualizadas
    }

    /** Calcula o faturamento de acordo com o cliente */
    async faturamento(cpf_cli = null){
        let sql = `
            SELECT SUM(Plano.preco_mensal) AS faturamento_mensal
            FROM Fatura
            JOIN Mensalista ON Fatura.cpf_cli = Mensalista.cpf_cli
            JOIN Plano ON Mensalista.cod_plano = Plano.cod_plano
            WHERE Fatura.data_pag IS NOT NULL
        `;
        const args = [];

        if (cpf_cli) {
            sql += ` AND Fatura.cpf_cli = ?`;
            args.push(cpf_cli);
        }

        const [result] = await db.query(sql, args);
        return result[0]; // Retorna o primeiro resultado
    }

    /** Calcula o faturamento total de cada mensalista */
    async faturamentoMensalistas(valorMinimo){
        const args = [valorMinimo];
        const sql = `
            SELECT Mensalista.cpf_cli, Mensalista.nome_cli, SUM(Plano.preco_mensal) AS faturamento_total
            FROM Fatura
            JOIN Mensalista ON Fatura.cpf_cli = Mensalista.cpf_cli
            JOIN Plano ON Mensalista.cod_plano = Plano.cod_plano
            WHERE Fatura.data_pag IS NOT NULL
            GROUP BY Mensalista.cpf_cli
            HAVING faturamento_total >= ?
        `;
        const [result] = await db.query(sql, args);
        return result; // Retorna todos as tuplas encontradas
    }

    /** Listar as faturas pagas de clientes que já pagaram mais de um certo valor em faturas. */
    async faturasDeFaturamentoMin(valorMinimo){
        const args = [valorMinimo];
        const sql = `
            SELECT Fatura.*, Mensalista.nome_cli, Plano.turno, Plano.preco_mensal
            FROM Fatura
            JOIN Mensalista ON Fatura.cpf_cli = Mensalista.cpf_cli
            JOIN Plano ON Mensalista.cod_plano = Plano.cod_plano
            WHERE Fatura.cpf_cli IN (
                SELECT Fatura.cpf_cli
                FROM Fatura
                JOIN Mensalista ON Fatura.cpf_cli = Mensalista.cpf_cli
                JOIN Plano ON Mensalista.cod_plano = Plano.cod_plano
                WHERE Fatura.data_pag IS NOT NULL
                GROUP BY Fatura.cpf_cli
                HAVING SUM(Plano.preco_mensal) >= ?
            )
            ORDER BY Fatura.data_venc ASC
        `;
        const [result] = await db.query(sql, args);
        return result; // Retorna todos as tuplas encontradas
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