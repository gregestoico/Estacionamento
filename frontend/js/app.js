import {criarNavbar} from './components/navbar.js';
import loginController from './controllers/login.js';
import homeController from './controllers/home.js';
import detalhesFuncionarioController from './controllers/detalhes_funcionario.js';
import detalhesClienteController from './controllers/detalhes_cliente.js';
import cadastroFuncionarioController from './controllers/cadastro_funcionario.js';
import cadastroClienteController from './controllers/cadastro_cliente.js';
import cadastroVeiculoController from './controllers/cadastro_veiculo.js';
import planosController from './controllers/planos.js';
import { criarFooter } from './components/footer.js';

document.addEventListener('DOMContentLoaded', async () => {
    
    const controllers = {
        login: loginController,
        home: homeController,
        funcionario: cadastroFuncionarioController,
        cadastro_cliente: cadastroClienteController,
        veiculo: cadastroVeiculoController,
        detalhes_funcionario: detalhesFuncionarioController,
        detalhes_cliente: detalhesClienteController,
        planos: planosController,
    };
    
    const paginaAtual = document.body.id;
    if (paginaAtual !== 'login') {
        inserirNavbarFooter();
    }
    console.log('paginaAtual: ', paginaAtual);
    if (controllers[paginaAtual]) {
        await controllers[paginaAtual].init();
    }
    
});

function inserirNavbarFooter() {
    const elementNavbar = criarNavbar();
    const footer = criarFooter();
    const body = document.querySelector('body');
    body.insertBefore(elementNavbar, body.firstChild);
    body.appendChild(footer);
    const navbarHeight = elementNavbar.offsetHeight;
    const footerHeight = elementNavbar.offsetHeight;
    body.style.paddingTop = `${navbarHeight}px`;
    body.style.paddingBottom = `calc(${footerHeight}px + 3rem)`;
    body.appendChild(footer);
}