module.exports = (sequelize, Sequelize) => {
  const Hopper = sequelize.define("hoppers", {
  	cryptohopperId:{
  		type:Sequelize.INTEGER
  	},
    hoppername:{
      type:Sequelize.STRING
    },
    updateperiod:{
      type:Sequelize.INTEGER // minute
    },
    tokensetId: {
      type: Sequelize.INTEGER
    },
    tokenitems:{
    	type:Sequelize.INTEGER
    },
    forcesell:{
      type:Sequelize.INTEGER
    },
    userId:{
      type:Sequelize.INTEGER
    }
  },
  {
    paranoid: true
  });

  return Hopper;
};