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
                <div class="mb-3">
                <label for="modalPlaca" class="form-label"><strong>Placa:</strong></label>
                <input type="text" class="form-control" id="modalPlaca" placeholder="Digite a placa do veículo">
                </div>
                </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-success" id="inserirEntrada">Inserir Entrada</button>
                        <button type="button" class="btn btn-danger" id="realizarSaida">Realizar Saída</button>
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                    </div>
                </div>
            </div>
     `;

    // Adiciona os event listeners após criar o modal
    const inserirEntradaBtn = modal.querySelector('#inserirEntrada');
    inserirEntradaBtn.addEventListener('click', function () {
        // Lógica para inserir entrada
        const placa = modal.querySelector('#modalPlaca').value;
        const codigo = modal.querySelector('#modalCodigo').textContent;
        
        if (!placa) {
            alert('Por favor, insira a placa do veículo.');
            return;
        }

        const entradaData = {
            cod_vaga: codigo,
            placa_veic: placa,
        };

        fetchApi('/entrada', 'POST', entradaData)
            .then(response => response.json())
            .then(data => {
            if (data.success) {
                alert('Entrada inserida com sucesso!');
                // Atualiza o modal ou a interface conforme necessário
            } else {
                alert('Erro ao inserir entrada: ' + data.message);
            }
            })
            .catch(error => {
            console.error('Erro ao inserir entrada:', error);
            alert('Erro ao inserir entrada. Por favor, tente novamente.');
            });
        console.log('Inserir Entrada clicado');
    });

    const realizarSaidaBtn = modal.querySelector('#realizarSaida');
    realizarSaidaBtn.addEventListener('click', function () {
        // Lógica para realizar saída
        console.log('Realizar Saída clicado');
    });


    const modalFooter = modal.querySelector('.modal-footer');
    modalFooter.appendChild(inserirEntradaBtn);
    modalFooter.appendChild(realizarSaidaBtn);


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
        const codigo = card.getAttribute('data-codigo');
        console.log('Código da vaga:', codigo); // debug
        
        const response = await fetchApi('/entrada/vaga/' + codigo, 'GET');
        const data = await response.json();

        const entrada = data.entrada;

        // Verifica se existe uma entrada em aberto associada a essa vaga
        if(Array.isArray(entrada) && entrada.length === 0) {
            console.error('Entrada não encontrada');
            realizarSaidaBtn.disabled = true;
            inserirEntradaBtn.disabled = false;
        } else if (entrada.cpf_cli) { // Verifica se um cliente mensalista ocupou a vaga
            realizarSaidaBtn.disabled = false;
            inserirEntradaBtn.disabled = true;
            // Preenche o modal com as adicionais do cliente
            modal.querySelector('#modal-body').innerHTML += `
            <div class="bg-info bg-opacity-25">
                <p><strong>Cliente Mensalista</strong></p>
                <p id="modalCpfCli"><strong>CPF do cliente:</strong> <span>${entrada.cpf_cli}</span></p>
                <p id="modalNome"><strong>Nome cliente:</strong> <span id="modalNome">${entrada.nome_cli}</span></p>
            </div>`;
        }
        // Preenche o modal com as informações somente da vaga
        modal.querySelector('#modalCodigo').textContent = card.getAttribute('data-codigo');
        modal.querySelector('#modalTipo').textContent = card.getAttribute('data-tipo');
        modal.querySelector('#modalSituacao').textContent = card.getAttribute('data-situacao');

    });

    // Adiciona um evento ao modal de vaga para limpar os campos dinamicamente ao fechar 
    modal.addEventListener('hidden.bs.modal', function () {
        const cpfCliElement = modal.querySelector('#modalCpfCli');
        const nomeCliElement = modal.querySelector('#modalNome');
        const codigoElement = modal.querySelector('#modalCodigo');
        const modalCodigo = modal.querySelector('#modalCodigo');
        const modalTipo = modal.querySelector('#modalTipo');
        const modalSituacao = modal.querySelector('#modalSituacao');

        // Exluindo os campos criados
        if (cpfCliElement) {
            cpfCliElement.parentElement.remove();
        }
        // Limpa os campos fixos do modal
        modalCodigo.textContent = '';
        modalTipo.textContent = '';
        modalSituacao.textContent = '';
    });

    return modal;
}