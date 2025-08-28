import { Router } from "express";
import { CountryController } from "../controllers/controllers";

const router = Router();
const controller = new CountryController();

router.get("/paises/buscar", (req, res) =>
  controller.buscarPaisPorNome(req, res)
);

router.get("/paises/top10", (req, res) =>
  controller.getTop10Countries(req, res)
);

router.get("/paises/avaliar/:name", (req, res) =>
  controller.getCountryByName(req, res)
);

router.post("/paises/avaliar", (req, res) => controller.rateCountry(req, res));

router.get("/paises/:name", (req, res) =>
  controller.getCountryByName(req, res)
);

router.get("/paises", (req, res) => controller.getAllCountries(req, res));

router.get("/", (_req, res) => controller.defaultExport(_req, res));

export default router;
