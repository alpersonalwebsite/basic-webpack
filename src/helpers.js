// Helpers

// For data
export function shapeData(originalDinoArr, humanOb) {
  // Create new array including human
  const arrMiddle = Math.floor(originalDinoArr.length / 2);
  let arrWithHuman = [
    ...originalDinoArr.slice(0, arrMiddle),
    humanOb,
    ...originalDinoArr.slice(arrMiddle)
  ];

  // Replace bird fact with rubric
  // We map to avoid referring to the last element of the array in case the data shape changes
  arrWithHuman.map((el, index) => {
    if (el.species.trim().toLowerCase() === 'pigeon')
      el.fact = 'All birds are Dinosaurs';
  });

  return arrWithHuman;
}

export function replaceFacts(originalArr, indexesToReplaceArr, newFacts) {
  const newArrWithModifiedFacts = originalArr.map(obj => Object.assign({}, obj));
  console.log('indexesToReplaceArr', indexesToReplaceArr)
  for (let i = 0; i < indexesToReplaceArr.length; i++) {
    //console.log(newArrWithModifiedFacts[indexesToReplaceArr[i]])
    newArrWithModifiedFacts[indexesToReplaceArr[i]].fact = `${newFacts[i]}`
  }
  return newArrWithModifiedFacts
}

export function restoreFacts(originalArr) {
  console.log('original',originalArr)
  return originalArr
}


// We are going to use this map to target human and bid indexes which we will use to exclude in random
function getHumanAndBirdIndexes(arr) {
  let humanIndex, birdIndex;

  arr.map((el, index) => {
    if (el.species.trim().toLowerCase() === 'pigeon') birdIndex = index;
    if (el.species.trim().toLowerCase() === 'human') humanIndex = index;
  });
  return {
    bird: birdIndex,
    human: humanIndex
  };
}

// Random
function randomNumberWithRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function generateRandomIndexes(arr, gridLength) {
  // Random comparison
  let indexesToExclude = getHumanAndBirdIndexes(arr);
  indexesToExclude = Object.values(indexesToExclude);
  console.log(indexesToExclude);

  console.log(arr);

  // Calculate "rows"
  let gridRows = Math.ceil(7 / gridLength);
  let lastRowElements = 7 % gridLength;

  console.log(gridRows, lastRowElements);

  // I want to ensure I have one random fact per row
  let validIndexes = [];
  for (let i = 1; i <= gridRows; i++) {
    let start = (i - 1) * gridLength;
    let end =
      i === gridRows ? start + lastRowElements : start + (gridLength - 1);
    //let range = [start, end];
    let randomIndexPerRow = randomNumberWithRange(start, end);
    //console.log('Is index in range', indexesToExclude.indexOf(randomIndexPerRow), randomIndexPerRow)
    while (indexesToExclude.indexOf(randomIndexPerRow) === 1)
      randomIndexPerRow = randomNumberWithRange(start, end);
    validIndexes.push(randomIndexPerRow);
    // console.log('Range', range)
    // console.log('RandomIndex', randomIndexPerRow)
  }

  console.log('valid', validIndexes);

  // let ranDomNumberForIndex = Math.floor(Math.random() * (arr.length + 1));
  // if (
  //   ranDomNumberForIndex === indexesToExclude.human &&
  //   ranDomNumberForIndex === indexesToExclude.bird
  // )
  //   ranDomNumberForIndex = Math.floor(Math.random() * (arr.length + 1));

  // console.log(ranDomNumberForIndex);
  // return ranDomNumberForIndex;
  return validIndexes;

  // // Comparison 1
  // arrWithHuman[ranDomNumberForIndex].fact = compareWeight(
  //   arrWithHuman[ranDomNumberForIndex],
  //   humanOb
  // );
}

// Layout
// Generate Tiles for each Dino in Array
function grid(arr) {
  let dinosGrid = '';
  arr.map((el, index) => {
    console.log(el);
    if (index !== 0 && index % 3 === 0) {
      dinosGrid += '<br>';
    }
    dinosGrid += `<span class='grid'>${
      el.species
    }<img src='images/${el.species.trim().toLowerCase()}.png'>
    <span>${el.fact}</span>
    </span>`;
  });
  return dinosGrid;
}

export function showComparison(
  prevDinosArr,
  dinosArrWithFacts,
  formWrapperId,
  containerClass,
  { element, text, classes }
) {
  console.log('Button Compare clicked.');
  document.querySelector(`#${formWrapperId}`).classList.add('hide');

  const wrapper = document.querySelector(`.${containerClass}`);
  let dinoLayout = document.createElement('div');
  dinoLayout.classList.add('dino-grid');
  dinoLayout.innerHTML = grid(dinosArrWithFacts, { species: 'Human', weight: 200 });
  wrapper.appendChild(dinoLayout);

  createButton(element, text, classes, containerClass, formWrapperId, prevDinosArr);
}

// Yes, I could have a button in the HTML template and toggle the class, but... I wanted to practice JS
function createButton(wrapper, text, cssClass, parentWrapper, elementToShowID, prevDinosArr) {
  const btn = document.createElement(wrapper);
  const btnContent = document.createTextNode(text);
  btn.appendChild(btnContent);
  btn.classList.add(...cssClass);

  const positionTarget = document.querySelector(`.${parentWrapper}`);
  positionTarget.appendChild(btn);

  // we expect the last class is the one we are going to use to identify the element
  btn.addEventListener('click', () => {
    listenerForButton(cssClass[cssClass.length - 1], elementToShowID)
    restoreFacts(prevDinosArr)
  }

  );
}

function listenerForButton(targetClass, elementToShowID) {
  console.log('Button Back clicked.');
  document.querySelector(`#${elementToShowID}`).classList.remove('hide');

  const grid = document.querySelector('.dino-grid');
  grid.remove();

  // when we remove an element with a listener we have to remove the listener as well
  const btn = document.querySelector(`.${targetClass}`);
  btn.removeEventListener('click', listenerForButton, false);
  btn.remove();
}
