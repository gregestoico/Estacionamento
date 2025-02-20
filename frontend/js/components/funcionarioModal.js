import fetchApi from "../api/fetch.js";

/** Função para criar um modal com os dados detalhados da vaga */
export function criarFuncionarioModal() {
    // Cria o modal
    const modal = document.createElement('div');
    modal.className = 'modal fade';
    modal.setAttribute('id', 'funcionarioModal');
    modal.setAttribute('tabindex', '-1');
    modal.setAttribute('aria-labelledby', 'funcionarioModalLabel');
    modal.setAttribute('aria-hidden', 'true');
    modal.innerHTML = `
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header bg-primary text-white">
                    <h5 class="modal-title" id="funcionarioModalLabel">Detalhes do Funcionário</h5>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Fechar"></button>
                </div>
                <div id="modal-body" class="modal-body">
                    <p><strong>Nome:</strong> <input type="text" id="modalNome" class="form-control"></p>
                    <p><strong>CPF:</strong> <input type="text" id="modalCPF" class="form-control" readonly></p>
                    <p><strong>Cargo:</strong> <input type="text" id="modalCargo" class="form-control"></p>
                </div>
                <div class="modal-footer">
                <button type="button" class="btn btn-danger" id="modalExcluir">Excluir</button>
                <button type="button" class="btn btn-primary" id="modalAtualizar">Atualizar</button>
                </div>
            </div>
        </div>
    `;

    async function excluirFuncionario(cpf_func) {
        try {
            const response = await fetchApi('/funcionario/' + cpf_func, 'DELETE');
    
            if (!response.ok) {
                throw new Error('Erro ao excluir funcionário');
            }
    
            console.log('Funcionário excluído com sucesso');
            const modal = document.getElementById('funcionarioModal');
            const modalInstance = bootstrap.Modal.getInstance(modal);
            modalInstance.hide();
            location.reload();
        } catch (error) {
            console.error('Erro ao excluir funcionário:', error);
        }
    }

    async function atualizarFuncionario(cpf_func) {
        try {
            const nome = document.getElementById('modalNome').value;
            const cargo = document.getElementById('modalCargo').value;

            const response = await fetchApi('/funcionario/' + cpf_func, 'PUT', {
                nome,
                cargo
            });

            if (!response.ok) {
                throw new Error('Erro ao atualizar funcionário');
            }

            console.log('Funcionário atualizado com sucesso');
            const modal = document.getElementById('funcionarioModal');
            const modalInstance = bootstrap.Modal.getInstance(modal);
            modalInstance.hide();
            location.reload();
        } catch (error) {
            console.error('Erro ao atualizar funcionário:', error);
        }
    }

    modal.addEventListener('show.bs.modal', async function (e) {
        const card = e.relatedTarget;

        if (!card) {
            console.log('Clique fora do card de funcionario');
            return;
        }

        const cpf_func = card.id;
        console.log('CPF do Funcionário:', cpf_func);
        
        const response = await fetchApi('/entrada/funcionario/' + cpf_func, 'GET');
        const data = await response.json();

        const entradas = data.entradas;

        if(entradas === null) {
            console.error('Entradas não encontradas');
            return;
        } else {
            entradas.forEach(entrada => {
                document.getElementById('modal-body').innerHTML += `
                    <p class="bg-info bg-opacity-25">
                        <strong>Id da entrada: </strong>
                        <span id="modalId">${entrada.id_entrada}</span>
                    </p>
                `;
            });
        }

        document.getElementById('modalNome').value = card.getAttribute('data-nome');
        document.getElementById('modalCPF').value = card.getAttribute('data-CPF');
        document.getElementById('modalCargo').value = card.getAttribute('data-cargo');
        document.getElementById('modalExcluir').addEventListener('click', () => excluirFuncionario(cpf_func));
        document.getElementById('modalAtualizar').addEventListener('click', () => atualizarFuncionario(cpf_func));
    });

    modal.addEventListener('hidden.bs.modal', function () {
        const entradaElement = document.getElementById('modalId');
        const modalNome = document.getElementById('modalNome');
        const modalCPF = document.getElementById('modalCPF');
        const modalCargo = document.getElementById('modalCargo');
        
        if (entradaElement) {
            entradaElement.parentElement.remove();
        }
        modalNome.value = '';
        modalCPF.value = '';
        modalCargo.value = '';
    });

    return modal;
}
