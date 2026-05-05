// Receba uma média do usuário e informe se ele foi aprovado, reprovado ou se está de recuperação. A média para aprovação é 6, para recuperação é entre 3 e 6, e para reprovação é abaixo de 3.

    const media = Number(prompt("Digite sua média: "))

if (media <= 2.99) {
    console.log('Reprovado!')
} else if (media <= 5.99) {
    console.log('Recuperação!')
} else if (media <= 10) {
    console.log('Aprovado!')
} else {
    console.log('Média inválida!')
}


