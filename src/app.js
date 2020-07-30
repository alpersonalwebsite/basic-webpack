require('./css/app.css')
require('./index.html')

import { Dinos } from '../data/dino.json'
console.log(Dinos)

// Create Dino Constructor

// I decided to use a functional mixin
function Dino(obj) {
  return Object.assign({}, obj, {
    timestamp: Date.now()
  })
}

// Create 9 Dino Objects
Dinos.map((element) => {
  global[element.species] = new Dino(element)
})

// Create Human Object

// I decided to use a constructor function
function Human({ name, height, weight, diet }) {
  this.name = name
  this.height = { ...height }
  this.weight = weight
  this.diet = diet
}

// Use IIFE to get human data from form

const humanDataObj = (
  function () {
    return {
      name: document.querySelector('#name').value,
      height: {
        feet: document.querySelector('#feet').value,
        inches: document.querySelector('#inches').value
      },
      weight: document.querySelector('#weight').value,
      diet: document.querySelector('#diet').value,
    }
  }
)()

let human = new Human(humanDataObj)
console.log(human)

// Create Dino Compare Method 1
// NOTE: Weight in JSON file is in lbs, height in inches.
function compareWeight (dino, human) {
  if (dino.weight > human.weight) {
    console.log(`This dino is ${dino.weight - human.weight} lbs weighter than the human`)
  } else {
    console.log('We have a Super Human!')
  }
}

// Create Dino Compare Method 2
// NOTE: Weight in JSON file is in lbs, height in inches.

// Create Dino Compare Method 3
// NOTE: Weight in JSON file is in lbs, height in inches.

// Generate Tiles for each Dino in Array
function grid (arr, human) {

  const arrMiddle = Math.floor(arr.length / 2)
  let arrWithHuman = [...arr.slice(0, arrMiddle), human, ...arr.slice(arrMiddle)]
  
  console.log(arrWithHuman)


  let dinosGrid = ''
  arrWithHuman.map((el, index) => {
    console.log(el)
    if (index !== 0 && index % 3 === 0) { dinosGrid += '<br>' }
    dinosGrid += `<span class='grid'>${el.species}</span>`
  })
  return dinosGrid
}

// Add tiles to DOM

// Remove form from screen
const btnCompare = document.querySelector('.compare')

btnCompare.addEventListener('click', () => {
  console.log('Button Compare clicked.')
  document.querySelector('#container').classList.add('hide')

  const wrapper = document.querySelector('.form-container')
  let dinoLayout = document.createElement('div')
  dinoLayout.classList.add('dino-grid')
  dinoLayout.innerHTML = grid(Dinos, { species: 'Human' })
  wrapper.appendChild(dinoLayout)

  createButton('div', 'Back!', ['btn', 'goBack'], 'form-container', 'container')
})

// Yes, I could have a button in the HTML template and toggle the class, but... I wanted to practice JS
function createButton (wrapper, text, cssClass, parentWrapper, elementToShowID) {
  const btn = document.createElement(wrapper)
  const btnContent = document.createTextNode(text)
  btn.appendChild(btnContent)
  btn.classList.add(...cssClass)

  const positionTarget = document.querySelector(`.${parentWrapper}`)
  positionTarget.appendChild(btn)

  // we expect the last class is the one we are going to use to identify the element
  btn.addEventListener('click', () => listenerForButton(cssClass[cssClass.length -1], elementToShowID))
}

function listenerForButton (targetClass, elementToShowID) {
  console.log('Button Back clicked.')
  document.querySelector(`#${elementToShowID}`).classList.remove('hide')

  const grid = document.querySelector('.dino-grid')
  grid.remove()

  // when we remove an element with a listener we have to remove the listener as well
  const btn = document.querySelector(`.${targetClass}`)
  btn.removeEventListener('click', listenerForButton, false)
  btn.remove()
}


// On button click, prepare and display infographic
