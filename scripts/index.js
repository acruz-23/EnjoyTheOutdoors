console.log("Js working");
let imageFiles = [
  {
    url: "https://loremflickr.com/320/240/sea,wildlife,fish",
    description: "A slippery fish. ",
  },
  {
    url: "https://loremflickr.com/320/240/forest,wildlife,rodent",
    description: "A cute rodent",
  },
  {
    url: "https://loremflickr.com/320/240/forest,wildlife,insect",
    description: "A cool insect",
  },
  {
    url: "https://loremflickr.com/320/240/animal,wildlife,amphibians",
    description: "A neat amphibian",
  },
  {
    url: "https://loremflickr.com/320/240/forest,wildlife,deer",
    description: "A timid deer",
  },
  {
    url: "https://loremflickr.com/320/240/wildlife,avian,bird",
    description: "A majestic bird",
  },
  {
    url: "https://loremflickr.com/320/240/animal,wildlife,reptile",
    description: "A fearsome reptile",
  },
  {
    url: "https://loremflickr.com/320/240/insect,wildlife,butterfly",
    description: "Beautiful butterfly",
  },
  {
    url: "https://loremflickr.com/320/240/wildlife,mammal,bear",
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
  const randInt = Math.floor(Math.random() * imgArray.length);
  imgEL.src = imageFiles[randInt].url + "?random=" + counter;
  imgEL.alt = imageFiles[randInt].description;
  counter++;
  console.log(randInt);
}
