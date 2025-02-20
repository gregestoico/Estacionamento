/**
 * Função para criar um card com os dados do preço rotativo.
 *
 * @param {string} tipo_veic
 * @param {number} valor_hora
 * @returns {string} - O HTML do card do preço rotativo.
 */
export function cardPreco(tipo_veic, valor_hora) {
    const preco = document.createElement('div');
    preco.id = tipo_veic;
    preco.className = 'preco col-md-6 mb-3 highlight';
    preco.setAttribute('data-tipo_veic', tipo_veic);
    preco.setAttribute('data-valor_hora', valor_hora);
    // O modal é acionado pelo botão Modificar
    preco.innerHTML = `
        <div class="card d-flex flex-row justify-content-start p-3">
                <i class="bi bi-currency-dollar col-3 text-center mx-3" style="font-size: 4rem;"></i>
                <div mx-3>
                    <h5 class="card-title">Tipo de Veículo: ${tipo_veic}</h5>
                    <p class="card-text">Valor por Hora: R$ ${Number(valor_hora).toFixed(2)}</p>
                    <button id="modificarPrecoBtn" class="btn btn-primary mt-2 modificar-btn" 
                        data-bs-toggle="modal" 
                        data-bs-target="#precoModal"
                        data-tipo_veic="${tipo_veic}"
                        data-valor_hora="${valor_hora}">
                        Modificar
                    </button>
                </div>
            </div>
    `;
    return preco;
}