const db = require("../models");


exports.listItem = async(req, res) => {
	const userid =req.userId;
	db.signal.findAll({
	    where: {}	    ,
      order: [['openTime','DESC']],
      limit:50 
  	}).then(async(items)=>{
	    res.send(items);
  	 }
  	).catch(err => {
      console.log(err)
      res.send({});
    });
} 

// ,
//     order: [['openTime DESC']], 
//       limit: 50,