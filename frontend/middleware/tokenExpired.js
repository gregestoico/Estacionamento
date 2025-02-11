// Configura o Axios com base na URL da API e adiciona o middleware de verificação do token
export function axiosInterceptor(apiUrl) {
    axios.defaults.baseURL = apiUrl; // Define a URL base para todas as requisições do Axios
    axios.defaults.headers.common['Content-Type'] = 'application/json'; // Define o cabeçalho padrão 'Content-Type' para 'application/json'

    // Adiciona um interceptor ( a função do argumento ) de requisição ao Axios
    axios.interceptors.request.use(config => {
        const token = localStorage.getItem('token'); // Obtém o token armazenado no localStorage
        if (token) {
            const tokenPayload = JSON.parse(atob(token.split('.')[1])); // Decodifica o payload do token JWT
            const currentTime = Math.floor(Date.now() / 1000); // Obtém o tempo atual em segundos

            if (tokenPayload.exp < currentTime) { // Verifica se o token está expirado
                alert('Sessão expirada. Por favor, faça login novamente.'); // Alerta o usuário sobre a expiração da sessão

                window.location.href = '/frontend/index.html'; // Redireciona para a página de login

                return Promise.reject('Token expirado'); // Rejeita a requisição com a mensagem 'Token expirado'
            }

            config.headers['Authorization'] = token; // Adiciona o token ao cabeçalho 'Authorization' da requisição
        }
        return config; // Retorna a configuração da requisição
    }, error => {
        return Promise.reject(error); // Rejeita a requisição em caso de erro
    });
}

// // Função genérica para tratar erros de requisições
// export function handleAxiosError(error, customMessage = 'Ocorreu um erro.') {
//     console.error(customMessage, error);
//     alert(customMessage);
// }
