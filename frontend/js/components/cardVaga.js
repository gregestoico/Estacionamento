/**
 * Função para criar um card com os dados da vaga.
 *
 * @param {string} codigo - O código identificador da vaga.
 * @param {string} tipo - O tipo da vaga (e.g., "Carro", "Moto").
 * @param {string} situacao - A situação da vaga (e.g., "Livre", "Ocupada", "Reservada").
 * @returns {string} - O HTML do card da vaga.
 */
 /** Função para criar um card com os dados da vaga */

export function cardVaga(codigo, tipo, situacao) {
    // Mapeia uma cor para cada situação da vaga
    const cores = {
        'Livre': 'background-color: rgb(240, 240, 240); color: dark;',    // Um cinza claro (RGB)
        'Ocupada': 'background-color: hsl(0, 0.00%, 55.10%); color: dark;',     // Um cinza médio (HSL)
        'Reservada': 'background-color: hsl(0, 0.00%, 80.00%); color: dark;'     // Um cinza médio (HSL)
    };
    return `
        <div class="col-md-4">
            <div id='vaga${codigo}' class="vaga-card highlight card mb-3" style="${cores[situacao]}"
                data-bs-toggle="modal" 
                data-bs-target="#vagaModal"
                data-codigo="${codigo}"
                data-tipo="${tipo}"
                data-situacao="${situacao}">
                <div class="card-header">Vaga ${codigo}</div>
                <div class="card-body">
                    <h5 class="card-title">${situacao}</h5>
                    <p class="card-text">${tipo}</p>
                </div>
            </div>
        </div>
    `;
}