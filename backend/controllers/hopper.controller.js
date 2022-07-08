const db = require("../models");


exports.listItem = async(req, res) => {
	const userid =req.userId;
	db.hopper.findAll({
	    where: {
	      userId: userid
	    }
  	}).then(async(hoppers)=>{
	    res.send(hoppers);
  	 }
  	).catch(err => {
      res.send({});
    });
} 


exports.detailItem = async(req, res) => {
	const id =req.id;
	db.hopper.findOne({
	    where: {
	      id: id
	    }
  	}).then(async(hopper)=>{
	    res.send(hopper);
  	 }
  	).catch(err => {
      res.send({});
    });
} 

exports.deleteItem = async(req, res) => {
	const id =req.id;
	await db.hopper.destroy({where:{id:id}});
	res.send({});
} 

exports.addItem = async(req, res) => {
	const userId = req.userId;
	let datas =req.body;
	datas.userId = userId;
	hopper = await db.hopper.create(datas);
	res.send(hopper);
} 

exports.editItem = async(req, res) => {

	const id = req.id;
	let hopper = await db.hopper.findOne({where:{id:id}});
	const datas =req.body;
	hopper = await hopper.update(datas);
	res.send(hopper);
}