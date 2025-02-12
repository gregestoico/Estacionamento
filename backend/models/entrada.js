const db = require('../database/connection');

/** Classe modelo de Entrada */ 
class ModelEntrada{
    /**  Busca uma entrada pelo id */
    async findById(id_entrada){
        const args = [id_entrada];
        const sql = `
            SELECT * FROM Entrada WHERE id_entrada = ?
        `;
        const [result] = await db.query(sql, args);
        return result[0]; // Retorna o primeiro resultado
    }

    /** Busca todas as entradas cadastradas  */
    async findAll(){
        const sql = `
            SELECT * FROM Entrada
        `;
        const [result] = await db.query(sql);
        return result; // Retorna todos as tuplas encontradas
    }

    /** Cadastra uma entrada no estacionamento */
    async create(id_entrada, hora_entrada, hora_saida, valor_cobrado, placa_veic, cod_vaga, cpf_func){
        // Array dos valores a serem inseridos
        const args = [id_entrada, hora_entrada, hora_saida, valor_cobrado, placa_veic, cod_vaga, cpf_func];
        const sql = `
            INSERT INTO Entrada (id_entrada, hora_entrada, hora_saida, valor_cobrado, placa_veic, cod_vaga, cpf_func) VALUES (?, ?, ?, ?, ?, ?, ?)
        `;
        const [result] = await db.query(sql, args);
        return { linhasAfetadas: result.affectedRows}; // Retorna o número de linhas inseridas
    }

    /** Atualiza uma entrada registrada */
    async update(id_entrada, hora_entrada, hora_saida, valor_cobrado, placa_veic, cod_vaga, cpf_func){
        const args = [hora_entrada, hora_saida, valor_cobrado, placa_veic, cod_vaga, cpf_func, id_entrada];
        const sql = `
            UPDATE Entrada SET hora_entrada = ?, hora_saida = ?, valor_cobrado = ?, placa_veic = ?, cod_vaga = ?, cpf_func = ? WHERE id_entrada = ?
        `;
        const [result] = await db.query(sql, args);
        return { linhasAfetadas: result.affectedRows}; // Retorna o número de linhas atualizadas
    }

    /** Exclui uma entrada registrada */
    async delete(id_entrada){
        const args = [id_entrada];
        const sql = `
            DELETE FROM Entrada WHERE id_entrada = ?
        `;
        const [result] = await db.query(sql, args);
        return { linhasAfetadas: result.affectedRows}; // Retorna o número de linhas excluídas
    }

    /** Pesquisa todos os atributos associações a uma vaga atualmente ocupada */
    async findVagaOcupada(cod_vaga){
        const args = [cod_vaga];
        // Dada uma vaga, retorna as informações da entrada, vaga, veículo e mensalista
        const sql = `
            SELECT * FROM Entrada 
            JOIN Vaga ON Entrada.cod_vaga = Vaga.cod_vaga
            JOIN Veiculo ON Entrada.placa_veic = Veiculo.placa
            JOIN Mensalista ON Veiculo.cpf_cli = Mensalista.cpf_cli
            WHERE Vaga.cod_vaga = ? AND Entrada.hora_saida IS NULL
        `;
    const [result] = await db.query(sql, args);
    return result[0] || result; // Retorna todos as tuplas encontradas
    }
};

module.exports = new ModelEntrada()