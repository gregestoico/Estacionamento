import { cardPlano } from "./cardPlano.js";

export function criarPlanosContainer(planos){
    const listContainer = document.createElement('div');
    listContainer.classList.add('container', 'mt-5', 'pt-4');
    listContainer.id = 'planos-container';
    listContainer.innerHTML = `
        <h1 class="text-center mt-4 mb-3 fw-bold">Detalhes dos Planos</h1>
    `;

    // Mapeia os planos para um array de cards
    const row = document.createElement('div');
    row.className = 'row';
    row.id = 'lista-planos';
    planos.forEach(plano => {
        const card = cardPlano(plano.cod_plano, plano.turno, plano.preco_mensal);
        row.appendChild(card);
    });
    const container = document.createElement('div');
    container.className = 'container col-md-9 px-5';
    container.appendChild(row);
    listContainer.appendChild(container);

    return listContainer;
}