const connection = require('./connection');

async function createClientAndVehicle(client, vehicle) {
    const conn = await connection.getConnection();
    
    try {
        await conn.beginTransaction();
        
        await conn.query(
            'INSERT INTO Mensalista (cpf_cli, nome_cli, email_cli, telefone_cli, cod_plano) VALUES (?, ?, ?, ?, ?)',
            [client.cpf, client.nome, client.email, client.telefone, client.codPlano]
        );
        
        await conn.query(
            'INSERT INTO Veiculo (placa, modelo, cor, tipo_veic, cpf_cli) VALUES (?, ?, ?, ?, ?)',
            [vehicle.placa, vehicle.modelo, vehicle.cor, vehicle.tipo, client.cpf]
        );
        
        await conn.commit();
    } catch (error) {
        await conn.rollback();
        throw error;
    } finally {
        conn.release();
    }
}

module.exports = { createClientAndVehicle };
