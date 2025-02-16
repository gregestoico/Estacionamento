const PORT = 3000; // Porta do backend
const apiUrl = `http://localhost:${PORT}/api`; // URL da API

document.addEventListener('DOMContentLoaded', async () => {
    const form = document.getElementById('veiculo-form');
    const vehicleTypeSelect = document.getElementById('vehicle-type');
    // Recupera o CPF do cliente do sessionStorage
    const cpf_cli = sessionStorage.getItem('cpf_cli');

    /** Inicializa o campo de CPF do cliente associado no formulário */
    function initializeCPF() {
        // Insere o CPF do cliente no campo do formulário
        const cpfElement = document.getElementById('cpf_cli');
        cpfElement.value = cpf_cli
    };

    /** Carrega os tipos de veículos */
    async function loadVehiculeTypes() {
        try {
            console.log('Iniciando carregamento dos tipos de veículos...'); // debug
            // Obtém o token do localStorage
            const token = localStorage.getItem('token');
            const response = await fetch(apiUrl + '/veiculo/tipos', {
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
            tiposVeiculos = data.tipos;
            
            // Verifica se há tipos de veículos definidos
            if (tiposVeiculos.length === 0) {
                console.log('Nenhum tipo de veículo foi definido na tabela.'); // debug
                return;
            }

            // Adiciona os tipos de veículos ao select
            tiposVeiculos.forEach(tipo => {
                const option = document.createElement('option');
                option.value = tipo;
                option.textContent = tipo;
                vehicleTypeSelect.appendChild(option);
            });
        } catch (error) {
            console.error('Erro ao carregar tipos de veículos:', error);
        }
    }

    /** Valida a placa do veículo */
    function validatePlate(plate) {
        // Verifica se a placa é do modelo Mercosul ou se é do modelo antigo
        const regexAntiga = /^[A-Z]{3}\d{4}$/;
        const regexMercosul = /^[A-Z]{3}\d[A-Z]\d{2}$/;
        verify = regexAntiga.test(plate) || regexMercosul.test(plate);
        if (!verify) {
            alert('Placa inválida! Informe uma placa no formato AAA9999 ou ABC1D23');
            return false;
        }
        return true;
    }
    
    // Submit do formulário
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = {
            placa: document.getElementById('plate').value,
            modelo: document.getElementById('model').value,
            cor: document.getElementById('color').value,
            tipo_veic: document.getElementById('vehicle-type').value,
            cpf_cli: cpf_cli
        };

        // Valida a placa
        if (!validatePlate(formData.placa)) {
            return;
        }

        // Envia os dados do formulário para a API
        try {
            // Obtém o token do localStorage
            const token = localStorage.getItem('token');
            const response = await fetch(apiUrl + '/veiculo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                },
                body: JSON.stringify(formData)
            });
            
            if (response.ok) {
                alert('Cadastro realizado com sucesso!');
                form.reset();
            } else {
                alert('Erro ao realizar cadastro');
            }
        } catch (error) {
            console.error('Erro:', error);
            alert('Erro ao realizar cadastro');
        }
    });
    
    // Execução das funções de inicialização
    await loadVehiculeTypes();
    initializeCPF();
});