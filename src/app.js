require('./css/app.css');
require('./index.html');

import { Dinos } from '../data/dino.json'
console.log(Dinos)

// Create Dino Constructor

// I decided to use a functional mixin
function Dino(obj) {
  return Object.assign({}, obj, {
    timestamp: Date.now()
  });
}

// Create Dino Objects
Dinos.map((element) => {
  global[element.species] = new Dino(element)
})

// Create Human Object

// I decided to use a constructor function
function Human({ name, height, weight, diet }) {

}

let human = new Human(obj)

// Use IIFE to get human data from form

(
  function getFormData() {
    
  }
)()

// Create Dino Compare Method 1
// NOTE: Weight in JSON file is in lbs, height in inches.

// Create Dino Compare Method 2
// NOTE: Weight in JSON file is in lbs, height in inches.

// Create Dino Compare Method 3
// NOTE: Weight in JSON file is in lbs, height in inches.

// Generate Tiles for each Dino in Array

// Add tiles to DOM

// Remove form from screen
const btn = document.querySelector("#btn")

btn.addEventListener("click", () => {
  console.log("Button clicked.");
});


// On button click, prepare and display infographic
