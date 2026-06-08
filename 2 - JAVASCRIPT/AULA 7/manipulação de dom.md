# Manipulação Avançada do DOM


# 1. Conceitos Básicos do DOM

## O que é o DOM?

DOM significa **Document Object Model** (Modelo de Objetos do Documento).

O DOM é uma representação da página HTML em forma de árvore, onde cada elemento da página se torna um objeto manipulável pelo JavaScript.

### Exemplo de Estrutura HTML

```html
<body>
  <h1>Título</h1>
  <p>Parágrafo</p>
</body>
```

Representação simplificada:

```text
Document
 └── body
      ├── h1
      └── p
```

Com o DOM, o JavaScript consegue:

- Alterar textos
- Modificar estilos
- Criar elementos
- Remover elementos
- Reagir a eventos do usuário

---

# 2. Seleção de Elementos

## querySelector()

Seleciona o primeiro elemento encontrado.

### Sintaxe

```javascript
document.querySelector("seletor")
```

### Exemplo

```html
<h1 id="titulo">Olá Mundo</h1>
```

```javascript
const titulo = document.querySelector("#titulo")

console.log(titulo)
```

---

## querySelectorAll()

Seleciona todos os elementos correspondentes.

### Exemplo

```html
<p>Texto 1</p>
<p>Texto 2</p>
<p>Texto 3</p>
```

```javascript
const paragrafos = document.querySelectorAll("p")

console.log(paragrafos)
```

### Percorrendo os elementos

```javascript
paragrafos.forEach((p) => {
  console.log(p.textContent)
})
```

---

# 3. Criação e Manipulação de Elementos

## createElement()

Cria elementos HTML dinamicamente.

### Exemplo

```javascript
const novoParagrafo = document.createElement("p")

novoParagrafo.textContent = "Parágrafo criado pelo JavaScript"
```

---

## append()

Adiciona um elemento ao final de outro elemento.

### Exemplo

```html
<div id="container"></div>
```

```javascript
const container = document.querySelector("#container")

const titulo = document.createElement("h2")
titulo.textContent = "Novo título"

container.append(titulo)
```

---

## appendChild()

Também adiciona elementos ao DOM.

### Exemplo

```javascript
const lista = document.querySelector("ul")

const item = document.createElement("li")
item.textContent = "Novo Item"

lista.appendChild(item)
```

---

## remove()

Remove um elemento do DOM.

### Exemplo

```html
<p id="mensagem">Mensagem importante</p>
```

```javascript
const mensagem = document.querySelector("#mensagem")

mensagem.remove()
```

---

# 4. Manipulação de Classes e Estilos

## classList.add()

Adiciona uma classe CSS.

### Exemplo

```html
<p id="texto">Olá</p>
```

```css
.destaque {
  color: red;
  font-size: 24px;
}
```

```javascript
const texto = document.querySelector("#texto")

texto.classList.add("destaque")
```

---

## classList.remove()

Remove uma classe CSS.

### Exemplo

```javascript
texto.classList.remove("destaque")
```

---

## classList.toggle()

Adiciona ou remove automaticamente uma classe.

### Exemplo

```javascript
texto.classList.toggle("ativo")
```

Se a classe existir, ela será removida.  
Se não existir, será adicionada.

---

# 5. Alteração Direta de Estilos

Podemos modificar estilos diretamente pelo JavaScript usando a propriedade `style`.

### Exemplo

```javascript
const caixa = document.querySelector(".caixa")

caixa.style.backgroundColor = "blue"
caixa.style.color = "white"
caixa.style.padding = "20px"
```

---

# 6. Navegação no DOM

O JavaScript permite navegar entre elementos relacionados.

---

## parentNode

Acessa o elemento pai.

### Exemplo

```html
<div id="container">
  <p id="texto">Olá</p>
</div>
```

```javascript
const texto = document.querySelector("#texto")

console.log(texto.parentNode)
```

---

## childNodes

Retorna os filhos do elemento.

### Exemplo

```javascript
const container = document.querySelector("#container")

console.log(container.childNodes)
```

---

## firstChild

Retorna o primeiro filho.

### Exemplo

```javascript
console.log(container.firstChild)
```

---

## lastChild

Retorna o último filho.

### Exemplo

```javascript
console.log(container.lastChild)
```

---

## nextSibling

Retorna o próximo irmão.

### Exemplo

```javascript
const item = document.querySelector(".item")

console.log(item.nextSibling)
```

---

## previousSibling

Retorna o irmão anterior.

### Exemplo

```javascript
console.log(item.previousSibling)
```

---

# 7. Exemplo Completo

## Criando uma Lista Dinâmica

### HTML

```html
<input type="text" id="tarefa">
<button id="adicionar">Adicionar</button>

<ul id="lista"></ul>
```

---

### JavaScript

```javascript
const botao = document.querySelector("#adicionar")
const input = document.querySelector("#tarefa")
const lista = document.querySelector("#lista")

botao.addEventListener("click", () => {
  const texto = input.value

  if (texto !== "") {
    const item = document.createElement("li")

    item.textContent = texto

    lista.append(item)

    input.value = ""
  }
})
```

---

# 8. Boas Práticas

- Utilizar nomes claros para variáveis.
- Evitar manipulações desnecessárias do DOM.
- Separar JavaScript, HTML e CSS.
- Utilizar classes CSS ao invés de muitos estilos inline.
- Organizar o código em funções quando necessário.

---

# 9. Exercícios Práticos

## Exercício 1

Crie um botão que altere a cor de fundo de uma `div`.

---

## Exercício 2

Crie um sistema onde o usuário possa adicionar itens em uma lista.

---

## Exercício 3

Crie um botão para remover o último item de uma lista.

---

## Exercício 4

Crie um botão que adicione e remova uma classe CSS usando `toggle`.

---

## Exercício 5

Crie uma estrutura HTML com vários elementos e pratique:

- parentNode
- childNodes
- nextSibling
- previousSibling

---

# 10. Conclusão

A manipulação do DOM é uma das partes mais importantes do JavaScript no desenvolvimento web.

Com ela, conseguimos:

- Tornar páginas interativas
- Atualizar conteúdos dinamicamente
- Criar aplicações modernas
- Melhorar a experiência do usuário

Dominar o DOM é fundamental antes de avançar para bibliotecas e frameworks como React, Vue e Angular.
