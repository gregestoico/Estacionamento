/**document.addEventListener('DOMContentLoaded', async () => {
    const form = document.getElementById('client-form');
    const planSelect = document.getElementById('plan');
    
    // Carrega os planos
    async function loadPlans() {
        const response = await fetch('/api/plans');
        const plans = await response.json();
        
        plans.forEach(plan => {
            const option = document.createElement('option');
            option.value = plan.cod_plano;
            option.textContent = `${plan.turno} - R$ ${plan.preco_mensal}`;
            planSelect.appendChild(option);
        });
    }
    
    // Submit do formulário
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = {
            client: {
                cpf: document.getElementById('cpf').value,
                nome: document.getElementById('name').value,
                email: document.getElementById('email').value,
                telefone: document.getElementById('phone').value,
                codPlano: document.getElementById('plan').value
            },
            vehicle: {
                placa: document.getElementById('plate').value,
                modelo: document.getElementById('model').value,
                cor: document.getElementById('color').value,
                tipo: document.getElementById('vehicle-type').value
            }
        };
        
        try {
            const response = await fetch('/api/clients', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
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
    
    // Carrega os planos ao iniciar
    loadPlans();
});**/


document.addEventListener('DOMContentLoaded', async () => {
    const form = document.getElementById('client-form');
    const planSelect = document.getElementById('plan');
    
    // Carrega os planos
    async function loadPlans() {
        try {
            console.log('Iniciando carregamento dos planos...'); // debug
            const response = await fetch('/api/cliente/plans');
            console.log('Resposta da API:', response); // debug
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const plans = await response.json();
            console.log('Planos recebidos:', plans); // debug
            
            if (plans.length === 0) {
                console.log('Nenhum plano encontrado'); // debug
                return;
            }

            plans.forEach(plan => {
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
            client: {
                cpf: document.getElementById('cpf').value,
                nome: document.getElementById('name').value,
                email: document.getElementById('email').value,
                telefone: document.getElementById('phone').value,
                codPlano: document.getElementById('plan').value
            },
            vehicle: {
                placa: document.getElementById('plate').value,
                modelo: document.getElementById('model').value,
                cor: document.getElementById('color').value,
                tipo: document.getElementById('vehicle-type').value
            }
        };
        
        try {
            const response = await fetch('/api/cliente/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
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
    
    await loadPlans();
});
