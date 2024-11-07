const apiToken = "tYQjMOGLpioxYCWBrWmPSnybXTZQuuzu";
const stationsApiUrl = "https://www.ncei.noaa.gov/cdo-web/api/v2/stations";
const datasetsApiUrl = "https://www.ncei.noaa.gov/cdo-web/api/v2/datasets";

async function fetchStations() {
  try {
    const response = await fetch(stationsApiUrl, {
      headers: { token: apiToken },
    });
    if (!response.ok)
      throw new Error("Failed to fetch station data from NOAA API");

    const data = await response.json();
    populateTable("stations-table-body", data.results, [
      "id",
      "name",
      "state",
      "latitude",
      "longitude",
    ]);
  } catch (error) {
    console.error("Error fetching station data:", error);
  }
}

// Fetch and display dataset data
async function fetchDatasets() {
  try {
    const response = await fetch(datasetsApiUrl, {
      headers: { token: apiToken },
    });
    if (!response.ok)
      throw new Error("Failed to fetch dataset data from NOAA API");

    const data = await response.json();
    populateTable("datasets-table-body", data.results, [
      "id",
      "name",
      "description",
    ]);
  } catch (error) {
    console.error("Error fetching dataset data:", error);
  }
}

function populateTable(tableBodyId, data, fields) {
  const tableBody = document.getElementById(tableBodyId);
  tableBody.innerHTML = "";
  data.forEach((item) => {
    const row = document.createElement("tr");

    fields.forEach((field) => {
      const cell = document.createElement("td");
      cell.textContent = item[field] || "N/A";
      row.appendChild(cell);
    });

    tableBody.appendChild(row);
  });
}

fetchStations();
fetchDatasets();
