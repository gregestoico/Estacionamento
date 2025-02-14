import { carregarNavbar } from './components/navbar.js';
import loginController from './controllers/login.js';
import homeController from './controllers/home.js';
import cadastroFuncionarioController from './controllers/cadastro_funcionario.js';
import cadastroClienteController from './controllers/cadastro_cliente.js';

document.addEventListener('DOMContentLoaded', async () => {
    carregarNavbar();

    const controllers = {
        login: loginController,
        home: homeController,
        funcionario: cadastroFuncionarioController,
        cliente: cadastroClienteController,
    };

    const paginaAtual = document.body.id;
    if (controllers[paginaAtual]) {
        await controllers[paginaAtual].init();
    }
});
