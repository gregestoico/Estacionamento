export function criarBtn(id, textContent, className='') {
    // Cria o botão de refresh
    const refreshBtn = document.createElement('button');
    refreshBtn.className = 'my-3 ms-auto' + className;
    refreshBtn.textContent = textContent;
    refreshBtn.id = id;
    refreshBtn.style = 'text-align:right; width: auto; position: relative; right: 0; top: 0;';

    // Adiciona evento de atualização ao botão
    refreshBtn.addEventListener('click', function () {
        location.reload();
    });

    return refreshBtn;
}