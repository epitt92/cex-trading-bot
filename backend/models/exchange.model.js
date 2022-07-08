module.exports = (sequelize, Sequelize) => {
  const Exchange = sequelize.define("exchanges", {
  	title:{
  		type:Sequelize.STRING
  	},
    settings:{
      type:Sequelize.INTEGER
    }
  },
  {
    paranoid: true
  });

  return Exchange;
};