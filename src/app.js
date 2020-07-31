require('./css/app.css');
require('./index.html');

import { dinos, compareWeight, compareHeight, compareDiet } from './dino.js';
import { Human } from './human.js';
import {
  shapeData,
  replaceFacts,
  generateRandomIndexes,
  showComparison
} from './helpers.js';

import anklyosaurus from './images/anklyosaurus.png';
import brachiosaurus from './images/brachiosaurus.png';
import elasmosaurus from './images/elasmosaurus.png';
import human from './images/human.png';
import pigeon from './images/pigeon.png';
import pteranodon from './images/pteranodon.png';
import stegosaurus from './images/stegosaurus.png';
import triceratops from './images/triceratops.png';
import tyrannosaurusrex from './images/tyrannosaurus rex.png';

let transformedDinosArr = shapeData(dinos, { species: 'Human', weight: 200 });
let arrBeforeFactMutation = [...transformedDinosArr]

// Use IIFE to get human data from form

const humanDataObj = (function() {
  return {
    name: document.querySelector('#name').value,
    height: {
      feet: document.querySelector('#feet').value,
      inches: document.querySelector('#inches').value
    },
    weight: document.querySelector('#weight').value,
    diet: document.querySelector('#diet').value
  };
})();

let humanOb = new Human(humanDataObj);
console.log(humanOb);



// Remove form from screen and Add tiles to DOM
const btnCompare = document.querySelector('.compare');

btnCompare.addEventListener('click', () => {

  generateRandomIndexes(transformedDinosArr, 3);

  const indexesToReplaceWithFacts = generateRandomIndexes(transformedDinosArr, 3);

  let weightComparison = compareWeight(
    transformedDinosArr[indexesToReplaceWithFacts[0]],
    { species: 'Human', weight: 200 }
  );
  console.log(weightComparison);

  let heightComparison = compareHeight(
    transformedDinosArr[indexesToReplaceWithFacts[1]],
    { species: 'Human', weight: 200 }
  );

  let dietComparison = compareDiet(
    transformedDinosArr[indexesToReplaceWithFacts[2]],
    { species: 'Human', weight: 200 }
  );

  let newArrWithFacts = replaceFacts(
    transformedDinosArr,
    indexesToReplaceWithFacts,
    [weightComparison, heightComparison, dietComparison]
  );

  showComparison(arrBeforeFactMutation, newArrWithFacts, 'container', 'form-container', {
    element: 'div',
    text: 'Back!',
    classes: ['btn', 'goBack']
  });
});

// On button click, prepare and display infographic
