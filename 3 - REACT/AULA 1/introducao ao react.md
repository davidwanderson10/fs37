# Introdução ao React e Configuração do Ambiente


---

# O que é React?

React é uma biblioteca JavaScript criada pela Meta para construção de interfaces baseadas em componentes reutilizáveis.

## História

- Criado em 2013.
- Amplamente utilizado no mercado.
- Base para frameworks como Next.js.

## Vantagens

- Componentização
- Reutilização de código
- Virtual DOM
- Alto desempenho
- Grande comunidade

---

# Configuração do Ambiente

Instale Node.js e verifique:

```bash
node -v
npm -v
```

## Criando o projeto

> Embora o plano mencione Create React App, atualmente utilizaremos o **Vite**, recomendado pela comunidade React.

```bash
npm create vite@latest
```

Escolha React + JavaScript (SWC).

Depois:

```bash
cd meu-projeto
npm install
npm run dev
```

---

# Estrutura do Projeto

```text
src/
public/
package.json
vite.config.js
index.html
```

## Arquivos principais

- **main.jsx**: ponto de entrada.
- **App.jsx**: componente principal.
- **public/**: arquivos públicos.
- **package.json**: dependências e scripts.

---

# Primeiro Componente

```jsx
function App() {
  return (
    <div>
      <h1>Olá React!</h1>
      <p>Meu primeiro componente.</p>
    </div>
  )
}

export default App
```

---

# JSX

JSX permite escrever HTML dentro do JavaScript.

```jsx
const nome = 'David'

function App() {
  return <h1>Olá, {nome}!</h1>
}
```

Regras:
- Um elemento pai.
- Fechar todas as tags.
- className no lugar de class.
- htmlFor no lugar de for.

---

# Componentes

```jsx
function Header() {
  return <h2>Minha Aplicação</h2>
}

export default Header
```

Uso:

```jsx
import Header from './Header'

function App(){
  return (
    <>
      <Header />
      <p>Bem-vindo!</p>
    </>
  )
}
```

---

# Aplicações Práticas

- Dashboard financeiro
- Loja virtual
- Sistema acadêmico
- Agenda
- Sistema de locadora

Todos podem ser divididos em componentes (Header, Menu, Card, Footer etc.).

---

# React Developer Tools

Extensão do navegador para inspecionar componentes, props e estado.

---

# Exercícios

1. Criar um projeto React.
2. Alterar o conteúdo do App.
3. Criar um componente Header.
4. Criar um componente Footer.
5. Criar um Card reutilizável.
6. Montar uma página usando componentes.
