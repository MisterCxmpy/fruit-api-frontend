const inputSection = document.querySelector("#inputSection form");
const fruitList = document.querySelector("#fruitSection ul");

inputSection.addEventListener("submit", extractFruit);

function extractFruit(e) {
  e.preventDefault();
  let fruitInput = e.target.fruitInput.value;
  if (fruitInput) addFruit(fruitInput);
  e.target.fruitInput.value = "";
}

function addFruit(fruit) {
  const li = document.createElement("li");

  li.textContent = fruit;

  li.addEventListener("click", li.remove, { once: true });

  fruitList.appendChild(li);
}
