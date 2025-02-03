document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();

    let email = document.getElementById("email").value;
    let senha = document.getElementById("senha").value;

    fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email, senha: senha })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            window.location.href = "pages/dashboard.html"; // Redirecionamento após login
        } else {
            document.getElementById("mensagem").textContent = "E-mail ou senha incorretos!";
        }
    })
    .catch(() => {
        document.getElementById("mensagem").textContent = "Erro ao conectar com o servidor.";
    });
});

