/**
 * Função para criar um card com os dados da entrada.
 *
 * @param {string} id_entrada
 * @param {string} hora_entrada
 * @param {string} hora_saida
 * @param {number} valor_cobrado
 * @param {string} placa_veic
 * @param {string} cod_vaga
 * @param {string} cpf_func
 * @returns {string} - O HTML do card da entrada.
 */
export function cardEntrada(id_entrada, hora_entrada, hora_saida, valor_cobrado, placa_veic, cod_vaga, cpf_func) {
    const entrada = document.createElement('div');
    entrada.id = id_entrada;
    entrada.className = 'entrada col-md-12 mb-3 highlight';
    entrada.setAttribute('data-id_entrada', id_entrada);
    entrada.setAttribute('data-hora_entrada', hora_entrada);
    entrada.setAttribute('data-hora_saida', hora_saida);
    entrada.setAttribute('data-valor_cobrado', valor_cobrado);
    entrada.setAttribute('data-placa_veic', placa_veic);
    entrada.setAttribute('data-cod_vaga', cod_vaga);
    entrada.setAttribute('data-cpf_func', cpf_func);
    entrada.innerHTML = `
        <div class="card d-flex flex-row justify-content-start p-3 align-items-center">
            <i class="bi bi-clock-history col-3 text-center mx-3" style="font-size: 4rem;"></i>
            <div class="mx-3">
                <h5 class="card-title">Entrada: ${id_entrada}</h5>
                <p class="card-text">Hora de Entrada: ${hora_entrada}</p>
                <p class="card-text">Hora de Saída: ${hora_saida}</p>
                <p class="card-text">Valor Cobrado: R$ ${Number(valor_cobrado).toFixed(2)}</p>
                <p class="card-text">Placa do Veículo: ${placa_veic}</p>
                <p class="card-text">Código da Vaga: ${cod_vaga}</p>
                <p class="card-text">CPF do Funcionário: ${cpf_func}</p>
                <button id="excluirEntrada" class="btn btn-danger mt-2">Excluir</button>
            </div>
        </div>
    `;

    // Adiciona evento de clique no botão de excluir
    entrada.addEventListener('click', async (e) => {
        // Verifica se o click foi no botão de excluir
        if (e.target.id !== 'excluirEntrada') {
            console.log('Clique fora do botão de excluir'); // debug
            return;
        }
        // Obtém o id da entrada a ser excluída
        const id_entrada = e.target.closest('.entrada').id;
        console.log('ID da Entrada:', id_entrada); // debug
        // Exclui a entrada
        const response = await fetchApi('/entrada/' + id_entrada, 'DELETE');
        const data = await response.json();
        console.log(data);
        // Recarrega a página
        window.location.reload();
    });

    return entrada;
}
