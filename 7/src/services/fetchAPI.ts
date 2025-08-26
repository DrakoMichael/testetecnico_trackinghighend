export class FetchAPI {
  apiURL = `https://restcountries.com/v3.1`;

  async fetchAll() {
    const response = await fetch(`${this.apiURL}/all?fields=name,capital,flag`);
    const data = await response.json();
    return data;
  }

  async fetchWithParams(...params: string[]) {
    const fields = params.length > 0 ? params.join(",") : "name,capital,flag";
    const response = await fetch(`${this.apiURL}${fields}`);
    const data = await response.json();
    return data;
  }

  async fetchByName(name: string) {
    const response = await fetch(
      `${this.apiURL}/name/${name}?fields=name,capital,flag`
    );
    if (!response.ok) {
      throw new Error(`Erro na API: ${response.status} ${response.statusText}`);
    }
    return response.json();
  }

  async fetchTop10() {
    const response = await fetch(`${this.apiURL}/all?fields=name,population`);
    const data = await response.json();
    return data
      .sort((a: any, b: any) => b.population - a.population)
      .slice(0, 10)
      .map((country: any) => ({
        name: country.name?.common,
        population: country.population,
      }));
  }
}
