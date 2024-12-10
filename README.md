# Blog Simples

Este é um projeto front-end que consome uma API RESTful para gerenciar um blog. Ele permite que os usuários autentiquem-se, criem, editem e excluam artigos de forma dinâmica. A interface foi desenvolvida com **HTML**, **CSS** e **Bootstrap**, utilizando **JavaScript** para manipulação dos dados da API.

## Interface

<div align="center">
  <img src="img/logo.png" alt="Imagem do Projeto" width="100">
</div>

## Sumário

- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Status](#status)
- [Descrição](#descrição)
- [Funcionalidades](#funcionalidades)
- [Explicação](#explicação)
- [Como Usar](#como-usar)
- [Autor](#autor)

## Tecnologias Utilizadas

<div style="display: flex; flex-direction: row;">
  <div style="margin-right: 20px; display: flex; justify-content: flex-start;">
    <img src="img/js.png" alt="Logo JavaScript" width="100"/>
  </div>
  <div style="margin-right: 20px; display: flex; justify-content: flex-start;">
    <img src="img/html.png" alt="Logo HTML" width="100"/>
  </div>
  <div style="margin-right: 20px; display: flex; justify-content: flex-start;">
    <img src="img/css.png" alt="Logo CSS" width="100"/>
  </div>
</div>

## Status

![Em Desenvolvimento](http://img.shields.io/static/v1?label=STATUS&message=EM%20DESENVOLVIMENTO&color=RED&style=for-the-badge)

## Descrição

Este projeto foi criado para estudar a integração entre um front-end dinâmico e uma API RESTful. O objetivo principal é gerenciar artigos de blog com funcionalidades como autenticação, criação, edição e exclusão. O design é responsivo e utiliza o framework Bootstrap para simplificar a estilização.

## Funcionalidades

- Autenticação com login e gerenciamento de token.
- Criação de novos artigos com título e descrição.
- Edição de artigos existentes diretamente na interface.
- Exclusão de artigos com confirmação de ação.
- Atualização dinâmica da lista de artigos após cada ação.
- Gerenciamento de estado do usuário (login/logout).

## Explicação

A aplicação é dividida em duas páginas principais:

1. **Login**: Tela onde o usuário pode se autenticar na API utilizando credenciais válidas. Após o login, o token de autenticação é armazenado localmente para autorizar futuras requisições.
2. **Gerenciamento de Artigos**: Página principal onde o usuário pode visualizar, criar, editar e excluir artigos. As ações são realizadas por meio de requisições à API RESTful.

### Organização dos Arquivos

```plaintext
.
├── index.html
├── login.html
├── css/
│   ├── bootstrap.min.css
├── js/
│   ├── index.js
│   ├── bootstrap.bundle.min.js
└── img/
```

<!-- Usuario teste
teste@example.com
123456 -->

## Autor

Desenvolvido por Diego Franco.
