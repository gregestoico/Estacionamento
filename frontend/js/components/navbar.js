import { logout } from "../auth/auth.js";

export function criarNavbar() {
    const navbar = document.createElement('nav');
    navbar.id = 'header';
    navbar.className = "navbar navbar-expand-lg navbar-dark bg-primary position-fixed w-100 top-0";
    navbar.style.zIndex = 1;
    // TODO: Modularizar o código dos nav-item dropdown se der tempo
    navbar.innerHTML = `
        <div class="container-fluid col-10">
            <a class="navbar-brand fw-bold" href="./home.html">
                <img src="../favicon.ico" alt="Estacionamento" width="30" height="30" class="d-inline-block align-text-top">
                Primepark
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
                <ul class="navbar-nav">
                    <li id="funcionarios-link" class="nav-item dropdown">
                        <a class="highlight nav-link dropdown-toggle" href="#" id="funcionariosDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Funcionários
                        </a>
                        <ul class="dropdown-menu bg-primary" aria-labelledby="funcionariosDropdown">
                            <li><a id="cadastrar-funcionario" class="dropdown-item" href="#">Cadastrar</a></li>
                            <li><a id="detalhes-funcionario" class="dropdown-item" href="#">Detalhes</a></li>
                        </ul>
                    </li>
                    <li id="clientes-link" class="nav-item dropdown">
                        <a class="highlight nav-link dropdown-toggle" href="#" id="clientesDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Clientes
                        </a>
                        <ul class="dropdown-menu bg-primary" aria-labelledby="clientesDropdown">
                            <li><a id="detalhes-cliente" class="dropdown-item" href="./detalhes_cliente.html">Contratos</a></li>
                            <li><a id="cadastrar-cliente" class="dropdown-item" href="./cadastro_cliente.html">Novo Cliente</a></li>
                        </ul>
                    </li>
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

    // Adiciona um evento de expandir e recolher ao hover do dropdown
    const dropdowns = navbar.querySelectorAll(".nav-item.dropdown");
    dropdowns.forEach(dropdown => {
        dropdown.addEventListener("mouseenter", function () {
            this.querySelector(".dropdown-menu").classList.add("show");
        });
        dropdown.addEventListener("mouseleave", function () {
            this.querySelector(".dropdown-menu").classList.remove("show");
        });
    });

    // Adiciona evento de clique ao botão de sair
    navbar.querySelector('#sair').addEventListener('click', (event) => {
        event.preventDefault(); // Impede o comportamento padrão do link

        // Exibe um alerta de confirmação
        const confirmarLogout = confirm('Tem certeza que deseja sair?');
        if (confirmarLogout) {
            logout();
        }
    })

    // TODO: Substituir essas funções pelo href do proprio link do navbar
    
    // Adiciona um evento ao botão da logo
    // const logo = navbar.querySelector('.navbar-brand');
    // adicionarListener(logo, './home.html');

    // Adiciona um evento ao botão de cadastro de cliente
    // const linkClientes = navbar.querySelector('#clientes-link');
    // adicionarListener(linkClientes, './cadastro_cliente.html');

    // Adiciona um evento ao botão de cadastro de cliente
    const linkDetalhesFuncionario = navbar.querySelector('#detalhes-funcionario');
    adicionarListener(linkDetalhesFuncionario, './detalhes_funcionario.html');

    // Adiciona um evento ao botão de cadastro de veículo
    const linkVeiculos = navbar.querySelector('#veiculos-link');
    adicionarListener(linkVeiculos, './cadastro_veiculo.html');

    // Adiciona um evento ao botão de cadastro de funcionário
    const linkFuncionarios = navbar.querySelector('#cadastrar-funcionario');
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