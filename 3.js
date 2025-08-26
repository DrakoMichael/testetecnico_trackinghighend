// A lista tem 1.000 leads - API aceita 100 por vez.
// precisa ser quebrada em vários lotes de no máx 100 leads cada.

async function enviarLote(lote, tentativasMax = 3) {
  let tentativas = 0;

  while (tentativas < tentativasMax) {
    try {
      await APIpost(lote);
      cacheDeLotes.Success.push(lote);
      return;
    } catch (error) {
      tentativas++;
      cacheDeLotes.Denied.push(lote);
      if (tentativas < tentativasMax) {
        // opcional: log da tentativa, não adiciona no Denied múltiplas vezes
        console.log(`Tentativa ${tentativas} falhou para lote`, lote);
      } else {
        cacheDeLotes.Falhas.push(lote); // falha definitiva
      }
    }
  }

  //cacheDeLotes pode ser um objeto de uma classe ou função externa,
  //se falhar ele tenta n vezes e depois faz uma função
  //pode ser em memória, mas é mais seguro em persistência
  //usado para armazenar os logs das tentativas e pode ter funções
  //como limparCache(), obterStatus() e principalmente agendar as tentativas
}

//corta os leads em lotes e executa a função em cada
async function enviarLeadsEmLotes(leads, tamanhoLote) {
  for (let i = 0; i < leads.length; i += tamanhoLote) {
    const lote = leads.slice(i, i + tamanhoLote);

    // método para enviar o lote
    await enviarLote(lote);
  }
}

const leads = []; // array vazio para exemplo
enviarLeadsEmLotes(leads, 100);
