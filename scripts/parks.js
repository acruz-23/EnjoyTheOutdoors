const parksTableEl = document.getElementById("parksTable");
parksTableEl.style.display = "none";
const locationDropdownEl = document.getElementById("locationDropdown");
const parkTypeDropdownEl = document.getElementById("parkTypeDropdown");
const tableBody = document.querySelector("tbody");
const viewAllCheckEl = document.getElementById("viewAllCheck");
const searchMessageEl = document.getElementById("searchMessageEl");
let commonMatches = [];
let locationMatches = [];
let typeMatches = [];

populateDropdown(parkTypesArray.sort(), parkTypeDropdownEl);
populateDropdown(locationsArray, locationDropdownEl);

locationDropdownEl.addEventListener("change", () => {
  const selectedLocation = locationDropdownEl.value;
  formReset(parksTableEl, tableBody, selectedLocation, typeMatches, false);
  locationMatches = matchArrayObjects(
    nationalParksArray,
    selectedLocation,
    "State"
  );
  if (typeMatches.length !== 0 && selectedLocation !== "choose") {
    commonMatches = locationMatches.filter((parkLoc) =>
      typeMatches.includes(parkLoc)
    );
    commonMatches.forEach((park) => generateTableRow(tableBody, park));
    if (commonMatches.length === 0) {
      parksTableEl.style.display = "none";
      searchMessageEl.textContent = "No Matches Found";
    }
  } else if (selectedLocation === "choose") {
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
  if (locationMatches.length !== 0 && selectedType !== "choose") {
    commonMatches = typeMatches.filter((parkType) =>
      locationMatches.includes(parkType)
    );
    commonMatches.forEach((park) => generateTableRow(tableBody, park));
    if (commonMatches.length === 0) {
      parksTableEl.style.display = "none";
      searchMessageEl.textContent = "No Matches Found";
    }
  } else if (selectedType === "choose") {
    locationMatches.forEach((park) => generateTableRow(tableBody, park));
  } else {
    typeMatches.forEach((park) => generateTableRow(tableBody, park));
  }
});

viewAllCheckEl.addEventListener("change", () => {
  if (viewAllCheckEl.checked) {
    locationDropdownEl.value = "choose";
    parkTypeDropdownEl.value = "choose";
    formReset(parksTableEl, tableBody);
    nationalParksArray.forEach((park) => generateTableRow(tableBody, park));
  } else {
    typeMatches = [];
    locationMatches = [];
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
  const match = data.filter((object) => selectedValue === object[property]);

  return match;
}
function findInArrayObjects(data, selectedValue, property) {
  const match = data.filter((object) =>
    object[property].includes(selectedValue)
  );

  return match;
}

function generateTableRow(myTable, object) {
  const row = myTable.insertRow();

  const nameCell = row.insertCell();
  const addressCell = row.insertCell();
  const contactCell = row.insertCell();
  // const urlCell = row.insertCell();

  nameCell.textContent = object.LocationName;
  if (object.Address === 0) {
    addressCell.textContent = `${object.City}, ${object.State}`;
  } else {
    addressCell.textContent = `${object.Address}
${object.City}, ${object.State} ${object.ZipCode}`;
  }
  if (object.Phone === 0 && object.Fax === 0) {
    contactCell.textContent = "N/A";
  } else if (object.Phone === 0) {
    contactCell.textContent = `Fax: ${object.Fax}`;
  } else if (object.Fax === 0) {
    contactCell.textContent = `Phone Number: ${object.Phone}`;
  } else {
    contactCell.textContent = `Phone Number: ${object.Phone}
Fax: ${object.Fax}
`;
  }
  if (object.Visit !== undefined) {
    const paragraph = document.createElement("p");
    const anchor = document.createElement("a");
    anchor.href = object.Visit;
    anchor.innerText = object.Visit;
    anchor.target = "_blank";
    anchor.alt = object.LocationName + "link.";
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
