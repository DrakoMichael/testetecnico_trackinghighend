import { Request, Response } from "express";
import { FetchAPIService } from "../services/fetchAPIService";
import { CountryService } from "../services/contryService";

const dataBaseService = new CountryService();
export class CountryController {
  async defaultExport(req: Request, res: Response): Promise<Response> {
    return res.send(`<h1>API de Países</h1>`);
  }

  async getAllCountries(_req: Request, res: Response): Promise<Response> {
    try {
      const countries = await FetchAPIService.fetchAll();
      return res.status(200).json(countries);
    } catch (error: unknown) {
      return res.status(500).json({ error: "Erro interno do servidor" });
    }
  }

  async getCountryByName(req: Request, res: Response): Promise<Response> {
    const { name } = req.params;
    try {
      const countries = await FetchAPIService.fetchByName(name);
      return res.status(200).json(countries);
    } catch (error: unknown) {
      return res.status(500).json({ error: "Erro interno do servidor" });
    }
  }

  async getTop10Countries(req: Request, res: Response): Promise<Response> {
    try {
      const countries = await FetchAPIService.fetchTop10();
      return res.status(200).json(countries);
    } catch (error: unknown) {
      return res.status(500).json({ error: "Erro interno do servidor" });
    }
  }
  async rateCountry(req: Request, res: Response) {
    try {
      const { name, avaliacao } = req.body;
      const country = await dataBaseService.rateCountry(name, avaliacao);

      if (!country) {
        const createdCountry = await dataBaseService.getOrCreateCountry(
          name,
          0
        );
        return res.status(200).json(createdCountry);
      }

      res.json(country);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  }
}
