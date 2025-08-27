import db from "./dataBaseService";

export class AvaliacaoService {
  static async getAllAvaliacoes() {
    return db.avalicoes;
  }

  static async addAvaliacao(avaliacao: { country: string; rating: number }) {
    const insertQuery =
      "INSERT INTO avalicoes (country, rating) VALUES ($1, $2) RETURNING *";
    const values = [avaliacao.country, avaliacao.rating];
    return db.one(insertQuery, values);
  }
}
