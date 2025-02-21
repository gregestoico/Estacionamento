import fetchApi from "../api/fetch.js";

/** Função para criar a visualização da página de Faturas */
export async function criarFaturaContainer(faturas) {
    const container = document.createElement('div');
    container.className = 'container mt-5';

    const header = document.createElement('h2');
    header.textContent = 'Faturas';
    container.appendChild(header);

    const filterContainer = document.createElement('div');
    filterContainer.className = 'my-3';
    container.appendChild(filterContainer);

    const filterLabel = document.createElement('label');
    filterLabel.textContent = 'Filtrar por CPF: ';
    filterContainer.appendChild(filterLabel);

    const filterInput = document.createElement('input');
    filterInput.type = 'text';
    filterInput.className = 'form-control';
    filterInput.placeholder = 'Digite o CPF';
    filterContainer.appendChild(filterInput);

    const filterButton = document.createElement('button');
    filterButton.className = 'btn btn-primary highlight my-3';
    filterButton.textContent = 'Filtrar';
    filterContainer.appendChild(filterButton);

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
                <h5 class="mb-3"> Código da Fatura: ${fatura.cod_fatura}</h5>
                <small>${fatura.data_venc}</small>
            </div>
            <p class="mb-1">Cliente: ${fatura.cpf_cli}</p>
            <p class="mb-1">Valor: R$ ${Number(fatura.preco_mensal).toFixed(2)}</p>
            <p class="mb-1">Data de Pagamento: ${fatura.data_pag ? `<span class="text-success">Pago (${fatura.data_pag})</span>` : '<span class="text-danger fs-5"><strong>Não Pago</strong></span>'}</p>
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
                const response = await fetchApi('/fatura/pagar/' + cod_fatura, 'PUT');

                if (response.ok) {
                    alert('Pagamento confirmado com sucesso!');
                    location.reload();
                } else {
                    alert('Erro ao confirmar o pagamento.');
                }
            }
        });
    });

    // Adiciona evento ao botão de filtro
    filterButton.addEventListener('click', async function () {
        const filterValue = filterInput.value;

        if (!filterValue) {
            // Reload the page if the filter input is empty
            location.reload();
            return;
        }

        const endpoint = '/fatura/faturamento';
        const params = { cpf_cli: filterValue };

        const queryString = new URLSearchParams(params).toString();
        const response = await fetchApi(`${endpoint}?${queryString}`, 'GET');
        const data = await response.json();

        // Atualiza a lista de faturas com os resultados filtrados
        faturaList.innerHTML = '';
        faturamentoTotal = 0;

        // Trata o data.result para o filtro por CPF
        data.faturas.forEach(fatura => {
            const faturaItem = document.createElement('div');
            faturaItem.className = 'list-group-item';
            faturaItem.innerHTML = `
                <div class="d-flex w-100 justify-content-between">
                    <h5 class="mb-1">Id da Fatura: ${fatura.cod_fatura}</h5>
                    <small>${fatura.data_venc}</small>
                </div>
                <p class="mb-1">Cliente: ${fatura.cpf_cli}</p>
                <p class="mb-1">Valor: R$ ${Number(fatura.preco_mensal).toFixed(2)}</p>
                <p class="mb-1">Data de Pagamento: ${fatura.data_pag ? `<span class="text-success">Pago (${fatura.data_pag})</span>` : '<span class="text-danger fs-5"><strong>Não Pago</strong></span>'}</p>
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
    });
}