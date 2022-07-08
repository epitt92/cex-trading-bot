const controller = require("../controllers/native.controller");
const { authJwt } = require("../middleware");

module.exports = function(app) {

  app.get("/api/native/auth",[authJwt.verifyToken],controller.auth);
  app.post("/api/native/hopper",[authJwt.verifyToken],controller.add);
  app.post("/api/hopper/update",[authJwt.verifyToken],controller.edit);
  app.get("/api/hopper/delete",[authJwt.verifyToken],controller.delete);

};