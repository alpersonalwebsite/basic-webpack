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
export function generateRandomIndexes(arr, gridLength) {
  // Random comparison
  let indexesToExclude = getHumanAndBirdIndexes(arr);

  console.log(arr);

  // Calculate "rows"
  let gridRows = arr.length / gridLength;
  console.log(gridRows);

  let ranDomNumberForIndex = Math.floor(Math.random() * (arr.length + 1));
  if (
    ranDomNumberForIndex === indexesToExclude.human &&
    ranDomNumberForIndex === indexesToExclude.bird
  )
    ranDomNumberForIndex = Math.floor(Math.random() * (arr.length + 1));

  console.log(ranDomNumberForIndex);
  return ranDomNumberForIndex;

  // // Comparison 1
  // arrWithHuman[ranDomNumberForIndex].fact = compareWeight(
  //   arrWithHuman[ranDomNumberForIndex],
  //   humanOb
  // );
}

// Layout
// Generate Tiles for each Dino in Array
function grid (arr) {
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

export function showComparison (dinosArr, formWrapperId, containerClass) {
  console.log('Button Compare clicked.');
  document.querySelector(`#${formWrapperId}`).classList.add('hide');

  const wrapper = document.querySelector(`.${containerClass}`);
  let dinoLayout = document.createElement('div');
  dinoLayout.classList.add('dino-grid');
  dinoLayout.innerHTML = grid(dinosArr, { species: 'Human', weight: 200 });
  wrapper.appendChild(dinoLayout);

  createButton(
    'div',
    'Back!',
    ['btn', 'goBack'],
    'form-container',
    'container'
  );
}

// Yes, I could have a button in the HTML template and toggle the class, but... I wanted to practice JS
function createButton (wrapper, text, cssClass, parentWrapper, elementToShowID) {
  const btn = document.createElement(wrapper);
  const btnContent = document.createTextNode(text);
  btn.appendChild(btnContent);
  btn.classList.add(...cssClass);

  const positionTarget = document.querySelector(`.${parentWrapper}`);
  positionTarget.appendChild(btn);

  // we expect the last class is the one we are going to use to identify the element
  btn.addEventListener('click', () =>
    listenerForButton(cssClass[cssClass.length - 1], elementToShowID)
  );
}


function listenerForButton (targetClass, elementToShowID) {
  console.log('Button Back clicked.');
  document.querySelector(`#${elementToShowID}`).classList.remove('hide');

  const grid = document.querySelector('.dino-grid');
  grid.remove();

  // when we remove an element with a listener we have to remove the listener as well
  const btn = document.querySelector(`.${targetClass}`);
  btn.removeEventListener('click', listenerForButton, false);
  btn.remove();
}