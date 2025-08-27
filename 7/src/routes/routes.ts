import { Router } from "express";
import { CountryController } from "../controllers/controllers";
import { FetchAPI } from "../services/fetchAPIService";

const router = Router();
const fetchAPI = new FetchAPI();
const controller = new CountryController(fetchAPI);

router.get("/", (req, res) => {
  controller.getAllCountries(req, res);
});

router.get("/:name", (req, res) => {
  controller.getCountryByName(req, res);
});

router.get("/top10", (req, res) => {
  controller.getTop10Countries(req, res);
});

router.get("/avaliar", (req, res) => {
  // implementar
});

router.get("/avaliar/:name", (req, res) => {
  controller.getCountryByName(req, res);
});

router.post("/avaliar/:name", (req, res) => {
  // implementar
});

export default router;
