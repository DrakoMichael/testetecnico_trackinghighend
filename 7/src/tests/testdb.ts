import { db } from "../services/dataBaseService";

export class TestDBService {
  static async getTestData() {
    const result = await db.any("SELECT * FROM paises");
    console.log(result);
  }
}
