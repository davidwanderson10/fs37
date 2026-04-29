# Aula 03 — Estruturas de Controle

## 🎯 Objetivos da Aula

Ao final desta aula, o aluno será capaz de:

- Utilizar `if`, `else` e `else if` para controlar o fluxo de um programa
- Aplicar `switch` para tratar múltiplas condições de forma organizada
- Usar o operador ternário como alternativa concisa ao `if/else`
- Combinar estruturas de controle dentro de funções para resolver problemas reais

---

## 📚 Conteúdo Programático

### 1. Estruturas Condicionais

Estruturas condicionais permitem que o programa **tome decisões** — executando blocos de código diferentes dependendo de uma condição.

---

#### 1.1 `if` e `else`

A estrutura mais fundamental do controle de fluxo.

**Sintaxe:**

```javascript
if (condição) {
  // executado se a condição for true
} else {
  // executado se a condição for false
}
```

**Exemplo:**

```javascript
let idade = Number(prompt("Qual a sua idade?"));

if (idade >= 18) {
  console.log("Acesso permitido.");
} else {
  console.log("Acesso negado. Você é menor de idade.");
}
```

> 💡 O bloco `else` é **opcional** — use apenas quando houver uma ação para o caso falso.

```javascript
let hora = 14;

if (hora < 12) {
  console.log("Bom dia!");
}
// Se hora >= 12, nada acontece — e está correto aqui
```

---

#### 1.2 `else if` — Múltiplas Condições em Cadeia

Usado quando há **mais de dois cenários possíveis**.

**Sintaxe:**

```javascript
if (condição1) {
  // ...
} else if (condição2) {
  // ...
} else if (condição3) {
  // ...
} else {
  // nenhuma das anteriores
}
```

**Exemplo — classificação de notas:**

```javascript
let nota = Number(prompt("Digite sua nota (0 a 10):"));

if (nota >= 9) {
  console.log("Conceito A — Excelente!");
} else if (nota >= 7) {
  console.log("Conceito B — Bom!");
} else if (nota >= 5) {
  console.log("Conceito C — Regular.");
} else {
  console.log("Reprovado.");
}
```

> ⚠️ O JavaScript avalia as condições **de cima para baixo** e para no primeiro `true` encontrado. A ordem importa!

**Exemplo — turno do dia:**

```javascript
let hora = Number(prompt("Que horas são? (0 a 23)"));

if (hora >= 6 && hora < 12) {
  console.log("Bom dia!");
} else if (hora >= 12 && hora < 18) {
  console.log("Boa tarde!");
} else if (hora >= 18 && hora < 24) {
  console.log("Boa noite!");
} else {
  console.log("Você está acordado de madrugada!");
}
```

---

#### 1.3 `switch` — Múltiplas Condições com Valor Fixo

O `switch` é ideal quando uma variável pode assumir **valores específicos e enumeráveis**. Mais legível que uma longa cadeia de `else if` nesses casos.

**Sintaxe:**

```javascript
switch (expressão) {
  case valor1:
    // código
    break;
  case valor2:
    // código
    break;
  default:
    // executado se nenhum case corresponder
}
```

> ⚠️ O `break` é essencial — sem ele, o JavaScript continua executando os cases seguintes (comportamento chamado de *fall-through*).

**Exemplo — dia da semana:**

```javascript
let dia = Number(prompt("Digite o número do dia (1 = Segunda, ..., 7 = Domingo):"));

switch (dia) {
  case 1:
    console.log("Segunda-feira");
    break;
  case 2:
    console.log("Terça-feira");
    break;
  case 3:
    console.log("Quarta-feira");
    break;
  case 4:
    console.log("Quinta-feira");
    break;
  case 5:
    console.log("Sexta-feira");
    break;
  case 6:
    console.log("Sábado");
    break;
  case 7:
    console.log("Domingo");
    break;
  default:
    console.log("Dia inválido. Digite um número entre 1 e 7.");
}
```

**Agrupando cases** — quando dois valores têm o mesmo comportamento:

```javascript
let dia = Number(prompt("Digite o número do dia:"));

switch (dia) {
  case 1:
  case 2:
  case 3:
  case 4:
  case 5:
    console.log("Dia útil — bora trabalhar!");
    break;
  case 6:
  case 7:
    console.log("Final de semana!");
    break;
  default:
    console.log("Dia inválido.");
}
```

---

#### `if/else` vs `switch` — Quando usar cada um?

| Situação | Recomendado |
|----------|-------------|
| Condições com intervalos (`>`, `<`, `>=`) | `if / else if` |
| Condições com valores exatos e enumeráveis | `switch` |
| Muitos `else if` com o mesmo valor | `switch` (mais legível) |
| Apenas duas possibilidades | `if / else` |

---

### 2. Operador Ternário

O operador ternário é uma forma **compacta** de escrever um `if/else` simples em uma única linha.

**Sintaxe:**

```javascript
condição ? valorSeVerdadeiro : valorSeFalso
```

**Comparação direta:**

```javascript
// Com if/else
let acesso;
if (idade >= 18) {
  acesso = "Permitido";
} else {
  acesso = "Negado";
}

// Com operador ternário — equivalente, em uma linha
let acesso = idade >= 18 ? "Permitido" : "Negado";
```

**Exemplos de uso:**

```javascript
// Atribuição de valor
let hora = 9;
let saudacao = hora < 12 ? "Bom dia!" : "Boa tarde!";
console.log(saudacao); // "Bom dia!"

// Diretamente no console.log
let pontos = 750;
console.log("Status: " + (pontos >= 1000 ? "Ouro" : "Prata"));

// Verificação com prompt
let senha = prompt("Digite a senha:");
let mensagem = senha === "1234" ? "Bem-vindo!" : "Senha incorreta.";
console.log(mensagem);
```

**Ternários aninhados** — possível, mas use com moderação:

```javascript
let nota = 8;

let conceito = nota >= 9 ? "A"
             : nota >= 7 ? "B"
             : nota >= 5 ? "C"
             : "D";

console.log(conceito); // "B"
```

> ⚠️ Ternários aninhados prejudicam a leitura. Se a lógica for complexa, prefira `if/else if`.

---

### 3. Estruturas de Controle em Funções

Combinar funções com estruturas de controle é onde o JavaScript começa a resolver **problemas reais**.

**Exemplo 1 — função que classifica a nota:**

```javascript
function classificarNota(nota) {
  if (nota >= 9) {
    return "Excelente";
  } else if (nota >= 7) {
    return "Bom";
  } else if (nota >= 5) {
    return "Regular";
  } else {
    return "Insuficiente";
  }
}

let minhaJNota = Number(prompt("Digite sua nota:"));
console.log("Resultado: " + classificarNota(minhaJNota));
```

**Exemplo 2 — função com switch:**

```javascript
function descricaoDia(numeroDia) {
  switch (numeroDia) {
    case 1: case 2: case 3: case 4: case 5:
      return "Dia útil";
    case 6: case 7:
      return "Final de semana";
    default:
      return "Dia inválido";
  }
}

console.log(descricaoDia(3)); // "Dia útil"
console.log(descricaoDia(6)); // "Final de semana"
```

**Exemplo 3 — função com ternário:**

```javascript
function verificarMaioridade(idade) {
  return idade >= 18 ? "Maior de idade" : "Menor de idade";
}

let idade = Number(prompt("Qual a sua idade?"));
console.log(verificarMaioridade(idade));
```

**Exemplo completo — calculadora de IMC com classificação:**

```javascript
function calcularIMC(peso, altura) {
  let imc = peso / (altura * altura);
  let classificacao;

  if (imc < 18.5) {
    classificacao = "Abaixo do peso";
  } else if (imc < 25) {
    classificacao = "Peso normal";
  } else if (imc < 30) {
    classificacao = "Sobrepeso";
  } else {
    classificacao = "Obesidade";
  }

  return "IMC: " + imc.toFixed(2) + " — " + classificacao;
}

let peso = Number(prompt("Seu peso (kg):"));
let altura = Number(prompt("Sua altura (m):"));
console.log(calcularIMC(peso, altura));
```

---

## ✏️ Exercícios

### Nível 1 — Iniciante

**Exercício 1:** Peça ao usuário um número com `prompt`. Use `if/else` para exibir se o número é **positivo**, **negativo** ou **zero**.

**Exercício 2:** Peça a temperatura em graus Celsius. Use `if/else if` para classificar:
- Abaixo de 15°C → "Frio"
- Entre 15°C e 25°C → "Agradável"
- Acima de 25°C → "Quente"

---

### Nível 2 — Intermediário

**Exercício 3:** Crie uma função `calcularDesconto(preco, tipocliente)` que use `switch` para aplicar descontos:
- `"vip"` → 30% de desconto
- `"comum"` → 10% de desconto
- `"novo"` → 15% de desconto
- Qualquer outro → sem desconto

Exiba o preço final com `console.log`.

**Exercício 4:** Reescreva o exercício 1 usando **operador ternário** no lugar do `if/else`.

---

### Nível 3 — Avançado

**Exercício 5:** Crie uma função `calcularFrete(distancia, tipoProduto)` que determine o valor do frete com base em duas condições combinadas:

- Se `distancia <= 50`:
  - Produto "fragil" → R$ 25,00
  - Outros → R$ 10,00
- Se `distancia > 50 && distancia <= 200`:
  - Produto "fragil" → R$ 60,00
  - Outros → R$ 30,00
- Se `distancia > 200`:
  - Produto "fragil" → R$ 120,00
  - Outros → R$ 70,00

Teste a função com ao menos 3 combinações diferentes.

---

## 📝 O que será Avaliado

| Critério | Descrição |
|----------|-----------|
| **Compreensão** | Identificar quando usar `if/else`, `switch` ou ternário para cada situação |
| **Aplicação** | Criar funções que usam estruturas de controle para resolver os exercícios propostos |

---

## 🔗 Recursos Complementares

- 📖 [MDN — if...else](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Statements/if...else)
- 📖 [MDN — switch](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Statements/switch)
- 📖 [MDN — Operador Condicional (ternário)](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Operators/Conditional_operator)
- 🎮 [javascript.info — Condicionais](https://javascript.info/ifelse)

---

