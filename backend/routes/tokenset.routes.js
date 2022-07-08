const controller = require("../controllers/tokenset.controller");
const { authJwt } = require("../middleware");

module.exports = function(app) {

  app.get("/api/tokenset/list",[authJwt.verifyToken],controller.list);
  app.get("/api/tokenset/detail",[authJwt.verifyToken],controller.detail);
  app.post("/api/tokenset/add",[authJwt.verifyToken],controller.add);
  app.post("/api/tokenset/edit",[authJwt.verifyToken],controller.edit);
  app.get("/api/tokenset/delete",[authJwt.verifyToken],controller.delete);

};