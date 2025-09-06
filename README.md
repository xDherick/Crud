# Gerenciador de Tarefas (Front-end)

Esta é a interface de usuário (UI) para o projeto CRUD de gerenciamento de tarefas. Construída com Angular, esta aplicação consome a API Rails, permitindo ao usuário interagir com os dados de forma visual e intuitiva.

O site foi publicado e está online na Vercel.

https://meu-condominio-xdhericks-projects.vercel.app

## ✨ Funcionalidades

- **CRUD Completo:** Interface para Criar, Ler, Atualizar e Deletar tarefas e comentários.
- **Listagem Interativa:** Tarefas exibidas em um layout de acordeão, que expande para mostrar detalhes.
- **Componentização:** A aplicação é dividida em componentes reutilizáveis (Header, Lista de Tarefas, Formulário).
- **Gerenciamento de Estado:** Utiliza Services e RxJS para gerenciar o estado da aplicação e a comunicação entre componentes.
- **Estilização Profissional:** Interface estilizada com Bootstrap, SCSS e Font Awesome, incluindo uma legenda de cores para o status das tarefas.
- **Atualização da UI:** A interface é atualizada automaticamente após cada ação (criar, editar, deletar) sem a necessidade de recarregar a página.

## 🛠️ Tecnologias Utilizadas

- **Angular 18+:** Framework principal do front-end.
- **TypeScript:** Linguagem base para o desenvolvimento em Angular.
- **SCSS:** Pré-processador de CSS para estilos avançados.
- **Bootstrap & Font Awesome:** Para estilização e ícones.
- **RxJS:** Para programação reativa e gerenciamento de estado.
- **@rails/actioncable:** Cliente para a comunicação em tempo real com o back-end.

## 🚀 Como Rodar Localmente

1.  **Clone o repositório:**

    ```bash
    git clone [https://github.com/xDherick/Crud.git](https://github.com/xDherick/Crud.git)
    cd Crud
    ```

2.  **Instale as dependências:**

    ```bash
    npm install
    ```

3.  **Configure a API:**

    - Abra o arquivo `src/app/services/task.ts`.
    - Altere a constante `API_BASE_URL` para apontar para o seu servidor back-end local (`http://localhost:3000`).

4.  **Inicie o servidor de desenvolvimento:**
    ```bash
    ng serve
    ```

A aplicação estará disponível em `http://localhost:4200`.
