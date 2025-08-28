import { Country } from "../models/countryModel";

export class FetchAPIService {
  public static apiURL: string = `https://restcountries.com/v3.1`;

  /**
   * Busca todos os países com campos definidos.
   * Campos padrão: name, capital, flag
   */
  static async fetchAll(): Promise<Country[]> {
    try {
      const response = await fetch(
        `${this.apiURL}/all?fields=name,capital,flag`
      );

      const data: Country[] = await response.json();
      return data;
    } catch (error) {
      console.error("Erro em fetchAll:", error);
      return [];
    }
  }

  /**
   * Retorna os 10 países mais populosos
   */
  static async fetchTop10(): Promise<Country[]> {
    try {
      const response = await fetch(`${this.apiURL}/all?fields=name,population`);

      const data = await response.json();

      return data
        .filter((c: any) => c.population != null)
        .sort((a: any, b: any) => b.population - a.population)
        .slice(0, 10)
        .map((c: any) => ({
          name: c.name?.common || "sem nome",
          population: c.population,
        }));
    } catch (error) {
      console.error("Erro em fetchTop10:", error);
      return [];
    }
  }

  /**
   * Busca países com campos customizados
   * @param params Campos desejados
   */
  static async fetchWithParams(...params: string[]): Promise<Country[]> {
    try {
      const fields = params.length > 0 ? params.join(",") : "name,capital,flag";
      const response = await fetch(`${this.apiURL}/all?fields=${fields}`);
      if (!response.ok)
        throw new Error(`Erro ao buscar países: ${response.status}`);
      const data: Country[] = await response.json();
      return data;
    } catch (error) {
      console.error("Erro em fetchWithParams:", error);
      return [];
    }
  }

  /**
   * Busca país pelo nome
   * @param name Nome do país
   */
  static async fetchByName(name: string): Promise<Country[]> {
    try {
      const encodedName = encodeURIComponent(name);
      const response = await fetch(
        `${this.apiURL}/name/${encodedName}?fields=name,capital,flag,population`
      );
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error(`País "${name}" não encontrado.`);
        }
        throw new Error(
          `Erro na API: ${response.status} ${response.statusText}`
        );
      }
      const data: Country[] = await response.json();
      return data;
    } catch (error) {
      console.error("Erro em fetchByName:", error);
      return [];
    }
  }
}
