const parksTableEl = document.getElementById("parksTable");
parksTableEl.style.display = "none";
const locationDropdownEl = document.getElementById("locationDropdown");
const parkTypeDropdownEl = document.getElementById("parkTypeDropdown");
const tableBody = document.querySelector("tbody");
const viewAllCheckEl = document.getElementById("viewAllCheck");
const searchMessageEl = document.getElementById("searchMessageEl");
const scrollBtnEl = document.getElementById("scrollBtn");
let commonMatches = [];
let locationMatches = [];
let typeMatches = [];

populateDropdown(parkTypesArray.sort(), parkTypeDropdownEl);
populateDropdown(locationsArray, locationDropdownEl);
window.onscroll = () => (scrollBtnEl.style.display = "flex");

locationDropdownEl.addEventListener("change", () => {
  const selectedType = parkTypeDropdownEl.value;
  const selectedLocation = locationDropdownEl.value;
  if (
    formReset(parksTableEl, tableBody, selectedLocation, selectedType, false)
  ) {
    return;
  }
  locationMatches = matchArrayObjects(
    nationalParksArray,
    selectedLocation,
    "State"
  );
  filterSearch(locationMatches, typeMatches, selectedLocation, selectedType);
  console.log(selectedLocation);
  console.log("locationMatches", locationMatches.length);
  console.log("typeMatches", typeMatches.length);
});

parkTypeDropdownEl.addEventListener("change", () => {
  const selectedType = parkTypeDropdownEl.value;
  const selectedLocation = locationDropdownEl.value;
  if (
    formReset(parksTableEl, tableBody, selectedType, selectedLocation, false)
  ) {
    return;
  }
  typeMatches = findInArrayObjects(
    nationalParksArray,
    selectedType,
    "LocationName"
  );
  filterSearch(typeMatches, locationMatches, selectedType, selectedLocation);
  console.log("locationMatches", locationMatches.length);
  console.log("typeMatches", typeMatches.length);
});

viewAllCheckEl.addEventListener("change", () => {
  locationDropdownEl.value = "choose";
  parkTypeDropdownEl.value = "choose";
  typeMatches = [];
  locationMatches = [];
  if (viewAllCheckEl.checked) {
    formReset(parksTableEl, tableBody);
    nationalParksArray.forEach((park) => generateTableRow(tableBody, park));
  } else {
    formReset(parksTableEl, tableBody, "choose", "choose");
  }
});

function filterSearch(
  currentArray,
  otherArray,
  currentSelection,
  otherSelection
) {
  if (currentArray.length === 0) {
    if (currentSelection !== "choose") {
      parksTableEl.style.display = "none";
      searchMessageEl.textContent = "No Matches Found";
    } else if (otherArray.length === 0) {
      parksTableEl.style.display = "none";
      searchMessageEl.textContent = "No Matches Found";
    } else {
      otherArray.forEach((park) => generateTableRow(tableBody, park));
    }
  } else if (otherArray.length === 0) {
    if (otherSelection !== "choose") {
      parksTableEl.style.display = "none";
      searchMessageEl.textContent = "No Matches Found";
    } else {
      currentArray.forEach((park) => generateTableRow(tableBody, park));
    }
  } else {
    commonMatches = currentArray.filter((parkLoc) =>
      otherArray.includes(parkLoc)
    );
    if (commonMatches.length === 0) {
      parksTableEl.style.display = "none";
      searchMessageEl.textContent = "No Matches Found";
    }
    commonMatches.forEach((park) => generateTableRow(tableBody, park));
  }
}

function populateDropdown(data, dropdownEl) {
  data.forEach((entry) => {
    const dropdownOptions = new Option(entry);
    dropdownEl.appendChild(dropdownOptions);
  });
}

function matchArrayObjects(data, selectedValue, property) {
  const match = data.filter(
    (object) => selectedValue.toUpperCase() === object[property].toUpperCase()
  );

  return match;
}
function findInArrayObjects(data, selectedValue, property) {
  const match = data.filter((object) =>
    object[property].toUpperCase().includes(selectedValue.toUpperCase())
  );

  return match;
}

function generateTableRow(myTable, obj) {
  const row = myTable.insertRow();

  const nameCell = row.insertCell();
  const addressCell = row.insertCell();
  const contactCell = row.insertCell();
  // const urlCell = row.insertCell();

  nameCell.textContent = obj.LocationName;
  if (obj.Address === 0) {
    addressCell.textContent = `${obj.City}, ${obj.State}`;
  } else {
    addressCell.textContent = `${obj.Address}
${obj.City}, ${obj.State} ${obj.ZipCode}`;
  }
  const urlBase = "https://www.google.com/maps/dir/?api=1&destination=";
  const destination = obj.LocationName.replace(/ /g, "+"); //https://stackoverflow.com/questions/3794919/replace-all-spaces-in-a-string-with
  console.log(destination);
  const dirPEl = document.createElement("p");
  const dirAEl = document.createElement("a");
  dirAEl.href = urlBase + destination;
  dirAEl.innerText = "Directions";
  dirAEl.target = "_blank";
  dirAEl.alt = obj.LocationName + "directions link.";
  dirPEl.appendChild(dirAEl);
  addressCell.appendChild(dirPEl);
  if (obj.Phone === 0 && obj.Fax === 0) {
    contactCell.textContent = "N/A";
  } else if (obj.Phone === 0) {
    contactCell.textContent = `Fax: ${obj.Fax}`;
  } else if (obj.Fax === 0) {
    contactCell.textContent = `Phone Number: ${obj.Phone}`;
  } else {
    contactCell.textContent = `Phone Number: ${obj.Phone}
Fax: ${obj.Fax}
`;
  }
  if (obj.Visit !== undefined) {
    const paragraph = document.createElement("p");
    const anchor = document.createElement("a");
    anchor.href = obj.Visit;
    anchor.innerText = obj.Visit;
    anchor.target = "_blank";
    anchor.alt = obj.LocationName + "link.";
    paragraph.appendChild(anchor);
    contactCell.appendChild(paragraph);
  }
}
function formReset(table, tBody, selectedValue, otherValue, checkBoolean) {
  if (checkBoolean === false) {
    viewAllCheckEl.checked = false;
  }
  searchMessageEl.textContent = null;
  commonMatches = [];
  tBody.innerHTML = "";
  if (selectedValue === "choose" && otherValue === "choose") {
    table.style.display = "none";
    return true;
  } else {
    table.style.display = "table-header-group";
    return false;
  }
}

scrollBtnEl.addEventListener("click", () => {
  window.scrollTo(0, 0); //https://stackoverflow.com/questions/20597258/scroll-to-the-top-of-the-page-without-refreshing-reloading-of-that-page
  setTimeout(() => {
    scrollBtnEl.style.display = "none";
  }, "750");
});
