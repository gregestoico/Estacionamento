import { cardEntrada } from "./cardEntrada.js";

export function criarEntradaContainer(entradas){
    const listContainer = document.createElement('div');
    listContainer.classList.add('container', 'mt-5', 'pt-4');
    listContainer.id = 'entradas-container';
    listContainer.innerHTML = `
        <h1 class="text-center mt-4 mb-3 fw-bold">Detalhes das Entradas</h1>
        <div class="container col-md-9 px-5 mb-4">
            <input type="text" id="searchCPF" class="form-control" placeholder="Buscar por CPF...">
        </div>
    `;

    // Mapeia os entradas para um array de cards
    const row = document.createElement('div');
    row.className = 'row';
    row.id = 'lista-entradas';
    entradas.forEach(entrada => {
        const card = cardEntrada(entrada.id_entrada, entrada.hora_entrada, entrada.hora_saida, entrada.valor_cobrado, entrada.placa_veic, entrada.cod_vaga, entrada.cpf_func);
        row.appendChild(card);
    });
    const container = document.createElement('div');
    container.className = 'container col-md-12 px-5';
    container.appendChild(row);
    listContainer.appendChild(container);

    
    // Adiciona um evento de busca ao input
    listContainer.addEventListener('keyup', function (e) {
        // Verifica se o evento foi disparado pelo input de busca
        if (e.target.id !== 'searchCPF' || e.key !== 'Enter') {
            return;
        }
        const searchInput = listContainer.querySelector('#searchCPF');
        const search = searchInput.value.toLowerCase();

        // Filtra os entradas mensalistas pelo CPF buscado 
        document.querySelectorAll('.entrada').forEach(entrada => {
            const cpfAttr = entrada.getAttribute('data-cpf');
            const cpf = cpfAttr ? cpfAttr.toLowerCase() : '';
            if (cpf.includes(search)) {
                entrada.style.display = '';
            } else {
                entrada.style.display = 'none';
            }
        }
        );
    });

    return listContainer;
}