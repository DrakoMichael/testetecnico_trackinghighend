import db from "./dataBaseService";

export class AvaliacaoService {
  static async addAvaliacao(avaliacao: { name: string; avaliacao: number }) {
    const insertQuery =
      "INSERT INTO countries (name, avaliacao) VALUES ($1, $2) RETURNING *";
    const values = [avaliacao.name, avaliacao.avaliacao];
    return db.one(insertQuery, values);
  }
}
