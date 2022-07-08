module.exports = (sequelize, Sequelize) => {
  const Signal = sequelize.define("signals", {
    symbol:{
      type:Sequelize.STRING
    },
  	buyExchange:{
  		type:Sequelize.STRING
  	},
    sellExchange:{
      type:Sequelize.STRING 
    },
    ask:{
      type:Sequelize.FLOAT
    },
    bid:{
      type:Sequelize.FLOAT
    },
    profit:{
      type:Sequelize.FLOAT
     },
    openTime:{
      type:Sequelize.INTEGER
    },
  },
  {
    paranoid: true
  });

  return Signal;
};  