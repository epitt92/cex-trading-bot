module.exports = (sequelize, Sequelize) => {
  const Tokenset = sequelize.define("tokensets", {
  	title:{
  		type:Sequelize.STRING
  	},
    exchange:{
      type:Sequelize.STRING
    },
    settings:{
      type:Sequelize.STRING 
    },
    comment:{
      type:Sequelize.STRING 
    },
    userId:{
      type:Sequelize.INTEGER
    }
  },
  {
    paranoid: true
  });

  return Tokenset;
};