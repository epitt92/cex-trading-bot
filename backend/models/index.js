const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const Op = Sequelize.Op

const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    logging: false,
    host: config.HOST,
    dialect: config.dialect,
    dialectOptions: {
        socketPath: "/var/run/mysqld/mysqld.sock"
    },
    define: {
        paranoid: true
    },
    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;


db.signal = require("../models/signal.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);
db.user = require("../models/user.model.js")(sequelize, Sequelize);

db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId"
});
db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId"
});


module.exports = db;