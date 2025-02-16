

export function criarFooter() {
    // Cria o elemento footer
    const footer = document.createElement('footer');
    footer.className = 'footer bg-primary text-white text-center py-3 mt-auto';
    footer.innerHTML = `
    <div class="container">
        <p class="mb-0">© 2025 Primepark. Todos os direitos reservados.</p>
        <p class="mb-0"><a href="#" class="text-white text-decoration-none">Política de Privacidade</a> | <a href="#" class="text-white text-decoration-none">Termos de Uso</a></p>
    </div>
    `;

    return footer;
}