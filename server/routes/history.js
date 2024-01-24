const express = require("express");
const history = require("../controllers/history");

const historyApi = express.Router();

historyApi.get("/", history.handleGetHistory);
historyApi.delete("/", history.handleDeleteHistory);

module.exports = historyApi;
