Angel
===============

Archive for AngelHackToronto2013

install reqirements
===================

install node, then run

npm install

install python-requests 

CONTENTS
====

Prepr Hack: 
Tech: SocketIO 

tv browser will connect to 
/tv/:id

videos will be played by going to links of the form
/tv/:tv_id/item/:item_id
visiting these links will trigger the tv to play the relevant video

frontend for the tv
opens a websocket, listen for signals about what video / image to launch

server
runs on node js.  Listens for URLs, handles the websockets.


Oanda Hack
Tech: Python 

+ Candles created every hour => {high, start, end, low}
+ Look for specific types that predict change => long tail(large diff. between low/high and start/end)
+ Trade

TODO : Enable moving average tracking for higher accuracy