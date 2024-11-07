const apiToken = "tYQjMOGLpioxYCWBrWmPSnybXTZQuuzu";
const apiUrl = "https://www.ncei.noaa.gov/cdo-web/api/v2/stations";

async function fetchStations() {
  try {
    const response = await fetch(apiUrl, {
      headers: {
        token: apiToken,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch data from NOAA API");
    }

    const data = await response.json();
    populateTable(data.results);
  } catch (error) {
    console.error("Error fetching station data:", error);
  }
}

function populateTable(stations) {
  const tableBody = document.getElementById("table-body");
  tableBody.innerHTML = "";

  stations.forEach((station) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${station.id}</td>
      <td>${station.name || "N/A"}</td>
      <td>${station.state || "N/A"}</td>
      <td>${station.latitude}</td>
      <td>${station.longitude}</td>
    `;

    tableBody.appendChild(row);
  });
}

fetchStations();
