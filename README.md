# eApp - Aplicação Web com Angular e ASP.NET Core

Este repositório contém uma aplicação web fullstack dividida em dois projetos:

- **Frontend:** [eApp](https://github.com/erikscar/eapp) – Repositório `AngularJS`
- **Backend:** [eaAppApi](https://github.com/erikscar/eAppApi) – Repositório `ASP.NET Core`
---

- ## Visão Geral

**Frontend (Marketplace):** Uma plataforma onde os usuários podem visualizar produtos, pesquisar por meio de um mecanismo de busca, adicionar itens ao carrinho e comentar em produtos. A interface foi projetada para ser intuitiva e responsiva, proporcionando uma experiência agradável tanto para navegação quanto para interação com os itens disponíveis.

**Backend (API REST):** Uma API robusta, desenvolvida com **ASP.NET Core**, que oferece funcionalidades completas de **CRUD** para gerenciamento dos recursos do sistema. A autenticação e autorização são gerenciadas por meio de **Tokens JWT**, permitindo controle refinado de roles e permissões com base no nível de acesso do usuário. Além disso, a arquitetura segue o padrão de projeto Repository Pattern, promovendo maior organização, testabilidade e desacoplamento entre as camadas da aplicação.

*O usuário pode clonar este repositório, iniciar os dois serviços localmente e visualizar a aplicação completa rodando em sua máquina.*

- ## Tecnologias Utilizadas

- **AngularJS** - Front-End
- **ASP.NET Core** - Back-End
- **Entity Framework**
- **SQL Server** - Banco de Dados
- **Fluent API**
- **API REST**
- **TypeScript**
- **C#**
- **.NET 6+**
- **HTML5 + SCSS**

---
- ### Pré-Requisitos
- [Node.js](https://nodejs.org/) (v16 ou superior)
- [Angular CLI](https://angular.dev/installation)
- [.NET SDK](https://dotnet.microsoft.com/en-us/download) (v6.0 ou superior)
- Git instalado
---

### 1. Clone o Repositório (Front-End = eApp)

```bash
git clone https://github.com/erikscar/eapp.git
```

### 2. Inicie o Front-End (Angular)

```bash
cd eApp
npm intall
ng serve
```
*O Angular rodará por padrão em: http://localhost:4200*

### 3. Clone o Repositório (Back-End = eAppApi)

```bash
git clone https://github.com/erikscar/eapp.git
```

### 4. Inicie o Back-End (ASP.NET Core)

```bash
cd eApp
npm intall
ng serve
```
*O API será executada por padrão em: http://localhost:4200*

*Pull requests são bem-vindos! Sinta-se livre para abrir issues para reportar bugs, sugerir melhorias ou discutir funcionalidades.*

## 👤 Autor

Desenvolvido por [Erik Scarcela](https://www.linkedin.com/in/erik-scarcela)  
GitHub: [@erikscar](https://github.com/erikscar)


