// 3. Ordenação de Números Pares e Ímpares: Escreva um algoritmo para ordenar os
// números de uma lista, colocando os números pares primeiro e os ímpares depois.
// Input: [3, 1, 2, 4, 6, 5]
// Output: [2, 4, 6, 3, 1, 5]
let input = [3, 1, 2, 4, 6, 5];
let output = [];

function isOdd() {
  for (let i = 0; i < input.length; i++) {
    if (input[i] % 2 !== 0) {
      // Verifica se o número é ímpar (resto da divisão por 2 não é zero)
      output.push(input[i]);
    }
  }
}

function isEven() {
  for (let i = 0; i < input.length; i++) {
    if (input[i] % 2 === 0) {
      // Verifica se o número é par (resto da divisão por 2 é zero)
      output.push(input[i]);
    }
  }
}

isEven();
isOdd();

console.log(output);
