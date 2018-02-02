// page to create the recipes
const
mongoose = require('mongoose'), 
recipeSchema = new mongoose.Schema({
    name: String,
    number: Number,
    ingredients: String,
    instructions: String,
    url: String
})

const Recipe = mongoose.model('Recipe', recipeSchema ) // arguments: model, schema
module.exports = Recipe // built the model, then export it
