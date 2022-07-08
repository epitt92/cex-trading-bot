BINANCEID = 0;
KUCOINID = 1;
KRAKENID = 2;
FTXID = 3;
exports.EXCHANGES = {
	"BINANCEID":BINANCEID,
	"KRAKENID":KRAKENID,
	"KUCOINID":KUCOINID
}

exports.APIKEYS = {
	[BINANCEID]:{name:"Binance",},
	[KUCOINID]:{name:"Kucoin"},
	[KRAKENID]:{name:"Kraken"}
}

exports.PAIRSINFO = {
	"ETHUSDT":{
		[BINANCEID]:"ETHUSDT",
		[KUCOINID]:"ETHUSDTM",
		[KRAKENID]:"pi_ethusd",
		[FTXID]:"ETH-PERP"
	},
	"XRPUSDT":{
		[BINANCEID]:"XRPUSDT",
		[KUCOINID]:"XRPUSDTM",
		[KRAKENID]:"pi_xrpusd",
		[FTXID]:"XRP-PERP"
	},
	"SOLUSDT":{
		[BINANCEID]:"SOLUSDT",
		[KUCOINID]:"SOLUSDTM",
		[KRAKENID]:"pf_solusd",
		[FTXID]:"SOL-PERP"
	},
	"BNBUSDT":{
		[BINANCEID]:"BNBUSDT",
		[KUCOINID]:"BNBUSDTM",
		[KRAKENID]:"pf_bnbusd",
		[FTXID]:"BNB-PERP"
	},
	"BTCUSDT":{
		[BINANCEID]:"BTCUSDT",
		[KUCOINID]:"BTCUSDTM",
		[KRAKENID]:"pi_xbtusd",
		[FTXID]:"BTC-PERP"
	},

	"BCHUSDT":{
		[BINANCEID]:"BCHUSDT",
		[KUCOINID]:"BCHUSDTM",
		[KRAKENID]:"pi_bchusd",
		[FTXID]:"BCH-PERP"
	},
	"EOSUSDT":{
		[BINANCEID]:"EOSUSDT",
		[KUCOINID]:"EOSUSDTM",
		[KRAKENID]:"pi_eosusd",
		[FTXID]:"EOS-PERP"
	},
	"DOTUSDT":{
		[BINANCEID]:"DOTUSDT",
		[KUCOINID]:"DOTUSDTM",
		[KRAKENID]:"pi_dotusd",
		[FTXID]:"DOT-PERP"
	},
	"LTCUSDT":{
		[BINANCEID]:"LTCUSDT",
		[KUCOINID]:"LTCUSDTM",
		[KRAKENID]:"pi_ltcusd",
		[FTXID]:"LTC-PERP"
	},
	"ADAUSDT":{
		[BINANCEID]:"ADAUSDT",
		[KUCOINID]:"ADAUSDTM",
		[KRAKENID]:"pf_adausd",
		[FTXID]:"ADA-PERP"
	},

}
