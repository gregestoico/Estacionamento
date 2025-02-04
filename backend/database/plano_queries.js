const connection = require('./connection');


async function getAllPlans() {
    const [rows] = await connection.query('SELECT * FROM Plano');
    return rows;
}

module.exports = { getAllPlans };
