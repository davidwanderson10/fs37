# Aula: Consumo de APIs com JavaScript

---

## Objetivos da Aula

Ao final desta aula, você será capaz de:

- Entender o que são Promises e como utilizá-las com `.then` e `.catch`
- Realizar requisições HTTP com `fetch` e processar respostas JSON
- Simplificar fluxos assíncronos com `async/await` e `try...catch`
- Integrar dados externos de uma API diretamente no DOM da página

---

## 1. Introdução às Promises

### 1.1 O que é uma Promise?

JavaScript é uma linguagem **single-thread** — executa uma coisa de cada vez. Porém, muitas operações (buscar dados de um servidor, ler um arquivo) levam tempo. Para não travar o programa enquanto espera, usamos **código assíncrono**.

Uma **Promise** é um objeto que representa o resultado futuro de uma operação assíncrona. Ela pode estar em um de três estados:

| Estado      | Descrição                                      |
|-------------|------------------------------------------------|
| `pending`   | A operação ainda está em andamento             |
| `fulfilled` | A operação foi concluída com sucesso           |
| `rejected`  | A operação falhou                              |

Pense numa Promise como um **cupom de retirada** de um pedido: você recebe o cupom agora, mas o produto só fica pronto depois.

### 1.2 Criando uma Promise

```javascript
const minhaPrimeira Promise = new Promise((resolve, reject) => {
  const sucesso = true;

  if (sucesso) {
    resolve("Operação concluída com sucesso!");
  } else {
    reject("Algo deu errado.");
  }
});
```

- `resolve(valor)` → chamado quando a operação **deu certo**
- `reject(erro)` → chamado quando a operação **falhou**

### 1.3 Consumindo com `.then` e `.catch`

```javascript
minhaPromise
  .then((resultado) => {
    console.log("Sucesso:", resultado);
  })
  .catch((erro) => {
    console.error("Erro:", erro);
  })
  .finally(() => {
    console.log("Sempre executa, independente do resultado.");
  });
```

- `.then()` → executado quando a Promise é **resolvida**
- `.catch()` → executado quando a Promise é **rejeitada**
- `.finally()` → executado **sempre**, no final

### 1.4 Exemplo Prático: Simulando uma busca de dados

```javascript
function buscarUsuario(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (id > 0) {
        resolve({ id: id, nome: "Ana Silva", email: "ana@email.com" });
      } else {
        reject("ID inválido.");
      }
    }, 1500); // simula 1.5s de espera
  });
}

buscarUsuario(1)
  .then((usuario) => {
    console.log("Usuário encontrado:", usuario.nome);
  })
  .catch((erro) => {
    console.error("Erro:", erro);
  });
```

### 1.5 Encadeamento de Promises

Você pode encadear múltiplos `.then()` para processar dados em etapas:

```javascript
buscarUsuario(1)
  .then((usuario) => {
    console.log("Nome:", usuario.nome);
    return usuario.email; // passa o email para o próximo .then
  })
  .then((email) => {
    console.log("Email:", email);
  })
  .catch((erro) => {
    console.error("Erro em alguma etapa:", erro);
  });
```

> **Atenção:** Um único `.catch()` no final captura erros de **qualquer** `.then()` anterior na cadeia.

---

## 2. Requisições HTTP com `fetch`

### 2.1 O que é o `fetch`?

`fetch` é a API nativa do JavaScript para realizar requisições HTTP. Ela **retorna uma Promise**, então tudo que aprendemos sobre Promises se aplica aqui.

```javascript
fetch(url)
  .then(response => { /* trata a resposta */ })
  .catch(error => { /* trata o erro */ });
```

### 2.2 Realizando um GET

O método padrão do `fetch` é GET. Basta passar a URL:

```javascript
fetch("https://jsonplaceholder.typicode.com/users/1")
  .then((response) => {
    console.log("Status:", response.status); // 200, 404, 500...
    console.log("Ok?", response.ok);         // true se status 200-299
    return response.json();                  // converte o corpo para JSON
  })
  .then((dados) => {
    console.log("Nome:", dados.name);
    console.log("Email:", dados.email);
  })
  .catch((erro) => {
    console.error("Falha na requisição:", erro);
  });
```

> **Importante:** `fetch` só cai no `.catch()` em caso de **falha de rede** (sem conexão, DNS inválido etc.). Um status `404` ou `500` **não** vai para o `.catch()` automaticamente — você precisa verificar `response.ok`.

### 2.3 Verificando erros de HTTP manualmente

```javascript
fetch("https://jsonplaceholder.typicode.com/users/9999")
  .then((response) => {
    if (!response.ok) {
      throw new Error(`Erro HTTP: ${response.status}`);
    }
    return response.json();
  })
  .then((dados) => {
    console.log(dados);
  })
  .catch((erro) => {
    console.error("Erro capturado:", erro.message);
  });
```

### 2.4 API pública para praticar

Durante esta aula, usaremos a API **JSONPlaceholder** — uma API gratuita e pública de testes:

| Endpoint                                          | Descrição                     |
|---------------------------------------------------|-------------------------------|
| `https://jsonplaceholder.typicode.com/users`      | Lista de usuários             |
| `https://jsonplaceholder.typicode.com/posts`      | Lista de posts                |
| `https://jsonplaceholder.typicode.com/posts/1`    | Post específico (id = 1)      |
| `https://jsonplaceholder.typicode.com/todos`      | Lista de tarefas              |

### 2.5 Buscando uma lista completa

```javascript
fetch("https://jsonplaceholder.typicode.com/users")
  .then((response) => response.json())
  .then((usuarios) => {
    console.log(`Total de usuários: ${usuarios.length}`);
    usuarios.forEach((usuario) => {
      console.log(`- ${usuario.name} (${usuario.email})`);
    });
  })
  .catch((erro) => {
    console.error("Erro:", erro);
  });
```

---

## 3. Async / Await

### 3.1 Por que usar `async/await`?

O `.then().catch()` funciona, mas pode ficar difícil de ler quando há muitas etapas encadeadas — o chamado **"callback hell"**.

`async/await` é uma sintaxe moderna que permite escrever código assíncrono de forma **sequencial e legível**, como se fosse síncrono.

**Comparação:**

```javascript
// Com .then/.catch
fetch(url)
  .then(r => r.json())
  .then(dados => console.log(dados))
  .catch(e => console.error(e));

// Com async/await
async function buscar() {
  try {
    const response = await fetch(url);
    const dados = await response.json();
    console.log(dados);
  } catch (e) {
    console.error(e);
  }
}
```

### 3.2 Como funciona

- `async` antes de uma função faz ela **retornar uma Promise** automaticamente
- `await` pausa a execução **dentro da função** até a Promise ser resolvida
- `await` só pode ser usado dentro de funções `async`

```javascript
async function minhaFuncao() {
  const resultado = await algumaTarefaAssincrona();
  console.log(resultado); // só executa depois que a tarefa terminar
}
```

### 3.3 Tratamento de erros com `try...catch`

```javascript
async function buscarPost(id) {
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);

    if (!response.ok) {
      throw new Error(`Erro HTTP: ${response.status}`);
    }

    const post = await response.json();
    console.log("Título:", post.title);
    console.log("Corpo:", post.body);

  } catch (erro) {
    console.error("Algo deu errado:", erro.message);
  }
}

buscarPost(1);
```

### 3.4 Múltiplas requisições em sequência

```javascript
async function buscarDadosDoUsuario(userId) {
  try {
    // Primeira requisição: busca o usuário
    const resUsuario = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
    const usuario = await resUsuario.json();

    // Segunda requisição: busca os posts desse usuário
    const resPosts = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
    const posts = await resPosts.json();

    console.log(`Usuário: ${usuario.name}`);
    console.log(`Total de posts: ${posts.length}`);

  } catch (erro) {
    console.error("Erro:", erro.message);
  }
}

buscarDadosDoUsuario(1);
```

### 3.5 Múltiplas requisições em paralelo com `Promise.all`

Quando as requisições são **independentes**, execute-as em paralelo para ganhar performance:

```javascript
async function buscarTudo() {
  try {
    const [usuarios, posts] = await Promise.all([
      fetch("https://jsonplaceholder.typicode.com/users").then(r => r.json()),
      fetch("https://jsonplaceholder.typicode.com/posts").then(r => r.json()),
    ]);

    console.log(`Usuários: ${usuarios.length}`);
    console.log(`Posts: ${posts.length}`);

  } catch (erro) {
    console.error("Uma das requisições falhou:", erro.message);
  }
}

buscarTudo();
```

> `Promise.all` aguarda **todas** as Promises e falha se **qualquer uma** delas for rejeitada.

---

## 4. Integração com o DOM

### 4.1 Exibindo dados na página

O objetivo final é mostrar os dados recebidos da API de forma visual para o usuário.

**HTML base:**
```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>Lista de Usuários</title>
  <style>
    body { font-family: sans-serif; padding: 2rem; }
    .card {
      border: 1px solid #ccc;
      border-radius: 8px;
      padding: 1rem;
      margin-bottom: 1rem;
      max-width: 400px;
    }
    .card h3 { margin: 0 0 0.5rem; }
    .card p  { margin: 0.2rem 0; color: #555; font-size: 0.9rem; }
    #loading { color: #888; font-style: italic; }
  </style>
</head>
<body>
  <h1>Usuários da API</h1>
  <p id="loading">Carregando...</p>
  <div id="lista-usuarios"></div>

  <script src="script.js"></script>
</body>
</html>
```

**script.js:**
```javascript
async function carregarUsuarios() {
  const loading = document.getElementById("loading");
  const listaEl = document.getElementById("lista-usuarios");

  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");

    if (!response.ok) {
      throw new Error(`Erro: ${response.status}`);
    }

    const usuarios = await response.json();

    loading.style.display = "none"; // esconde o "Carregando..."

    usuarios.forEach((usuario) => {
      const card = document.createElement("div");
      card.classList.add("card");

      card.innerHTML = `
        <h3>${usuario.name}</h3>
        <p>📧 ${usuario.email}</p>
        <p>📞 ${usuario.phone}</p>
        <p>🌐 ${usuario.website}</p>
      `;

      listaEl.appendChild(card);
    });

  } catch (erro) {
    loading.textContent = `Erro ao carregar dados: ${erro.message}`;
    loading.style.color = "red";
  }
}

carregarUsuarios();
```

### 4.2 Adicionando um botão de recarregar

```javascript
async function carregarUsuarios() {
  const listaEl = document.getElementById("lista-usuarios");
  const loading = document.getElementById("loading");

  listaEl.innerHTML = "";      // limpa a lista antes de recarregar
  loading.style.display = "block";
  loading.style.color = "#888";
  loading.textContent = "Carregando...";

  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    if (!response.ok) throw new Error(`Status ${response.status}`);

    const usuarios = await response.json();
    loading.style.display = "none";

    usuarios.forEach((usuario) => {
      const card = document.createElement("div");
      card.classList.add("card");
      card.innerHTML = `<h3>${usuario.name}</h3><p>${usuario.email}</p>`;
      listaEl.appendChild(card);
    });

  } catch (erro) {
    loading.textContent = `Erro: ${erro.message}`;
    loading.style.color = "red";
  }
}

// Chama ao carregar a página
carregarUsuarios();

// Chama ao clicar no botão (adicione <button onclick="carregarUsuarios()"> no HTML)
```

### 4.3 Buscando por ID com input do usuário

```html
<input type="number" id="input-id" placeholder="ID do usuário (1-10)" min="1" max="10">
<button id="btn-buscar">Buscar</button>
<div id="resultado"></div>
```

```javascript
document.getElementById("btn-buscar").addEventListener("click", async () => {
  const id = document.getElementById("input-id").value;
  const resultadoEl = document.getElementById("resultado");

  if (!id) {
    resultadoEl.innerHTML = "<p style='color:red'>Informe um ID.</p>";
    return;
  }

  resultadoEl.innerHTML = "<p>Buscando...</p>";

  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);

    if (!response.ok) throw new Error("Usuário não encontrado.");

    const usuario = await response.json();

    resultadoEl.innerHTML = `
      <div class="card">
        <h3>${usuario.name}</h3>
        <p>📧 ${usuario.email}</p>
        <p>🏙️ ${usuario.address.city}</p>
        <p>🏢 ${usuario.company.name}</p>
      </div>
    `;

  } catch (erro) {
    resultadoEl.innerHTML = `<p style="color:red">${erro.message}</p>`;
  }
});
```

---

## 5. Resumo Visual

```
Usuário acessa a página
        │
        ▼
   fetch(url)  ──────────────────────────────────────┐
        │                                             │
   [Aguarda resposta]                          [Erro de rede]
        │                                             │
   response.ok?                               .catch / try-catch
    Sim │   Não │
        │       └── throw new Error(...)
        │
  response.json()
        │
   [Dados recebidos]
        │
  Manipula o DOM
        │
  Usuário vê os dados
```

---

## 6. Exercícios

### Exercício 1 — Promises básicas ⭐

Crie uma função `esperar(ms)` que retorna uma Promise que resolve após `ms` milissegundos. Em seguida, use `.then()` para exibir "Pronto!" no console.

```javascript
// Dica: use setTimeout dentro da Promise
function esperar(ms) {
  // seu código aqui
}

esperar(2000).then(() => console.log("Pronto!"));
```

---

### Exercício 2 — Fetch com `.then` ⭐⭐

Use `fetch` para buscar a lista de **posts** da API JSONPlaceholder e exibir no console o **título** dos 5 primeiros.

URL: `https://jsonplaceholder.typicode.com/posts`

```javascript
// Dica: use .slice(0, 5) no array retornado
```

---

### Exercício 3 — Async/Await com tratamento de erros ⭐⭐

Crie a função `buscarTarefa(id)` usando `async/await` que:

1. Busca em `https://jsonplaceholder.typicode.com/todos/{id}`
2. Exibe `título` e se está `concluída` (`completed: true/false`)
3. Trata o erro se o `id` não existir

---

### Exercício 4 — Integração com DOM ⭐⭐⭐

Crie uma página HTML completa que:

1. Tenha um campo de texto e um botão "Buscar"
2. Ao clicar, busque posts do usuário informado: `https://jsonplaceholder.typicode.com/posts?userId={id}`
3. Exiba os títulos dos posts em cards na tela
4. Mostre uma mensagem de erro se o campo estiver vazio ou se não houver posts

---

### Exercício 5 — Desafio: Galeria de usuários ⭐⭐⭐⭐

Construa uma página que:

1. Ao carregar, exiba todos os **10 usuários** da API em cards
2. Cada card deve mostrar: nome, email, cidade e nome da empresa
3. Ao clicar em um card, busque os **posts** daquele usuário e exiba em um painel lateral ou abaixo
4. Mostre um indicador de "Carregando..." enquanto a requisição está em andamento
5. Trate todos os erros possíveis com mensagens amigáveis

---

## 7. Referências e Recursos

| Recurso | Link |
|---------|------|
| MDN — Promises | https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Promise |
| MDN — fetch API | https://developer.mozilla.org/pt-BR/docs/Web/API/Fetch_API |
| MDN — async/await | https://developer.mozilla.org/pt-BR/docs/Learn/JavaScript/Asynchronous/Promises |
| JSONPlaceholder | https://jsonplaceholder.typicode.com |
| JavaScript.info — Async | https://javascript.info/async |

---

