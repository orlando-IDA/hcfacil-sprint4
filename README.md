# 🏥 HC Fácil

Projeto da Sprint 04 de Front-End Design Engineering (FIAP).

🎯 **Objetivo do Projeto**

O HC Fácil é uma aplicação web desenvolvida como parte do Challenge da FIAP. O principal objetivo do projeto é reduzir a taxa de abstenção em consultas online no Hospital das Clínicas, oferecendo uma plataforma mais simples e eficiente para que os pacientes possam gerenciar seus agendamentos e tirar dúvidas.

---

### 🔗 Links (Sprint 04)

Links obrigatórios para a avaliação da Sprint 04.

* **Deploy (Vercel):** `https://<URL-DO-SEU-DEPLOY-NA-VERCEL-AQUI>`
* **Deploy (API JAVA Render):** `https://hcfacils4vf.onrender.com/hcFacilSprint4/`
* **Repositório (GitHub):** `https://github.com/orlando-IDA/hcfacil-sprint4.git`
* **Vídeo (YouTube):** `https://youtu.be/kihM0oGQTtI`

---

.env
```
VITE_API_URL="https://hcfacils4vf.onrender.com/hcFacilSprint4"
```

---

## 🔗 API Backend

O repositório da API utilizada neste projeto está disponível em: [HcFacilSprint4](https://github.com/ggabmartins/hcFacilS4VF)

---


### 🚀 Como Utilizar o Site

**Fluxo de Navegação**

1.  **Página Inicial (Welcome)**
    * Ao acessar o site, você será direcionado para a rota `/welcome`
    * Esta página apresenta o HC Fácil e suas funcionalidades principais
    * Clique no botão "Vamos Começar" para acessar o sistema

2.  **Login e Cadastro de Usuário**
    * Na tela de login (`/login`), você pode alternar entre "Login" e "Cadastro".
    * **Cadastro:** Crie um novo usuário com Nome, Email, CPF, Telefone, Data de Nascimento e Senha.
    * **Login:** Insira seu **CPF** e **Senha** para acessar o sistema.

3.  **Páginas Protegidas (Home)**
    * Após o login bem-sucedido, você será redirecionado para a `/home` (ou para a página que tentou acessar).
    * A partir daqui, você pode acessar as áreas restritas do paciente, como `/perfil` e `/marque-sua-consulta`.

### 🛠️ Tecnologias Utilizadas

* **Core:** React (com Vite) e TypeScript
* **Estilização:** TailwindCSS
* **Roteamento:** React Router DOM (SPA)
* **Gerenciamento de Estado:** React Context API (para autenticação)
* **Comunicação API:** Fetch API (para consumo da API Java)
* **Backend (API):** Java (Consumida remotamente)
* **Deploy:** Vercel

---


```bash
HCFacil/
├── public/
│ └── assets/
│ └── imgs/
│ ├── logoHCFacil.ico
│ ├── logoHCFacil.png
│ └── medico-bemvindo.png
└── src/
├── components/
│ ├── LoginRegister/
│ │ └── LoginRegister.tsx
│ ├── Welcome/
│ │ └── Welcome.tsx
│ ├── Header.tsx
│ ├── ProtectedRoute.tsx
│ └── MainLayout.tsx
├── components/
│   └── AuthContext.tsx
├── services/
│   └── api.ts
├── pages/
│ ├── Contato/
│ │ └── index.tsx
│ ├── Error/
│ │ └── index.tsx
│ ├── FAQ/
│ │ └── index.tsx
│ ├── ForgotPass/
│ │ └── index.tsx
│ ├── Home/
│ │ └── index.tsx
│ ├── IntegranteDetail/
│ │ └── index.tsx
│ ├── Integrantes/
│ │ └── index.tsx
│ ├── Login/
│ │ └── index.tsx
│ ├── MarqueConsulta/
│ │ └── index.tsx
│ ├── Sobre/
│ │ └── index.tsx
│ ├── Perfil/
│ │ └── index.tsx
│ ├── Video/
│ │ └── index.tsx
│ └── Welcome/
│ └── index.tsx
├── types/
│ └── User.ts
├── App.css
├── App.tsx
├── index.css
├── main.tsx
└── vite-env.d.ts
```
## ⚙️ Rodando o Projeto

Para rodar este projeto localmente, siga os passos abaixo:

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/orlando-IDA/hcfacil-sprint3.git
    ```

2.  **Acesse a pasta do projeto:**
    ```bash
    cd hcfacil-sprint3
    ```

3.  **Instale as dependências:**
    ```bash
    npm install
    ```

4.  **Execute o servidor de desenvolvimento:**
    ```bash
    npm run dev
    ```
    A aplicação estará disponível em `http://localhost:5173`.

---

## 👨‍💻 Integrantes

| Nome Completo | RM | Turma |
| :--- | :---: | :---: |
| Gabriel Lourenço Martins | 562194 | 1TDSPG |
| Orlando Gonçalves | 561584 | 1TDSPG |

---
