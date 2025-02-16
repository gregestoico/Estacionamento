const PORT = 3000; // Porta do backend
const apiUrl = `http://localhost:${PORT}/api`; // URL da API


document.addEventListener('DOMContentLoaded', async () => {
    const form = document.getElementById('client-form');
    const planSelect = document.getElementById('plan');
    console.log('Formulário:', form); // debug
    // Carrega os planos
    async function loadPlans() {
        try {
            console.log('Iniciando carregamento dos planos...'); // debug
            // Obtém o token do localStorage
            const token = localStorage.getItem('token');
            const response = await fetch(apiUrl + '/plano', {
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
            planos = data.planos;
            
            // Verifica se há planos cadastrados
            if (planos.length === 0) {
                console.log('Nenhum plano encontrado'); // debug
                return;
            }

            // Adiciona os planos ao select
            planos.forEach(plan => {
                const option = document.createElement('option');
                option.value = plan.cod_plano;
                option.textContent = `${plan.turno} - R$ ${plan.preco_mensal}`;
                planSelect.appendChild(option);
            });
        } catch (error) {
            console.error('Erro ao carregar planos:', error);
        }
    }
    
    // Submit do formulário
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = {
            cpf: document.getElementById('cpf').value,
            nome: document.getElementById('name').value,
            email: document.getElementById('email').value,
            telefone: document.getElementById('phone').value,
            cod_plano: document.getElementById('plan').value
        };
        
        try {
            // Obtém o token do localStorage
            const token = localStorage.getItem('token');
            const response = await fetch(apiUrl + '/mensalista', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                },
                body: JSON.stringify(formData)
            });
            
            if (response.ok) {
                alert('Cadastro realizado com sucesso!');
                // Armazena o CPF do cliente no sessionStorage
                // sessionStorage.setItem('cpf_cli', formData.cpf);
                form.reset();
                // Redireciona para a página de cadastro de veículos
                window.location.href = './cadastro_veiculo.html';
            } else {
                alert('Erro ao realizar cadastro');
            }
        } catch (error) {
            console.error('Erro:', error);
            alert('Erro ao realizar cadastro');
        }
    });
    
    await loadPlans();
});