criarCardFuncionario = (funcionario) => {
    const card = document.createElement('div');
    card.className = 'col-md-6 mb-3';
    card.innerHTML = `
        <div class="card d-flex flex-row align-items-center p-3">
            <img src="https://randomuser.me/api/portraits/men/91.jpg" class="rounded-circle me-3" alt="Foto do Funcionário">
            <div>
                <h5 class="card-title">João da Silva</h5>
                <p class="card-text">Cargo: Atendente</p>
                <p class="card-text">CPF: 123.456.789-00</p>
            </div>
        </div>
    `;
    return card;
}

<div class="col-md-6 mb-3">
                    <div class="card d-flex flex-row align-items-center p-3">
                        <img src="https://via.placeholder.com/100" class="rounded-circle me-3" alt="Foto do Funcionário">
                        <div>
                            <h5 class="card-title">João da Silva</h5>
                            <p class="card-text">Cargo: Atendente</p>
                            <p class="card-text">CPF: 123.456.789-00</p>
                        </div>
                    </div>
                </div>