const inputSection = document.querySelector("#inputSection form");
const fruitList = document.querySelector("#fruitSection ul");
const fruitNutrition = document.querySelector("#fruitSection p");
const fruitImage = document.querySelector("#fruitImage");

const API_KEY = "33986181-dc0bcbe2d695046bbc943844e";
let calories = 0;

inputSection.addEventListener("submit", extractFruit);

function extractFruit(e) {
  e.preventDefault();
  let fruitInput = e.target.fruitInput.value;
  if (fruitInput) {
    fetchFruitData(fruitInput);
    fetchImgData(fruitInput);
  }
  e.target.fruitInput.value = "";
}

function addFruit(fruit) {
  const li = document.createElement("li");

  li.textContent = fruit.name;

  li.addEventListener("click",() => {
      li.remove();
      fruitNutrition.textContent = `Total Calories: ${(calories -=
        fruit.nutritions.calories)}`;
    },
    { once: true }
  );

  fruitList.appendChild(li);

  getCalories(fruit);
}

function addImage(image) {
  fruitImage.src = image.hits[getRandomInt(image.hits.length)].previewURL;
}

function getCalories(fruit) {
  fruitNutrition.textContent = `Total Calories: ${(calories +=
    fruit.nutritions.calories)}`;
}

async function fetchFruitData(fruit) {
  try {
    const resp = await fetch(`https://fruit-api-3q7l.onrender.com/fruits/${fruit}`);
    if (resp.ok) {
      const data = await resp.json();
      addFruit(data);
    } else {
      throw `Error: http status code = ${resp.status}`;
    }
  } catch (e) {
    console.log(e);
  }
}

async function fetchImgData(fruit) {
  try {
    const resp = await fetch(
      `https://pixabay.com/api/?q=${fruit}+fruit&key=${API_KEY}`
    );
    if (resp.ok) {
      const data = await resp.json();
      addImage(data);
    } else {
      throw `Error: http status code = ${resp.status}`;
    }
  } catch (e) {
    console.log(e);
  }
}

// function fetchFruitData(fruit) {
//   fetch(`https://fruity-api.onrender.com/fruits/${fruit}`)
//   .then((resp) => processResponse(resp))
//     .then((data) => addFruit(data))
//     .catch((e) => console.log(e));
// }

// function processResponse(resp) {
//   if (resp.ok) {
//     return resp.json()
//   } else {
//     throw `Error: http status code = ${resp.status}`
//   }
// }

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
