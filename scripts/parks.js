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
  const selectedLocation = locationDropdownEl.value;
  formReset(parksTableEl, tableBody, selectedLocation, typeMatches, false);
  locationMatches = matchArrayObjects(
    nationalParksArray,
    selectedLocation,
    "State"
  );
  console.log(locationMatches);
  console.log(typeMatches);
  if (locationMatches.length === 0 && selectedLocation !== "choose") {
    parksTableEl.style.display = "none";
    searchMessageEl.textContent = "No Matches Found";
  } else if (typeMatches.length !== 0 && selectedLocation !== "choose") {
    commonMatches = locationMatches.filter((parkLoc) =>
      typeMatches.includes(parkLoc)
    );
    if (commonMatches.length === 0) {
      parksTableEl.style.display = "none";
      searchMessageEl.textContent = "No Matches Found";
    }
    commonMatches.forEach((park) => generateTableRow(tableBody, park));
  } else if (selectedLocation === "choose") {
    if (typeMatches.length === "0") {
      parksTableEl.style.display = "none";
      searchMessageEl.textContent = "No Matches Found";
    }
    typeMatches.forEach((park) => generateTableRow(tableBody, park));
  } else {
    locationMatches.forEach((park) => generateTableRow(tableBody, park));
  }
});

parkTypeDropdownEl.addEventListener("change", () => {
  const selectedType = parkTypeDropdownEl.value;
  formReset(parksTableEl, tableBody, selectedType, locationMatches, false);
  typeMatches = findInArrayObjects(
    nationalParksArray,
    selectedType,
    "LocationName"
  );
  console.log(locationMatches);
  console.log(typeMatches);
  if (typeMatches.length === 0 && selectedType !== "choose") {
    parksTableEl.style.display = "none";
    searchMessageEl.textContent = "No Matches Found";
  } else if (locationMatches.length !== 0 && selectedType !== "choose") {
    commonMatches = typeMatches.filter((parkType) =>
      locationMatches.includes(parkType)
    );
    commonMatches.forEach((park) => generateTableRow(tableBody, park));
    if (commonMatches.length === 0) {
      parksTableEl.style.display = "none";
      searchMessageEl.textContent = "No Matches Found";
    }
  } else if (selectedType === "choose") {
    if (locationMatches.length === "0") {
      parksTableEl.style.display = "none";
      searchMessageEl.textContent = "No Matches Found";
    }
    locationMatches.forEach((park) => generateTableRow(tableBody, park));
  } else {
    typeMatches.forEach((park) => generateTableRow(tableBody, park));
  }
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
    formReset(parksTableEl, tableBody, "choose", commonMatches);
  }
});

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
function formReset(table, tBody, selectedValue, matchingArray, checkBoolean) {
  if (checkBoolean === false) {
    viewAllCheckEl.checked = false;
  }
  searchMessageEl.textContent = null;
  commonMatches = [];
  tBody.innerHTML = "";
  if (selectedValue === "choose" && matchingArray.length === 0) {
    table.style.display = "none";
  } else {
    table.style.display = "table-header-group";
  }
}

scrollBtnEl.addEventListener("click", () => {
  window.scrollTo(0, 0); //https://stackoverflow.com/questions/20597258/scroll-to-the-top-of-the-page-without-refreshing-reloading-of-that-page
  setTimeout(() => {
    scrollBtnEl.style.display = "none";
  }, "750");
});
