// 4. Escreva um algoritmo para calcular o fatorial de um número.
// Input: 5
// Output: 120
let input = 6;
let output = 0;

function factorialize(num) {
  if (num === 0 || num === 1) return 1;
  for (var i = num - 1; i >= 1; i--) {
    num *= i;
  }
  output = num;
  return num;
}

factorialize(input);
console.log(output);
