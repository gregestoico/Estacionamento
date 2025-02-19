import { cardCliente } from "./cardCliente.js";

export function criarListClienteContainer(clientes){
    const listContainer = document.createElement('div');
    listContainer.classList.add('container', 'mt-5', 'pt-4');
    listContainer.id = 'clientes-container';
    listContainer.innerHTML = `
        <h1 class="text-center mt-4 mb-3 fw-bold">Detalhes dos Clientes</h1>
        <div class="container col-md-9 px-5 mb-4">
            <input type="text" id="searchCPF" class="form-control" placeholder="Buscar por CPF...">
        </div>
    `;

    // Mapeia os clientes para um array de cards
    const row = document.createElement('div');
    row.className = 'row';
    row.id = 'lista-clientes';
    row.innerHTML = clientes.map(cliente => 
        cardCliente(cliente.cpf_cli, cliente.nome_cli, cliente.telefone_cli, cliente.cod_plano)
    ).join('');
    const container = document.createElement('div');
    container.className = 'container col-md-9 px-5';
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

        // Filtra os clientes mensalistas pelo CPF buscado 
        document.querySelectorAll('.cliente').forEach(cliente => {
            const cpfAttr = cliente.getAttribute('data-cpf');
            const cpf = cpfAttr ? cpfAttr.toLowerCase() : '';
            if (cpf.includes(search)) {
                cliente.style.display = '';
            } else {
                cliente.style.display = 'none';
            }
        }
        );
    });

    return listContainer;
}