/**
 * Função para criar um card com os dados do funcionário.
 *
 * @param {string} nome
 * @param {string} cargo
 * @param {string} cpf
 * @returns {string} - O HTML do card do funcionário.
 */
 export function cardFuncionario(nome, cargo, cpf) {
    return `
        <div id='${cpf}' class="funcionario col-md-6 mb-3 highlight"
            data-bs-toggle="modal" 
            data-bs-target="#funcionarioModal"
            data-nome="${nome}"
            data-cargo="${cargo}"
            data-cpf="${cpf}">
            <div class="card d-flex flex-row justify-content-start p-3">
                <i class="bi bi-person-circle col-3 text-center mx-3" style="font-size: 4rem;"></i>
                <div mx-3>
                    <h5 class="card-title">${nome}</h5>
                    <p class="card-text">Cargo: ${cargo}</p>
                    <p class="card-text">CPF: ${cpf}</p>
                </div>
            </div>
        </div>
    `;
}