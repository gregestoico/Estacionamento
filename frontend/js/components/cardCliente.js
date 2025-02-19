/**
 * Função para criar um card com os dados do cliente.
 *
 * @param {string} cpf
 * @param {string} nome
 * @param {string} telefone
 * @param {string} cod_plano
 * @returns {string} - O HTML do card do cliente.
 */
export function cardCliente(cpf, nome, telefone, cod_plano) {
    return `
        <div id='${cpf}' class="cliente col-md-6 mb-3 highlight"
            data-bs-toggle="modal" 
            data-bs-target="#clienteModal"
            data-nome="${nome}"
            data-telefone="${telefone}"
            data-cpf="${cpf}"
            data-cod_plano="${cod_plano}">
            <div class="card d-flex flex-row justify-content-start p-3">
                <i class="bi bi-person-circle col-3 text-center mx-3" style="font-size: 4rem;"></i>
                <div mx-3>
                    <h5 class="card-title">${nome}</h5>
                    <p class="card-text">Telefone: ${telefone}</p>
                    <p class="card-text">CPF: ${cpf}</p>
                    <p class="card-text">Plano: ${cod_plano}</p>
                </div>
            </div>
        </div>
    `;
}