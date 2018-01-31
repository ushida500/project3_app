const
    express = require('express')
    app = express(),
    logger = require('morgan'), // this is the logs request to the terminal 
    mongoose = require('mongoose'),
    Recipe = require('./model/Recipe.js'),
    path = require('path'),
    bodyParser = require('body-parser')

// connect to Mongo 
mongoose.connect('mongodb://localhost/recipesdb', function(err) {
    console.log(err || "Recipes!")
})

// Middleware
app.use(logger('dev'))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// routes
app.get('/', function(req, res){
    res.render('index')
})
app.get('/recipes', function(req, res) {
    Recipe.find({}, function(err, recipes) {
        res.json(recipes)
    })
})

app.get('/recipes/:id', function(req, res) {
    Recipe.findById(req.params.id, function(err, recipe) {
        if(err) {      // to handle errs...
            res.json({message: "There was a problem."})
            console.log(err)
        }   else {}
        res.json(recipe)
     })              // res.send("Profile page for recipe: " + req.params.id)
})

app.post('/recipes', function(req, res) {
    Recipe.create(req.body)
})

// listen to requests on PORT 3000
app.listen(3000, function(err) {
    console.log(err || "Recipes server")
})