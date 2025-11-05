const accidentData = [
  { year: 2021, state: "Telangana", deaths: 4500, injuries: 12000 },
  { year: 2021, state: "Kerala", deaths: 2300, injuries: 8000 },
  { year: 2021, state: "Maharashtra", deaths: 5100, injuries: 15000 },
  { year: 2021, state: "Delhi", deaths: 3100, injuries: 6000 },
  { year: 2021, state: "Karnataka", deaths: 4000, injuries: 10000 },
  { year: 2021, state: "Gujarat", deaths: 3500, injuries: 9500 },
  { year: 2021, state: "Uttar Pradesh", deaths: 5700, injuries: 16000 },
  { year: 2021, state: "Rajasthan", deaths: 3900, injuries: 11000 },
  { year: 2021, state: "Punjab", deaths: 2500, injuries: 7200 },
  { year: 2021, state: "Haryana", deaths: 2800, injuries: 7800 },

  { year: 2022, state: "Telangana", deaths: 4700, injuries: 12500 },
  { year: 2022, state: "Kerala", deaths: 2400, injuries: 8500 },
  { year: 2022, state: "Maharashtra", deaths: 5300, injuries: 15500 },
  { year: 2022, state: "Delhi", deaths: 3200, injuries: 6300 },
  { year: 2022, state: "Karnataka", deaths: 4200, injuries: 10500 },
  { year: 2022, state: "Gujarat", deaths: 3700, injuries: 9800 },
  { year: 2022, state: "Uttar Pradesh", deaths: 5900, injuries: 16500 },
  { year: 2022, state: "Rajasthan", deaths: 4100, injuries: 11300 },
  { year: 2022, state: "Punjab", deaths: 2600, injuries: 7500 },
  { year: 2022, state: "Haryana", deaths: 3000, injuries: 8200 },

  { year: 2023, state: "Telangana", deaths: 5000, injuries: 13000 },
  { year: 2023, state: "Kerala", deaths: 2100, injuries: 7600 },
  { year: 2023, state: "Maharashtra", deaths: 5500, injuries: 16000 },
  { year: 2023, state: "Delhi", deaths: 2900, injuries: 5900 },
  { year: 2023, state: "Karnataka", deaths: 4300, injuries: 10800 },
  { year: 2023, state: "Gujarat", deaths: 3900, injuries: 10000 },
  { year: 2023, state: "Uttar Pradesh", deaths: 6100, injuries: 17000 },
  { year: 2023, state: "Rajasthan", deaths: 4300, injuries: 11600 },
  { year: 2023, state: "Punjab", deaths: 2700, injuries: 7800 },
  { year: 2023, state: "Haryana", deaths: 3100, injuries: 8400 },

  { year: 2024, state: "Telangana", deaths: 5200, injuries: 13200 },
  { year: 2024, state: "Kerala", deaths: 2200, injuries: 7800 },
  { year: 2024, state: "Maharashtra", deaths: 5700, injuries: 16500 },
  { year: 2024, state: "Delhi", deaths: 3100, injuries: 6100 },
  { year: 2024, state: "Karnataka", deaths: 4500, injuries: 11200 },
  { year: 2024, state: "Gujarat", deaths: 4000, injuries: 10300 },
  { year: 2024, state: "Uttar Pradesh", deaths: 6300, injuries: 17200 },
  { year: 2024, state: "Rajasthan", deaths: 4400, injuries: 11800 },
  { year: 2024, state: "Punjab", deaths: 2800, injuries: 8000 },
  { year: 2024, state: "Haryana", deaths: 3200, injuries: 8600 },
];

const yearSelect = document.getElementById("yearSelect");
const stateSelect = document.getElementById("stateSelect");
const showBtn = document.getElementById("showBtn");
const compareCheckbox = document.getElementById("compareCheckbox");

let chart1, chart2;

showBtn.addEventListener("click", () => {
  if (compareCheckbox.checked) compareYears();
  else showNormalData();
});

function showNormalData() {
  const year = parseInt(yearSelect.value);
  const state = stateSelect.value;

  let filtered = accidentData.filter(d => d.year === year);
  if (state !== "All") filtered = filtered.filter(d => d.state === state);

  if (filtered.length === 0) {
    alert("No data found for this selection!");
    return;
  }

  const labels = filtered.map(d => d.state);
  const deaths = filtered.map(d => d.deaths);
  const injuries = filtered.map(d => d.injuries);

  if (chart1) chart1.destroy();
  if (chart2) chart2.destroy();

  const ctx1 = document.getElementById("chart1").getContext("2d");
  chart1 = new Chart(ctx1, {
    type: "bar",
    data: {
      labels,
      datasets: [
        { label: "Deaths", data: deaths, backgroundColor: "rgba(255,99,132,0.6)" },
        { label: "Injuries", data: injuries, backgroundColor: "rgba(54,162,235,0.6)" },
      ]
    },
    options: {
      plugins: { title: { display: true, text: `Deaths & Injuries in ${year}` } },
      responsive: true
    }
  });

  const ctx2 = document.getElementById("chart2").getContext("2d");
  chart2 = new Chart(ctx2, {
    type: "pie",
    data: {
      labels,
      datasets: [{ label: "Deaths Distribution", data: deaths, backgroundColor: ["#FF6384","#36A2EB","#FFCE56","#4BC0C0","#9966FF","#FF9F40"] }]
    },
    options: { plugins: { title: { display: true, text: `Deaths Distribution (${year})` } } }
  });
}

function compareYears() {
  const state = stateSelect.value === "All" ? null : stateSelect.value;
  const years = [...new Set(accidentData.map(d => d.year))];
  const filtered = state ? accidentData.filter(d => d.state === state) : accidentData;

  if (chart1) chart1.destroy();
  if (chart2) chart2.destroy();

  const labels = years;
  const totalDeaths = years.map(y => filtered.filter(d => d.year === y).reduce((sum, d) => sum + d.deaths, 0));

  const ctx1 = document.getElementById("chart1").getContext("2d");
  chart1 = new Chart(ctx1, {
    type: "line",
    data: { labels, datasets: [{ label: "Total Deaths", data: totalDeaths, borderColor: "rgba(75,192,192,1)", tension: 0.3 }] },
    options: { plugins: { title: { display: true, text: `Deaths Trend (${state || "All States"})` } } }
  });

  const ctx2 = document.getElementById("chart2").getContext("2d");
  chart2 = new Chart(ctx2, {
    type: "bar",
    data: { labels, datasets: [{ label: "Total Injuries", data: years.map(y => filtered.filter(d => d.year === y).reduce((sum, d) => sum + d.injuries, 0)), backgroundColor: "rgba(255,159,64,0.6)" }] },
    options: { plugins: { title: { display: true, text: `Injury Trend (${state || "All States"})` } } }
  });
}

