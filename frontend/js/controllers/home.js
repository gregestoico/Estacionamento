const PORT = 3000; // Porta do backend
const apiUrl = `http://localhost:${PORT}/api`; // URL da API

document.addEventListener('DOMContentLoaded', async () => {
    /** Função para criar um card com os dados da vaga */
    function criarCard(codigo, tipo, situacao) {
        // Mapeia uma cor para cada situação da vaga
        const cores = {
            'Livre': 'background-color: rgb(240, 240, 240); color: dark;',    // Um cinza claro (RGB)
            'Ocupada': 'background-color: hsl(0, 0.00%, 55.10%); color: dark;',     // Um cinza médio (HSL)
            'Reservada': 'background-color: hsl(0, 0.00%, 80.00%); color: dark;'     // Um cinza médio (HSL)
        };
        return `
            <div class="col-md-4">
                <div id='vaga${codigo}' class="vaga-card highlight card mb-3" style="${cores[situacao]}"
                    data-bs-toggle="modal" 
                    data-bs-target="#vagaModal"
                    data-codigo="${codigo}"
                    data-tipo="${tipo}"
                    data-situacao="${situacao}">
                    <div class="card-header">Vaga ${codigo}</div>
                    <div class="card-body">
                        <h5 class="card-title">${situacao}</h5>
                        <p class="card-text">${tipo}</p>
                    </div>
                </div>
            </div>
        `;
    }

    /** Carrega todas as vagas do estacionamento */
    async function loadParkingSpots() {
        try {
            console.log('Iniciando carregamento das vagas do estacionemento...'); // debug
            // Obtém o token do localStorage
            const token = localStorage.getItem('token');
            const response = await fetch(apiUrl + '/vaga', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                }
            });
            
            // Verifica se o token expirou
            if(response.status === 401) {
                alert('Seção expirada. Faça login para acessar esta página');
                // Redireciona para a página de login (caminho relativo ao html)
                window.location.href = '../../index.html';
            }
            
            console.log('Resposta da API:', response); // debug
            const data = await response.json();

            // Verifica se a resposta da API foi bem-sucedida
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            console.log('Dados recebidos:', data); // debug
            vagas = data.vagas;
            
            // Verifica se há tipos de veículos definidos
            if (vagas.length === 0) {
                console.log('Nenhuma vaga foi cadastrada no banco de dados'); // debug
                return;
            }

            // Adiciona um card para cada vaga obtida
            vagas.forEach(vaga => {
                const row = document.querySelector('#vagas-container .row');
                row.innerHTML += criarCard(vaga.cod_vaga, vaga.tipo_veic, vaga.situacao);
            });
        } catch (error) {
            console.error('Erro ao carregar as vagas', error);
        }
    }

    // Adiciona um evento ao modal de vaga para limpar os campos dinamicamente ao fechar 
    vagaModal.addEventListener('show.bs.modal', async function (e) {
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

        // Obtém o token do localStorage
        const token = localStorage.getItem('token');
        const response = await fetch(apiUrl + '/entrada/vaga/' + codigo, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        });

        // Verifica se o token expirou
        if(response.status === 401) {
            alert('Seção expirada. Faça login para acessar esta página');
            // Redireciona para a página de login (caminho relativo ao html)
            window.location.href = '../../index.html';
        }

        console.log('Resposta da API:', response); // debug
        const data = await response.json();

        // Verifica se a resposta da API foi bem-sucedida
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        console.log('Dados recebidos:', data); // debug
        entrada = data.entrada;

        // Verifica se a entrada foi encontrada
        if(entrada === null) {
            console.error('Entrada não encontrada');
            return;
        } else if (entrada.cpf_cli) { // Verifica se um cliente mensalista ocupou a vaga
            // Preenche o modal com as adicionais do cliente
            document.getElementById('modal-body').innerHTML += `
                <p><strong>CPF do cliente:</strong> <span id="modalCpfCli">${entrada.cpf_cli}</span></p>
                <p><strong>Nome cliente:</strong> <span id="modalNome">${entrada.nome_cli}</span></p>
            `;
        }

        // Preenche o modal com as informações da entrada
        document.getElementById('modalCodigo').textContent = entrada.cod_vaga || card.getAttribute('data-codigo');
        document.getElementById('modalTipo').textContent = entrada.tipo_veic || card.getAttribute('data-tipo');
        document.getElementById('modalSituacao').textContent = entrada.situacao || card.getAttribute('data-situacao');
    });

    // Adiciona um evento ao modal de vaga para limpar os campos dinamicamente ao fechar 
    vagaModal.addEventListener('hidden.bs.modal', function () {
        const cpfCliElement = document.getElementById('modalCpfCli');
        const nomeCliElement = document.getElementById('modalNome');

        // Exluindo os campos criados
        if (cpfCliElement) {
            cpfCliElement.parentElement.remove();
        }
        if (nomeCliElement) {
            nomeCliElement.parentElement.remove();
        }
        // Limpa os campos do modal
        modalCodigo.textContent = '';
        modalTipo.textContent = '';
        modalSituacao.textContent = '';
    });


    /// Adiciona um evento ao botão de sair
    const sairBtn = document.getElementById('sair');
    sairBtn.addEventListener('click', (event) => {
        event.preventDefault(); // Impede o comportamento padrão do link

        // Exibe um alerta de confirmação
        const confirmarLogout = confirm('Tem certeza que deseja sair?');

        if (confirmarLogout) {
            // Remove o token de autenticação do localStorage
            localStorage.removeItem('token');

            // Redireciona o usuário para a página de login
            window.location.href = '../../index.html';
        }
    });

    // Adiciona um evento ao botão de cadastro de cliente
    const cadastroClientes = document.getElementById('clientes-link');
    cadastroClientes.addEventListener('click', (event) => {
        event.preventDefault(); // Impede o comportamento padrão do link

        // Redireciona o usuário para a página de cadastro de cliente
        window.location.href = '../cadastro/cadastro_cliente.html';
    });


    // Adiciona um evento ao botão de cadastro de veículo
    const cadastroVeiculos = document.getElementById('veiculos-link');
    cadastroVeiculos.addEventListener('click', (event) => {
        event.preventDefault(); // Impede o comportamento padrão do link

        // Redireciona o usuário para a página de cadastro de veículo
        window.location.href = '../cadastro/cadastro_veiculo.html';
    });

    // Adiciona um evento ao botão de cadastro de funcionário
    const cadastroFuncionarios = document.getElementById('funcionarios-link');
    cadastroFuncionarios.addEventListener('click', (event) => {
        event.preventDefault(); // Impede o comportamento padrão do link

        // Redireciona o usuário para a página de cadastro de funcionário
        window.location.href = '../cadastro/cadastro_funcionario.html';
    });

    // Execução das funções de inicialização
    await loadParkingSpots();
});