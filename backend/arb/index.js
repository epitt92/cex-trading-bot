const {config} = require('./const/config')
const {EXCHANGES,PAIRSINFO,APIKEYS} = require("./const/pairs")
const {individualSignal} = require("./signalindividual");
let pairsMonitor = [];
exports.startScan = async()=>{
	console.log({PAIRSINFO})
	Object.keys(PAIRSINFO).map((pair)=>{
		pairsMonitor.push(new individualSignal(pair,config));
	})	
}
