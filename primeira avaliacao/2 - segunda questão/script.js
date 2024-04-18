// 2. Verificação de Palíndromo: Escreva um algoritmo para verificar se uma string é um
// palíndromo.
// Input: "arara"
// Output: True

function reverseString(str) {
  var newString = "";
  for (var i = str.length - 1; i >= 0; i--) {
    newString += str[i];
  }
  return newString;
}

function isPalindrome() {
  if (reverseString(input) == input) {
    console.log(true);
  } else {
    console.log(false);
  }
}

input = "arara";
isPalindrome();
