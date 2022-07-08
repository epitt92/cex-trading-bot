const WebSocket= require('ws');
const {config} = require('./const/config')
const axios = require('axios')
const {EXCHANGES,PAIRSINFO,APIKEYS} = require("./const/pairs")
const db = require("../models");
const expire = 15000;
class individualSignal {
  constructor(symbol,configArb) {
  	this.maxProfit = 0;
  	this.symbol = symbol;
  	this.config = configArb;
  	this.setup();
  	const self = this;
	const checkSignal = async()=>{
		if(Object.keys(self.priceInfo.prices).length>2){
			self.priceInfo.bestAsk = {exchange:EXCHANGES.BINANCEID,price:self.priceInfo.prices[EXCHANGES.BINANCEID].ask}
			self.priceInfo.bestBid = {exchange:EXCHANGES.BINANCEID,price:self.priceInfo.prices[EXCHANGES.BINANCEID].bid}
			Object.keys(self.priceInfo.prices).forEach((key)=>{
				if(Date.now()-self.priceInfo.prices[key].update>expire){
					console.log("Expired signal");
					process.exit();
				}
				if(self.priceInfo.bestAsk.price>self.priceInfo.prices[key].ask){
					self.priceInfo.bestAsk = {exchange:key,price:self.priceInfo.prices[key].ask}
				}
				if(self.priceInfo.bestBid.price<self.priceInfo.prices[key].bid){
					self.priceInfo.bestBid = {exchange:key,price:self.priceInfo.prices[key].bid}
				}
			})
			const profit = self.priceInfo.bestBid.price/self.priceInfo.bestAsk.price-1;
			self.priceInfo.profit = profit;
			let FilteredSignal = self.priceInfo.signals.filter((signal)=>{
				if(signal.openTime*1000<Date.now()-300000) {
					console.log(signal.openTime*1000,Date.now()-300000)
					return false;
				}
				return true;
			})
			self.priceInfo.signals = FilteredSignal;
			if(self.maxProfit<profit) {
				self.maxProfit = profit;
				console.log("Max profit",symbol,self.maxProfit,self.config.level)
			}
			if(profit>self.config.level){
				let exist = false;
				self.priceInfo.signals.forEach((signal)=>{
					if(signal.buyExchange==self.priceInfo.bestAsk.exchange &&
						signal.sellExchange == self.priceInfo.bestBid.exchange){
						exist = true;
					}
				})
				if(exist==false){
					const signalData = {
						symbol:self.symbol,
						buyExchange:self.priceInfo.bestAsk.exchange,
						sellExchange:self.priceInfo.bestBid.exchange,
						profit:Math.floor(profit*10000)/100,
						ask:self.priceInfo.bestAsk.price,
						bid:self.priceInfo.bestBid.price,
						openTime:Math.floor(Date.now()/1000)
					} 
					self.priceInfo.signals.push(signalData)
					await db.signal.create(signalData)
					//console.log({profit,info:self.priceInfo.signals})			
				}
			}
		}
	
		setTimeout(checkSignal,300)
	}

  	setTimeout(checkSignal,300)
  }

  async setup(){

  	this.priceInfo = {bestAsk:{},bestBid:{},prices:{},signals:[]}
  	const self = this;

  	const urlBN = "wss://fstream.binance.com/ws/"+(PAIRSINFO[this.symbol][EXCHANGES.BINANCEID]).toLowerCase()+"@bookTicker";
 	const wsBinance = new WebSocket(urlBN);
	  wsBinance.on('message', function incoming(data) {
	    const tickerInfo = JSON.parse(data);
	    self.priceInfo.prices[EXCHANGES.BINANCEID] = {ask:Number(tickerInfo.a),bid:Number(tickerInfo.b),update:Date.now()}
	  });  	
	
	const tokenUrlKucoin = "https://api-futures.kucoin.com/api/v1/bullet-public"

	const tokenR = await axios.post(tokenUrlKucoin)
 	const endpointKukoin  = tokenR.data.data.instanceServers[0].endpoint;
 	const tokenKukoin  = tokenR.data.data.token;
 	self.connectid = Date.now();
  	const urlKucoin = endpointKukoin + "?token="+tokenKukoin+"&connectid="+self.connectid
 	const wsKucoin = new WebSocket(urlKucoin);
	wsKucoin.on('message', function incoming(data) {
		const tickerInfo = JSON.parse(data);
		if(tickerInfo.type == "message"){
			self.priceInfo.prices[EXCHANGES.KUCOINID] = {ask:Number(tickerInfo.data.bestAskPrice),bid:Number(tickerInfo.data.bestBidPrice),update:Date.now()}
		}
		if(tickerInfo.type=="welcome"){
			const jsonData = {
			  	"id":self.connectid,
			  	"type":"subscribe",
			  	"topic":"/contractMarket/tickerV2:"+PAIRSINFO[self.symbol][EXCHANGES.KUCOINID],
			  	"response": true
			}
			wsKucoin.send(JSON.stringify(jsonData));
		}
	});  	
	setInterval(()=>{
		wsKucoin.send(JSON.stringify({
			"id":"1545910590801",
	    	"type":"ping"
		}));
	},10000);
 	const wsKraken = new WebSocket("wss://futures.kraken.com/ws/v1");
 	wsKraken.on('message', function incoming(data) {
		const tickerInfo = JSON.parse(data);
		if(tickerInfo.event=="info"){
			const jsondata = {  
			    "event":"subscribe",
			    "feed":"ticker",
			    "product_ids":[  
			        PAIRSINFO[self.symbol][EXCHANGES.KRAKENID].toUpperCase()
			    ]
			}
			wsKraken.send(JSON.stringify(jsondata))

		}else if(tickerInfo.event=="pong") {
			console.log("pong kraken");
		}else{
			self.priceInfo.prices[EXCHANGES.KRAKENID] = {ask:Number(tickerInfo.ask),bid:Number(tickerInfo.bid),update:Date.now()}
		}
 	});
	setInterval(()=>{
		wsKraken.send(JSON.stringify( 	{
		  "event": "ping",
		  "reqid": 42
		}));
	},10000);


  }
}

exports.individualSignal = individualSignal;
