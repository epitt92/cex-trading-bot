const controller = require("../controllers/hopper.controller");
const { authJwt } = require("../middleware");

module.exports = function(app) {

  app.get("/api/hopper/list",[authJwt.verifyToken],controller.listItem);
  app.get("/api/hopper/detail",[authJwt.verifyToken],controller.detailItem);
  app.post("/api/hopper/add",[authJwt.verifyToken],controller.addItem);
  app.post("/api/hopper/edit",[authJwt.verifyToken],controller.editItem);
  app.get("/api/hopper/delete",[authJwt.verifyToken],controller.deleteItem);

};