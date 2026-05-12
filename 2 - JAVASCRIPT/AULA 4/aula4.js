// 1. Escreva uma função em JavaScript que realize a conversão de uma temperatura fornecida em graus Fahrenheit (F) para Celsius (C).

const temp = Number(prompt("Digite a temperatura: "))
convercao(temp)

function convercao (temperaturaF)  {
    const resultado = (temperaturaF - 32) * 5/9 
    
    console.log('A temperatura em Celsius é: ' + resultado + 'ºC')
}

// 2. Escreva uma função em JavaScript que receba um número e retorne se ele é par ou ímpar.

const numero = Number(prompt("Digite um número: "))

function parOuImpar (num) {
    if (num % 2 === 0) {
        console.log("O número é par.")
    } else {
        console.log("O número é ímpar.")
    }
}

parOuImpar(numero)

// 3. Escreva uma função que receba uma string e retorne a string maiúscula.

const texto = prompt("Digite um texto: ")

function paraMaiusculo (str) {
    const resultado = str.toUpperCase()
    console.log(resultado)
}

paraMaiusculo(texto)


