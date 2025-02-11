const PORT = 3000; // Porta do backend
const apiUrl = `http://localhost:${PORT}/api`; // URL da API

document.getElementById('loginForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    console.log('Email:', email);
    console.log('Senha:', senha);
    try {
        const response = await fetch(apiUrl + '/login', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, senha })
        });

        if (response.ok) {
            const data = await response.json();
            // Login bem-sucedido
            console.log('Login successful:', data.token);
            // Salva o token no localStorage
            localStorage.setItem('token', data.token);
            // Redirecionamento de página 
            window.location.href = './pages/cadastro/cadastro_cliente.html';
        } else {
            // Login falhou
            console.error('Login failed:', data.msg);
            alert('O Login falhou: ' + data.msg);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Ocorreu um erro: ' + error.message);
    }
});