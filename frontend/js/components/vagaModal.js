import fetchApi from "../api/fetch.js";

/** Função para criar um modal com os dados detalhados da vaga */
export function criarVagaModal() {
    // Cria o modal
    const modal = document.createElement('div');
    modal.className = 'modal fade';
    modal.setAttribute('id', 'vagaModal');
    modal.setAttribute('tabindex', '-1');
    modal.setAttribute('aria-labelledby', 'vagaModalLabel');
    modal.setAttribute('aria-hidden', 'true');
    modal.innerHTML = `
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header bg-primary text-white">
                    <h5 class="modal-title" id="vagaModalLabel">Detalhes da Vaga</h5>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Fechar"></button>
                </div>
                <div id="modal-body" class="modal-body">
                    <p><strong>Código da Vaga:</strong> <h3 style="text-align: center;" id="modalCodigo"></h3></p>
                    <p><strong>Tipo de Veículo:</strong> <span id="modalTipo"></span></p>
                    <p><strong>Situação:</strong> <span id="modalSituacao"></span></p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                </div>
            </div>
        </div>
    `;


    // Adiciona um evento de exibição do modal
    // Adiciona um evento ao modal de vaga para limpar os campos dinamicamente ao fechar 
    modal.addEventListener('show.bs.modal', async function (e) {
        // Evento de clique em um card de vaga
        // document.addEventListener('click', async (e) => {
        // Verifica se o click foi em um card de vaga
        const card = e.relatedTarget;

        if (!card) {
            console.log('Clique fora do card de vaga'); // debug
            return;
        }

        // Obtém o código da vaga clicada
        const codigo = card.id.replace('vaga', '');
        console.log('Código da vaga:', codigo); // debug
        
        const response = await fetchApi('/entrada/vaga/' + codigo, 'GET');
        const data = await response.json();

        const entrada = data.entrada;

        // Verifica se a entrada foi encontrada
        if(entrada === null) {
            console.error('Entrada não encontrada');
            return;
        } else if (entrada.cpf_cli) { // Verifica se um cliente mensalista ocupou a vaga
            // Preenche o modal com as adicionais do cliente
            document.getElementById('modal-body').innerHTML += `
                <p class="bg-info bg-opacity-25"><strong>CPF do cliente:</strong> <span id="modalCpfCli">${entrada.cpf_cli}</span></p>
                <p class="bg-info bg-opacity-25"><strong>Nome cliente:</strong> <span id="modalNome">${entrada.nome_cli}</span></p>
            `;
        }

        // Preenche o modal com as informações da entrada
        document.getElementById('modalCodigo').textContent = entrada.cod_vaga || card.getAttribute('data-codigo');
        document.getElementById('modalTipo').textContent = entrada.tipo_veic || card.getAttribute('data-tipo');
        document.getElementById('modalSituacao').textContent = entrada.situacao || card.getAttribute('data-situacao');
    });

    // Adiciona um evento ao modal de vaga para limpar os campos dinamicamente ao fechar 
    modal.addEventListener('hidden.bs.modal', function () {
        const cpfCliElement = document.getElementById('modalCpfCli');
        const nomeCliElement = document.getElementById('modalNome');

        // Exluindo os campos criados
        if (cpfCliElement) {
            cpfCliElement.parentElement.remove();
        }
        if (nomeCliElement) {
            nomeCliElement.parentElement.remove();
        }
        // Limpa os campos fixos do modal
        modalCodigo.textContent = '';
        modalTipo.textContent = '';
        modalSituacao.textContent = '';
    });

    return modal;
}