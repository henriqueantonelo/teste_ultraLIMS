// 5. Fibonacci: Escreva um algoritmo que receba um número e construa um array com a
// sequência fibonacci do tamanho do numero informado:
// Input : 6
// Output : [1, 1, 2, 3, 5, 8]

let input = 6;
let output = [];

function fibonacci(n) {
  for (output = [1, 1], i = 2; i < n; i++)
    output.push(output[i - 1] + output[i - 2]);
  return output;
}

fibonacci(input);

console.log(output);
