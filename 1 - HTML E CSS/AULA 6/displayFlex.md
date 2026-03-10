# Aula 6 — Layouts com Flexbox
**Módulo 01 — Introdução ao Desenvolvimento Web**

---

## Objetivos da Aula

- Entender o que é o modelo Flexbox e por que ele foi criado
- Aprender as propriedades do container flex e dos itens flex
- Criar layouts horizontais, verticais e responsivos com Flexbox
- Comparar Flexbox com os métodos antigos (float e position)

---

## 1. O que é o Flexbox?

**Flexbox** (Flexible Box Layout) é um modelo de layout do CSS criado para organizar elementos em uma dimensão: seja em linha (horizontal) ou em coluna (vertical).

Ele foi desenvolvido para resolver os problemas que métodos antigos como `float` e `position` causavam ao tentar criar layouts modernos.

### 1.1 Por que o Flexbox foi criado?

Antes do Flexbox, os desenvolvedores usavam estes recursos para organizar elementos:

| Método antigo | Problema |
|---|---|
| `float: left / right` | Criado para textos com imagens, não para layout. Exigia "clearfix" e era difícil de controlar. |
| `position: absolute/relative` | Tirava os elementos do fluxo normal. Alinhar verticalmente era muito trabalhoso. |
| `display: inline-block` | Gerava espaços indesejados entre elementos. Difícil de centralizar verticalmente. |
| Tabelas HTML | Usava `<table>` para layout, o que era semanticamente errado e inflexível. |

> 💡 **Resumo:** O Flexbox foi criado para que alinhar e distribuir elementos fosse simples, previsível e sem gambiarras. Com uma única propriedade no elemento pai, todos os filhos passam a ter comportamento flexível.

### 1.2 Conceitos fundamentais

Ao usar Flexbox, existem dois tipos de elementos:

- **Flex Container:** o elemento pai onde se aplica `display: flex`. Ele controla o layout dos filhos.
- **Flex Items:** os filhos diretos do container. Eles recebem o comportamento flexível automaticamente.

```html
<!-- HTML -->
<div class="container">   <!-- Flex Container -->
  <div>Item 1</div>        <!-- Flex Item -->
  <div>Item 2</div>        <!-- Flex Item -->
  <div>Item 3</div>        <!-- Flex Item -->
</div>
```

```css
/* CSS */
.container {
  display: flex; /* ativa o Flexbox no container */
}
```

> 📌 **Eixos do Flexbox:**
> - **Eixo principal (main axis):** direção em que os itens são organizados (padrão: horizontal)
> - **Eixo cruzado (cross axis):** direção perpendicular ao principal (padrão: vertical)

---

## 2. Propriedades do Flex Container

### 2.1 `display: flex`

É a propriedade que ativa o Flexbox. Sem ela, as outras propriedades desta seção não funcionam.

```css
.container {
  display: flex; /* todos os filhos viram flex items */
}
```

**Vantagem imediata:** assim que você aplica `display: flex`, os filhos ficam lado a lado automaticamente — sem precisar de float.

---

### 2.2 `flex-direction`

Define a direção do eixo principal — ou seja, para onde os itens vão "escorrer".

| Valor | Comportamento |
|---|---|
| `row` *(padrão)* | Itens em linha, da esquerda para a direita |
| `row-reverse` | Itens em linha, da direita para a esquerda |
| `column` | Itens em coluna, de cima para baixo |
| `column-reverse` | Itens em coluna, de baixo para cima |

```css
.container {
  display: flex;
  flex-direction: row;    /* padrão: horizontal */
  /* flex-direction: column; /* vertical */
}
```

---

### 2.3 `justify-content` — alinhamento no eixo principal

Controla como os itens são distribuídos ao longo do eixo principal (horizontal, quando `flex-direction: row`).

| Valor | Comportamento |
|---|---|
| `flex-start` *(padrão)* | Itens agrupados no início |
| `flex-end` | Itens agrupados no final |
| `center` | Itens centralizados |
| `space-between` | Primeiro e último nas extremidades; espaço igual entre os demais |
| `space-around` | Espaço igual ao redor de cada item |
| `space-evenly` | Espaço exatamente igual entre todos, incluindo extremidades |

```css
.container {
  display: flex;
  justify-content: space-between;
}
```

---

### 2.4 `align-items` — alinhamento no eixo cruzado

Controla como os itens são alinhados no eixo perpendicular (vertical, quando `flex-direction: row`).

| Valor | Comportamento |
|---|---|
| `stretch` *(padrão)* | Itens se esticam para preencher a altura do container |
| `flex-start` | Itens alinhados no topo |
| `flex-end` | Itens alinhados na base |
| `center` | Itens centralizados verticalmente |
| `baseline` | Itens alinhados pela linha de base do texto |

```css
.container {
  display: flex;
  justify-content: center; /* centraliza horizontalmente */
  align-items: center;     /* centraliza verticalmente */
  height: 300px;           /* container precisa ter altura definida */
}
```

> 💡 **Dica clássica:** Para centralizar um elemento na tela (horizontal E vertical), basta aplicar as três linhas acima no container. Isso resolve em segundos o que era muito difícil com `float` ou `position`!

---

### 2.5 `flex-wrap`

Por padrão, os itens flex ficam todos em uma linha, mesmo que não caibam. O `flex-wrap` controla esse comportamento.

| Valor | Comportamento |
|---|---|
| `nowrap` *(padrão)* | Todos os itens ficam em uma linha, podendo sair do container |
| `wrap` | Itens quebram para a linha seguinte quando não há espaço |
| `wrap-reverse` | Quebra de linha, mas em ordem inversa |

```css
.container {
  display: flex;
  flex-wrap: wrap; /* itens quebram linha se necessário */
}
```

---

## 3. Propriedades dos Flex Items

Enquanto as propriedades anteriores vão no **container**, estas vão nos **itens filhos**, controlando como cada um se comporta individualmente.

### 3.1 `flex-grow`

Define quanto um item pode **crescer** para ocupar espaço disponível no container. O valor é uma proporção.

```css
.item-a { flex-grow: 1; } /* ocupa 1 parte do espaço livre */
.item-b { flex-grow: 2; } /* ocupa 2 partes — o dobro do item-a */
.item-c { flex-grow: 1; } /* ocupa 1 parte */

/* Total: 4 partes. item-b ocupa metade; item-a e item-c, um quarto cada */
```

> 📌 `flex-grow: 0` (padrão) = o item **NÃO** cresce além do seu conteúdo.
> `flex-grow: 1` em todos os itens = todos dividem o espaço igualmente.

---

### 3.2 `flex-shrink`

Define quanto um item pode **encolher** quando o espaço é insuficiente. Funciona de forma oposta ao `flex-grow`.

```css
.item-a { flex-shrink: 1; } /* pode encolher normalmente (padrão) */
.item-b { flex-shrink: 0; } /* NÃO encolhe — mantém tamanho fixo */
.item-c { flex-shrink: 2; } /* encolhe o dobro comparado ao item-a */
```

---

### 3.3 `flex-basis`

Define o **tamanho inicial** de um item antes de o espaço livre ser distribuído. É parecido com `width`, mas específico para Flexbox.

```css
.item {
  flex-basis: 200px; /* tamanho base de 200px */
  /* flex-basis: auto; padrão — usa o tamanho do conteúdo */
  /* flex-basis: 0;    ignora o conteúdo, distribui tudo pelo flex-grow */
}
```

> 💡 **Atalho prático:** a propriedade `flex` combina grow, shrink e basis em uma linha:
> `flex: 1` → equivale a: `flex-grow: 1; flex-shrink: 1; flex-basis: 0%`
> Muito usado para colunas iguais: todos os itens com `flex: 1`

---

### 3.4 `align-self`

Permite que um item individual quebre a regra do `align-items` do container e defina seu próprio alinhamento vertical.

```css
.container {
  display: flex;
  align-items: center;    /* regra geral: todos centralizados */
}

.item-especial {
  align-self: flex-end;   /* apenas este item vai para o final */
}
```

| Valor | Comportamento |
|---|---|
| `auto` *(padrão)* | Herda o `align-items` do container |
| `flex-start` | Item vai para o topo |
| `flex-end` | Item vai para a base |
| `center` | Item fica centralizado |
| `stretch` | Item se estica para preencher a altura |

---

## 4. Exemplos Práticos de Layout

### Exemplo 1 — Barra de navegação horizontal

Um dos usos mais comuns do Flexbox: menu com logo à esquerda e links à direita.

```html
<!-- HTML -->
<header class="navbar">
  <div class="logo">MeuSite</div>
  <nav>
    <a href="#">Início</a>
    <a href="#">Sobre</a>
    <a href="#">Contato</a>
  </nav>
</header>
```

```css
/* CSS */
.navbar {
  display: flex;
  justify-content: space-between; /* logo à esquerda, nav à direita */
  align-items: center;            /* alinha verticalmente no centro */
  padding: 16px 40px;
  background-color: #1a1a2e;
}

.navbar a {
  color: white;
  text-decoration: none;
  margin-left: 24px;
}
```

> 🔎 **Observe:** antes do Flexbox, esta barra exigia `float: left` na logo e `float: right` no nav, mais um clearfix. Com Flexbox: 2 propriedades resolvem tudo.

---

### Exemplo 2 — Colunas responsivas

Cards lado a lado que quebram para a linha de baixo quando a tela fica pequena.

```html
<!-- HTML -->
<section class="cards">
  <div class="card">Card 1</div>
  <div class="card">Card 2</div>
  <div class="card">Card 3</div>
</section>
```

```css
/* CSS */
.cards {
  display: flex;
  flex-wrap: wrap;   /* permite quebrar linha */
  gap: 20px;         /* espaçamento entre os cards */
}

.card {
  flex: 1;           /* todos crescem igualmente */
  min-width: 250px;  /* largura mínima antes de quebrar */
  background-color: #f0f0f0;
  padding: 20px;
}
```

---

### Exemplo 3 — Centralização perfeita

Centralizar conteúdo horizontal e verticalmente — o problema mais famoso do CSS, resolvido com 3 linhas.

```html
<!-- HTML -->
<div class="hero">
  <h1>Bem-vindo!</h1>
  <p>Texto centralizado na tela.</p>
</div>
```

```css
/* CSS */
.hero {
  display: flex;
  flex-direction: column;  /* empilha h1 e p verticalmente */
  justify-content: center; /* centraliza no eixo vertical */
  align-items: center;     /* centraliza no eixo horizontal */
  height: 100vh;           /* ocupa a altura toda da tela */
  text-align: center;
}
```

---

## 5. Tabela Resumo

**Propriedades do Container:**

| Propriedade | O que faz |
|---|---|
| `display: flex` | Ativa o modo Flexbox no container |
| `flex-direction` | Define se os itens ficam em linha ou coluna |
| `justify-content` | Alinha os itens no eixo principal |
| `align-items` | Alinha os itens no eixo cruzado |
| `flex-wrap` | Permite ou proíbe a quebra de linha dos itens |

**Propriedades dos Itens:**

| Propriedade | O que faz |
|---|---|
| `flex-grow` | Quanto o item pode crescer para ocupar espaço livre |
| `flex-shrink` | Quanto o item pode encolher quando falta espaço |
| `flex-basis` | Tamanho inicial do item antes de distribuir o espaço |
| `flex` *(atalho)* | Combina grow, shrink e basis em uma linha |
| `align-self` | Alinhamento individual no eixo cruzado (sobrescreve align-items) |

---

## 6. Exercícios

### Exercício 1 — Barra de navegação 🟢 Fácil

Crie um arquivo HTML com uma barra de navegação usando Flexbox com os seguintes requisitos:

1. Crie uma `<header>` com a classe `navbar`
2. Dentro do header, coloque uma `<div class="logo">` com o texto do seu site
3. Ao lado da logo, coloque uma `<nav>` com pelo menos 3 links
4. Use Flexbox para deixar a logo à esquerda e o menu à direita
5. Centralize ambos verticalmente no header
6. Adicione uma cor de fundo escura ao header e cor branca nos textos

> 🎯 Propriedades usadas: `display: flex`, `justify-content: space-between`, `align-items: center`

---

### Exercício 2 — Galeria de Cards 🟡 Médio

Crie uma galeria de produtos usando Flexbox com quebra de linha:

1. Crie uma `<section>` com a classe `galeria`
2. Dentro dela, crie 6 cards (`div` com classe `card`)
3. Cada card deve ter: título, um parágrafo descritivo e um botão
4. Use `flex-wrap: wrap` para que os cards quebrem linha
5. Use `flex: 1` e `min-width: 250px` para que sejam responsivos
6. Use `gap: 20px` para espaçamento entre os cards
7. Adicione uma borda, padding e sombra em cada card

> 🎯 Propriedades usadas: `display: flex`, `flex-wrap`, `gap`, `flex`, `min-width`

---

### Exercício 3 — Seção Hero Centralizada 🟡 Médio

Crie uma seção hero que ocupa a tela inteira e centraliza o conteúdo:

1. Crie uma `<section class="hero">` com `height: 100vh`
2. Dentro do hero, coloque um `<h1>` e um `<p>` com texto de apresentação
3. Use Flexbox com `flex-direction: column` para empilhar os elementos
4. Centralize tudo horizontal e verticalmente
5. Adicione uma imagem de fundo com `background-image` e um overlay escuro
6. Estilize o texto com cor branca e fonte maior

> 🎯 Propriedades usadas: `display: flex`, `flex-direction: column`, `justify-content: center`, `align-items: center`

---

### Exercício 4 — Layout de Página Completa 🔴 Desafio

Una tudo em uma página completa com header, hero, cards e footer:

1. Crie um header com logo e navegação *(Exercício 1)*
2. Abaixo, uma seção hero centralizada *(Exercício 3)*
3. Em seguida, uma galeria com 3 cards de serviços *(baseado no Exercício 2)*
4. Por fim, um footer com `display: flex` contendo: nome do site, email e telefone
5. No footer, use `justify-content: space-between` para espaçar as informações
6. Garanta que a página tenha um visual coerente: mesmas cores, fontes e espaçamentos

> 🏆 **Desafio extra:** tente criar uma linha com 3 colunas usando `flex: 1` em cada uma. Coluna 1: imagem. Coluna 2: texto. Coluna 3: formulário de contato.

---

*Material didático — Aula 6: Layouts com Flexbox | Módulo 01 — Introdução ao Desenvolvimento Web*
