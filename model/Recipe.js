// page to create the recipes
const
mongoose = require('mongoose'), 
recipeSchema = new mongoose.Schema({
    name: String,
    number: Number,
    ingredients: String,
    instructions: String
})

const Recipe = mongoose.model('Recipe', recipeSchema ) // arguments: model, schema
module.exports = Recipe // built the model, then export it

// Update an existing recipe - arguments: the id, the data, {new: true} to give back the latest recipe, and the callback function
// Recipe.findByIdAndUpdate("", {tools: "Recipe"}, {new: true}, function(err, updatedRecipe) {
//     console.log(updatedRecipe)
// })

// Destroy an existing recipe
// Recipe.findByIdAndRemove("Recipe", function(err, recipe) {
//     if(err) {return console.log(err) }
//     console.log("Recipe removed!")
// })
