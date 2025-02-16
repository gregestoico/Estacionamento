import {criarNavbar} from './components/navbar.js';
import loginController from './controllers/login.js';
import homeController from './controllers/home.js';
import cadastroFuncionarioController from './controllers/cadastro_funcionario.js';
import cadastroClienteController from './controllers/cadastro_cliente.js';
import cadastroVeiculoController from './controllers/cadastro_veiculo.js';

document.addEventListener('DOMContentLoaded', async () => {
    
    const controllers = {
        login: loginController,
        home: homeController,
        funcionario: cadastroFuncionarioController,
        cliente: cadastroClienteController,
        veiculo: cadastroVeiculoController,
    };
    
    const paginaAtual = document.body.id;
    if (paginaAtual !== 'login') {
        inserirNavbar();
    }
    console.log('paginaAtual: ', paginaAtual);
    if (controllers[paginaAtual]) {
        await controllers[paginaAtual].init();
    }
    
});

function inserirNavbar() {
    const elementNavbar = criarNavbar();
    const body = document.querySelector('body');
    body.insertBefore(elementNavbar, body.firstChild);
}