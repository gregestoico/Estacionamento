import {login} from "../auth/auth.js";
import {criarLogoImg} from './img.js';

function criarloginForm() {
    // Cria um formulário de login
    const div = document.createElement('div');

    div.className = 'container d-flex justify-content-center flex-column flex-sm-row align-items-center min-vh-100'
    div.innerHTML = `
        <div class="login-container text-white d-flex flex-column align-items-center col-12 col-md-7 rounded shadow-sm" style="height: 100%;">
            <h1 id="mensagem" class="text-center mb-5">Bem Vindo Ao Primepark!</h1>
            <h2 class="text-center mb-4">Login</h2>
            <form id="loginForm" class="col-12 col-md-8">
                <div class="mb-3">
                    <label for="email" class="form-label">E-mail:</label>
                    <input type="email" id="email" class="form-control" required>
                </div>

                <div class="mb-3">
                    <label for="senha" class="form-label">Senha:</label>
                    <input type="password" id="senha" class="form-control" required>
                </div>

                <div class="text-center">
                    <button type="submit" class=" mt-4 btn custom-btn btn-primary w-100 ">Entrar</button>
                </div>
            </form>
        </div>
    `;

    const logoImg = criarLogoImg('./favicon.ico', 'Logo da Primepark', 'col-md-5 d-none d-md-flex');
    div.insertBefore(logoImg, div.firstChild);

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