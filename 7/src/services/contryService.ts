import db from "../services/dataBaseService";

export class CountryService {
  async getOrCreateCountry(name: string, population: number) {
    const country = await db.one(
      `INSERT INTO countries (name, avaliacao, population)
       VALUES ($1, 0, $2)
       ON CONFLICT (name) DO UPDATE SET name = EXCLUDED.name
       RETURNING *`,
      [name, population]
    );
    return country;
  }

  async rateCountry(name: string, score: number) {
    const country = await db.oneOrNone(
      `UPDATE countries
       SET avaliacao = avaliacao + $2
       WHERE name = $1
       RETURNING *`,
      [name, score]
    );

    return country;
  }

  async getTop10Countries() {
    return db.manyOrNone(
      `SELECT * FROM countries
       ORDER BY avaliacao DESC
       LIMIT 10`
    );
  }

  async getCountryByName(name: string) {
    return db.oneOrNone("SELECT * FROM countries WHERE name = $1", [name]);
  }

  async getAllCountries() {
    return db.manyOrNone("SELECT * FROM countries");
  }
}
