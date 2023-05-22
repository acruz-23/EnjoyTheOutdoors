console.log("Mountain js working");

const mountainDropdownEl = document.getElementById("mountainDropdown");
const tableBody = document.querySelector("tbody");
const mountainImgEl = document.getElementById("mountainImg");
populateDropdown(mountainsArray, mountainDropdownEl, "name");

mountainDropdownEl.addEventListener("change", () => {
  const selectedMountain = mountainDropdownEl.value;
  const matchedMountain = matchArrayObjects(
    mountainsArray,
    selectedMountain,
    "name"
  );
  clearPage(tableBody, mountainImgEl);
  matchedMountain.forEach((mt) =>
    generateMountainInfo(tableBody, mt, mountainImgEl)
  );
});
function populateDropdown(data, dropdownEl, property) {
  console.log("populateDropdown working");
  data.forEach((entry) => {
    const dropdownOptions = new Option(entry[property]);
    dropdownEl.appendChild(dropdownOptions);
  });
}

function matchArrayObjects(data, selectedValue, property) {
  console.log("matchArrayObjects working");

  const match = data.filter((object) => selectedValue === object[property]);
  console.log(match);
  return match;
}

function generateMountainInfo(myTable, object, imgEl) {
  console.log(object);

  const row1 = myTable.insertRow();
  const nameHeading = row1.insertCell();
  const nameCell = row1.insertCell();
  nameHeading.outerHTML = "<th>Name: </th>";
  nameCell.textContent = object.name;

  const row2 = myTable.insertRow();
  const elevationHeading = row2.insertCell();
  const elevationCell = row2.insertCell();
  elevationHeading.outerHTML = "<th>Elevation: </th>";
  elevationCell.textContent = object.elevation;

  const row3 = myTable.insertRow();
  const effortHeading = row3.insertCell();
  const effortCell = row3.insertCell();
  effortHeading.outerHTML = "<th>Effort: </th>";
  effortCell.textContent = object.effort;

  const row4 = myTable.insertRow();
  const descHeading = row4.insertCell();
  const descCell = row4.insertCell();
  descHeading.outerHTML = "<th>Description: </th>";
  descCell.textContent = object.desc;

  imgEl.src = "./images/" + object.img;
}

function clearPage(table, imgEl) {
  table.innerHTML = "";
  imgEl.src = "";
  imgEl.alt = "";
}
