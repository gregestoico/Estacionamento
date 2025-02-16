import fetchApi from "../api/fetch.js";


/** Função para fazer logout */
export function logout() {
    localStorage.removeItem('token');
    window.location.href = '/frontend/index.html';
}


/** Função para fazer login 
 * @param {string} email - O email do usuário.
 * @param {string} senha - A senha do usuário.
 */
export async function login(email, senha) {
    const response = await fetchApi('/login', 'POST', { email, senha });

    if (response.ok) {
        const data = await response.json();
        // Login bem-sucedido
        console.log('Login successful:', data.token);
        // Salva o token no localStorage
        localStorage.setItem('token', data.token);
        // Redirecionamento de página 
        window.location.href = './pages/home.html';
    } else {
        // Login falhou
        const errorData = await response.json();
        throw new Error('Login falhou: ', errorData.msg);
    } 

}