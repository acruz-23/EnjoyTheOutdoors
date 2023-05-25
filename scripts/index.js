console.log("Js working");
let imageFiles = [
  {
    url: "https://loremflickr.com/320/240/fish",
    description: "",
  },
  {
    url: "https://loremflickr.com/320/240/rodent",
    description: "A cute dog",
  },
  {
    url: "https://loremflickr.com/320/240/mammal",
    description: "A cute dog",
  },
  {
    url: "https://loremflickr.com/320/240/amphibians",
    description: "A cute cat",
  },
  {
    url: "https://loremflickr.com/320/240/deer",
    description: "A... marsupial?",
  },
  {
    url: "https://loremflickr.com/320/240/bird",
    description: "A majestic bird",
  },
  {
    url: "https://loremflickr.com/320/240/reptile",
    description: "A fearsome reptile",
  },
  {
    url: "https://loremflickr.com/320/240/bear",
    description: "BEAR!!!",
  },
];

let counter = 0;
const animalCardEls = document.querySelectorAll(".animalCard");
const changeAnimalBtnEl = document.getElementById("changeAnimalBtn");

Array.from(animalCardEls).forEach((card) => populateCard(card, imageFiles));
changeAnimalBtnEl.addEventListener("click", () =>
  Array.from(animalCardEls).forEach((card) => populateCard(card, imageFiles))
);

function populateCard(cardEl, imgArray) {
  const imgEL = cardEl.querySelector("img");
  console.log(imgEL);
  const randInt = randIntFromInterval(0, imgArray.length - 1);
  imgEL.src = imageFiles[randInt].url + "?random=" + counter;
  counter++;
  console.log(randInt);
}

function randIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
