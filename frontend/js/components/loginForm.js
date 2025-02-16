import {login} from "../auth/auth.js";

function criarloginForm() {
    // Cria um formulário de login
    const div = document.createElement('div');
    div.className = 'container d-flex justify-content-center align-items-center min-vh-100'
    div.innerHTML = `
        <div class="col-md-5 d-flex justify-content-center align-items-center bg-primary text-white p-4" style="height: 100%;">
            <img src="favicon.ico" alt="Prime Park Logo" class="img-fluid">
        </div>
        <div class="col-md-7 d-flex align-items-center" style="height: 100%;">
            <div class="login-container p-4 rounded shadow-sm col-7 d-flex flex-column justify-content-center" style="height: 100%;">
                <h1 id="mensagem" class="text-center mb-5 text-white">Bem Vindo Ao Primepark!</h1>
                <h2 class="text-center mb-4">Login</h2>
                <form id="loginForm">
                    <div class="mb-3">
                        <label for="email" class="form-label">E-mail:</label>
                        <input type="email" id="email" class="form-control" required>
                    </div>

                    <div class="mb-3">
                        <label for="senha" class="form-label">Senha:</label>
                        <input type="password" id="senha" class="form-control" required>
                    </div>

                    <div class="text-center">
                        <button type="submit" class="btn btn-primary w-100">Entrar</button>
                    </div>
                </form>
            </div>
        </div>
    `;

    // Adiciona um evento de submit ao formulário
    const form = div.querySelector('#loginForm');
    div.addEventListener('submit', async (event) => {
        event.preventDefault();

        const email = form.email.value;
        const senha = form.senha.value;
        
        try{
            login(email, senha);
        } catch (error) {
            console.error('Error:', error);
            alert('Ocorreu um erro: ' + error.message);
        }
    });

    return div;
}

export default criarloginForm;