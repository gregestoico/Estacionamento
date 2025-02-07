const db = require('../database/connection');

/** Classe modelo de Veiculo */ 
class ModelVeiculo{
    /**  Busca um veiculo pela placa */
    async findByPlaca(placa){
        const args = [placa];
        const sql = `
            SELECT * FROM Veiculo WHERE placa = ?
        `;
        const [result] = await db.query(sql, args);
        return result[0]; // Retorna o primeiro resultado
    }

    /** Busca todos os veículos cadastrados  */
    async findAll(){
        const sql = `
            SELECT * FROM Veiculo
        `;
        const [result] = await db.query(sql);
        return result; // Retorna todos as tuplas encontradas
    }

    /** Cadastra um veículo no estacionamento */
    async create(placa, modelo, cor, tipo_veic, cpf_cli){
        // Array dos valores a serem inseridos
        const args = [placa, modelo, cor, tipo_veic, cpf_cli];
        const sql = `
            INSERT INTO Veiculo (placa, modelo, cor, tipo_veic, cpf_cli) VALUES (?, ?, ?, ?, ?)
        `;
        const [result] = await db.query(sql, args);
        console.log('resultado create', result);
        return result[0]; // Retorna o primeiro resultado
    }

    /** Atualiza os dados de um veículo */
    async update(placa, modelo, cor, tipo_veic, cpf_cli){
        const args = [modelo, cor, tipo_veic, cpf_cli, placa];
        const sql = `
            UPDATE Veiculo SET modelo = ?, cor = ?, cpf_cli = ?, tipo_veic = ? WHERE placa = ?
        `;
        const [result] = await db.query(sql, args);
        return { linhasAfetadas: result.affectedRows}; // Retorna o número de linhas atualizadas
    }

    /** Exclui um veiculo da lista de cadastrados */
    async delete(placa){
        const args = [placa];
        const sql = `
            DELETE FROM Veiculo WHERE placa = ?
        `;
        const [result] = await db.query(sql, args);
        return { linhasAfetadas: result.affectedRows}; // Retorna o número de linhas excluídas
    }
};

module.exports = new ModelVeiculo()