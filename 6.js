function limparObjeto(obj) {
  // cria uma cópia do objeto para não modificar o original
  const resultado = { ...obj };

  for (const chave in resultado) {
    if (resultado[chave] === null || resultado[chave] === undefined) {
      delete resultado[chave];
    }
  }

  return resultado;
}

// Exemplo de uso:
const pessoa = {
  nome: "Michael Kawan",
  idade: null,
  email: undefined,
  telefone: "11967381457",
};

const pessoaLimpa = limparObjeto(pessoa);
console.log(pessoaLimpa);
// printa { nome: 'Michael', telefone: '11967381457' }
