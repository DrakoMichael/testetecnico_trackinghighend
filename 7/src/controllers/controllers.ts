import { Request, Response } from "express";
import { FetchAPI } from "../services/fetchAPI";

export class CountryController {
  constructor(private fetchAPI: FetchAPI) {}

  async getAllCountries(_req: Request, res: Response): Promise<Response> {
    try {
      const data = await this.fetchAPI.fetchAll();
      return res.status(200).json(data);
    } catch (error: unknown) {
      console.error("Erro em getAllCountries:", error);
      return res.status(500).json({ message: "Erro ao buscar países" });
    }
  }

  async getCountryByName(req: Request, res: Response): Promise<Response> {
    try {
      const { name } = req.params;
      if (!name) {
        return res
          .status(400)
          .json({ message: "Parâmetro 'name' é obrigatório" });
      }

      const data = await this.fetchAPI.fetchByName(name);
      return res.status(200).json(data);
    } catch (error: unknown) {
      console.error("Erro em getCountryByName:", error);
      return res.status(500).json({ message: "Erro ao buscar país" });
    }
  }

  async getTop10Countries(req: Request, res: Response): Promise<Response> {
    try {
      const data = await this.fetchAPI.fetchTop10();
      return res.status(200).json(data);
    } catch (error: unknown) {
      console.error("Erro em getTop10Countries:", error);
      return res.status(500).json({ message: "Erro ao buscar países" });
    }
  }
}
