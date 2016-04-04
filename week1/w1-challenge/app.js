var express = require('express'),
    app = express(),
    engines = require('consolidate'),
    MongoClient = require('mongodb').MongoClient,
    assert = require('assert');
    bodyParser = require('body-parser');

app.engine('html', engines.nunjucks);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.use(bodyParser.urlencoded({ extended: true}));

MongoClient.connect('mongodb://localhost:27017/video', function(err, db) {

    assert.equal(null, err);
    console.log("Successfully connected to MongoDB.");

    app.get('/', function(req, res){
        
        /*
        db.collection('movies').find({}).toArray(function(err, docs) {
            res.render('movies', { 'movies': docs } );
        });
        */
        res.render('new-movie');
    });

    app.get('/movies', function(req, res){
        db.collection('movies').find({}).toArray(function(err, docs) {
            res.render('movies', { 'movies': docs } );
        });
    });

    app.post('/movies', function(req, res, next){
        //let's fech the values
        var title = req.body.txtTitle;
        //todo: check if parse is necessary
        //var year = parseInt(req.body.txtYear);
        var year = req.body.txtYear;
        var imdb = req.body.txtImdb;

        //here goes insert for the database

        //and then displaying of the movies
        db.collection('movies').insertOne({"title": title, "year": year, "imdb": imdb});
        /*
        db.collection('movies').find({}).toArray(function(err, docs) {
            res.render('movies', { 'movies': docs } );
        });
        */
        res.redirect('/movies');
    });

    app.use(function(req, res){
        res.sendStatus(404);
    });
    
    var server = app.listen(3000, function() {
        var port = server.address().port;
        console.log('Express server listening on port %s.', port);
    });

});




