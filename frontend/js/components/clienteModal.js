import fetchApi from "../api/fetch.js";

/** Função para criar um modal com os dados detalhados da vaga */
export function criarClienteModal() {
    // Cria o modal
    const modal = document.createElement('div');
    modal.className = 'modal fade';
    modal.setAttribute('id', 'clienteModal');
    modal.setAttribute('tabindex', '-1');
    modal.setAttribute('aria-labelledby', 'clienteModalLabel');
    modal.setAttribute('aria-hidden', 'true');
    modal.innerHTML = `
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header bg-primary text-white">
                    <h5 class="modal-title" id="clienteModalLabel">Detalhes do Cliente</h5>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Fechar"></button>
                </div>
                <div id="modal-body" class="modal-body">
                    <p><strong>Nome:</strong> <h3 style="text-align: center;" id="modalNome"></h3></p>
                    <p><strong>CPF:</strong> <span id="modalCPF"></span></p>
                    <p><strong>Email:</strong> <span id="modalEmail"></span></p>
                    <p><strong>Telefone:</strong> <span id="modalEmail"></span></p>
                    <p><strong>Código do Plano:</strong><span id="modalCodPlano"></span></p>
                </div>
                <div class="modal-footer">
                <button type="button" class="btn btn-danger">Excluir</button>
                <button type="button" class="btn btn-primary">Atualizar</button>
                </div>
            </div>
        </div>
    `;


    // Adiciona um evento de exibição do modal
    // Adiciona um evento ao modal de vaga para limpar os campos dinamicamente ao fechar 
    modal.addEventListener('show.bs.modal', async function (e) {
        // Evento de clique em um card de cliente
        // document.addEventListener('click', async (e) => {
        // Verifica se o click foi em um card de cliente
        const card = e.relatedTarget;

        if (!card) {
            console.log('Clique fora do card de cliente'); // debug
            return;
        }

        // Obtém o cpf do cliente clicado
        const cpf_func = card.id;
        console.log('CPF do Cliente:', cpf_func); // debug
        
        const response = await fetchApi('/entrada/cliente/' + cpf_func, 'GET');
        const data = await response.json();

        const entradas = data.entradas;

        // Verifica se a entrada foi encontrada
        if(entradas === null) {
            console.error('Entradas não encontradas');
            return;
        } else 
        // Itera sobre as entradas do cliente
        entradas.forEach(entrada => {
            // Preenche o modal com as informações de id de cada entrada
            document.getElementById('modal-body').innerHTML += `
                <p class="bg-info bg-opacity-25">
                    <strong>Id da entrada: </strong>
                    <span id="modalId">${entrada.id_entrada}</span>
                </p>
            `;

        });
        document.getElementById('modalNome').textContent = card.getAttribute('data-nome');
        document.getElementById('modalCPF').textContent = card.getAttribute('data-CPF');
        document.getElementById('modalCargo').textContent = card.getAttribute('data-cargo');
    });

    // Adiciona um evento ao modal de vaga para limpar os campos dinamicamente ao fechar 
    modal.addEventListener('hidden.bs.modal', function () {
        const entradaElement = document.getElementById('modalId');
        const modalNome = document.getElementById('modalNome');
        const modalCPF = document.getElementById('modalCPF');
        const modalCargo = document.getElementById('modalCargo');

        // Exluindo os campos de entrada criados
        if (entradaElement) {
            entradaElement.parentElement.remove();
        }
        // Limpa os campos fixos do modal
        modalNome.textContent = '';
        modalCPF.textContent = '';
        modalCargo.textContent = '';

        // Retorna o modal
    });
    return modal;
}
