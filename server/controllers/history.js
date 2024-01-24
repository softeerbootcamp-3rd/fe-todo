const fs = require("fs");
const path = require("path");

const historyPath = path.resolve(__dirname, "../db/history.json");

const historyControllers = {
  handleGetHistory: (req, res) => {
    const { history } = JSON.parse(
      fs.readFileSync(historyPath, { encoding: "utf8" })
    );
    if (!history) {
      res.status(404);
    }
    res.status(200).json(history);
  },
  handleDeleteHistory: (req, res) => {
    fs.writeFileSync(historyPath, JSON.stringify({ history: [] }));
    res.status(204);
  },
};

module.exports = historyControllers;
