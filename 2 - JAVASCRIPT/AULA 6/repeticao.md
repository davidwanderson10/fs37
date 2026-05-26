# Aula 6: Estruturas de Repetição em JavaScript

## Objetivos da Aula

Ao final desta aula, o aluno será capaz de:

- Compreender o conceito de repetição em programação.
- Utilizar as estruturas de repetição `for`, `while` e `do...while`.
- Identificar as diferenças e aplicações de cada tipo de loop.
- Controlar a execução dos loops utilizando `break` e `continue`.
- Desenvolver soluções para problemas simples utilizando estruturas de repetição.

---

# 1. Introdução aos Loops

Em programação, muitas vezes precisamos executar uma mesma ação várias vezes.

Imagine que precisamos exibir os números de 1 a 10 na tela.

Sem loops:

```javascript
console.log(1);
console.log(2);
console.log(3);
console.log(4);
console.log(5);
console.log(6);
console.log(7);
console.log(8);
console.log(9);
console.log(10);
```

Apesar de funcionar, essa solução é repetitiva e pouco eficiente.

Com estruturas de repetição podemos automatizar esse processo:

```javascript
for(let i = 1; i <= 10; i++) {
    console.log(i);
}
```

Resultado:

```text
1
2
3
4
5
6
7
8
9
10
```

---

# 2. Estrutura de Repetição FOR

O loop `for` é utilizado quando sabemos previamente quantas vezes uma repetição deverá acontecer.

## Sintaxe

```javascript
for(inicialização; condição; incremento) {
    // código executado repetidamente
}
```

### Componentes

- **Inicialização:** executada apenas uma vez.
- **Condição:** define se o loop continua.
- **Incremento:** executado ao final de cada repetição.

---

## Exemplo 1: Contando de 1 a 5

```javascript
for(let i = 1; i <= 5; i++) {
    console.log(i);
}
```

### Funcionamento

| Iteração | Valor de i |
|-----------|------------|
| 1 | 1 |
| 2 | 2 |
| 3 | 3 |
| 4 | 4 |
| 5 | 5 |

---

## Exemplo 2: Contagem regressiva

```javascript
for(let i = 10; i >= 1; i--) {
    console.log(i);
}
```

Saída:

```text
10
9
8
7
6
5
4
3
2
1
```

---

## Exemplo 3: Exibir números pares

```javascript
for(let i = 0; i <= 20; i += 2) {
    console.log(i);
}
```

Saída:

```text
0
2
4
6
8
10
12
14
16
18
20
```

---

# 3. Estrutura de Repetição WHILE

O loop `while` é utilizado quando não sabemos exatamente quantas vezes a repetição acontecerá.

A repetição continua enquanto a condição for verdadeira.

## Sintaxe

```javascript
while(condição) {
    // código
}
```

---

## Exemplo 1

```javascript
let contador = 1;

while(contador <= 5) {
    console.log(contador);
    contador++;
}
```

Saída:

```text
1
2
3
4
5
```

---

## Exemplo 2: Somando números

```javascript
let numero = 1;
let soma = 0;

while(numero <= 10) {
    soma += numero;
    numero++;
}

console.log(soma);
```

Resultado:

```text
55
```

---

## Atenção: Loop Infinito

Observe o código abaixo:

```javascript
let contador = 1;

while(contador <= 5) {
    console.log(contador);
}
```

Problema:

O valor de `contador` nunca muda, portanto a condição sempre será verdadeira.

Isso gera um **loop infinito**.

Correção:

```javascript
let contador = 1;

while(contador <= 5) {
    console.log(contador);
    contador++;
}
```

---

# 4. Estrutura de Repetição DO...WHILE

O `do...while` é semelhante ao `while`, porém executa o bloco pelo menos uma vez antes de verificar a condição.

## Sintaxe

```javascript
do {
    // código
} while(condição);
```

---

## Exemplo 1

```javascript
let numero = 1;

do {
    console.log(numero);
    numero++;
} while(numero <= 5);
```

Saída:

```text
1
2
3
4
5
```

---

## Diferença entre while e do...while

### While

```javascript
let numero = 10;

while(numero < 5) {
    console.log(numero);
}
```

Saída:

```text
(nada será exibido)
```

---

### Do...While

```javascript
let numero = 10;

do {
    console.log(numero);
} while(numero < 5);
```

Saída:

```text
10
```

O bloco foi executado uma vez antes da verificação.

---

# 5. Comparação entre FOR, WHILE e DO...WHILE

| Estrutura | Quando utilizar |
|------------|----------------|
| for | Quando sabemos quantas repetições serão necessárias |
| while | Quando a repetição depende de uma condição |
| do...while | Quando o bloco precisa executar pelo menos uma vez |

---

# 6. Controle de Fluxo com BREAK

A instrução `break` encerra imediatamente a execução do loop.

## Exemplo

```javascript
for(let i = 1; i <= 10; i++) {

    if(i === 5) {
        break;
    }

    console.log(i);
}
```

Saída:

```text
1
2
3
4
```

Quando o valor chega a 5, o loop é interrompido.

---

## Exemplo Prático

Parar ao encontrar um valor específico:

```javascript
let numeros = [10, 20, 30, 40, 50];

for(let i = 0; i < numeros.length; i++) {

    if(numeros[i] === 30) {
        console.log("Valor encontrado!");
        break;
    }

}
```

---

# 7. Controle de Fluxo com CONTINUE

A instrução `continue` interrompe apenas a iteração atual e passa para a próxima.

## Exemplo

```javascript
for(let i = 1; i <= 5; i++) {

    if(i === 3) {
        continue;
    }

    console.log(i);
}
```

Saída:

```text
1
2
4
5
```

O número 3 foi ignorado.

---

## Exemplo: Mostrar apenas números ímpares

```javascript
for(let i = 1; i <= 10; i++) {

    if(i % 2 === 0) {
        continue;
    }

    console.log(i);
}
```

Saída:

```text
1
3
5
7
9
```

---

# 8. Aplicações Práticas

## Exemplo 1: Somar números de 1 a 10

```javascript
function somarDeUmADez() {

    let soma = 0;

    for(let i = 1; i <= 10; i++) {
        soma += i;
    }

    return soma;
}

console.log(somarDeUmADez());
```

Resultado:

```text
55
```

---

## Exemplo 2: Tabuada

```javascript
function tabuada(numero) {

    for(let i = 1; i <= 10; i++) {
        console.log(`${numero} x ${i} = ${numero * i}`);
    }

}

tabuada(5);
```

---

## Exemplo 3: Contar números pares

```javascript
function contarPares(limite) {

    let quantidade = 0;

    for(let i = 1; i <= limite; i++) {

        if(i % 2 === 0) {
            quantidade++;
        }

    }

    return quantidade;
}

console.log(contarPares(20));
```

Resultado:

```text
10
```

---

## Exemplo 4: Encontrar maior número

```javascript
function maiorNumero(lista) {

    let maior = lista[0];

    for(let i = 1; i < lista.length; i++) {

        if(lista[i] > maior) {
            maior = lista[i];
        }

    }

    return maior;
}

console.log(maiorNumero([5, 8, 2, 20, 12]));
```

Resultado:

```text
20
```

---

# Exercícios Práticos

## Exercício 1

Utilize um loop `for` para exibir os números de 1 até 20.

---

## Exercício 2

Utilize um loop `for` para exibir apenas os números pares de 0 até 50.

---

## Exercício 3

Crie um programa que calcule a soma dos números de 1 até 100 utilizando um loop.

---

## Exercício 4

Utilize um loop `while` para exibir os números de 10 até 1 em ordem decrescente.

---

## Exercício 5

Crie uma função que receba um número e exiba sua tabuada de 1 a 10.

---

## Exercício 6

Utilize `continue` para ignorar todos os números múltiplos de 3 entre 1 e 20.

---

## Exercício 7

Utilize `break` para interromper um loop quando o contador atingir o valor 7.

---

## Exercício 8

Crie uma função que receba um número e informe quantos divisores ele possui.

Exemplo:

```javascript
contarDivisores(12);
```

Resultado:

```text
6
```

Divisores:

```text
1, 2, 3, 4, 6, 12
```

---

## Exercício Desafio

Crie uma função que verifique se um número é primo.

Exemplo:

```javascript
ehPrimo(13);
```

Resultado:

```text
true
```

---

# Resumo da Aula

✔ Estruturas de repetição permitem executar um bloco de código diversas vezes.

✔ O `for` é indicado quando sabemos a quantidade de repetições.

✔ O `while` é indicado quando a repetição depende de uma condição.

✔ O `do...while` garante ao menos uma execução.

✔ O `break` encerra imediatamente o loop.

✔ O `continue` ignora a iteração atual e segue para a próxima.

✔ Loops são fundamentais para percorrer dados, realizar cálculos repetitivos e automatizar tarefas em programas.