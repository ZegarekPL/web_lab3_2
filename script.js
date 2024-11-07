const apiToken = "tYQjMOGLpioxYCWBrWmPSnybXTZQuuzu";
const stationsApiUrl = "https://www.ncei.noaa.gov/cdo-web/api/v2/stations";
const datasetsApiUrl = "https://www.ncei.noaa.gov/cdo-web/api/v2/datasets";
const dataApiUrl = "https://www.ncei.noaa.gov/cdo-web/api/v2/data";

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
      "mindate",
      "maxdate",
    ]);
  } catch (error) {
    console.error("Error fetching dataset data:", error);
  }
}

async function fetchClimateData(datasetid, locationid, startdate, enddate) {
  try {
    //const url = `${dataApiUrl}?datasetid=${datasetid}&locationid=${locationid}&startdate=${startdate}&enddate=${enddate}`;
    const url =
      "https://www.ncei.noaa.gov/cdo-web/api/v2/data?datasetid=GHCND&locationid=ZIP:28801&startdate=2010-05-01&enddate=2010-05-01";
    const response = await fetch(url, {
      headers: { token: apiToken },
    });
    if (!response.ok)
      throw new Error("Failed to fetch climate data from NOAA API");
    const data = await response.json();
    populateTable("data-table-body", data.results, [
      "date",
      "datatype",
      "value",
      "station",
    ]);
  } catch (error) {
    console.error("Error fetching climate data:", error);
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

document
  .getElementById("data-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const datasetid = document.getElementById("datasetid").value;
    const locationid = document.getElementById("locationid").value;
    const startdate = document.getElementById("startdate").value;
    const enddate = document.getElementById("enddate").value;

    fetchClimateData(datasetid, locationid, startdate, enddate);
  });

fetchStations();
fetchDatasets();
