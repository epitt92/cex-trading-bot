module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("users", {
    username: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    },
    access:{
      type: Sequelize.STRING
    },
    settings: {
      type: Sequelize.STRING(4096)
    },

  },
  {
    paranoid: true
  });

  return User;
};