# Projeto Enchentes - Front-End (Conexão e Visualização)

Este repositório contém a interface de usuário (Front-end) do sistema "Projeto Enchentes: Gerenciador de Abrigos". 
Criado para ser um **MVP rápido, limpo e direto**, construído utilizando React.js e estilizado com Tailwind CSS para garantir acessibilidade e clariadade em um momento de crise.

**Repositório do Back-end:** [LINK_DO_REPOSITORIO_BACKEND]


## Como funciona?

O MVP se conecta diretamente à API do nosso servidor Node.js (PostgreSQL) para consumir as informações dos abrigos atualizados instantaneamente.

### Funcionalidades do MVP:
- **Painel Dinâmico**: Os abrigos são listados em formato de cards.
- **Identificação Visual**: 
  - Cor Verde para indicar que há disponibilidade de vagas.
  - Cor Vermelha para destacar que o abrigo está lotado.
  - Barra de Progresso demonstrando quantas pessoas já estão ocupando do total da capacidade máxima daquele local.
- **Filtro Avançado**: Busca instantânea que permite qualquer pessoa rapidamente filtrar a lista de dezenas de abrigos apenas pela sua **Cidade** ou **Estado**. 

## Como Rodar o Projeto

Caso você tenha clonado o repositório, siga o passo a passo abaixo para rodar o Front-end localmente:

### 1) Preparação do Backend
O Front-end consome informações em tempo real do nosso banco de dados. 
Certifique-se de que o repositório do **back-end** (`projeto-enchentes-backend`) foi baixado, configurado com o banco e está rodando na sua máquina (Geralmente respondendo em `http://localhost:3000`).

### 2) Inicializando o Frontend
Abra o terminal nesta pasta do frontend (`projeto-enchentes-frontend`) e instale as dependências exigidas pelo React/Vite:
```bash
npm install
```

Em seguida, basta inicializar a aplicação disparando o servidor com Vite:
```bash
npm run dev
```

Abra o seu navegador (Normalmente a aplicação ficará disponível em `http://localhost:5173`).

---

**Tecnologias Utilizadas:** React, Vite, Tailwind CSS v3 e Lucide React Icons.
# projeto-enchentes-frontend
