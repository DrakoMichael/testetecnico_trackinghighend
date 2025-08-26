//usa recursividade pra ordenar
//acha o maior valor, separa o mesmo na primeira posição
//e faz recursão no restante do array
function sortArrRecursivo(arr) {
  if (arr.length <= 1) return arr;

  const max = Math.max(...arr);
  const index = arr.indexOf(max); // ponteiro
  const restante = arr.slice(0, index).concat(arr.slice(index + 1));

  return [max, ...sortArrRecursivo(restante)];
}

const arr = [3, 9, 2, 7];
console.log(sortArrRecursivo(arr));

//teste
//const arr2 = Array.from(
//  { length: 100 },
//  () => Math.floor(Math.random() * 1000) + 1
//);

//console.log(sortArrRecursivo(arr2));
