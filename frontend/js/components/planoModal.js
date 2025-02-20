import fetchApi from "../api/fetch.js";

/** Função para criar um modal com os dados detalhados do plano */
export function criarPlanoModal() {
    // Cria o modal
    const modal = document.createElement('div');
    modal.className = 'modal fade';
    modal.setAttribute('id', 'planoModal');
    modal.setAttribute('tabindex', '-1');
    modal.setAttribute('aria-labelledby', 'planoModalLabel');
    modal.setAttribute('aria-hidden', 'true');
    modal.innerHTML = `
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header bg-primary text-white">
                    <h5 class="modal-title" id="planoModalLabel">Detalhes do Plano</h5>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Fechar"></button>
                </div>
                <div id="modal-body" class="modal-body">
                    <form id="planoForm">
                        <div class="mb-3">
                            <label for="modalCodPlano" class="form-label"><strong>Código do Plano:</strong></label>
                            <input type="text" class="form-control" id="modalCodPlano" readonly>
                        </div>
                        <div class="mb-3">
                            <label for="modalTurno" class="form-label"><strong>Turno:</strong></label>
                            <input type="text" class="form-control" id="modalTurno">
                        </div>
                        <div class="mb-3">
                            <label for="modalPrecoMensal" class="form-label"><strong>Preço Mensal:</strong></label>
                            <input type="number" class="form-control" id="modalPrecoMensal" step="0.01">
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-danger">Excluir</button>
                    <button type="button" class="btn btn-primary" id="updatePlanoBtn">Atualizar</button>
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

        // Obtém o código do plano clicado
        const cod_plano = button.getAttribute('data-cod_plano');
        console.log('Código do Plano:', cod_plano); // debug
        
        modal.querySelector('#modalCodPlano').value = button.getAttribute('data-cod_plano');
        modal.querySelector('#modalTurno').value = button.getAttribute('data-turno');
        modal.querySelector('#modalPrecoMensal').value = button.getAttribute('data-preco_mensal');
    });

    // Adiciona um evento ao modal de vaga para limpar os campos dinamicamente ao fechar 
    modal.addEventListener('hidden.bs.modal', function () {
        const modalCodPlano = modal.querySelector('#modalCodPlano');
        const modalTurno = modal.querySelector('#modalTurno');
        const modalPrecoMensal = modal.querySelector('#modalPrecoMensal');

        // Limpa os campos fixos do modal
        modalCodPlano.value = '';
        modalTurno.value = '';
        modalPrecoMensal.value = '';
    });

    // Adiciona evento ao botão de atualização
    modal.querySelector('#updatePlanoBtn').addEventListener('click', async function () {
        const cod_plano = document.getElementById('modalCodPlano').value;
        const turno = document.getElementById('modalTurno').value;
        const preco_mensal = document.getElementById('modalPrecoMensal').value;

        const response = await fetchApi('/plano/' + cod_plano, 'PUT', {
            turno,
            preco_mensal
        });

        if (response.ok) {
            alert('Plano atualizado com sucesso!');
            location.reload();
        } else {
            alert('Erro ao atualizar o plano.');
        }
    });

    return modal;
}