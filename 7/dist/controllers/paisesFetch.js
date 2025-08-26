"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FetchAPI = void 0;
class FetchAPI {
    async fetchWithParams(...params) {
        const fields = params.length > 0 ? params.join(",") : "name,capital,flag";
        const response = await fetch(`https://restcountries.com/v3.1/all/?fields=${fields}`);
        const data = await response.json();
        return data;
    }
}
exports.FetchAPI = FetchAPI;
