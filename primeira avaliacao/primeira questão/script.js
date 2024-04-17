// 1. Encontrar número não repetido: Escreva um algoritmo para encontrar um único
// número de um array onde cada número repete três vezes, exceto um:
// Input: [5,3,4,3,5,5,3]
// Output: 4

const input = [5, 3, 4, 3, 5, 5, 3];

function findSingle(A, ar_size) {
  for (let i = 0; i < ar_size; i++) {
    let count = 0;

    for (let j = 0; j < ar_size; j++) {
      if (A[i] == A[j]) {
        count++;
      }
    }

    if (count == 1) {
      return A[i];
    }
  }

  return -1;
}

let ar = [2, 3, 5, 4, 5, 3, 4];
let n = 7;

document.write("Element occurring once is " + findSingle(ar, n));
