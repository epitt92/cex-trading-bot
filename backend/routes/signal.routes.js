const controller = require("../controllers/signal.controller");
const { authJwt } = require("../middleware");

module.exports = function(app) {

  app.get("/api/signal/list",[authJwt.verifyToken],controller.listItem);

};