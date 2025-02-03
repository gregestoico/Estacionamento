# Sistema de Controle de Estacionamento

-- Trabalho Final de Banco de Dados I --

Alunos: 
    Emanuel Victor Fonseca
    Gregory Freitas de Araujo
    Luisa Reis Ribeiro

## Objetivo: 
    
Desenvolver um sistema web para gerenciamento de entradas e saídas de veículos de um estacionamento com uso de instanciação, leitura e escrita de dados em um Banco de Dados Relacionais.


## Detalhamento

O sistema deverá permitir o cadastro de funcionários para gestão do estacionamento, bem como permitir alterações nas tabelas de preços e planos de mensalidade.

## 1. **Classe `Funcionario`**

- **Descrição**: Representa um funcionário responsável pelo registro de entradas e saídas de veículos.
- **Atributos**:
  - `cpf_func`: Identificador único do funcionário.
  - `nome_func`: Nome do funcionário.
  - `email_func`: Email de contato.
  - `cargo`: Cargo ocupado pelo funcionário.
  - `senha`: Senha para acesso ao sistema.

## 2. **Classe `Mensalista`**

- **Descrição**: Representa um cliente que possui um plano mensal para uso do estacionamento.
- **Atributos**:
  - `cpf_cli`: Identificador único do cliente.
  - `nome_cli`: Nome do cliente.
  - `email_cli`: Email de contato.
  - `telefone_cli`: Telefone para contato.
  - `cod_plano`: Referência ao plano de mensalidade contratado.

## 3. **Classe `Plano`**

- **Descrição**: Define os planos de mensalidade disponíveis para clientes mensalistas.
- **Atributos**:
  - `cod_plano`: Identificador único do plano.
  - `turno`: Período de validade do plano (diurno, noturno, integral).
  - `preco_mensal`: Valor mensal do plano.

## 4. **Classe `Fatura`**

- **Descrição**: Representa as cobranças mensais dos clientes mensalistas.
- **Atributos**:
  - `cod_fatura`: Identificador único da fatura.
  - `data_venc`: Data de vencimento da fatura.
  - `data_pag`: Data de pagamento da fatura.
  - `cpf_cli`: Referência ao cliente associado à fatura.

## 5. **Classe `Preco_Rotativo`**

- **Descrição**: Define a tabela de preços para clientes rotativos, com base no tipo de veículo.
- **Atributos**:
  - `tipo_veic`: Tipo de veículo (carro, moto, etc.).
  - `valor_hora`: Valor cobrado por hora de permanência.

## 6. **Classe `Vaga`**

- **Descrição**: Representa uma vaga de estacionamento.
- **Atributos**:
  - `cod_vaga`: Identificador único da vaga.
  - `tipo_veic`: Tipo de veículo que a vaga comporta.
  - `situacao`: Situação atual da vaga (ocupada, livre).

## 7. **Classe `Veiculo`**

- **Descrição**: Representa um veículo cadastrado no sistema.
- **Atributos**:
  - `placa`: Identificador único do veículo.
  - `modelo`: Modelo do veículo.
  - `cor`: Cor do veículo.
  - `tipo_veic`: Tipo do veículo.
  - `cpf_cli`: Referência ao cliente proprietário (se for mensalista).

## 8. **Classe `Entrada`**

- **Descrição**: Representa o registro da entrada e saída de um veículo no estacionamento.
- **Atributos**:
  - `id_entrada`: Identificador único do registro de entrada.
  - `hora_entrada`: Horário de entrada do veículo.
  - `hora_saida`: Horário de saída do veículo.
  - `valor_cobrado`: Valor cobrado pela permanência.
  - `placa_veic`: Referência ao veículo estacionado.
  - `cod_vaga`: Referência à vaga utilizada.
  - `cpf_func`: Referência ao funcionário que registrou a entrada/saída.

## Considerações Adicionais

- O sistema deve permitir que um funcionário cadastre e atualize informações de clientes, veículos e planos;
- O cálculo do valor cobrado para clientes rotativos deve ser feito com base na tabela de preços vigente no momento da entrada;
- O histórico de valores cobrados deve ser mantido para consultas futuras, mesmo que a tabela de preços seja alterada;
- Cada cliente mensalista pode possuir apenas um veículo vinculado ao seu cadastro;
- A geração de faturas ocorre automaticamente no início de cada ciclo mensal.

