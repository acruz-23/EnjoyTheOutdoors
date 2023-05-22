console.log("Parks JS working");

const locationDropdownEl = document.getElementById("locationDropdown");
const parkTypeDropdownEl = document.getElementById("parkTypeDropdown");
const tableBody = document.querySelector("tbody");
populateDropdown(parkTypesArray.sort(), parkTypeDropdownEl);
populateDropdown(locationsArray, locationDropdownEl);

locationDropdownEl.addEventListener("change", () => {
  const matches = matchArrayObjects(
    nationalParksArray,
    locationDropdownEl,
    "State"
  );
  tableBody.innerHTML = "";
  matches.forEach((park) => generateTableRow(tableBody, park));
});

function populateDropdown(data, dropdownEl) {
  console.log("populateDropdown working");
  data.forEach((entry) => {
    const dropdownOptions = new Option(entry);
    dropdownEl.appendChild(dropdownOptions);
  });
}

function matchArrayObjects(data, dropdownEl, parameter) {
  console.log("matchArrayObjects working");
  const selectedValue = dropdownEl.value;
  const match = data.filter((object) => selectedValue === object[parameter]);
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
}
