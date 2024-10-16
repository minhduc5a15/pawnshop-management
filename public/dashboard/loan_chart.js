const data = {
  labels: [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ],
  datasets: [
    {
      label: "Sales ($)",
      data: [12000, 15000, 8000, 18000, 20000, 22000, 25000],
      backgroundColor: ["rgb(44, 123, 229)"],
      barThickness: 10,
      maxBarThickness: 15,
    },
  ],
};

const config = {
  type: "bar",
  data: data,
  options: {
    scales: {
      x: {
        display: false,
      },
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        position: "bottom",
        // display: false,
      },
    },
  },
};

const weeklySalesChart = new Chart(document.getElementById("Loans"), config);
