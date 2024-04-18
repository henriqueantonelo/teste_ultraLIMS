// 1. Encontrar número não repetido: Escreva um algoritmo para encontrar um único
// número de um array onde cada número repete três vezes, exceto um:
// Input: [5,3,4,3,5,5,3]
// Output: 4

function findSingle(array) {
  let output = [];

  for (let i = 0; i < array.length; i++) {
    let occurrenceCount = 0;

    for (let j = 0; j < array.length; j++) {
      if (array[i] === array[j]) {
        occurrenceCount++;
      }
    }

    if (occurrenceCount < 3) {
      if (!output.includes(array[i])) {
        output.push(array[i]);
      }
    }
  }

  return output;
}

let input = [5, 3, 4, 3, 5, 5, 3];
let output = findSingle(input);

if (output.length == 1) {
  document.write("O numero que se repete na array é: " + output);
} else if (output.length > 1) {
  document.write(
    "Os numeros que se repetem na array são: " + output.join(", ")
  );
} else {
  document.write("Não há nenhum número que se repete 3 vezes nessa array.");
}
