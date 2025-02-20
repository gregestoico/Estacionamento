import { cardFuncionario } from "./cardFuncionario.js";

export function criarFuncionarioContainer(funcionarios){
    const listContainer = document.createElement('div');
    listContainer.classList.add('container', 'mt-5', 'pt-4');
    listContainer.id = 'funcionarios-container';
    listContainer.innerHTML = `
        <h1 class="text-center mt-4 mb-3 fw-bold">Detalhes dos Funcionários</h1>
        <div class="container col-md-9 px-5 mb-4">
            <input type="text" id="searchCPF" class="form-control" placeholder="Buscar por CPF...">
        </div>
    `;

    // Mapeia os funcionarios para um array de cards
    const row = document.createElement('div');
    row.className = 'row';
    row.id = 'lista-funcionarios';
    row.innerHTML = funcionarios.map(funcionario => 
        cardFuncionario(funcionario.nome_func, funcionario.cargo, funcionario.cpf_func)
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

        // Filtra os funcionários que contém o CPF buscado 
        document.querySelectorAll('.funcionario').forEach(funcionario => {
            const cpfAttr = funcionario.getAttribute('data-cpf');
            const cpf = cpfAttr ? cpfAttr.toLowerCase() : '';
            if (cpf.includes(search)) {
                funcionario.style.display = '';
            } else {
                funcionario.style.display = 'none';
            }
        }
        );
    });

    return listContainer;
}