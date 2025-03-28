# Franq Challenge - Finance Dashboard

**Versão em Português (PT-BR)**

Este projeto é uma aplicação construída em **Next.js** que fornece um **dashboard financeiro** para exibir informações de câmbio (moedas) e ações, integrando-se à **API da HG Brasil**. Além disso, conta com um fluxo de autenticação (login e registro) utilizando a plataforma **Appwrite**.

## Funcionalidades Principais

1. **Autenticação de Usuário**

   - Criação de conta (registro) usando nome, email, telefone e senha.
   - Login com email e senha.
   - Proteção de rotas, redirecionando usuários não autenticados para a página de login.

2. **Dashboard Financeiro**

   - Exibição das principais moedas e suas respectivas cotações (compra, venda e variação).
   - Exibição de ações e índices com respectivos pontos e variação.
   - Atualização periódica automática dos dados (Pooling) a cada 10 minutos.

3. **Evolução de Preços em Gráfico**
   - Ao clicar em uma moeda ou ação, o usuário é direcionado para uma rota detalhada que exibe a evolução das cotações ao longo do tempo em um gráfico.

## Estrutura de Pastas

- **src/app/**

  - Contém as páginas principais do Next.js.
  - **/api/finance/** → Endpoint interno para busca de dados de finanças (HG Brasil).
  - **/login/** → Página de login.
  - **/register/** → Página de registro.
  - **/item/[type]/[element]** → Página de detalhes para exibir o gráfico de um ativo selecionado.

- **src/components/**

  - Componentes de UI (botão, input, formulários, etc.).
  - **chart.tsx** → Componente React Chart.js 2 para desenhar o gráfico.
  - **login-form.tsx** → Formulário de login.
  - **register-form.tsx** → Formulário de registro.

- **src/store/financeStore.ts**

  - Implementação do Zustand para gerenciar o estado global dos dados financeiros.

- **src/hooks/**

  - **useDataPooling.ts** → Hook para pooling periódico da API de finanças.
  - **useIsAuth.ts** → Hook que verifica a autenticação do usuário e redireciona, se necessário.

- **src/lib/**

  - **appwrite.ts** → Configuração do SDK do Appwrite.

- **Tailwind & Config**
  - **tailwind.config.js** / **postcss.config.mjs** / **globals.css** → Configurações de estilização, Tailwind CSS e PostCSS.

## Requisitos

- Node.js 18 ou superior.
- Chave de API válida da [HG Brasil (Finance)](https://hgbrasil.com/status/finance/).
- Conta no [Appwrite](https://appwrite.io/) (opcional, mas o código está configurado para usar Appwrite como backend de autenticação).

## Configuração e Execução

1. **Clonar o repositório**

   ```bash
   git clone https://github.com/SEU_USUARIO/franq-challenge.git
   cd franq-challenge
   ```

2. **Instalar dependências**

   ```bash
   pnpm install
   # ou
   npm install
   # ou
   yarn install
   ```

3. **Configurar variáveis de ambiente**  
   No arquivo `.env.local` (crie se não existir), defina:

   ```
   NEXT_PUBLIC_APPWRITE_ENDPOINT="https://SEU_ENDPOINT.appwritecloud.com/v1"
   NEXT_PUBLIC_APPWRITE_PROJECT_ID="SEU_PROJECT_ID"
   NEXT_PUBLIC_HG_API_KEY="SUA_CHAVE_HG_BRASIL"
   ```

4. **Rodar em modo de desenvolvimento**

   ```bash
   pnpm dev
   # ou
   npm run dev
   # ou
   yarn dev
   ```

   Abra [http://localhost:3000](http://localhost:3000) no navegador.

5. **Build para produção**
   ```bash
   pnpm build
   # ou
   npm run build
   # ou
   yarn build
   ```
   Em seguida, inicie com:
   ```bash
   pnpm start
   # ou
   npm start
   # ou
   yarn start
   ```

## Uso Básico

1. **Registro e Login**

   - Acesse `/register` para criar seu usuário.
   - Faça login em `/login`.

2. **Dashboard**

   - Após logado, a rota principal (`/`) exibe duas tabelas: Moedas e Ações/Índices.
   - Clique em uma linha para ir à página de detalhes e visualizar o gráfico da evolução de preços.

3. **Gráfico de Evolução de Preços**
   - Na rota `/item/[type]/[element]` o componente (PriceChart) coleta dados de cada atualização no store (via pooling), possibilitando ver a evolução dos preços.

## Desenvolvimento

- O código está escrito em TypeScript, com uso de React 19 e Next.js 15 (App Router).
- A estilização foi feita com **Tailwind CSS**.
- Armazenamento de estados e API calls:
  - **Zustand** (dados de finanças)
  - Hooks customizados (useDataPooling) para request periódico
  - Next.js API Routes (em `src/app/api/finance/route.ts`) para buscar dados.

## Contribuindo

- Envie Pull Requests ou abra issues com melhorias.
- Siga as [convenções de commit (Conventional Commits)](https://www.conventionalcommits.org/).

---

# Franq Challenge - Finance Dashboard

**English Version (EN)**

This project is a **Next.js** application that provides a **financial dashboard** to display currency (exchange rates) and stock information, integrating with the **HG Brasil** API. It also includes a user authentication flow (login and registration) using the **Appwrite** platform.

## Main Features

1. **User Authentication**

   - Account creation (registration) using name, email, and password.
   - Login with email and password.
   - Route protection, redirecting unauthenticated users to the login page.

2. **Financial Dashboard**

   - Displays the main currencies and their respective rates (buy, sell, and variation).
   - Displays stocks and indices with respective points and variation.
   - Periodic auto-refresh (Pooling) every 10 minutes.

3. **Price Evolution Chart**
   - By clicking on a currency or stock, the user is directed to a detailed route that displays the price evolution chart over time.

## Folder Structure

- **src/app/**

  - Contains the main Next.js pages.
  - **/api/finance/** → Internal endpoint to fetch financial data (HG Brasil).
  - **/login/** → Login page.
  - **/register/** → Registration page.
  - **/item/[type]/[element]** → Detail page to display a chart for the selected item.

- **src/components/**

  - UI components (button, input, forms, etc.).
  - **chart.tsx** → React Chart.js 2 component for drawing the chart.
  - **login-form.tsx** → Login form.
  - **register-form.tsx** → Registration form.

- **src/store/financeStore.ts**

  - Zustand store for globally managing financial data.

- **src/hooks/**

  - **useDataPooling.ts** → Hook for periodically fetching data from the finance API.
  - **useIsAuth.ts** → Hook to verify user authentication and redirect if necessary.

- **src/lib/**

  - **appwrite.ts** → Appwrite SDK setup.

- **Tailwind & Config**
  - **tailwind.config.js** / **postcss.config.mjs** / **globals.css** → Styling, Tailwind CSS, and PostCSS configurations.

## Requirements

- Node.js 18 or higher.
- A valid API key from [HG Brasil (Finance)](https://hgbrasil.com/status/finance/).
- An account on [Appwrite](https://appwrite.io/) (optional, but the code is configured to use Appwrite for authentication).

## Setup and Run

1. **Clone the repository**

   ```bash
   git clone https://github.com/YOUR_USERNAME/franq-challenge.git
   cd franq-challenge
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   # or
   npm install
   # or
   yarn install
   ```

3. **Set environment variables**  
   In a `.env.local` file (create if not existing), define:

   ```
   NEXT_PUBLIC_APPWRITE_ENDPOINT="https://YOUR_ENDPOINT.appwritecloud.com/v1"
   NEXT_PUBLIC_APPWRITE_PROJECT_ID="YOUR_PROJECT_ID"
   NEXT_PUBLIC_HG_API_KEY="YOUR_HG_BRASIL_API_KEY"
   ```

4. **Run in development mode**

   ```bash
   pnpm dev
   # or
   npm run dev
   # or
   yarn dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

5. **Production build**
   ```bash
   pnpm build
   # or
   npm run build
   # or
   yarn build
   ```
   Then start with:
   ```bash
   pnpm start
   # or
   npm start
   # or
   yarn start
   ```

## Basic Usage

1. **Registration and Login**

   - Access `/register` to create an account.
   - Login at `/login`.

2. **Dashboard**

   - After logging in, the main route (`/`) shows two tables: Currencies and Stocks/Indices.
   - Click on a row to go to a detailed page and view the price evolution chart.

3. **Price Evolution Chart**
   - At `/item/[type]/[element]`, the (PriceChart) component aggregates data from each store update (via pooling), allowing you to see the price evolution over time.

## Development

- Written in TypeScript, using React 19 and Next.js 15 (App Router).
- Styled with **Tailwind CSS**.
- State management and API calls:
  - **Zustand** (financial data)
  - Custom hooks (useDataPooling) for periodic requests
  - Next.js API Routes (`src/app/api/finance/route.ts`) to fetch data.

## Contributing

- Submit Pull Requests or open issues with improvements.
- Follow [Conventional Commits](https://www.conventionalcommits.org/) for commit messages.
