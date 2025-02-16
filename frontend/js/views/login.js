import criarloginForm from "../components/loginForm.js";
import {criarImg} from "../components/img.js";

/** Classe para a view da página de login. */
class LoginView {
    /** Atualiza a UI com o formulário de login. */
    atualizarUI(){
        const loginForm = criarloginForm();
        // const logoBanner = criarImg();
        const body = document.querySelector('body');
        // body.insertBefore(logoBanner, body.firstChild);
        body.insertBefore(loginForm, body.firstChild);
    }
}

export default new LoginView();