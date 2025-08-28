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

  async buscarPaisPorNome(req: Request, res: Response): Promise<Response> {
    const nome = req.query.nome as string;
    if (!nome) {
      return res.status(400).json({ error: 'Parâmetro "nome" é obrigatório.' });
    }
    try {
      const countries = await FetchAPIService.fetchByName(nome);
      // Buscar avaliação do banco para cada país retornado
      const result = await Promise.all(
        countries.map(async (c: any) => {
          const countryName = c.name?.common || c.name || "sem nome";
          const dbCountry = await dataBaseService.getCountryByName(countryName);
          return {
            name: countryName,
            population: c.population || 0,
            avaliacao: dbCountry ? dbCountry.avaliacao : null,
          };
        })
      );
      return res.status(200).json(result);
    } catch (error: unknown) {
      return res.status(500).json({ error: "Erro ao buscar país." });
    }
  }
}
