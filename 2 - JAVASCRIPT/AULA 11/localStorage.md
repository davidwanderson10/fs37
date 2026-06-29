# Aula 11 — Armazenamento e Gerenciamento de Estado com `localStorage`

> **Módulo:** JavaScript Essencial  
> **Duração estimada:** 90 minutos  
> **Nível:** Intermediário  
> **Pré-requisitos:** Funções, DOM, Eventos, Arrays, Consumo de APIs

---


## 1. Introdução ao `localStorage`

### 1.1 O que é o `localStorage`?

O `localStorage` é uma API nativa do navegador que permite **armazenar dados diretamente no dispositivo do usuário**, de forma persistente. Os dados ficam salvos mesmo depois de fechar o navegador ou reiniciar o computador — e só são removidos se o código ou o usuário os apagar explicitamente.

```
Aplicação Web  ──→  localStorage  ──→  Disco do usuário
                    (chave: valor)
```

### 1.2 Quando utilizar o `localStorage`?

| Situação | Usar `localStorage`? |
|---|---|
| Preferências do usuário (tema, idioma) | ✅ Sim |
| Carrinho de compras simples | ✅ Sim |
| Cache de dados de uma API | ✅ Sim |
| Dados de sessão de login | ⚠️ Com cautela (preferir cookies seguros) |
| Senhas ou dados sensíveis | ❌ Nunca |
| Grandes volumes de dados | ❌ Não (limite ~5 MB) |

### 1.3 `localStorage` vs `sessionStorage`

Ambos fazem parte da **Web Storage API** e têm a mesma interface de métodos, mas com uma diferença fundamental no tempo de vida dos dados:

| Característica | `localStorage` | `sessionStorage` |
|---|---|---|
| Persistência | Permanente (até ser apagado) | Apenas durante a aba/sessão |
| Escopo | Todas as abas do mesmo domínio | Somente a aba atual |
| Limite | ~5 MB | ~5 MB |
| Uso típico | Preferências, cache | Formulários de múltiplas etapas |

```javascript
// localStorage — persiste mesmo fechando o navegador
localStorage.setItem('tema', 'escuro');

// sessionStorage — some ao fechar a aba
sessionStorage.setItem('etapa', '2');
```

> **Importante:** Ambos armazenam apenas **strings**. Para salvar objetos e arrays, é necessário convertê-los com `JSON.stringify` e `JSON.parse`.

---

## 2. Métodos do `localStorage`

### 2.1 `setItem(chave, valor)` — Salvar dados

```javascript
localStorage.setItem('nome', 'Ana Silva');
localStorage.setItem('idade', '28');
localStorage.setItem('logado', 'true');
```

### 2.2 `getItem(chave)` — Recuperar dados

```javascript
const nome  = localStorage.getItem('nome');   // "Ana Silva"
const idade = localStorage.getItem('idade');  // "28" (string!)
const nulo  = localStorage.getItem('xyz');    // null (chave inexistente)

console.log(typeof idade); // "string" — atenção!
```

### 2.3 `removeItem(chave)` — Remover um item

```javascript
localStorage.removeItem('nome');
console.log(localStorage.getItem('nome')); // null
```

### 2.4 `clear()` — Limpar tudo

```javascript
localStorage.clear(); // apaga TODOS os dados do domínio atual
```

### 2.5 Outras propriedades úteis

```javascript
console.log(localStorage.length);    // quantidade de itens salvos
console.log(localStorage.key(0));    // chave do primeiro item
```

---

## 3. Serialização com JSON

Como o `localStorage` só aceita strings, precisamos converter objetos e arrays usando `JSON`:

### 3.1 `JSON.stringify` — Objeto → String

```javascript
const usuario = {
  nome: 'Carlos',
  idade: 32,
  hobbies: ['leitura', 'programação']
};

const serializado = JSON.stringify(usuario);
// '{"nome":"Carlos","idade":32,"hobbies":["leitura","programação"]}'

localStorage.setItem('usuario', serializado);
```

### 3.2 `JSON.parse` — String → Objeto

```javascript
const raw     = localStorage.getItem('usuario'); // string
const usuario = JSON.parse(raw);                 // objeto JS

console.log(usuario.nome);       // "Carlos"
console.log(usuario.hobbies[0]); // "leitura"
```

### 3.3 Padrão seguro de leitura

Sempre use `try...catch` ao fazer `JSON.parse`, pois um valor corrompido lança um erro:

```javascript
function lerDoStorage(chave) {
  try {
    const raw = localStorage.getItem(chave);
    return raw ? JSON.parse(raw) : null;
  } catch (erro) {
    console.error('Erro ao ler localStorage:', erro);
    return null;
  }
}

function salvarNoStorage(chave, valor) {
  try {
    localStorage.setItem(chave, JSON.stringify(valor));
  } catch (erro) {
    console.error('Erro ao salvar no localStorage:', erro);
  }
}
```

### 3.4 Exemplo prático: lista de tarefas

```javascript
// Carregar tarefas salvas (ou array vazio se não houver)
function carregarTarefas() {
  return lerDoStorage('tarefas') || [];
}

// Adicionar uma nova tarefa e persistir
function adicionarTarefa(texto) {
  const tarefas = carregarTarefas();
  tarefas.push({ id: Date.now(), texto, concluida: false });
  salvarNoStorage('tarefas', tarefas);
}

// Uso
adicionarTarefa('Estudar localStorage');
adicionarTarefa('Fazer os exercícios');

console.log(carregarTarefas());
// [
//   { id: 1718000000001, texto: 'Estudar localStorage', concluida: false },
//   { id: 1718000000002, texto: 'Fazer os exercícios', concluida: false }
// ]
```

---

## 4. Integração com o DOM e APIs

### 4.1 Salvar dados de uma API no `localStorage`

Uma técnica comum é usar o `localStorage` como **cache**: na primeira visita, busca da API e salva; nas próximas visitas, serve do cache e evita uma requisição desnecessária.

```javascript
const CACHE_KEY = 'cache_usuarios';
const CACHE_TTL = 5 * 60 * 1000; // 5 minutos em ms

async function buscarUsuarios() {
  // Tenta carregar do cache
  const cache = lerDoStorage(CACHE_KEY);

  if (cache && (Date.now() - cache.timestamp < CACHE_TTL)) {
    console.log('Dados do cache');
    return cache.dados;
  }

  // Cache vazio ou expirado: busca na API
  console.log('Buscando da API...');
  const response  = await fetch('https://jsonplaceholder.typicode.com/users');
  const usuarios  = await response.json();

  // Salva no cache com timestamp
  salvarNoStorage(CACHE_KEY, { dados: usuarios, timestamp: Date.now() });

  return usuarios;
}
```

### 4.2 Renderizar os dados no DOM

```javascript
async function renderizarUsuarios() {
  const lista = document.getElementById('lista-usuarios');
  lista.innerHTML = '<p>Carregando...</p>';

  try {
    const usuarios = await buscarUsuarios();

    lista.innerHTML = usuarios.map(u => `
      <div class="card">
        <h3>${u.name}</h3>
        <p>${u.email}</p>
      </div>
    `).join('');

  } catch (err) {
    lista.innerHTML = `<p class="erro">Erro: ${err.message}</p>`;
  }
}

renderizarUsuarios();
```

### 4.3 Preferências do usuário — Tema claro/escuro

Um caso de uso muito comum: salvar a preferência de tema do usuário.

**HTML:**
```html
<button id="btn-tema">🌙 Modo escuro</button>
```

**JavaScript:**
```javascript
const btnTema = document.getElementById('btn-tema');

// Aplica o tema salvo ao carregar a página
function aplicarTema() {
  const tema = localStorage.getItem('tema') || 'claro';
  document.body.classList.toggle('dark', tema === 'escuro');
  btnTema.textContent = tema === 'escuro' ? '☀️ Modo claro' : '🌙 Modo escuro';
}

// Alterna e persiste
btnTema.addEventListener('click', () => {
  const atual = localStorage.getItem('tema') || 'claro';
  const novo  = atual === 'claro' ? 'escuro' : 'claro';
  localStorage.setItem('tema', novo);
  aplicarTema();
});

aplicarTema(); // chama ao carregar
```

---

## 5. Gerenciamento de Estado no Navegador

### 5.1 O que é "estado"?

**Estado** é o conjunto de dados que representa a situação atual da sua aplicação em um dado momento. Por exemplo, em um carrinho de compras:

```javascript
const estado = {
  produtos: [...],         // itens no carrinho
  totalItens: 3,           // quantidade
  totalPreco: 149.90,      // valor total
  cupomAplicado: 'DESC10'  // cupom ativo
};
```

O desafio é manter o estado **sincronizado** entre:
- os dados na memória (variáveis JavaScript)
- o `localStorage` (persistência)
- o DOM (o que o usuário vê)

### 5.2 Padrão: Store centralizado

Uma técnica simples e eficaz é criar um objeto que gerencia o estado e atualiza tudo de forma centralizada:

```javascript
// ── STORE ──────────────────────────────────────────────────
const store = {
  // Estado inicial: tenta carregar do localStorage ou usa padrão
  state: lerDoStorage('carrinho') || {
    itens: [],
    total: 0
  },

  // Salva o estado e re-renderiza o DOM
  commit(novoEstado) {
    this.state = { ...this.state, ...novoEstado };
    salvarNoStorage('carrinho', this.state);
    renderizar();
  },

  // Ações
  adicionarItem(produto) {
    const itens = [...this.state.itens, produto];
    const total = itens.reduce((acc, p) => acc + p.preco, 0);
    this.commit({ itens, total });
  },

  removerItem(id) {
    const itens = this.state.itens.filter(p => p.id !== id);
    const total = itens.reduce((acc, p) => acc + p.preco, 0);
    this.commit({ itens, total });
  },

  limpar() {
    this.commit({ itens: [], total: 0 });
  }
};

// ── RENDER ─────────────────────────────────────────────────
function renderizar() {
  const { itens, total } = store.state;

  document.getElementById('contador').textContent = itens.length;
  document.getElementById('total').textContent    = `R$ ${total.toFixed(2)}`;

  const lista = document.getElementById('itens');
  lista.innerHTML = itens.length === 0
    ? '<p>Carrinho vazio</p>'
    : itens.map(p => `
        <div class="item">
          <span>${p.nome} — R$ ${p.preco.toFixed(2)}</span>
          <button onclick="store.removerItem(${p.id})">✕</button>
        </div>
      `).join('');
}

// ── INICIALIZAÇÃO ───────────────────────────────────────────
renderizar(); // carrega o estado salvo ao abrir a página

// ── USO ─────────────────────────────────────────────────────
store.adicionarItem({ id: 1, nome: 'Camiseta', preco: 59.90 });
store.adicionarItem({ id: 2, nome: 'Calça',    preco: 89.90 });
// Ao fechar e reabrir o navegador, o carrinho ainda estará lá!
```

### 5.3 Ouvindo mudanças entre abas — evento `storage`

O `localStorage` dispara um evento quando é alterado **em outra aba** do mesmo domínio:

```javascript
window.addEventListener('storage', (event) => {
  console.log('Chave alterada:', event.key);
  console.log('Valor anterior:', event.oldValue);
  console.log('Novo valor:',     event.newValue);

  // Sincroniza o estado com a mudança da outra aba
  if (event.key === 'carrinho') {
    const novoEstado = JSON.parse(event.newValue);
    store.state = novoEstado;
    renderizar();
  }
});
```

> **Atenção:** O evento `storage` **não** dispara na aba que fez a alteração, apenas nas outras abas abertas do mesmo domínio.

---

## 6. Projeto da Aula — Lista de Favoritos com Cache de API

Combina todos os conceitos: fetch de API, cache no `localStorage`, gerenciamento de estado e sincronização com o DOM.

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>Favoritos</title>
  <style>
    body { font-family: sans-serif; max-width: 700px; margin: 2rem auto; padding: 0 1rem; }
    .card { border: 1px solid #ddd; border-radius: 8px; padding: 1rem; margin-bottom: 0.75rem; display: flex; justify-content: space-between; align-items: center; }
    .card h3 { margin: 0 0 4px; }
    .card p  { margin: 0; color: #666; font-size: 0.875rem; }
    button { cursor: pointer; border: none; border-radius: 6px; padding: 6px 14px; font-size: 14px; }
    .btn-fav    { background: #f0f0f0; }
    .btn-fav.on { background: #fde68a; }
    #aba-favs   { display: none; }
    nav button  { margin-right: 8px; background: #e5e7eb; padding: 8px 16px; }
    nav button.ativa { background: #3b82f6; color: #fff; }
  </style>
</head>
<body>

  <h1>⭐ Usuários Favoritos</h1>

  <nav>
    <button id="btn-todos"  class="ativa" onclick="mostrarAba('todos')">Todos</button>
    <button id="btn-favs"           onclick="mostrarAba('favs')">Favoritos (<span id="contFavs">0</span>)</button>
  </nav>

  <div id="aba-todos"><p>Carregando...</p></div>
  <div id="aba-favs"><p>Nenhum favorito ainda.</p></div>

  <script>
    // ── Utilitários de Storage ──────────────────────────────
    function salvar(chave, valor) {
      localStorage.setItem(chave, JSON.stringify(valor));
    }

    function carregar(chave, padrao) {
      try {
        const raw = localStorage.getItem(chave);
        return raw ? JSON.parse(raw) : padrao;
      } catch {
        return padrao;
      }
    }

    // ── Estado ─────────────────────────────────────────────
    let favoritos = carregar('favoritos', []); // array de IDs

    function isFavorito(id) {
      return favoritos.includes(id);
    }

    function toggleFavorito(id) {
      if (isFavorito(id)) {
        favoritos = favoritos.filter(f => f !== id);
      } else {
        favoritos.push(id);
      }
      salvar('favoritos', favoritos);
      atualizarUI();
    }

    // ── Render ─────────────────────────────────────────────
    let todosUsuarios = [];

    function cardHTML(u) {
      const fav = isFavorito(u.id);
      return `
        <div class="card">
          <div>
            <h3>${u.name}</h3>
            <p>${u.email} · ${u.address.city}</p>
          </div>
          <button class="btn-fav ${fav ? 'on' : ''}" onclick="toggleFavorito(${u.id})">
            ${fav ? '⭐ Favoritado' : '☆ Favoritar'}
          </button>
        </div>`;
    }

    function atualizarUI() {
      // Aba todos
      document.getElementById('aba-todos').innerHTML =
        todosUsuarios.map(cardHTML).join('') || '<p>Nenhum usuário.</p>';

      // Aba favoritos
      const favUsers = todosUsuarios.filter(u => isFavorito(u.id));
      document.getElementById('aba-favs').innerHTML =
        favUsers.length ? favUsers.map(cardHTML).join('') : '<p>Nenhum favorito ainda.</p>';

      // Contador
      document.getElementById('contFavs').textContent = favoritos.length;
    }

    // ── Fetch com cache ─────────────────────────────────────
    async function inicializar() {
      const CACHE_KEY = 'cache_usuarios';
      const CACHE_TTL = 5 * 60 * 1000;
      const cache = carregar(CACHE_KEY, null);

      if (cache && (Date.now() - cache.timestamp < CACHE_TTL)) {
        todosUsuarios = cache.dados;
      } else {
        const res     = await fetch('https://jsonplaceholder.typicode.com/users');
        todosUsuarios = await res.json();
        salvar(CACHE_KEY, { dados: todosUsuarios, timestamp: Date.now() });
      }

      atualizarUI();
    }

    // ── Navegação entre abas ────────────────────────────────
    function mostrarAba(qual) {
      document.getElementById('aba-todos').style.display = qual === 'todos' ? 'block' : 'none';
      document.getElementById('aba-favs').style.display  = qual === 'favs'  ? 'block' : 'none';
      document.getElementById('btn-todos').className = qual === 'todos' ? 'ativa' : '';
      document.getElementById('btn-favs').className  = qual === 'favs'  ? 'ativa' : '';
    }

    inicializar();
  </script>
</body>
</html>
```

---

## 7. Resumo dos Conceitos

```
localStorage
│
├── setItem(key, value)     → salva (apenas strings)
├── getItem(key)            → recupera (null se não existe)
├── removeItem(key)         → remove uma chave
├── clear()                 → apaga tudo
│
├── JSON.stringify(obj)     → objeto → string  (para salvar)
└── JSON.parse(string)      → string → objeto  (para recuperar)

Estado da Aplicação
│
├── Dado em memória  (variáveis JS)     ─┐
├── Dado persistido  (localStorage)      ├── devem estar sincronizados
└── Dado visual      (DOM)             ─┘
```

---

## 8. Exercícios

### Exercício 1 — Operações básicas ⭐

Abra o console do navegador e pratique:

1. Salve seu nome, idade e cidade favorita no `localStorage`
2. Recupere e exiba cada valor no console
3. Remova a cidade e verifique que retorna `null`
4. Use `localStorage.length` para contar os itens restantes
5. Use `clear()` e confirme que ficou vazio

---

### Exercício 2 — Salvando objetos ⭐⭐

Crie uma função `salvarPerfil(nome, email, nivel)` que salva um objeto de perfil no `localStorage` sob a chave `"perfil"`. Em seguida, crie `carregarPerfil()` que recupera e exibe os dados no console.

```javascript
salvarPerfil('João', 'joao@email.com', 'intermediário');
carregarPerfil();
// { nome: 'João', email: 'joao@email.com', nivel: 'intermediário' }
```

---

### Exercício 3 — Tema persistente ⭐⭐

Crie uma página HTML com:

1. Um botão que alterna entre fundo branco e fundo preto
2. O texto do botão deve indicar o modo atual ("🌙 Modo escuro" / "☀️ Modo claro")
3. Ao recarregar a página, o tema escolhido anteriormente deve ser restaurado automaticamente

---

### Exercício 4 — Lista de tarefas persistente ⭐⭐⭐

Construa uma página com:

1. Campo de texto + botão para adicionar tarefas
2. Cada tarefa exibida em uma lista com um botão "✓ Concluir" e "✗ Remover"
3. Tarefas concluídas devem aparecer com texto riscado e cor diferente
4. Todo o estado deve ser salvo no `localStorage`
5. Ao recarregar, a lista deve aparecer exatamente como estava

---

### Exercício 5 — Desafio: Dashboard com cache e favoritos ⭐⭐⭐⭐

Crie uma aplicação que:

1. Busque posts da API: `https://jsonplaceholder.typicode.com/posts`
2. Armazene os posts em cache no `localStorage` com TTL de 2 minutos
3. Exiba um indicador na tela: "Dados do cache" ou "Dados da API"
4. Permita favoritar/desfavoritar posts (persistir IDs no `localStorage`)
5. Tenha uma aba "Favoritos" que mostra apenas os posts favoritados
6. Ao recarregar a página, os favoritos e o cache devem ser restaurados

---

## 9. Referências e Recursos

| Recurso | Link |
|---|---|
| MDN — localStorage | https://developer.mozilla.org/pt-BR/docs/Web/API/Window/localStorage |
| MDN — Web Storage API | https://developer.mozilla.org/pt-BR/docs/Web/API/Web_Storage_API |
| MDN — JSON.stringify | https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify |
| MDN — JSON.parse | https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse |
| MDN — Evento storage | https://developer.mozilla.org/en-US/docs/Web/API/Window/storage_event |
| javascript.info — Storage | https://javascript.info/localstorage |

---

> **Dica final:** Abra o DevTools (F12) → aba **Application** → **Local Storage** para inspecionar, editar e deletar dados do `localStorage` em tempo real enquanto desenvolve.
