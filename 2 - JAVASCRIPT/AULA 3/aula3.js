// 1. Estação do ano
// Peça o número do mês (1 a 12) e use switch para exibir a estação correspondente:

// Dezembro, Janeiro, Fevereiro → Verão
// Março, Abril, Maio → Outono
// Junho, Julho, Agosto → Inverno
// Setembro, Outubro, Novembro → Primavera

let mes = Number(prompt("Digite o número do mês (1-12):"));
switch (mes) {
    case 12:
    case 1:
    case 2:
        console.log("Verão");
        break;
    case 3:
    case 4:
    case 5:
        console.log("Outono");
        break;
    case 6:
    case 7:
    case 8:
        console.log("Inverno");
        break;
    case 9:
    case 10:
    case 11:
        console.log("Primavera");
        break;
    default:
        console.log("Mês inválido");
}

// 2. Classificação de velocidade
// Peça a velocidade de um veículo e classifique:

// Até 60 km/h → "Dentro do limite"
// Entre 61 e 80 → "Atenção: velocidade moderada"
// Entre 81 e 100 → "Multa leve"
// Acima de 100 → "Multa grave"

let velocidade = Number(prompt("Digite a velocidade do veículo (km/h):"));
if (velocidade <= 60) {
    console.log("Dentro do limite");
} else if (velocidade <= 80) {
    console.log("Atenção: velocidade moderada");
} else if (velocidade <= 100) {
    console.log("Multa leve");
} else {
    console.log("Multa grave");
}

// 3. Verificador de triângulo
// Peça os três lados de um triângulo. Verifique primeiro se formam um triângulo válido (cada lado deve ser menor que a soma dos outros dois). Se válido, classifique:

// Três lados iguais → Equilátero
// Dois lados iguais → Isósceles
// Todos diferentes → Escaleno

let lado1 = Number(prompt("Digite o primeiro lado do triângulo:"));
let lado2 = Number(prompt("Digite o segundo lado do triângulo:"));
let lado3 = Number(prompt("Digite o terceiro lado do triângulo:"));

if (lado1 === lado2 && lado2 === lado3) {
    console.log("Triângulo Equilátero");
} else if (lado1 === lado2 || lado2 === lado3 || lado3 === lado1) {
    console.log("Triângulo Isósceles");
} else {
    console.log("Triângulo Escaleno");
}


