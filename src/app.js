require('./css/app.css');
require('./index.html');

require('webpack-hot-middleware/client');

const hi = async () => {
  await console.log('hi');
};

hi();

// Create Dino Constructor

// I decided to use a functional mixin
function Dino(obj) {
  return Object.assign({}, obj, {
    name: 'Hi'
  });
}

const dino1 = Dino({});

// Create Dino Objects

// Create Human Object

// Use IIFE to get human data from form

// Create Dino Compare Method 1
// NOTE: Weight in JSON file is in lbs, height in inches.

// Create Dino Compare Method 2
// NOTE: Weight in JSON file is in lbs, height in inches.

// Create Dino Compare Method 3
// NOTE: Weight in JSON file is in lbs, height in inches.

// Generate Tiles for each Dino in Array

// Add tiles to DOM

// Remove form from screen

// On button click, prepare and display infographic
