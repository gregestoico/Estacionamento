import fetchApi from "../api/fetch.js";
import loginView from '../views/login.js';

class LoginController{
    async init(){
        try {
            loginView.atualizarUI();
        } catch (error) {
            console.error('Erro ao carregar página de login:', error);
        }
    }
}

export default new LoginController();