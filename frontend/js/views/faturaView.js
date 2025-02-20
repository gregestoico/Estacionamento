import fetchApi from "../api/fetch.js";

/** Função para criar a visualização da página de Faturas */
export async function criarFaturaView(faturas) {
    const container = document.createElement('div');
    container.className = 'container mt-5';

    const header = document.createElement('h2');
    header.textContent = 'Faturas';
    container.appendChild(header);

    const faturamentoContainer = document.createElement('div');
    faturamentoContainer.className = 'my-3';
    container.appendChild(faturamentoContainer);

    const faturamentoLabel = document.createElement('h4');
    faturamentoLabel.textContent = 'Faturamento Total: R$ ';
    faturamentoContainer.appendChild(faturamentoLabel);

    const faturamentoValue = document.createElement('span');
    faturamentoValue.id = 'faturamentoTotal';
    faturamentoLabel.appendChild(faturamentoValue);

    const faturaList = document.createElement('div');
    faturaList.className = 'list-group overflow-auto';
    faturaList.style.maxHeight = '400px';
    container.appendChild(faturaList);

    document.body.appendChild(container);

    let faturamentoTotal = 0;

    faturas.forEach(fatura => {
        const faturaItem = document.createElement('div');
        faturaItem.className = 'list-group-item';
        faturaItem.innerHTML = `
            <div class="d-flex w-100 justify-content-between">
                <h5 class="mb-1">Fatura: ${fatura.cod_fatura}</h5>
                <small>${fatura.data_venc}</small>
            </div>
            <p class="mb-1">Cliente: ${fatura.cpf_cli}</p>
            <p class="mb-1">Valor: R$ ${Number(fatura.preco_mensal).toFixed(2)}</p>
            <p class="mb-1">Data de Pagamento: ${fatura.data_pag ? fatura.data_pag : '<strong>Não Pago</strong>'}</p>
            ${!fatura.data_pag ? `
                <div class="d-flex justify-content-between align-items-center">
                    <i class="bi bi-exclamation-circle text-danger"></i>
                    <button class="btn btn-success confirmar-pagamento-btn" data-cod_fatura="${fatura.cod_fatura}">Confirmar Pagamento</button>
                </div>
            ` : ''}
        `;
        faturaList.appendChild(faturaItem);

        if (fatura.data_pag) {
            faturamentoTotal += Number(fatura.preco_mensal);
        }
    });

    faturamentoValue.textContent = faturamentoTotal.toFixed(2);

    // Adiciona evento aos botões de confirmar pagamento
    document.querySelectorAll('.confirmar-pagamento-btn').forEach(button => {
        button.addEventListener('click', async function () {
            const cod_fatura = this.getAttribute('data-cod_fatura');
            const confirmacao = confirm('Você tem certeza que deseja confirmar o pagamento desta fatura?');

            if (confirmacao) {
                const response = await fetchApi('/fatura/pagar/' + cod_fatura, 'PUT', {
                    data_pag: new Date().toISOString().split('T')[0] // Data atual no formato YYYY-MM-DD
                });

                if (response.ok) {
                    alert('Pagamento confirmado com sucesso!');
                    location.reload();
                } else {
                    alert('Erro ao confirmar o pagamento.');
                }
            }
        });
    });
}