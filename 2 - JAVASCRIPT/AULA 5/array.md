# Aula 05 — Arrays


---

## Objetivos de Aprendizagem

- Criar e acessar elementos de arrays em JavaScript
- Utilizar métodos básicos: `push`, `pop`, `shift`, `unshift`, `splice`, `slice`
- Utilizar métodos avançados: `map`, `filter`, `reduce`, `forEach`, `find`, `some`, `every`
- Ordenar e buscar elementos com `sort`, `indexOf` e `includes`
- Iterar sobre arrays usando loops e combinação de métodos

---

## 1. Introdução a Arrays

Um **array** é uma estrutura de dados usada para armazenar múltiplos valores em uma única variável. Em JavaScript, arrays podem conter qualquer tipo de dado — números, strings, objetos, até outros arrays.

### 1.1 Criando Arrays

```js
// Array literal (forma mais comum)
const frutas = ["maçã", "banana", "laranja"];

// Array vazio
const vazio = [];

// Array com tipos mistos
const misto = [42, "texto", true, null];

// Usando o construtor Array (menos comum)
const numeros = new Array(1, 2, 3);
```

### 1.2 Acessando Elementos

Os índices em JavaScript começam em **0**.

```js
const frutas = ["maçã", "banana", "laranja"];

console.log(frutas[0]); // "maçã"
console.log(frutas[1]); // "banana"
console.log(frutas[2]); // "laranja"

// Acessando o último elemento
console.log(frutas[frutas.length - 1]); // "laranja"
```

### 1.3 Propriedade `length`

```js
const frutas = ["maçã", "banana", "laranja"];
console.log(frutas.length); // 3
```

---

## 2. Métodos Básicos de Arrays

### 2.1 `push` e `pop`

`push` adiciona elementos ao **final**. `pop` remove e retorna o último elemento.

```js
const frutas = ["maçã", "banana"];

frutas.push("laranja");
console.log(frutas); // ["maçã", "banana", "laranja"]

const removida = frutas.pop();
console.log(removida); // "laranja"
console.log(frutas);   // ["maçã", "banana"]
```

### 2.2 `shift` e `unshift`

`shift` remove o **primeiro** elemento. `unshift` adiciona ao **início**.

```js
const frutas = ["maçã", "banana"];

frutas.unshift("uva");
console.log(frutas); // ["uva", "maçã", "banana"]

const removida = frutas.shift();
console.log(removida); // "uva"
console.log(frutas);   // ["maçã", "banana"]
```

### 2.3 `splice`

Remove, substitui ou insere elementos em qualquer posição.

```js
const frutas = ["maçã", "banana", "laranja", "uva"];

// Remover 1 elemento a partir do índice 1
frutas.splice(1, 1);
console.log(frutas); // ["maçã", "laranja", "uva"]

// Inserir sem remover
frutas.splice(1, 0, "manga");
console.log(frutas); // ["maçã", "manga", "laranja", "uva"]

// Substituir
frutas.splice(2, 1, "kiwi");
console.log(frutas); // ["maçã", "manga", "kiwi", "uva"]
```

### 2.4 `slice`

Retorna uma **cópia parcial** do array (não modifica o original).

```js
const frutas = ["maçã", "banana", "laranja", "uva", "manga"];

const selecionadas = frutas.slice(1, 3);
console.log(selecionadas); // ["banana", "laranja"]
console.log(frutas);        // array original intacto

// Sem segundo argumento: até o final
console.log(frutas.slice(2)); // ["laranja", "uva", "manga"]

// Índice negativo: conta do final
console.log(frutas.slice(-2)); // ["uva", "manga"]
```

---

## 3. Métodos Avançados de Arrays

### 3.1 `forEach`

Executa uma função para **cada elemento**. Não retorna nada.

```js
const numeros = [1, 2, 3, 4, 5];

numeros.forEach(function(numero) {
  console.log(numero * 2);
});

// Com arrow function
numeros.forEach(numero => console.log(numero * 2));
```

### 3.2 `map`

Cria um **novo array** transformando cada elemento.

```js
const numeros = [1, 2, 3, 4, 5];

const dobrados = numeros.map(numero => numero * 2);
console.log(dobrados); // [2, 4, 6, 8, 10]
console.log(numeros);  // [1, 2, 3, 4, 5] — original intacto

// Exemplo prático: formatar nomes
const nomes = ["alice", "bob", "carol"];
const formatados = nomes.map(nome => nome.charAt(0).toUpperCase() + nome.slice(1));
console.log(formatados); // ["Alice", "Bob", "Carol"]
```

### 3.3 `filter`

Cria um **novo array** com elementos que passam em um teste.

```js
const numeros = [1, 2, 3, 4, 5, 6, 7, 8];

const pares = numeros.filter(numero => numero % 2 === 0);
console.log(pares); // [2, 4, 6, 8]

// Exemplo prático: filtrar produtos por preço
const produtos = [
  { nome: "Caderno", preco: 15 },
  { nome: "Caneta", preco: 3 },
  { nome: "Mochila", preco: 120 },
  { nome: "Borracha", preco: 2 },
];

const baratos = produtos.filter(produto => produto.preco < 20);
console.log(baratos);
// [{ nome: "Caderno", preco: 15 }, { nome: "Caneta", preco: 3 }, { nome: "Borracha", preco: 2 }]
```

### 3.4 `reduce`

Reduz o array a um **único valor** acumulado.

```js
const numeros = [1, 2, 3, 4, 5];

const soma = numeros.reduce((acumulador, numero) => acumulador + numero, 0);
console.log(soma); // 15

// Exemplo: produto total de um carrinho
const carrinho = [
  { nome: "Camisa", preco: 50, quantidade: 2 },
  { nome: "Calça", preco: 120, quantidade: 1 },
  { nome: "Tênis", preco: 200, quantidade: 1 },
];

const total = carrinho.reduce((acc, item) => acc + item.preco * item.quantidade, 0);
console.log(`Total: R$ ${total}`); // Total: R$ 420
```

### 3.5 `find`

Retorna o **primeiro elemento** que satisfaz a condição (ou `undefined`).

```js
const usuarios = [
  { id: 1, nome: "Ana" },
  { id: 2, nome: "Bruno" },
  { id: 3, nome: "Carlos" },
];

const usuario = usuarios.find(u => u.id === 2);
console.log(usuario); // { id: 2, nome: "Bruno" }
```

### 3.6 `some` e `every`

`some` retorna `true` se **pelo menos um** elemento satisfaz a condição.  
`every` retorna `true` se **todos** os elementos satisfazem a condição.

```js
const numeros = [1, 3, 5, 7, 8];

console.log(numeros.some(n => n % 2 === 0));  // true  (8 é par)
console.log(numeros.every(n => n % 2 === 0)); // false (nem todos são pares)

// Verificar se todos os alunos foram aprovados (nota >= 7)
const notas = [8, 9, 7, 10, 6];
const todosAprovados = notas.every(nota => nota >= 7);
console.log(todosAprovados); // false (nota 6 reprova)
```

---

## 4. Manipulação de Arrays

### 4.1 Ordenação com `sort`

Por padrão, `sort` ordena como **strings**. Para números, use uma função de comparação.

```js
// Strings — funciona diretamente
const frutas = ["banana", "maçã", "laranja"];
frutas.sort();
console.log(frutas); // ["banana", "laranja", "maçã"]

// Números — requer função de comparação
const numeros = [10, 1, 5, 3, 8];

numeros.sort((a, b) => a - b); // crescente
console.log(numeros); // [1, 3, 5, 8, 10]

numeros.sort((a, b) => b - a); // decrescente
console.log(numeros); // [10, 8, 5, 3, 1]
```

### 4.2 `indexOf` e `includes`

```js
const frutas = ["maçã", "banana", "laranja"];

// indexOf: retorna o índice ou -1 se não encontrar
console.log(frutas.indexOf("banana"));  // 1
console.log(frutas.indexOf("uva"));     // -1

// includes: retorna true ou false
console.log(frutas.includes("laranja")); // true
console.log(frutas.includes("manga"));  // false
```

---

## 5. Iteração em Arrays

### 5.1 Loop `for` clássico

```js
const numeros = [10, 20, 30, 40, 50];

for (let i = 0; i < numeros.length; i++) {
  console.log(`Índice ${i}: ${numeros[i]}`);
}
```

### 5.2 Loop `for...of`

Mais legível para iterar valores sem precisar do índice.

```js
const frutas = ["maçã", "banana", "laranja"];

for (const fruta of frutas) {
  console.log(fruta);
}
```

### 5.3 Combinando Métodos (encadeamento)

```js
const alunos = [
  { nome: "Ana", nota: 9 },
  { nome: "Bruno", nota: 5 },
  { nome: "Carlos", nota: 8 },
  { nome: "Diana", nota: 4 },
  { nome: "Eduardo", nota: 7 },
];

// Nomes dos alunos aprovados (nota >= 7), em ordem alfabética
const aprovados = alunos
  .filter(aluno => aluno.nota >= 7)
  .map(aluno => aluno.nome)
  .sort();

console.log(aprovados); // ["Ana", "Carlos", "Eduardo"]

// Média das notas
const media = alunos
  .map(aluno => aluno.nota)
  .reduce((acc, nota) => acc + nota, 0) / alunos.length;

console.log(`Média da turma: ${media}`); // Média da turma: 6.6
```

---

## Exercícios

### Iniciante

**1.** Crie um array com 5 cidades brasileiras. Em seguida:
- Adicione uma nova cidade ao final usando `push`.
- Remova a primeira cidade com `shift`.
- Exiba o array final e seu tamanho.

**2.** Dado o array `[3, 7, 1, 9, 4, 6, 2, 8, 5]`:
- Ordene-o em ordem crescente.
- Verifique se o número `6` está presente com `includes`.
- Encontre o índice do número `9` com `indexOf`.

---

### Intermediário

**3.** Dado o array abaixo, use `filter` e `map` para criar um novo array com os **nomes em maiúsculo** apenas dos produtos com preço **maior que R$ 50**:

```js
const produtos = [
  { nome: "mochila", preco: 120 },
  { nome: "caneta", preco: 5 },
  { nome: "notebook", preco: 3500 },
  { nome: "borracha", preco: 2 },
  { nome: "headset", preco: 250 },
];
```

**4.** Use `reduce` para calcular o **valor total** dos produtos cujo preço é menor ou igual a R$ 200 no array acima.

---

### Avançado

**5.** Dado o array de transações abaixo:
- Calcule o **saldo final** (entradas - saídas).
- Liste apenas as transações do tipo `"saída"`, ordenadas pelo valor (maior para menor).
- Verifique se **todas** as transações possuem um `descricao` não vazio.

```js
const transacoes = [
  { descricao: "Salário", tipo: "entrada", valor: 3000 },
  { descricao: "Aluguel", tipo: "saída", valor: 900 },
  { descricao: "Freelance", tipo: "entrada", valor: 800 },
  { descricao: "Supermercado", tipo: "saída", valor: 350 },
  { descricao: "Academia", tipo: "saída", valor: 100 },
  { descricao: "Curso online", tipo: "saída", valor: 200 },
];
```

---

## Critérios de Avaliação

| Critério                                      | Peso |
|-----------------------------------------------|------|
| Criação e acesso correto a arrays             | 20%  |
| Uso adequado dos métodos básicos              | 20%  |
| Aplicação de `map`, `filter` e `reduce`       | 30%  |
| Encadeamento e combinação de métodos          | 20%  |
| Legibilidade e organização do código          | 10%  |

---

## Recursos Complementares

- [MDN — Array](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array)
- [MDN — Métodos de Arrays](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array#métodos_de_instância)
- [javascript.info — Arrays](https://javascript.info/array)
- [javascript.info — Métodos de Arrays](https://javascript.info/array-methods)
