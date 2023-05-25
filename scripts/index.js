console.log("Js working");
let imageFiles = [
  {
    url: "https://loremflickr.com/320/240/sea,fish",
    description: "A slippery fish. ",
  },
  {
    url: "https://loremflickr.com/320/240/forest,rodent",
    description: "A cute rodent",
  },
  {
    url: "https://loremflickr.com/320/240/animal,insect",
    description: "A cool insect",
  },
  {
    url: "https://loremflickr.com/320/240/amphibians",
    description: "A neat amphibian",
  },
  {
    url: "https://loremflickr.com/320/240/mammal,deer",
    description: "A timid deer",
  },
  {
    url: "https://loremflickr.com/320/240/avian,bird",
    description: "A majestic bird",
  },
  {
    url: "https://loremflickr.com/320/240/animal,reptile",
    description: "A fearsome reptile",
  },
  {
    url: "https://loremflickr.com/320/240/insect,butterfly",
    description: "Beautiful butterfly",
  },
  {
    url: "https://loremflickr.com/320/240/mammal,bear",
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
  imgEL.alt = imageFiles[randInt].description;
  counter++;
  console.log(randInt);
}

function randIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
