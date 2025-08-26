"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../controllers/controllers");
const fetchAPI_1 = require("../services/fetchAPI");
const router = (0, express_1.Router)();
const fetchAPI = new fetchAPI_1.FetchAPI();
const controller = new controllers_1.CountryController(fetchAPI);
router.get("/", (req, res) => {
    controller.getAllCountries(req, res);
});
router.get("/:name", (req, res) => {
    controller.getCountryByName(req, res);
});
router.get("/top10", (req, res) => {
    controller.getTop10Countries(req, res);
});
router.get("/avaliar/:name", (req, res) => {
    controller.getCountryByName(req, res);
});
exports.default = router;
