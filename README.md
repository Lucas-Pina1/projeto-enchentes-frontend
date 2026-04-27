# Projeto Enchentes - Interface de Usuário (Front-end)

🔗 **Link do Projeto em Produção:** `[COLE SEU LINK DA VERCEL AQUI]`

## 1 - Sobre o Projeto

Este repositório contém o Front-end do sistema "Projeto Enchentes: Gerenciador de Abrigos". Criado para ser um **MVP rápido, limpo e direto**, foi construído utilizando **React.js** com **Vite** e estilizado com **Tailwind CSS** para garantir acessibilidade, responsividade e clareza visual em momentos de crise.

**Repositório do Back-end:** [https://github.com/Lucas-Pina1/projeto-enchentes-backend]  
**API Integrada em Produção:** `https://projeto-enchentes-backend.onrender.com`

## 2 - O Que Foi Feito (Atualizações Recentes)

- **Integração Dinâmica com API:** O sistema foi refatorado para utilizar Variáveis de Ambiente (`VITE_API_URL`), permitindo a alternância automática entre o ambiente de desenvolvimento local e a API oficial hospedada no Render.
- **Deploy Otimizado na Vercel:** Projeto preparado para entrega contínua (CI/CD) na Vercel.
- **Melhorias de UX e Validação de Dados:**
  - Adição de máscara em tempo real para o campo de telefone/contato no momento do cadastro.
  - Implementação de alertas amigáveis que processam e exibem os erros retornados pela API (como lotação excedente ou regras de negócio quebradas).
  - Feedback visual de carregamento (`spinners`) durante as buscas.
- **Renderização Dinâmica:** Atualização instantânea do painel de abrigos logo após um novo cadastro bem-sucedido.

## 3 - Funcionalidades Principais

- **Visualização de Abrigos:** Cards interativos detalhando localização, contato, e status em tempo real. Inclui barra de progresso visual de ocupação e cores indicativas (Verde = Disponível, Vermelho = Lotado).
- **Cadastro Ágil:** Formulário de uma página para que voluntários registrem novos locais com máxima agilidade e sem burocracia.
- **Filtros Avançados:** Busca local por Estado (UF) e Cidade, entregando apenas as informações relevantes para a região de quem pesquisa.

## 4 - Como Rodar o Projeto Localmente

### Pré-requisito
Certifique-se de ter o Back-end rodando na sua máquina (na porta 3000) ou tenha uma `External Database URL` do Render configurada.

### Inicializando o Frontend
1. **Abra o terminal na pasta e instale as dependências:**
   ```bash
   npm install
   ```

2. **Configure a Variável de Ambiente:**
   - Crie um arquivo `.env` na raiz do projeto (opcional para rodar localmente, pois o sistema fará fallback automático para a porta 3000):
     ```env
     VITE_API_URL=http://localhost:3000
     ```

3. **Inicie o Servidor Vite:**
   ```bash
   npm run dev
   ```

Abra o seu navegador na URL gerada (Normalmente `http://localhost:5173`).

---
**Tecnologias Utilizadas:** React.js, Vite, Tailwind CSS v3 e Lucide React Icons.
