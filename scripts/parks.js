console.log("Parks JS working");

const locationDropdownEl = document.getElementById("locationDropdown");
const parkTypeDropdownEl = document.getElementById("parkTypeDropdown");
populateDropdown(parkTypesArray.sort(), parkTypeDropdownEl);
populateDropdown(locationsArray, locationDropdownEl);
function populateDropdown(data, dropdownEl) {
  console.log("populateDropdown working");
  data.forEach((entry) => {
    const dropdownOptions = new Option(entry);
    dropdownEl.appendChild(dropdownOptions);
  });
}
