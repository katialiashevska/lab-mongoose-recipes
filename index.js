const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Iteration 2
const vareniki = {
  title: "Vareniki",
  level: "Amateur Chef",
  ingredients: [
    "flour", 
    "salt", 
    "vegetable oil", 
    "potatoes", 
    "mushrooms", 
    "onions", 
    "parsley"
  ],
  cuisine: "Ukrainian",
  dishType: "main_course",
  image: "https://petersfoodadventures.com/wp-content/uploads/2018/09/vareniki.jpg",
  duration: 45,
  creator: "Katia",
}

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })

  // Iteration 2
  .then(async() => {
    await Recipe.create(vareniki)
      .then((recipe) => console.log(`"${title}" added to the database`))
      .catch(error => console.log(error));
  })
  .catch(error => {
    console.error(error);
  })

  // Iteration 3
  .then(async() => {
    await Recipe.insertMany(data)
      .then(list => {
        list.forEach(recipe => console.log(`"${recipe.title}" added to the database`))
      })
      .catch(error => console.log(error))
  })

  // Iteration 4
  .then(async() => {
    await Recipe.findOneAndUpdate({
      title: "Rigatoni alla Genovese"
      },
      {
        duration: 100
      })
      .then(() => console.log("Update successful"))
      .catch(error => console.log(error))
  })

  // Iteration 5
  .then(async() => {
    await Recipe.deleteOne({
      title: "Carrot Cake",
      })
      .then(() => console.log("Delete successful"))
      .catch(error => console.log(error))
  })

  // Iteration 6
  .then(async() => {
    await mongoose.disconnect(MONGODB_URI)
      .then(console.log(`Disconnected from the database, ${mongoose.connection.readyState}`))
      .catch(error => console.log("An error happened while disconnecting", error));
      })