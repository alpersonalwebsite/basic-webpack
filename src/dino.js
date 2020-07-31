import { Dinos } from '../data/dino.json';

// Create Dino Constructor
// I decided to use a functional mixin
function Dino(obj) {
  return Object.assign({}, obj, {
    timestamp: Date.now()
  });
}

export let dinos = Dinos

// Create 9 Dino Objects
// This are going to be part of the Window object
Dinos.map(element => {
  global[element.species] = new Dino(element);
});

// Create Dino Compare Method 1
// NOTE: Weight in JSON file is in lbs, height in inches.
export function compareWeight(dino, humanOb) {
  if (dino.weight > humanOb.weight) {
    return `This dino is ${dino.weight - humanOb.weight} lbs weighter than the human`;
  } else {
    return 'We have a Super Human!';
  }
}

// Create Dino Compare Method 2
// NOTE: Weight in JSON file is in lbs, height in inches.
export function compareHeight(dino, humanOb) {
  return 'This is height!'
}

// Create Dino Compare Method 3
// NOTE: Weight in JSON file is in lbs, height in inches.
export function compareDiet(dino, humanOb) {
  return 'This is Diet!'
}