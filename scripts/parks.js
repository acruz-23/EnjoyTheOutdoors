console.log("Parks JS working");
const parksTableEl = document.getElementById("parksTable");
parksTableEl.style.display = "none";
const locationDropdownEl = document.getElementById("locationDropdown");
const parkTypeDropdownEl = document.getElementById("parkTypeDropdown");
const tableBody = document.querySelector("tbody");
const viewAllCheckEl = document.getElementById("viewAllCheck");

populateDropdown(parkTypesArray.sort(), parkTypeDropdownEl);
populateDropdown(locationsArray, locationDropdownEl);

locationDropdownEl.addEventListener("change", () => {
  const selectedLocation = locationDropdownEl.value;
  const locationMatches = matchArrayObjects(
    nationalParksArray,
    selectedLocation,
    "State"
  );
  formReset(parksTableEl, tableBody, selectedLocation);
  locationMatches.forEach((park) => generateTableRow(tableBody, park));
});

parkTypeDropdownEl.addEventListener("change", () => {
  const selectedType = parkTypeDropdownEl.value;
  const typeMatches = findInArrayObjects(
    nationalParksArray,
    selectedType,
    "LocationName"
  );
  formReset(parksTableEl, tableBody, selectedType);
  typeMatches.forEach((park) => generateTableRow(tableBody, park));
});

viewAllCheckEl.addEventListener("change", () => {
  console.log("checked");
  if (viewAllCheckEl.checked) {
    locationDropdownEl.value = "choose";
    parkTypeDropdownEl.value = "choose";
    formReset(parksTableEl, tableBody);
    nationalParksArray.forEach((park) => generateTableRow(tableBody, park));
  } else {
    formReset(parksTableEl, tableBody, "choose");
  }
});

function populateDropdown(data, dropdownEl) {
  console.log("populateDropdown working");
  data.forEach((entry) => {
    const dropdownOptions = new Option(entry);
    dropdownEl.appendChild(dropdownOptions);
  });
}

function matchArrayObjects(data, selectedValue, property) {
  console.log("matchArrayObjects working");

  const match = data.filter((object) => selectedValue === object[property]);
  console.log(match);
  return match;
}
function findInArrayObjects(data, selectedValue, property) {
  console.log("findInArrayObjects start");
  const match = data.filter((object) =>
    object[property].includes(selectedValue)
  );
  console.log(match);
  return match;
}

function generateTableRow(myTable, object) {
  console.log("generateTableRow working");

  const row = myTable.insertRow();
  console.log(row);

  const nameCell = row.insertCell();
  const addressCell = row.insertCell();
  const contactCell = row.insertCell();
  const urlCell = row.insertCell();

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
Fax: ${object.Fax}`;
  }
  if (object.Visit !== undefined) {
    const anchor = document.createElement("a");
    anchor.href = object.Visit;
    anchor.innerText = object.Visit;
    anchor.target = "_blank";
    anchor.alt = object.LocationName + "link.";
    urlCell.appendChild(anchor);
  } else {
    urlCell.textContent = "N/A";
  }
}
function formReset(table, tBody, selectedValue) {
  tBody.innerHTML = "";
  if (selectedValue === "choose") {
    table.style.display = "none";
  } else {
    table.style.display = "table-header-group";
  }
}
