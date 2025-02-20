export function criarSidebar(){
    // Obtém a altura do cabeçalho
    const headerHeight = document.querySelector('#header').offsetHeight;
    
    const sidebar = document.createElement('div');
    sidebar.className = 'bg-light border-end h-100 col-3';
    sidebar.id = 'sidebar-wrapper';
    sidebar.style.position = 'sticky';  // Torna o sidebar "pegajoso"
    sidebar.style.top = `${headerHeight}px`;         // Desloca o sidebar para começar 60px abaixo do topo (ajuste conforme a altura do cabeçalho)

    sidebar.innerHTML = `
        <div class="sidebar-heading bg-primary text-white text-center py-3">Filtros de Pesquisa</div>
        <div class="list-group list-group-flush p-3">
            <div class="mb-3">
                <label for="filtroCpf" class="form-label">CPF</label>
                <input type="text" class="form-control" id="filtroCpf" placeholder="Digite o CPF">
            </div>
            <div class="mb-3">
                <label for="filtroNome" class="form-label">Nome</label>
                <input type="text" class="form-control" id="filtroNome" placeholder="Digite o Nome">
            </div>
            <div class="mb-3">
                <label for="filtroTipo" class="form-label">Tipo de Veículo</label>
                <select class="form-select" id="filtroTipo">
                    <option value="">Todos</option>
                    <option value="Carro">Carro</option>
                    <option value="Moto">Moto</option>
                    <option value="Caminhão">Caminhão</option>
                </select>
            </div>
            <div class="mb-3">
                <label for="filtroSituacao" class="form-label">Situação</label>
                <select class="form-select" id="filtroSituacao">
                    <option value="">Todas</option>
                    <option value="Livre">Livre</option>
                    <option value="Ocupada">Ocupada</option>
                    <option value="Reservada">Reservada</option>
                </select>
            </div>
            <button class="btn highlight btn-primary mt-3 w-100 mb-4" id="btnFiltrar">Aplicar Filtros</button>
        </div>
    `;

    // Adiciona um evento de clique ao botão de filtrar
    sidebar.querySelector('#btnFiltrar').addEventListener('click', function () {
        const filtroCpf = document.getElementById('filtroCpf').value.toLowerCase();
        const filtroNome = document.getElementById('filtroNome').value.toLowerCase();
        const filtroTipo = document.getElementById('filtroTipo').value;
        const filtroSituacao = document.getElementById('filtroSituacao').value;
        
        document.querySelectorAll('.vaga-card').forEach(card => {
            const tipo = card.getAttribute('data-tipo');
            const situacao = card.getAttribute('data-situacao');

            // TODO: Implementar a lógica de filtragem no backend

            let show = true;

            if (filtroTipo && filtroTipo !== tipo) {
                show = false;
            }

            if (filtroSituacao && filtroSituacao !== situacao) {
                show = false;
            }

            if (show) {
                card.style.display = '';
            } else {
                card.style.display = 'none';
            }

            const nome = card.getAttribute('data-nome').toLowerCase();
            const cpf = card.getAttribute('data-cpf').toLowerCase();

            if (filtroNome && !nome.includes(filtroNome)) {
                show = false;
            }

            if (filtroCpf && !cpf.includes(filtroCpf)) {
                show = false;
            }

        });
    });


    return sidebar;
}