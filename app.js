var app = require('express')()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server);


var express = require('express');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/views');
app.use(express.bodyParser());

var hbs = require('hbs');

var pg = require('pg');

var db_url = process.env.HEROKU_POSTGRESQL_AMBER_URL || "tcp://localhost/qrplay";



//hbs.registerPartial('partial', fs.readFileSync(__dirname + '/views/boiler_plate.hbs', 'utf8'));

var items = require('./items.js');

var tvs = {};

var port = process.env.PORT || 8000;

server.listen(port);


app.get('/pg_test', function (req, res) {
	var pg_client = new pg.Client(db_url);
	pg_client.connect(function(err) {
		pg_client.query('select * from items', function(err, result) {
			console.log(result.rows);
			//output: Tue Jan 15 2013 19:12:47 GMT-600 (CST)
			res.render('blank')
		})
	});
});


app.get('/', function (req, res) {
	res.writeHead(302, {
		'Location': '/tv/'
	});
	res.end();
});


app.get('/tv/', function (req, res){
	//input the tv code
	res.locals = {'ids': Object.keys(tvs)};
	console.log(res.locals);
	res.render('enter_tv_id');
});

app.post('/tv/', function (req, res){
	var tv_id = req.body.tv_id;
	res.writeHead(302, {
		'Location': '/tv/' + tv_id
	});
	res.end();
});

app.get('/tv/:tv_id', function (req, res){
	//req.params.tv_id
	var tv_id = req.params.tv_id;
	//create the socket if it doesn't exist
	if (!(tv_id in tvs)) {
		tvs[tv_id] = io.of('/tv_sockets/' + tv_id);
	}
	//need to pass params to template, 
	res.locals = {'tv_id': tv_id};
	res.render('tv');
});

app.get('/tv/:tv_id/item/:item_id', function (req, res){
	//req.params.tv_id
	var tv_id = req.params.tv_id;
	//create the socket if it doesn't exist
	if (!(tv_id in tvs)) {
		console.log('bad tv_id: ', tv_id);
		res.render('enter_tv_id');
		return;
	}
	//fetch item info from db
	var pg_client = new pg.Client(db_url);
	pg_client.connect(function(err) {
		pg_client.query('select * from items;'  , function(err, result) {
			var item_id = parseInt(req.params.item_id, 10);

			console.log(err);
			console.log(result);

			if(result.rowCount > 0){
				var items = result.rows;
				var current_item = null;
				for (var i=0; i< items.length; i++){
					if (items[i].id === item_id) {
						//send the signal to the web socket
						tvs[tv_id].emit('show_item', items[i]);
					}
				}
				//tvs[tv_id].emit('show_item', result.rows[0]);
				res.render('item_sent', {
					'items': items,
					'tv_id': tv_id
				});
				console.log({
					'items': items,
					'tv_id': tv_id
				});
				pg_client.end();
			}
			else {
				//need to do some error handling
				res.render('blank');
				pg_client.end();
			}


		});
	});
});
	//var item_details  = items.items[parseInt(req.params.item_id, 10)];
app.get('/tv/:tv_id/items', function (req, res){
	console.log(db_url);
	var pg_client = new pg.Client(db_url);
	pg_client.connect(function(err) {
		pg_client.query('select * from items;'  , function(err, result) {

			if(result.rowCount > 0){
				var items = result.rows;
				var current_item = null;
				for (var i=0; i< items.length; i++){
					items[i].send_url = "http://evening-fjord-2389.herokuapp.com/tv/" + req.params.tv_id + "/item/" + items[i].id;
				}
				//tvs[tv_id].emit('show_item', result.rows[0]);
				res.render('items_list', {
					'tv_id': req.params.tv_id,
					'items': items
				});
				pg_client.end();
			}
			else {
				//need to do some error handling
				res.render('blank');
				pg_client.end();
			}

		});
	});
});

