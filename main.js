const
    express = require('express')
    app = express(),
    logger = require('morgan'), // this is the logs request to the terminal 
    mongoose = require('mongoose'),
    Recipe = require('./model/Recipe.js'),
    path = require('path'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override')


require('dotenv').config()
// connect to Mongo 
mongoose.connect(process.env.DATABASE_URL, function(err) {
    console.log(err || "Recipes!")
})

// Middleware
app.use(logger('dev'))

app.use(methodOverride("_method"))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// ROUTES
// To list all recipes
app.get('/', function(req, res){
    res.render('index')
})
app.get('/recipes', function(req, res) {
    console.log('recipes')
    Recipe.find({}, function(err, allRecipes) {
        if(err) console.log(err)
        res.render('recipes', {allRecipes})
    })
})

// Display a form to add a recipe bookmark
app.get('/recipes/new', function(req, res) {
    res.render('new')
})

// Show details about a specific bookmarked recipe
app.get('/recipes/:id', function(req, res) {
    Recipe.findById(req.params.id, function(err, recipe) {
        if(err) {      // to handle errs...
            res.json({message: "There was a problem."})
            console.log(err)
        }   else {}
        res.render('recipe', {recipe})
     })              // res.send("Profile page for recipe: " + req.params.id)
})

// Add a new recipe bookmark
app.post('/recipes', function(req, res) {
    Recipe.create(req.body, function(err, recipe){
        res.redirect('/recipes/' + recipe.id)
    })
})

// Update an existing recipe - arguments: the id, the data, {new: true} 
// to give back the latest recipe, and the callback function
app.patch('/recipes/:id/edit', function(req, res) {
    Recipe.findByIdAndUpdate(req.params.id, {tools: "Recipe"}, {new: true}, function(err, updatedRecipe) {
        if(err) return console.log(err)
        res.json({message: "Recipe updated!", recipe: updatedRecipe})
    })
})

// Delete an existing recipe
app.delete('/recipes/:id', function(req, res) {
    Recipe.findByIdAndRemove(req.params.id, function(err, deletedRecipe) {
        if(err) return console.log(err)
        res.redirect('/recipes')
    })
})

// listen to requests on PORT 3000
app.listen(3000, function(err) {
    console.log(err || "Recipes server")
})