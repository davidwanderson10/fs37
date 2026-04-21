# Aula 01 — Introdução ao JavaScript e Variáveis

> **Módulo:** JavaScript Fundamentals  

---

## 🎯 Objetivos da Aula

Ao final desta aula, o aluno será capaz de:

- Compreender o que é JavaScript e qual seu papel no desenvolvimento web
- Identificar os principais tipos de dados da linguagem
- Declarar variáveis utilizando `var`, `let` e `const`
- Aplicar operadores aritméticos, relacionais e lógicos em expressões simples

---

## 📚 Conteúdo Programático

### 1. O que é JavaScript e sua Importância

#### 1.1 História e Evolução

JavaScript foi criado em **1995** por Brendan Eich enquanto trabalhava na Netscape. Originalmente chamado de *Mocha*, depois *LiveScript*, e finalmente renomeado para **JavaScript** — apesar de não ter relação direta com a linguagem Java.

Linha do tempo resumida:

| Ano | Marco |
|-----|-------|
| 1995 | Criação do JavaScript pela Netscape |
| 1997 | Padronização como ECMAScript (ES1) |
| 2009 | Lançamento do Node.js (JS no servidor) |
| 2015 | ES6/ES2015 — maior atualização da linguagem |
| Hoje | Atualizações anuais (ES2016, ES2017, ...) |

#### 1.2 Utilizações no Front-end e Back-end

**No Front-end (navegador):**
- Manipulação do DOM (HTML e CSS em tempo real)
- Validação de formulários
- Animações e interatividade
- Requisições HTTP (AJAX, Fetch API)

**No Back-end (servidor):**
- APIs REST com **Node.js** e **Express**
- Acesso a bancos de dados
- Autenticação e segurança

> 💡 **JavaScript é a única linguagem que roda nativamente nos navegadores**, tornando-a indispensável para o desenvolvimento web moderno.

---

### 2. Tipos de Dados em JavaScript

#### 2.1 Tipos Primitivos

São os tipos mais básicos da linguagem. Cada variável armazena **um único valor simples**.

| Tipo | Descrição | Exemplo |
|------|-----------|---------|
| `string` | Texto entre aspas | `"Olá, mundo!"` |
| `number` | Número inteiro ou decimal | `42`, `3.14` |
| `boolean` | Verdadeiro ou falso | `true`, `false` |
| `null` | Ausência intencional de valor | `null` |
| `undefined` | Variável declarada sem valor | `undefined` |

**Exemplos no código:**

```javascript
let nome = "Maria";           // string
let idade = 25;               // number
let altura = 1.68;            // number (decimal)
let estudante = true;         // boolean
let endereco = null;          // null (sem valor definido)
let telefone;                 // undefined (não inicializado)
```

> 💡 Use `typeof` para verificar o tipo de um valor:
> ```javascript
> typeof "Olá"    // "string"
> typeof 42       // "number"
> typeof true     // "boolean"
> typeof null     // "object" ← comportamento histórico do JS, não um erro seu!
> ```

#### 2.2 Introdução a Tipos Complexos

Tipos complexos podem armazenar **múltiplos valores**.

**Objetos** — coleção de propriedades no formato `chave: valor`:

```javascript
let aluno = {
  nome: "Carlos",
  idade: 20,
  aprovado: true
};

console.log(aluno.nome); // "Carlos"
```

**Arrays** — lista ordenada de valores:

```javascript
let notas = [8.5, 7.0, 9.5, 6.0];

console.log(notas[0]); // 8.5 (índice começa em 0)
console.log(notas.length); // 4
```

> ⚠️ Objetos e Arrays serão explorados em profundidade nas próximas aulas.

---

### 3. Declaração de Variáveis

#### 3.1 `var`, `let` e `const`

JavaScript possui três palavras-chave para declarar variáveis:

| Palavra-chave | Escopo | Pode reatribuir? | Pode redeclarar? | Recomendado? |
|---------------|--------|-----------------|-----------------|--------------|
| `var` | Função | ✅ Sim | ✅ Sim | ❌ Evitar |
| `let` | Bloco | ✅ Sim | ❌ Não | ✅ Sim |
| `const` | Bloco | ❌ Não | ❌ Não | ✅ Sim |

**Exemplos práticos:**

```javascript
// var — comportamento antigo, evitar
var x = 10;
var x = 20; // ✅ permite redeclarar (problemático!)

// let — valor pode mudar
let pontuacao = 0;
pontuacao = 100; // ✅ reatribuição permitida

// const — valor fixo
const PI = 3.14159;
PI = 3; // ❌ TypeError: Assignment to constant variable
```

**Por que evitar `var`?**

```javascript
// var ignora o bloco {} — escopo de função
if (true) {
  var resultado = "visível fora do if!";
}
console.log(resultado); // "visível fora do if!"

// let respeita o bloco {}
if (true) {
  let valor = "só existe aqui";
}
console.log(valor); // ❌ ReferenceError
```

#### 3.2 Regras e Boas Práticas para Nomeação

**Regras obrigatórias:**
- Deve começar com letra, `_` ou `$`
- Não pode conter espaços
- Não pode usar palavras reservadas (`if`, `for`, `function`, etc.)
- Case-sensitive: `nome` ≠ `Nome` ≠ `NOME`

**Boas práticas:**

```javascript
// ✅ camelCase — padrão para variáveis e funções
let nomeCompleto = "Ana Silva";
let idadeDoUsuario = 30;

// ✅ UPPER_SNAKE_CASE — para constantes globais
const TAXA_DE_JUROS = 0.05;
const URL_BASE = "https://api.exemplo.com";

// ❌ Evitar nomes sem significado
let x = "Ana Silva";    // ruim
let d = 30;             // ruim
let abc = 0.05;         // ruim
```

---

### 4. Operadores Básicos

#### 4.1 Operadores Aritméticos

Usados para realizar cálculos matemáticos.

| Operador | Operação | Exemplo | Resultado |
|----------|----------|---------|-----------|
| `+` | Adição | `5 + 3` | `8` |
| `-` | Subtração | `10 - 4` | `6` |
| `*` | Multiplicação | `6 * 2` | `12` |
| `/` | Divisão | `15 / 3` | `5` |
| `%` | Módulo (resto) | `10 % 3` | `1` |

```javascript
let a = 10;
let b = 3;

console.log(a + b); // 13
console.log(a - b); // 7
console.log(a * b); // 30
console.log(a / b); // 3.3333...
console.log(a % b); // 1 (resto da divisão)
```

> 💡 O operador `+` com strings faz **concatenação**:
> ```javascript
> let saudacao = "Olá, " + "mundo!"; // "Olá, mundo!"
> let msg = "Nota: " + 10;           // "Nota: 10"
> ```

#### 4.2 Operadores Relacionais

Comparam dois valores e retornam `true` ou `false`.

| Operador | Significado | Exemplo | Resultado |
|----------|-------------|---------|-----------|
| `>` | Maior que | `5 > 3` | `true` |
| `<` | Menor que | `2 < 1` | `false` |
| `>=` | Maior ou igual | `5 >= 5` | `true` |
| `<=` | Menor ou igual | `3 <= 2` | `false` |
| `==` | Igual (valor) | `"5" == 5` | `true` |
| `===` | Igual (valor e tipo) | `"5" === 5` | `false` |
| `!=` | Diferente (valor) | `3 != 4` | `true` |

> ⚠️ **Prefira sempre `===` ao invés de `==`**. O `==` faz conversão de tipo automaticamente, o que pode gerar comportamentos inesperados:
> ```javascript
> 0 == false    // true  ← perigoso!
> 0 === false   // false ← correto
> ```

#### 4.3 Operadores Lógicos

Combinam expressões booleanas.

| Operador | Nome | Regra | Exemplo |
|----------|------|-------|---------|
| `&&` | E (AND) | Verdadeiro se **ambos** forem `true` | `true && false` → `false` |
| `\|\|` | OU (OR) | Verdadeiro se **ao menos um** for `true` | `true \|\| false` → `true` |
| `!` | NÃO (NOT) | Inverte o valor | `!true` → `false` |

```javascript
let idadeUsuario = 20;
let temCadastro = true;

// && — ambas as condições devem ser true
let podeAcessar = idadeUsuario >= 18 && temCadastro;
console.log(podeAcessar); // true

// || — ao menos uma condição deve ser true
let isAdmin = false;
let isModerador = true;
let temPermissao = isAdmin || isModerador;
console.log(temPermissao); // true

// ! — inverte o valor
console.log(!temCadastro); // false
```

---

## ✏️ Exercícios

### Nível 1 — Iniciante

**Exercício 1:** Declare três variáveis usando `const`, `let` e `var`, atribuindo seus dados pessoais (nome, idade, está estudando). Exiba os valores no console com `console.log`.

**Exercício 2:** Identifique o tipo de cada valor abaixo usando `typeof` e anote o resultado:
```javascript
typeof 100
typeof "JavaScript"
typeof false
typeof undefined
typeof null
```

---

### Nível 2 — Intermediário

**Exercício 3:** Crie um programa que calcule o **IMC** de uma pessoa.  
Fórmula: `IMC = peso / (altura * altura)`  
- Declare `peso` e `altura` como constantes
- Calcule o IMC e armazene em uma variável
- Exiba o resultado com `console.log`

**Exercício 4:** Declare duas variáveis numéricas e use **todos os operadores relacionais** (`>`, `<`, `>=`, `<=`, `===`, `!==`) para compará-las. Exiba cada resultado.

---

### Nível 3 — Avançado

**Exercício 5:** Crie variáveis para representar as condições de acesso a um sistema:
- `idade` (number)
- `ativo` (boolean)
- `nivelAcesso` (number: 1 = básico, 2 = admin)

Use operadores lógicos para verificar:
- Se o usuário pode ver conteúdo básico: `idade >= 18 && ativo`
- Se é administrador ativo: `nivelAcesso === 2 && ativo`
- Se deve ser bloqueado: `!ativo || idade < 18`

---

## 📝 O que será Avaliado

| Critério | Descrição |
|----------|-----------|
| **Compreensão** | Identificar corretamente os tipos de dados (`string`, `number`, `boolean`, `null`, `undefined`) e escolher a palavra-chave adequada (`var`, `let`, `const`) |
| **Aplicação** | Criar variáveis bem nomeadas e usar operadores para resolver os exercícios propostos |

---

## 🔗 Recursos Complementares

- 📖 [MDN Web Docs — JavaScript](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Guide)
- 📖 [MDN — Tipos de dados e estruturas](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Data_structures)
- 📖 [MDN — Expressões e operadores](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Guide/Expressions_and_operators)
- 🎮 [javascript.info — O tutorial moderno de JS](https://javascript.info/)
- ▶️ [Console do navegador](https://developer.chrome.com/docs/devtools/console/) — Pressione `F12` → aba *Console* para testar os exemplos

---

