import { cardPreco } from "./cardPreco.js";

export function criarPrecosContainer(precos){
    const listContainer = document.createElement('div');
    listContainer.classList.add('container', 'mt-5', 'pt-4');
    listContainer.id = 'precos-container';
    listContainer.innerHTML = `
        <h1 class="text-center mt-4 mb-3 fw-bold">Detalhes dos Precos</h1>
    `;

    // Mapeia os precos para um array de cards
    const row = document.createElement('div');
    row.className = 'row';
    row.id = 'lista-precos';
    precos.forEach(preco => {
        const card = cardPreco(preco.tipo_veic, preco.valor_hora);
        row.appendChild(card);
    });
    const container = document.createElement('div');
    container.className = 'container col-md-12 px-5';
    container.appendChild(row);
    listContainer.appendChild(container);

    return listContainer;
}