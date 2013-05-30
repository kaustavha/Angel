import requests
import json
from movingaverage import movingaverage

Username = 'royce'
Password = 'RakWeSwo'
Account_ID = '7273139' # access_token for oanda
mavglist = list()
mavglistin = list() #empty list for data points for moving average calculation

k=0
length = 3
"""
def ticker:
  payload = {'q':  q,  'callback':  action(price)}
  r = requests.get("https://api.stocktwits.com/api/2/search/symbols.json?access_token=<"+access_token+">", params=payload)
  r.json()


def MAVG(instrument):
  r = requests.get("http://api-sandbox.oanda.com/v1/instruments/price?instruments="+ instrument)
  r.json()["prices"]
  mavglist.append(prices[])
    mavglistout = list(movingaverage(mavglistin, 4))
    n = len(mavglistout)
    if ((mavglistout[n] < mavglistout[(n - 1)]) and (mavglistout[n - 1] < mavglistout[n - 1]))
"""
  
def get_exchange_candle(instrument):
  """ 
	Gets the current exchange rate for the instrument pair
	ie, USD_EUR, BTC_USD, XAU_USD, WHEAT_USD
	"""
  response = requests.get("http://api-sandbox.oanda.com/v1/instruments/"+instrument+"candles?count=3")
  
  if (response.json["code"] == 406):
    pickr()
  else:
    candle = response.json["candle"]
    start = candles[1]["openMid"]
    high = candles[1]["highMid"]
    low = candles[1]["lowMid"]
    close = candles[1]["closeMid"]
    low1 = candles[0]["lowMid"]
    low2 = candles[2]["lowMid"]
    high1 = candles[0]["highMid"]
    high2 = candles[2]["highMid"]  
    output = [start, high, low, close]
    pin_bar(output, low1, low2, high1, high2, instrument)

def pin_bar(array, low1, low2, high1, high2, instrument):
  if (((array[1] - array[0]) < (array[0] - array[2])) and (array[2] < low1) and 
  (array[2] < low2) and ((array[0] - array[2]) > math.fabs(low2 - low1))):
    buy = 'buy'
    trade(buy, instrument)
  elif (((array[1] - array[0]) < (array[0] - array[2])) and ((array[1] > high1) and (array[1] < high2) and ((array[1] - array[0]) > math.fabs((high1 - high2))))): 
    sell = 'sell'
    trade(sell, instrument)
  else:
    pickr()

def trade(do, instrument):
  passme = {'instrument': instrument, 'units': '5', 'side': do}
  action = requests.post("http://api-sandbox.oanda.com/v1/accounts/" + Account_ID + "/trades", passme)
  pickr()

def pickr():  
  instrumentz = request.get("http://api-sandbox.oanda.com/v1/instruments")
  ins = instrumentz.json()["instruments"]
  instrument_name = ins[k][instrument]
  k = k + 1
  for instrument in ins:
     get_exchange_candle(instrument_name)
  pickr()

def main():
  pickr()

if __name__ == "__main__":
    main()
