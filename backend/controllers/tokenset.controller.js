const db = require("../models");

exports.list = async(req, res) => {
	const userId =req.userId;
	db.tokenset.findAll({
	    where: {
	      userId: userId
	    }
  	}).then(async(tokenset)=>{
	    res.send(tokenset);
  	 }
  	).catch(err => {
      res.send({});
    });
} 


exports.detail = async(req, res) => {
	const id =req.id;
	db.tokenset.findOne({
	    where: {
	      id: id
	    }
  	}).then(async(tokenset)=>{
	    res.send(tokenset);
  	 }
  	).catch(err => {
      res.send({});
    });
} 

exports.delete = async(req, res) => {
	const id =req.id;
	await db.tokenset.destroy({where:{id:id}});
	res.send({});
} 

exports.add = async(req, res) => {
	let datas =req.body;
	const userId = req.userId;
	datas.userId = userId;
	tokenset = await db.tokenset.create(datas);
	res.send(tokenset);
} 

exports.edit = async(req, res) => {

	const id = req.id;
	let tokenset = await db.tokenset.findOne({where:{id:id}});
	const datas =req.body;
	tokenset = await tokenset.update(datas);
	res.send(tokenset);
}