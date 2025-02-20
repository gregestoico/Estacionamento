/**
 * Função para criar um card com os dados do plano.
 *
 * @param {string} cod_plano
 * @param {string} turno
 * @param {number} preco_mensal
 * @returns {string} - O HTML do card do plano.
 */
export function cardPlano(cod_plano, turno, preco_mensal) {
    const plano = document.createElement('div');
    plano.id = cod_plano;
    plano.className = 'plano col-md-6 mb-3 highlight';
    plano.setAttribute('data-cod_plano', cod_plano);
    plano.setAttribute('data-turno', turno);
    plano.setAttribute('data-preco_mensal', preco_mensal);
    // O modal é acionado pelo botão Modificar
    plano.innerHTML = `
        <div class="card d-flex flex-row justify-content-start p-3">
                <i class="bi bi-card-list col-3 text-center mx-3" style="font-size: 4rem;"></i>
                <div mx-3>
                    <h5 class="card-title">Plano: ${cod_plano}</h5>
                    <p class="card-text">Turno: ${turno}</p>
                    <p class="card-text">Preço Mensal: R$ ${Number(preco_mensal).toFixed(2)}</p>
                    <button id="modificarPlanoBtn" class="btn btn-primary mt-2 modificar-btn" 
                        data-bs-toggle="modal" 
                        data-bs-target="#planoModal"
                        data-cod_plano="${cod_plano}"
                        data-turno="${turno}"
                        data-preco_mensal="${preco_mensal}">
                        Modificar
                    </button>
                </div>
            </div>
    `;
    return plano;
}