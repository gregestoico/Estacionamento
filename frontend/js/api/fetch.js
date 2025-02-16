const PORT = 3000; // Porta do backend
const apiUrl = `http://localhost:${PORT}/api`; // URL da API

/**
 * Busca dados da API no endpoint informado e com o método informado.
 *
 * @param {string} endpoint - O endpoint da API a ser buscado.
 * @param {string} method - O método HTTP a ser usado (por exemplo, 'GET', 'POST').
 * @param {Object} [body] - O payload da requisição a ser enviado com a solicitação.
 * @returns {Promise<Response>} A resposta da requisição fetch.
 * @throws {Error} Se a resposta não for bem-sucedida (código de status não estiver na faixa 200-299).
 */
async function fetchApi(endpoint, method, body) {
    try{
        // Obtém o token do localStorage
        const token = localStorage.getItem('token');
        const response = await fetch(`${apiUrl}${endpoint}`, {
            method: method,
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify(body)
        });

        // Verifica se o token expirou
        if(response.status === 400) {
            alert("Token inválido ou não fornecido. Faça login para acessar esta página");
            // Redireciona para a página de login (caminho relativo ao html)
            window.location.href = '../index.html';
        } else if(response.status === 401) {
            alert('Seção expirada. Faça login para acessar esta página');
            // Redireciona para a página de login (caminho relativo ao html)
            window.location.href = '../index.html';
        } else if(response.status === 403) {
            alert('Você não tem permissão para acessar esta página');
            // Redireciona para a página de login (caminho relativo ao html)
        } else if (!response.ok) {
            alert((await response.json()).msg);
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response;
    } catch (error) {
            console.error('Erro:', error);
        }

        return response;
}

export default fetchApi;
