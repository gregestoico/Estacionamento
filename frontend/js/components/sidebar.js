export function criarSidebar(){
    // Obtém a altura do cabeçalho
    const headerHeight = document.querySelector('#header').offsetHeight;
    
    const sidebar = document.createElement('div');
    sidebar.className = 'bg-light border-end h-100';
    sidebar.id = 'sidebar-wrapper';
    sidebar.style.position = 'sticky';  // Torna o sidebar "pegajoso"
    sidebar.style.top = `${headerHeight}px`;         // Desloca o sidebar para começar 60px abaixo do topo (ajuste conforme a altura do cabeçalho)
    sidebar.style.width = '250px';
    sidebar.style.minHeight = '100vh';

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
            <button class="btn btn-primary w-100" id="btnFiltrar">Aplicar Filtros</button>
        </div>
    `;
    return sidebar;
}