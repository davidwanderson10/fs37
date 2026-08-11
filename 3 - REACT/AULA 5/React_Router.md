# Aula 05 — Roteamento com React Router

## Objetivos

- Implementar navegação entre páginas em uma SPA.
- Criar rotas básicas e dinâmicas.
- Utilizar `BrowserRouter`, `Routes`, `Route`, `Link`, `useParams`, `useNavigate` e `Outlet`.
- Criar rotas aninhadas e uma proteção básica de rota.
- Organizar as rotas em arquivo separado.

---

# 1. O que é roteamento?

Em aplicações reais, normalmente temos várias telas:

```text
/                 → Home
/produtos         → Lista de produtos
/produtos/1       → Detalhes do produto
/sobre            → Sobre
/login            → Login
/dashboard        → Área restrita
```

O React Router associa uma URL a um componente React e permite navegar sem recarregar toda a aplicação.

## SPA

SPA significa **Single Page Application**. A aplicação é carregada inicialmente e o roteador controla a navegação entre as telas no lado do cliente.

---

# 2. Instalação

Como o projeto foi criado com Vite:

```bash
npm install react-router
```

> O React Router atual utiliza o pacote `react-router`. Projetos antigos podem utilizar `react-router-dom`, então verifique a versão instalada antes de copiar exemplos antigos.

---

# 3. BrowserRouter

No `main.jsx`:

```jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
```

O `BrowserRouter` fornece o contexto necessário para o React Router controlar a navegação do navegador.

---

# 4. Routes e Route

```jsx
import { Routes, Route } from "react-router";

import Home from "./pages/Home";
import Produtos from "./pages/Produtos";
import Sobre from "./pages/Sobre";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/produtos" element={<Produtos />} />
      <Route path="/sobre" element={<Sobre />} />
    </Routes>
  );
}

export default App;
```

Temos:

```text
/          → Home
/produtos  → Produtos
/sobre     → Sobre
```

---

# 5. Link

Para navegação interna:

```jsx
import { Link } from "react-router";

function Header() {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/produtos">Produtos</Link>
      <Link to="/sobre">Sobre</Link>
    </nav>
  );
}

export default Header;
```

Em uma SPA, prefira `Link` para navegação interna em vez de depender de `<a href>`.

---

# 6. Estrutura do projeto

Podemos evoluir o projeto das aulas anteriores:

```text
src/
├── components/
│   ├── Header.jsx
│   ├── Footer.jsx
│   └── ProdutoCard.jsx
│
├── pages/
│   ├── Home.jsx
│   ├── Produtos.jsx
│   ├── ProdutoDetalhes.jsx
│   ├── Sobre.jsx
│   ├── Login.jsx
│   └── Dashboard.jsx
│
├── routes/
│   └── AppRoutes.jsx
│
├── App.jsx
└── main.jsx
```

- `components`: partes reutilizáveis.
- `pages`: telas da aplicação.
- `routes`: configuração de navegação.

---

# 7. AppRoutes.jsx

Separar as rotas deixa o projeto mais organizado:

```jsx
import { Routes, Route } from "react-router";

import Home from "../pages/Home";
import Produtos from "../pages/Produtos";
import ProdutoDetalhes from "../pages/ProdutoDetalhes";
import Sobre from "../pages/Sobre";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import NotFound from "../pages/NotFound";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/produtos" element={<Produtos />} />
      <Route path="/produtos/:id" element={<ProdutoDetalhes />} />
      <Route path="/sobre" element={<Sobre />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;
```

## App.jsx

```jsx
import Header from "./components/Header";
import Footer from "./components/Footer";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <>
      <Header />

      <main>
        <AppRoutes />
      </main>

      <Footer />
    </>
  );
}

export default App;
```

---

# 8. Parâmetros de URL

Podemos criar uma rota dinâmica:

```jsx
<Route
  path="/produtos/:id"
  element={<ProdutoDetalhes />}
/>
```

O `:id` é um parâmetro.

Assim:

```text
/produtos/1
/produtos/2
/produtos/25
```

usam a mesma rota.

---

# 9. useParams

Para acessar o parâmetro:

```jsx
import { useParams } from "react-router";

function ProdutoDetalhes() {
  const { id } = useParams();

  return (
    <div>
      <h1>Produto</h1>
      <p>ID: {id}</p>
    </div>
  );
}

export default ProdutoDetalhes;
```

Se acessarmos `/produtos/5`, teremos `id = "5"`.

---

# 10. Integrando com a Fake Store API

Podemos combinar o conteúdo desta aula com `useState` e `useEffect`.

```jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router";

function ProdutoDetalhes() {
  const { id } = useParams();

  const [produto, setProduto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    async function buscarProduto() {
      try {
        setLoading(true);

        const response = await fetch(
          `https://fakestoreapi.com/products/${id}`
        );

        if (!response.ok) {
          throw new Error("Produto não encontrado.");
        }

        const data = await response.json();
        setProduto(data);
      } catch (error) {
        setErro(error.message);
      } finally {
        setLoading(false);
      }
    }

    buscarProduto();
  }, [id]);

  if (loading) return <p>Carregando...</p>;
  if (erro) return <p>{erro}</p>;

  return (
    <div>
      <h1>{produto.title}</h1>

      <img
        src={produto.image}
        alt={produto.title}
        width="200"
      />

      <p>R$ {produto.price}</p>
      <p>{produto.description}</p>
    </div>
  );
}

export default ProdutoDetalhes;
```

Aqui os conceitos se conectam:

```text
URL
 ↓
useParams
 ↓
id
 ↓
useEffect
 ↓
fetch
 ↓
useState
 ↓
renderização
```

---

# 11. Link para detalhes

No `ProdutoCard`:

```jsx
import { Link } from "react-router";

function ProdutoCard({ produto }) {
  return (
    <div>
      <img
        src={produto.image}
        alt={produto.title}
        width="120"
      />

      <h2>{produto.title}</h2>
      <p>R$ {produto.price}</p>

      <Link to={`/produtos/${produto.id}`}>
        Ver detalhes
      </Link>
    </div>
  );
}

export default ProdutoCard;
```

---

# 12. Navegação programática — useNavigate

Quando a navegação acontece como consequência de uma ação JavaScript, podemos usar `useNavigate`.

```jsx
import { useNavigate } from "react-router";

function Login() {
  const navigate = useNavigate();

  function entrar() {
    navigate("/dashboard");
  }

  return (
    <button onClick={entrar}>
      Entrar
    </button>
  );
}

export default Login;
```

Também podemos voltar no histórico:

```jsx
navigate(-1);
```

Ou avançar:

```jsx
navigate(1);
```

---

# 13. Rotas aninhadas

Imagine:

```text
/dashboard
/dashboard/perfil
/dashboard/configuracoes
```

Podemos criar:

```jsx
<Route path="/dashboard" element={<Dashboard />}>
  <Route index element={<InicioDashboard />} />
  <Route path="perfil" element={<Perfil />} />
  <Route path="configuracoes" element={<Configuracoes />} />
</Route>
```

As rotas filhas são relativas ao pai.

---

# 14. Outlet

Para renderizar a rota filha dentro do componente pai:

```jsx
import { Link, Outlet } from "react-router";

function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>

      <nav>
        <Link to="perfil">Perfil</Link>
        <Link to="configuracoes">Configurações</Link>
      </nav>

      <Outlet />
    </div>
  );
}

export default Dashboard;
```

Quando acessamos:

```text
/dashboard/perfil
```

o resultado será conceitualmente:

```text
Dashboard
├── navegação
└── Perfil
```

O `Outlet` é o local onde a rota filha será renderizada.

---

# 15. Rota 404

Para qualquer URL que não corresponda às rotas anteriores:

```jsx
<Route
  path="*"
  element={<NotFound />}
/>
```

Exemplo:

```jsx
function NotFound() {
  return (
    <div>
      <h1>404</h1>
      <p>Página não encontrada.</p>
    </div>
  );
}

export default NotFound;
```

---

# 16. Proteção de rotas

Uma aplicação pode possuir páginas que somente usuários autenticados podem acessar.

Exemplo:

```text
/login       → público
/produtos    → público
/dashboard   → protegido
```

Podemos criar:

```jsx
import { Navigate, Outlet } from "react-router";

function ProtectedRoute() {
  const usuario = localStorage.getItem("usuario");

  if (!usuario) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
```

Configuração:

```jsx
<Route element={<ProtectedRoute />}>
  <Route
    path="/dashboard"
    element={<Dashboard />}
  />
</Route>
```

Fluxo:

```text
/dashboard
     ↓
ProtectedRoute
     ↓
Existe usuário?
  ↙       ↘
sim       não
 ↓         ↓
Dashboard  /login
```

### Atenção

Essa é uma proteção de interface no frontend. Em uma aplicação real, a segurança precisa ser validada também no backend/API.

---

# 17. Aplicando ao projeto anterior

O projeto de produtos pode ficar assim:

```text
App
│
├── Header
│
├── Rotas
│   ├── /
│   │   └── Home
│   │
│   ├── /produtos
│   │   └── Produtos
│   │
│   ├── /produtos/:id
│   │   └── ProdutoDetalhes
│   │
│   ├── /sobre
│   │   └── Sobre
│   │
│   ├── /login
│   │   └── Login
│   │
│   └── /dashboard
│       └── Dashboard
│
└── Footer
```

A página de produtos continua utilizando a Fake Store API.

Ao clicar em um produto:

```text
Produtos
   ↓
/produtos/3
   ↓
ProdutoDetalhes
   ↓
useParams()
   ↓
id = 3
   ↓
Fake Store API
   ↓
Produto exibido
```

---

# 18. Exercício principal

Evolua o projeto desenvolvido nas aulas anteriores.

## Página inicial

Criar:

```text
/
```

Com:

- Header.
- Hero.
- Descrição.
- Link para produtos.

## Produtos

Criar:

```text
/produtos
```

Utilizar:

- `useState`.
- `useEffect`.
- `fetch`.
- `try/catch`.
- Fake Store API.
- `map`.
- `ProdutoCard`.

## Detalhes

Criar:

```text
/produtos/:id
```

Exibir:

- Imagem.
- Nome.
- Preço.
- Categoria.
- Descrição.
- Avaliação.

Utilizar:

- `useParams`.
- `useState`.
- `useEffect`.
- `fetch`.
- `try/catch`.

## Sobre

Criar:

```text
/sobre
```

## Login

Criar:

```text
/login
```

Ao clicar em entrar:

```jsx
localStorage.setItem("usuario", "aluno");
navigate("/dashboard");
```

## Dashboard

Criar:

```text
/dashboard
```

Proteger a rota utilizando `ProtectedRoute`.

---

# 19. Desafio extra

Criar:

```text
/dashboard
/dashboard/perfil
/dashboard/configuracoes
```

Utilizar:

- Rotas aninhadas.
- `Outlet`.
- `Link`.
- `useNavigate`.

---

# 20. Checklist de avaliação

## Compreensão

- [ ] Entende o conceito de SPA.
- [ ] Entende para que serve o React Router.
- [ ] Sabe o que é uma rota.
- [ ] Sabe o que é um parâmetro de URL.
- [ ] Entende rotas aninhadas.

## Aplicação

- [ ] Cria uma rota.
- [ ] Navega usando `Link`.
- [ ] Utiliza `useParams`.
- [ ] Utiliza `useNavigate`.
- [ ] Cria rotas aninhadas.
- [ ] Utiliza `Outlet`.
- [ ] Implementa uma proteção básica.
- [ ] Organiza as rotas em arquivo separado.

---

# 21. Resumo

| Recurso | Função |
|---|---|
| `BrowserRouter` | Fornece o contexto de roteamento |
| `Routes` | Agrupa as rotas |
| `Route` | Relaciona URL e componente |
| `Link` | Cria navegação interna |
| `useParams` | Lê parâmetros da URL |
| `useNavigate` | Realiza navegação via código |
| `Outlet` | Renderiza uma rota filha |
| `Navigate` | Redireciona para outra rota |

O conceito central é:

> **O React Router decide qual componente deve ser renderizado de acordo com a URL atual.**

---

# Referência

Documentação oficial:

https://reactrouter.com/
