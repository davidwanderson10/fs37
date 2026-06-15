# Aula 06 – Eventos e Callbacks no DOM


---

## 1. Introdução aos Eventos no DOM

### O que é um Evento?

Um **evento** é qualquer interação do usuário ou ação do navegador que pode ser detectada pelo JavaScript: um clique, o envio de um formulário, a pressão de uma tecla, o carregamento da página, entre outros.

O **DOM** (Document Object Model) permite que registremos funções — chamadas de **event listeners** (ouvintes de eventos) — que são executadas automaticamente quando determinado evento ocorre.

### Eventos Inline vs. `addEventListener`

**Evento inline** — escrito diretamente no HTML:

```html
<!-- ❌ Não recomendado: mistura HTML com lógica JavaScript -->
<button onclick="alert('Clicou!')">Clique aqui</button>
```

Problemas da abordagem inline:
- Mistura estrutura (HTML) com comportamento (JS).
- Permite apenas um handler por elemento.
- Dificulta a manutenção e os testes.

**`addEventListener`** — abordagem recomendada:

```html
<button id="btn">Clique aqui</button>
```

```javascript
const btn = document.getElementById('btn');

btn.addEventListener('click', function () {
  alert('Botão clicado!');
});
```

Vantagens:
- Separa HTML de JavaScript.
- Permite múltiplos listeners no mesmo elemento.
- Facilita a remoção de eventos.

---

## 2. Adição e Remoção de Eventos

### `addEventListener`

Sintaxe:

```javascript
elemento.addEventListener(evento, callback, opções);
```

Exemplos com eventos comuns:

```javascript
const input = document.getElementById('nome');

// Detecta digitação em tempo real
input.addEventListener('input', function (event) {
  console.log('Valor atual:', event.target.value);
});

// Detecta quando o campo perde o foco
input.addEventListener('blur', function () {
  console.log('Campo perdeu o foco');
});

// Detecta pressionamento de tecla
input.addEventListener('keydown', function (event) {
  if (event.key === 'Enter') {
    console.log('Enter pressionado!');
  }
});
```

### `removeEventListener`

Para remover um listener, é necessário passar a **mesma referência de função** usada no `addEventListener`. Funções anônimas não podem ser removidas.

```javascript
// ✅ Correto — função nomeada, pode ser removida
function handleClick() {
  console.log('Clicou!');
}

const btn = document.getElementById('btn');
btn.addEventListener('click', handleClick);

// Remove o listener depois de 3 segundos
setTimeout(function () {
  btn.removeEventListener('click', handleClick);
  console.log('Listener removido.');
}, 3000);
```

```javascript
// ❌ Incorreto — função anônima não pode ser removida
btn.addEventListener('click', function () {
  console.log('Clicou!'); // Impossível remover esse listener
});
```

### `preventDefault` — Prevenindo Comportamentos Padrão

Alguns elementos HTML possuem comportamento padrão: formulários enviam dados ao servidor, links navegam para outras páginas, etc. O método `preventDefault()` cancela esse comportamento.

```html
<form id="formulario">
  <input type="text" id="campo" placeholder="Digite algo" />
  <button type="submit">Enviar</button>
</form>
```

```javascript
const formulario = document.getElementById('formulario');
const campo = document.getElementById('campo');

formulario.addEventListener('submit', function (event) {
  // Impede o recarregamento da página
  event.preventDefault();

  const valor = campo.value.trim();

  if (valor === '') {
    alert('O campo não pode estar vazio!');
    return;
  }

  console.log('Formulário enviado com:', valor);
});
```

---

## 3. Delegação de Eventos

### O Problema com Elementos Dinâmicos

Quando elementos são criados após o carregamento da página (via JavaScript), adicionar listeners individualmente a cada um é ineficiente e torna o código difícil de manter.

```javascript
// ❌ Problemático: adiciona listener a cada item separadamente
const itens = document.querySelectorAll('.item');
itens.forEach(function (item) {
  item.addEventListener('click', function () {
    console.log('Item clicado:', item.textContent);
  });
});
// Elementos criados depois não receberão esse listener!
```

### Delegação de Eventos com `event.target`

A solução é registrar o listener em um **elemento pai** e usar `event.target` para identificar qual filho disparou o evento.

```html
<ul id="lista">
  <li class="item">Item 1</li>
  <li class="item">Item 2</li>
  <li class="item">Item 3</li>
</ul>
<button id="adicionar">Adicionar Item</button>
```

```javascript
const lista = document.getElementById('lista');
const btnAdicionar = document.getElementById('adicionar');
let contador = 4;

// Um único listener no elemento pai
lista.addEventListener('click', function (event) {
  // Verifica se o clique foi em um <li> com a classe "item"
  if (event.target.classList.contains('item')) {
    console.log('Clicou em:', event.target.textContent);
    event.target.style.color = 'blue';
  }
});

// Novos elementos também funcionam automaticamente
btnAdicionar.addEventListener('click', function () {
  const novoItem = document.createElement('li');
  novoItem.classList.add('item');
  novoItem.textContent = 'Item ' + contador;
  lista.appendChild(novoItem);
  contador++;
});
```

### Exemplo Prático — Lista de Tarefas com Delegação

```html
<ul id="tarefas"></ul>
<input type="text" id="nova-tarefa" placeholder="Nova tarefa" />
<button id="btn-adicionar">Adicionar</button>
```

```javascript
const listaTarefas = document.getElementById('tarefas');
const inputTarefa = document.getElementById('nova-tarefa');
const btnAdicionarTarefa = document.getElementById('btn-adicionar');

// Delegação: escuta cliques em toda a lista
listaTarefas.addEventListener('click', function (event) {
  if (event.target.tagName === 'BUTTON') {
    const itemPai = event.target.parentElement;
    listaTarefas.removeChild(itemPai);
  }
});

btnAdicionarTarefa.addEventListener('click', function () {
  const texto = inputTarefa.value.trim();
  if (texto === '') return;

  const item = document.createElement('li');
  item.innerHTML = texto + ' <button>Remover</button>';
  listaTarefas.appendChild(item);

  inputTarefa.value = '';
});
```

---

## 4. Funções Anônimas e Callbacks em Eventos

### Funções Anônimas

São funções sem nome declaradas diretamente como argumento. Úteis para lógica simples e pontual.

```javascript
document.getElementById('btn').addEventListener('click', function () {
  console.log('Clique detectado!');
});

// Equivalente com arrow function
document.getElementById('btn').addEventListener('click', () => {
  console.log('Clique detectado!');
});
```

> **Atenção:** funções anônimas não podem ser removidas com `removeEventListener`.

### Callbacks Reutilizáveis

Quando a mesma lógica se repete em múltiplos eventos, extrai-se em uma função nomeada:

```javascript
// Callback de validação reutilizável
function validarCampo(event) {
  const valor = event.target.value.trim();
  const campo = event.target;

  if (valor === '') {
    campo.style.borderColor = 'red';
    console.log('Campo obrigatório:', campo.name);
  } else {
    campo.style.borderColor = 'green';
  }
}

// Mesmo callback aplicado a múltiplos campos
document.getElementById('nome').addEventListener('blur', validarCampo);
document.getElementById('email').addEventListener('blur', validarCampo);
document.getElementById('telefone').addEventListener('blur', validarCampo);
```

### Passando Parâmetros para Callbacks

Quando precisar passar parâmetros adicionais ao callback, usa-se uma função intermediária (wrapper):

```javascript
function exibirMensagem(mensagem) {
  return function (event) {
    event.preventDefault();
    console.log(mensagem, '— disparado por:', event.type);
  };
}

document.getElementById('btn-salvar').addEventListener('click', exibirMensagem('Dados salvos!'));
document.getElementById('btn-cancelar').addEventListener('click', exibirMensagem('Operação cancelada.'));
```

### Exemplo Completo — Carrinho de Compras

```html
<div id="produtos">
  <div class="produto" data-id="1" data-nome="Notebook" data-preco="3500">
    Notebook — R$ 3.500 <button class="btn-adicionar">Adicionar</button>
  </div>
  <div class="produto" data-id="2" data-nome="Mouse" data-preco="150">
    Mouse — R$ 150 <button class="btn-adicionar">Adicionar</button>
  </div>
</div>

<h3>Carrinho</h3>
<ul id="carrinho"></ul>
<p id="total">Total: R$ 0</p>
```

```javascript
const divProdutos = document.getElementById('produtos');
const listaCarrinho = document.getElementById('carrinho');
const totalEl = document.getElementById('total');

let carrinho = [];

// Callback para atualizar o total
function atualizarTotal() {
  const total = carrinho.reduce(function (soma, item) {
    return soma + item.preco;
  }, 0);
  totalEl.textContent = 'Total: R$ ' + total.toLocaleString('pt-BR');
}

// Callback para renderizar o carrinho
function renderizarCarrinho() {
  listaCarrinho.innerHTML = '';
  carrinho.forEach(function (item) {
    const li = document.createElement('li');
    li.textContent = item.nome + ' — R$ ' + item.preco.toLocaleString('pt-BR');
    listaCarrinho.appendChild(li);
  });
  atualizarTotal();
}

// Delegação de eventos nos produtos
divProdutos.addEventListener('click', function (event) {
  if (event.target.classList.contains('btn-adicionar')) {
    const produto = event.target.parentElement;
    const item = {
      id: produto.dataset.id,
      nome: produto.dataset.nome,
      preco: Number(produto.dataset.preco),
    };
    carrinho.push(item);
    renderizarCarrinho();
  }
});
```

---

## Exercícios Práticos

### Iniciante

1. Crie um botão que, ao ser clicado, alterne o texto entre `"Ligar"` e `"Desligar"`. Use `addEventListener` e uma variável de estado.

2. Crie um campo `<input>` que exiba, em tempo real em um parágrafo abaixo, a quantidade de caracteres digitados. Use o evento `input`.

3. Crie um formulário com um campo de e-mail. Ao tentar enviar, use `preventDefault` e valide se o campo contém `@`. Exiba uma mensagem de erro ou sucesso.

---

### Intermediário

4. Crie uma lista de itens em HTML. Ao clicar em qualquer item, ele deve ser marcado como "concluído" (adicione a classe `concluido` e altere o estilo). Use delegação de eventos.

5. Implemente um sistema de abas (tabs): três botões e três `<div>` de conteúdo. Ao clicar em um botão, apenas o `<div>` correspondente deve ser exibido. Use `removeEventListener` para desativar o botão da aba ativa.

6. Crie um campo de busca que filtre, em tempo real, uma lista de nomes exibidos em `<li>`. Use o evento `input` e `event.target.value`.

---

### Avançado

7. Crie um formulário de cadastro com campos: nome, e-mail e senha. Implemente um callback de validação reutilizável que:
   - Valide cada campo no evento `blur`.
   - Impeça o envio do formulário se algum campo for inválido.
   - Exiba mensagens de erro específicas para cada campo.

8. Implemente um carrinho de compras completo com:
   - Lista de produtos com botão "Adicionar".
   - Seção do carrinho mostrando itens e quantidades.
   - Botão "Remover" em cada item do carrinho.
   - Total atualizado dinamicamente.
   - Use delegação de eventos tanto para adicionar quanto para remover itens.

---

## Critérios de Avaliação

| Critério | Descrição |
|---|---|
| Uso correto de `addEventListener` | Eventos registrados via JS, sem uso de atributos inline |
| Aplicação de `preventDefault` | Comportamento padrão prevenido onde necessário |
| Delegação de eventos | Listener no elemento pai com verificação via `event.target` |
| Callbacks reutilizáveis | Funções extraídas e aplicadas em múltiplos contextos |
| Qualidade do código | Código legível, sem repetição desnecessária |

---

## Recursos Complementares

- [MDN — Introdução a eventos](https://developer.mozilla.org/pt-BR/docs/Learn/JavaScript/Building_blocks/Events)
- [MDN — EventTarget.addEventListener()](https://developer.mozilla.org/pt-BR/docs/Web/API/EventTarget/addEventListener)
- [MDN — Event.target](https://developer.mozilla.org/pt-BR/docs/Web/API/Event/target)
- [MDN — Event.preventDefault()](https://developer.mozilla.org/pt-BR/docs/Web/API/Event/preventDefault)
- [javascript.info — Introdução aos eventos do navegador](https://javascript.info/introduction-browser-events)
- [javascript.info — Delegação de eventos](https://javascript.info/event-delegation)
