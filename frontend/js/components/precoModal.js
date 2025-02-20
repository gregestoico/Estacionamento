import fetchApi from "../api/fetch.js";

/** Função para criar um modal com os dados detalhados do preco */
export function criarPrecoModal() {
    // Cria o modal
    const modal = document.createElement('div');
    modal.className = 'modal fade';
    modal.setAttribute('id', 'precoModal');
    modal.setAttribute('tabindex', '-1');
    modal.setAttribute('aria-labelledby', 'precoModalLabel');
    modal.setAttribute('aria-hidden', 'true');
    modal.innerHTML = `
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header bg-primary text-white">
                    <h5 class="modal-title" id="precoModalLabel">Detalhes do Preco</h5>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Fechar"></button>
                </div>
                <div id="modal-body" class="modal-body">
                    <form id="precoForm">
                        <div class="mb-3">
                            <label for="modalTipoVeic" class="form-label"><strong>Tipo de Veículo:</strong></label>
                            <input type="text" class="form-control" id="modalTipoVeic" readonly>
                        </div>
                        <div class="mb-3">
                            <label for="modalValorHora" class="form-label"><strong>Valor p/ Hora:</strong></label>
                            <input type="number" class="form-control" id="modalValorHora" step="0.01">
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Fechar</button>
                    <button type="button" class="btn btn-primary" id="updatePrecoBtn" data-bs-dismiss="modal">Atualizar</button>
                </div>
            </div>
        </div>
    `;

    // Adiciona um evento de exibição do modal
    modal.addEventListener('show.bs.modal', async function (e) {
        const button = e.relatedTarget;

        if (!button || !button.classList.contains('modificar-btn')) {
            console.log('Clique fora do botão Modificar'); // debug
            return;
        }

        // Obtém o tipo de veículo associado ao preco clicado
        const tipo_veic = button.getAttribute('data-tipo_veic');
        console.log('Tipo de Veículo:', tipo_veic); // debug
        
        modal.querySelector('#modalTipoVeic').value = button.getAttribute('data-tipo_veic');
        modal.querySelector('#modalValorHora').value = button.getAttribute('data-valor_hora');
    });

    // Adiciona um evento ao modal de vaga para limpar os campos dinamicamente ao fechar 
    modal.addEventListener('hidden.bs.modal', function () {
        const modalTipoVeic = modal.querySelector('#modalTipoVeic');
        const modalValorHora = modal.querySelector('#modalValorHora');

        // Limpa os campos fixos do modal
        modalTipoVeic.value = '';
        modalValorHora.value = '';
    });

    // Adiciona evento ao botão de atualização
    modal.querySelector('#updatePrecoBtn').addEventListener('click', async function () {
        const tipo_veic = document.getElementById('modalTipoVeic').value;
        const valor_hora = document.getElementById('modalValorHora').value;

        const response = await fetchApi('/preco_rotativo/' + tipo_veic, 'PUT', {
            valor_hora
        });

        if (response.ok) {
            alert('Preco atualizado com sucesso!');
            location.reload();
        } else {
            alert('Erro ao atualizar o preco.');
        }
    });

    return modal;
}