import requests

def get_exchange_rate(instrument):
	""" 
	Gets the current exchange rate for the instrument pair
	ie, USD_EUR, BTC_USD, XAU_USD, WHEAT_USD
	"""
	response = requests.get("http://api-sandbox.oanda.com/v1/instruments/%s/price" % instrument)
	return response.json()

if __name__ == '__main__':
	rate = get_exchange_rate('XAU_USD')
	#gold, gold!
	print "Current price of Gold is USD:", rate['ask']

	#spin wheat into gold!

	gold_rate = get_exchange_rate('XAU_USD')
	wheat_rate = get_exchange_rate('WHEAT_USD')

	wheat_per_gold = gold_rate['ask'] / wheat_rate['ask']

	print "You can buy an ouce of gold for %s bushels of wheat" % wheat_per_gold

#app needs to execute trades
#this is fucking retarded