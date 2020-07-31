require('./css/app.css');
require('./index.html');

import { dinos, compareWeight, compareHeight, compareDiet } from './dino.js';
import { Human } from './human.js';
import { shapeData, generateRandomIndexes, showComparison } from './helpers.js';

import anklyosaurus from './images/anklyosaurus.png';
import brachiosaurus from './images/brachiosaurus.png';
import elasmosaurus from './images/elasmosaurus.png';
import human from './images/human.png';
import pigeon from './images/pigeon.png';
import pteranodon from './images/pteranodon.png';
import stegosaurus from './images/stegosaurus.png';
import triceratops from './images/triceratops.png';
import tyrannosaurusrex from './images/tyrannosaurus rex.png';


let transformedDinosArr = shapeData(dinos, { species: 'Human' })

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


generateRandomIndexes(transformedDinosArr, 3)


// Remove form from screen and Add tiles to DOM
const btnCompare = document.querySelector('.compare');

btnCompare.addEventListener('click', () => {
  showComparison(transformedDinosArr, 'container', 'form-container')
});



// On button click, prepare and display infographic
