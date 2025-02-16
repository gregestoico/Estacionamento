import { logout } from "../auth/auth.js";

export function criarNavbar() {
    const navbar = document.createElement('nav');
    navbar.className = "navbar navbar-expand-lg navbar-dark bg-primary";
    navbar.innerHTML = `
        <div class="container-fluid col-10">
            <a class=" navbar-brand" href="#">
                <img src="../favicon.ico" alt="Estacionamento" width="30" height="30" class="d-inline-block align-text-top">
                Primepark
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
                <ul class="navbar-nav">
                    <li id="funcionarios-link" class="nav-item"><a class="highlight nav-link" href="#">Funcionários</a></li>
                    <li id="clientes-link" class="nav-item"><a class="highlight nav-link" href="#">Clientes</a></li>
                    <li class="nav-item"><a class="highlight nav-link" href="#">Planos</a></li>
                    <li id="veiculos-link" class="nav-item"><a class="highlight nav-link" href="#">Veículos</a></li>
                    <li class="nav-item"><a class="highlight nav-link" href="#">Entradas</a></li>
                    <li class="nav-item"><a class="highlight nav-link" href="#">Preços</a></li>
                    <li class="nav-item"><a class="highlight nav-link" href="#">Faturamento</a></li>
                    <li id="sair" class="nav-item ms-3"><a class="highlight nav-link" href="#">Sair</a></li>
                </ul>
            </div>
        </div>
    `;

    // Adiciona evento de clique ao botão de sair
    navbar.querySelector('#sair').addEventListener('click', (event) => {
        event.preventDefault(); // Impede o comportamento padrão do link

        // Exibe um alerta de confirmação
        const confirmarLogout = confirm('Tem certeza que deseja sair?');
        if (confirmarLogout) {
            logout();
        }
    })

    // Adiciona um evento ao botão da logo
    const logo = navbar.querySelector('.navbar-brand');
    adicionarListener(logo, './home.html');

    // Adiciona um evento ao botão de cadastro de cliente
    const linkClientes = navbar.querySelector('#clientes-link');
    adicionarListener(linkClientes, './cadastro_cliente.html');

    // Adiciona um evento ao botão de cadastro de veículo
    const linkVeiculos = navbar.querySelector('#veiculos-link');
    adicionarListener(linkVeiculos, './cadastro_veiculo.html');

    // Adiciona um evento ao botão de cadastro de funcionário
    const linkFuncionarios = navbar.querySelector('#funcionarios-link');
    adicionarListener(linkFuncionarios, './cadastro_funcionario.html');


    return navbar;
}

/** Função que adiciona um evento de clique a um elemento
 *  para redirecionar o usuário para uma página específica.
 * @param {HTMLElement} element - O elemento ao qual o listener de clique será adicionado.
 * @param {string} pagePath - O caminho da página para a qual o usuário será redirecionado.
 */
function adicionarListener(element, pagePath){
    element.addEventListener('click', (event) => {
        event.preventDefault(); // Impede o comportamento padrão do link

        // Redireciona o usuário para a página de cadastro de cliente
        window.location.href = pagePath;
    });
}