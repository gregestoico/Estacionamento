export function criarRefreshBtn() {
    // Cria o botão de refresh
    const refreshBtn = document.createElement('button');
    refreshBtn.className = 'custom-btn my-3 ms-auto';
    refreshBtn.textContent = 'Atualizar';
    refreshBtn.id = 'btnRefresh';
    refreshBtn.style = 'text-align:right; width: auto; position: relative; right: 0; top: 0;';

    // Adiciona evento de atualização ao botão
    refreshBtn.addEventListener('click', function () {
        location.reload();
    });

    return refreshBtn;
}