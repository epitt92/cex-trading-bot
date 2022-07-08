module.exports = (sequelize, Sequelize) => {
  const Signal = sequelize.define("signals", {
  	buyExchange:{
  		type:Sequelize.INTEGER
  	},
    sellExchange:{
      type:Sequelize.INTEGER
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