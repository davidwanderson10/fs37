# Aula 03 — Funções em JavaScript

## 🎯 Objetivos da Aula

Ao final desta aula, o aluno será capaz de:

- Criar e invocar funções para modularizar o código
- Utilizar parâmetros, argumentos e retorno de valores com `return`
- Diferenciar funções declaradas, anônimas e arrow functions
- Compreender a diferença entre escopo global e local

---

## 📚 Conteúdo Programático

### 1. Introdução às Funções

#### 1.1 O que são funções e por que usá-las?

Uma função é um **bloco de código reutilizável** que executa uma tarefa específica. Em vez de repetir o mesmo código várias vezes, você o escreve uma vez dentro de uma função e o chama quando precisar.

**Sem funções — código repetido:**

```javascript
// Calcular desconto para produto 1
let preco1 = 100;
let desconto1 = preco1 * 0.1;
let final1 = preco1 - desconto1;
console.log(final1); // 90

// Calcular desconto para produto 2
let preco2 = 250;
let desconto2 = preco2 * 0.1;
let final2 = preco2 - desconto2;
console.log(final2); // 225
```

**Com função — código reutilizável:**

```javascript
function aplicarDesconto(preco) {
  let desconto = preco * 0.1;
  return preco - desconto;
}

console.log(aplicarDesconto(100)); // 90
console.log(aplicarDesconto(250)); // 225
console.log(aplicarDesconto(400)); // 360
```

> 💡 Funções seguem o princípio **DRY** — *Don't Repeat Yourself* (Não se repita). Se você está copiando e colando código, provavelmente precisa de uma função.

---

#### 1.2 Tipos de Funções em JavaScript

JavaScript oferece três formas principais de declarar funções:

---

**Função Declarada** (*Function Declaration*)

```javascript
function somar(a, b) {
  return a + b;
}

console.log(somar(3, 5)); // 8
```

- Sintaxe mais tradicional e legível
- Pode ser chamada **antes** de ser declarada no código (*hoisting*)

---

**Função Anônima** (*Function Expression*)

```javascript
const somar = function(a, b) {
  return a + b;
};

console.log(somar(3, 5)); // 8
```

- A função é atribuída a uma variável
- **Não** pode ser chamada antes de ser declarada
- Útil para passar funções como argumento

---

**Arrow Function** (*Função de Seta* — ES6+)

```javascript
const somar = (a, b) => {
  return a + b;
};

// Se o retorno for uma única expressão, pode simplificar:
const somar = (a, b) => a + b;

console.log(somar(3, 5)); // 8
```

- Sintaxe mais curta e moderna
- Muito usada no JavaScript atual
- Se tiver apenas **um parâmetro**, os parênteses são opcionais:

```javascript
const dobrar = n => n * 2;
console.log(dobrar(6)); // 12
```

---

**Comparação lado a lado:**

```javascript
// As três formas abaixo fazem exatamente a mesma coisa

// Declarada
function quadrado(n) {
  return n * n;
}

// Anônima
const quadrado = function(n) {
  return n * n;
};

// Arrow function
const quadrado = n => n * n;

console.log(quadrado(4)); // 16
```

| Tipo | Hoisting | Sintaxe | Uso comum |
|------|----------|---------|-----------|
| Declarada | ✅ Sim | Verbosa | Funções principais do programa |
| Anônima | ❌ Não | Média | Callbacks, atribuições |
| Arrow | ❌ Não | Concisa | Callbacks, arrays, código moderno |

---

### 2. Trabalhando com Funções

#### 2.1 Parâmetros e Argumentos

- **Parâmetro** → variável definida na declaração da função
- **Argumento** → valor passado na chamada da função

```javascript
//              parâmetros
function saudacao(nome, periodo) {
  console.log("Bom " + periodo + ", " + nome + "!");
}

//         argumentos
saudacao("Ana", "dia");    // "Bom dia, Ana!"
saudacao("Carlos", "tarde"); // "Boa tarde, Carlos!"
```

**Parâmetros com valor padrão** (ES6+):

```javascript
function saudacao(nome, periodo = "dia") {
  console.log("Bom " + periodo + ", " + nome + "!");
}

saudacao("Ana");          // "Bom dia, Ana!"  (usa o padrão)
saudacao("Ana", "noite"); // "Bom noite, Ana!" (substitui o padrão)
```

**O que acontece se passar argumentos a mais ou a menos:**

```javascript
function somar(a, b) {
  return a + b;
}

console.log(somar(2, 3));       // 5
console.log(somar(2));          // NaN  (b é undefined)
console.log(somar(2, 3, 100));  // 5   (100 é ignorado)
```

---

#### 2.2 Retorno de Valores com `return`

O `return` encerra a função e **devolve um valor** para quem a chamou.

```javascript
function calcularArea(base, altura) {
  let area = base * altura;
  return area;
}

let resultado = calcularArea(5, 3);
console.log(resultado); // 15
```

> ⚠️ Tudo após o `return` é **ignorado**. O código para ali:

```javascript
function teste() {
  return "Fim";
  console.log("Isso nunca será executado"); // código morto
}
```

**Função sem `return`** devolve `undefined`:

```javascript
function semRetorno() {
  let x = 10;
}

let valor = semRetorno();
console.log(valor); // undefined
```

**`return` para saída antecipada** (guard clause):

```javascript
function dividir(a, b) {
  if (b === 0) {
    return "Erro: divisão por zero!";
  }
  return a / b;
}

console.log(dividir(10, 2)); // 5
console.log(dividir(10, 0)); // "Erro: divisão por zero!"
```

---

### 3. Escopo de Variáveis

Escopo define **onde** uma variável pode ser acessada no código.

---

#### 3.1 Escopo Global

Variável declarada **fora** de qualquer função — acessível em qualquer lugar do código.

```javascript
let mensagem = "Olá, mundo!"; // escopo global

function exibir() {
  console.log(mensagem); // ✅ acessa a variável global
}

exibir();                   // "Olá, mundo!"
console.log(mensagem);      // "Olá, mundo!"
```

---

#### 3.2 Escopo Local (de Função)

Variável declarada **dentro** de uma função — existe apenas dentro dela.

```javascript
function calcular() {
  let resultado = 42; // escopo local
  console.log(resultado); // ✅ funciona aqui dentro
}

calcular();
console.log(resultado); // ❌ ReferenceError: resultado is not defined
```

---

#### 3.3 Variáveis com o Mesmo Nome

Uma variável local **não afeta** a variável global de mesmo nome:

```javascript
let cor = "azul"; // global

function pintar() {
  let cor = "vermelho"; // local — variável diferente!
  console.log(cor);     // "vermelho"
}

pintar();
console.log(cor); // "azul" — global continua intacta
```

---

#### 3.4 Boas Práticas de Escopo

```javascript
// ❌ Evitar — variável global desnecessária
let total = 0;

function somar(a, b) {
  total = a + b; // modifica variável global
}

somar(3, 4);
console.log(total); // 7 — funciona, mas é frágil


// ✅ Correto — usar return ao invés de variável global
function somar(a, b) {
  return a + b; // resultado encapsulado na função
}

let total = somar(3, 4);
console.log(total); // 7
```

| Prática | Por quê? |
|---------|----------|
| Prefira variáveis locais | Evitam conflitos e efeitos colaterais |
| Use `return` para devolver resultados | Mais previsível e testável |
| Evite modificar variáveis globais dentro de funções | Dificulta depuração |
| Use `const` para funções anônimas e arrows | Evita reatribuição acidental |

---

### 4. Prática com Funções

#### 4.1 Funções para Cálculos Simples

```javascript
// Soma
function somar(a, b) {
  return a + b;
}

// Subtração
function subtrair(a, b) {
  return a - b;
}

// Média de três notas
function calcularMedia(n1, n2, n3) {
  return (n1 + n2 + n3) / 3;
}

// Potência
const potencia = (base, expoente) => base ** expoente;

console.log(somar(10, 5));           // 15
console.log(subtrair(10, 5));        // 5
console.log(calcularMedia(8, 7, 9)); // 8
console.log(potencia(2, 10));        // 1024
```

---

#### 4.2 Funções para Manipulação de Números

```javascript
// Verificar par ou ímpar
function parOuImpar(numero) {
  return numero % 2 === 0 ? "Par" : "Ímpar";
}

// Verificar se é positivo, negativo ou zero
function classificarNumero(n) {
  if (n > 0) return "Positivo";
  if (n < 0) return "Negativo";
  return "Zero";
}

// Calcular porcentagem
const calcularPorcentagem = (valor, porcentagem) => (valor * porcentagem) / 100;

console.log(parOuImpar(8));              // "Par"
console.log(parOuImpar(7));              // "Ímpar"
console.log(classificarNumero(-5));      // "Negativo"
console.log(calcularPorcentagem(200, 15)); // 30
```

---

#### 4.3 Funções para Manipulação de Strings

```javascript
// Contar caracteres (sem contar espaços)
function contarCaracteres(texto) {
  return texto.replace(/\s/g, "").length;
}

// Deixar a primeira letra maiúscula
function capitalizar(texto) {
  return texto.charAt(0).toUpperCase() + texto.slice(1).toLowerCase();
}

// Verificar se uma palavra está contida no texto
function contemPalavra(texto, palavra) {
  return texto.toLowerCase().includes(palavra.toLowerCase());
}

// Inverter uma string
const inverter = texto => texto.split("").reverse().join("");

console.log(contarCaracteres("Olá, mundo!"));    // 9
console.log(capitalizar("jAVASCRIPT"));           // "Javascript"
console.log(contemPalavra("Eu amo JavaScript", "javascript")); // true
console.log(inverter("abcd"));                    // "dcba"
```

---

#### 4.4 Exemplo Completo — Mini Sistema de Avaliação

```javascript
function calcularMedia(n1, n2, n3) {
  return (n1 + n2 + n3) / 3;
}

function situacaoAluno(media) {
  if (media >= 7) return "Aprovado";
  if (media >= 5) return "Recuperação";
  return "Reprovado";
}

function relatorioAluno(nome, n1, n2, n3) {
  let media = calcularMedia(n1, n2, n3);
  let situacao = situacaoAluno(media);

  return nome + " | Média: " + media.toFixed(1) + " | " + situacao;
}

console.log(relatorioAluno("Ana", 8, 9, 7));    // Ana | Média: 8.0 | Aprovado
console.log(relatorioAluno("Bruno", 5, 6, 4));  // Bruno | Média: 5.0 | Recuperação
console.log(relatorioAluno("Clara", 3, 4, 2));  // Clara | Média: 3.0 | Reprovado
```

> 💡 Perceba como cada função faz **uma única coisa** — calcular média, classificar, formatar. Isso facilita a leitura, o teste e a manutenção do código.

---

## ✏️ Exercícios

### Nível 1 — Iniciante

**Exercício 1:** Crie uma função `saudacao(nome)` que receba um nome e exiba `"Olá, [nome]! Bem-vindo ao curso de JavaScript."` no console.

**Exercício 2:** Crie uma função `calcularPerimetro(lado)` que receba o lado de um quadrado e retorne seu perímetro (`lado * 4`). Exiba o resultado com `console.log`.

**Exercício 3:** Reescreva a função do exercício 2 como **arrow function**.

---

### Nível 2 — Intermediário

**Exercício 4:** Crie uma função `converterTemperatura(celsius)` que converta graus Celsius para Fahrenheit.  
Fórmula: `F = (C × 9/5) + 32`

**Exercício 5:** Crie uma função `maiorNumero(a, b, c)` que receba três números e retorne o maior deles. Use `if/else` — **sem** usar `Math.max()`.

**Exercício 6:** Crie uma função `calcularTroco(valorProduto, valorPago)` que:
- Retorne o troco se `valorPago >= valorProduto`
- Retorne `"Valor insuficiente"` caso contrário

---

### Nível 3 — Avançado

**Exercício 7:** Crie uma função `validarSenha(senha)` que retorne:
- `"Senha forte"` se tiver 8 ou mais caracteres
- `"Senha média"` se tiver entre 5 e 7 caracteres
- `"Senha fraca"` se tiver menos de 5 caracteres

Use `senha.length` para verificar o tamanho.

**Exercício 8:** Crie três funções separadas e uma função principal que as combine:
- `dobrar(n)` → retorna o dobro de n
- `somarCinco(n)` → retorna n + 5
- `ehPositivo(n)` → retorna `true` ou `false`
- `processar(n)` → dobra o número, soma cinco e exibe se o resultado é positivo

---

## 📝 O que será Avaliado

| Critério | Descrição |
|----------|-----------|
| **Compreensão** | Diferenciar os tipos de função e entender o conceito de escopo local vs global |
| **Aplicação** | Criar funções com parâmetros e `return` para resolver os exercícios propostos |

---

## 🔗 Recursos Complementares

- 📖 [MDN — Funções](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Guide/Functions)
- 📖 [MDN — Arrow Functions](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Functions/Arrow_functions)
- 📖 [MDN — Escopo](https://developer.mozilla.org/pt-BR/docs/Glossary/Scope)
- 🎮 [javascript.info — Funções](https://javascript.info/function-basics)
- 🎮 [javascript.info — Arrow Functions](https://javascript.info/arrow-functions-basics)

---

> **Próxima aula:** Estruturas de Controle — `if/else`, `switch` e operador ternário