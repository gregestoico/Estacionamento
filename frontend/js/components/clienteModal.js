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
                    <div class="mb-3">
                        <label for="modalNome" class="form-label"><strong>Nome:</strong></label>
                        <input type="text" class="form-control" id="modalNome">
                    </div>
                    <div class="mb-3">
                        <label for="modalCPF" class="form-label"><strong>CPF:</strong></label>
                        <input type="text" class="form-control" id="modalCPF" readonly>
                    </div>
                    <div class="mb-3">
                        <label for="modalEmail" class="form-label"><strong>Email:</strong></label>
                        <input type="email" class="form-control" id="modalEmail">
                    </div>
                    <div class="mb-3">
                        <label for="modalTelefone" class="form-label"><strong>Telefone:</strong></label>
                        <input type="text" class="form-control" id="modalTelefone">
                    </div>
                    <div class="mb-3">
                        <label for="modalCodPlano" class="form-label"><strong>Código do Plano:</strong></label>
                        <input type="text" class="form-control" id="modalCodPlano">
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-danger" id="modalExcluir">Excluir</button>
                    <button type="button" class="btn btn-primary" id="modalAtualizar">Atualizar</button>
                </div>
            </div>
        </div>
    `;

    //Função para atualizar cliente
    async function atualizarCliente(cpf_cli) {
        try {
            const nome = document.getElementById('modalNome').value;
            const email = document.getElementById('modalEmail').value;
            const telefone = document.getElementById('modalTelefone').value;
            const cod_plano = document.getElementById('modalCodPlano').value;

            const response = await fetchApi('/mensalista/' + cpf_cli, 'PUT', {
                nome,
                email,
                telefone,
                cod_plano
            });

            if (!response.ok) {
                throw new Error('Erro ao atualizar cliente');
            }

            console.log('Cliente atualizado com sucesso');
            const modal = document.getElementById('clienteModal');
            const modalInstance = bootstrap.Modal.getInstance(modal);
            modalInstance.hide();
            location.reload();
        } catch (error) {
            console.error('Erro ao atualizar cliente:', error);
        }
    }

    //Função para excluir cliente
    async function excluirCliente(cpf_cli) {
        try {
            const response = await fetchApi('/mensalista/' + cpf_cli, 'DELETE');
    
            if (!response.ok) {
                throw new Error('Erro ao excluir cliente');
            }
    
            console.log('Cliente excluído com sucesso');
            // Fechar o modal após a exclusão
            const modal = document.getElementById('clienteModal');
            const modalInstance = bootstrap.Modal.getInstance(modal);
            modalInstance.hide();
    
            // Atualizar a UI ou redirecionar conforme necessário
            // Por exemplo, recarregar a página:
            location.reload();
        } catch (error) {
            console.error('Erro ao excluir cliente:', error);
        }
    }

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
        const cpf_cli = card.id;
        console.log('CPF do Cliente:', cpf_cli); // debug
        
        const response = await fetchApi('/mensalista/' + cpf_cli, 'GET');
        const data = await response.json();

        const mensalista = data.mensalista;

        // Verifica se a entrada foi encontrada
        if(mensalista === null) {
            console.error('Mensalista não encontrado');
            return;
        }

        modal.querySelector('#modalNome').value = mensalista.nome_cli;
        modal.querySelector('#modalCPF').value = mensalista.cpf_cli;
        modal.querySelector('#modalEmail').value = mensalista.email_cli;
        modal.querySelector('#modalTelefone').value = mensalista.telefone_cli;
        modal.querySelector('#modalCodPlano').value = mensalista.cod_plano;

        document.getElementById('modalExcluir').addEventListener('click', () => excluirCliente(cpf_cli));
        document.getElementById('modalAtualizar').addEventListener('click', () => atualizarCliente(cpf_cli));
    });



    // Adiciona um evento ao modal de vaga para limpar os campos dinamicamente ao fechar 
    modal.addEventListener('hidden.bs.modal', function () {
        const entradaElement = document.getElementById('modalId');
        const modalNome = document.getElementById('modalNome');
        const modalCPF = document.getElementById('modalCPF');
        const modalEmail = document.getElementById('modalCargo');

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
