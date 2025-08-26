"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CountryController = void 0;
class CountryController {
    fetchAPI;
    constructor(fetchAPI) {
        this.fetchAPI = fetchAPI;
    }
    async getAllCountries(req, res) {
        try {
            const data = await this.fetchAPI.fetchAll();
            return res.status(200).json(data);
        }
        catch (error) {
            console.error("Erro em getAllCountries:", error);
            return res.status(500).json({ message: "Erro ao buscar países" });
        }
    }
    async getCountryByName(req, res) {
        try {
            const { name } = req.params;
            if (!name) {
                return res
                    .status(400)
                    .json({ message: "Parâmetro 'name' é obrigatório" });
            }
            const data = await this.fetchAPI.fetchByName(name);
            return res.status(200).json(data);
        }
        catch (error) {
            console.error("Erro em getCountryByName:", error);
            return res.status(500).json({ message: "Erro ao buscar país" });
        }
    }
    async getTop10Countries(req, res) {
        try {
            const data = await this.fetchAPI.fetchTop10();
            return res.status(200).json(data);
        }
        catch (error) {
            console.error("Erro em getTop10Countries:", error);
            return res.status(500).json({ message: "Erro ao buscar países" });
        }
    }
}
exports.CountryController = CountryController;
