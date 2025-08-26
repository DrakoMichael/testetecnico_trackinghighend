// Ordenar as API's que precisam receber os dados
// Cria-se uma Função que recebe os dados
// Cria-se uma Função que envia os dados com Try Catch

async function enviarParaAPIs(dados, apis) {
  // Try Catch em cada uma das API's
  // Usa axios pra exemplo mas pode ser outra biblioteca ou função
  for (const api of apis) {
    try {
      await axios.post(api, dados);
    } catch (error) {
      console.error(`ERRO: ${api}:`, error.message);
    }
  }
}

const dados = {
  full_name: "Michael Kawan",
  email: "michaelkmcs@gmail.com",
  phone: "11967381457",
};

const apis = [
  "https://api1.com/endpoint",
  "https://api2.com/endpoint",
  "https://api3.com/endpoint",
];

enviarParaAPIs(dados, apis);
