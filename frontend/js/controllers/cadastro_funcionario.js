const PORT = 3000; // Porta do backend
const apiUrl = `http://localhost:${PORT}/api`; // URL da API


document.addEventListener('DOMContentLoaded', async () => {
    const form = document.getElementById('client-form');
    const roleSelect = document.getElementById('role');
    console.log('Formulário:', form); // debug
    // Carrega os cargos
    async function loadRoles() {
        try {
            console.log('Iniciando carregamento dos planos...'); // debug
            // Obtém o token do localStorage
            const token = localStorage.getItem('token');
            const response = await fetch(apiUrl + '/funcionario/cargos', {
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
            cargos = data.cargos;
            
            // Verifica se há cargos definidos
            if (cargos.length === 0) {
                console.log('Nenhum cargo foi definido na tabela.'); // debug
                return;
            }

            // Adiciona os cargos ao select
            cargos.forEach(role => {
                const option = document.createElement('option');
                option.value = role;
                option.textContent = role;
                roleSelect.appendChild(option);
            });
        } catch (error) {
            console.error('Erro ao carregar cargos:', error);
        }
    }
    
    // Submit do formulário
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = {
            cpf: document.getElementById('cpf').value,
            nome: document.getElementById('name').value,
            email: document.getElementById('email').value,
            cargo: document.getElementById('role').value,
            senha: document.getElementById('password').value
        };
        console.log('Dados do formulário:', formData); // debug
        
        try {
            // Obtém o token do localStorage
            const token = localStorage.getItem('token');
            const response = await fetch(apiUrl + '/funcionario', {
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
                // Redireciona para a página inicial
                window.location.href = '../home.html';
            } else {
                alert('Erro ao realizar cadastro');
            }
        } catch (error) {
            console.error('Erro:', error);
            alert('Erro ao realizar cadastro');
        }
    });
    
    await loadRoles();
});