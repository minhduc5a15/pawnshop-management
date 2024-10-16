var ctx = document.getElementById("Customer").getContext("2d");
var myChart = new Chart(ctx, {
  type: "line",
  data: {
    labels: [
      "01 May",
      "05 May",
      "10 May",
      "15 May",
      "20 May",
      "25 May",
      "30 May",
    ],
    datasets: [
      {
        label: "May",
        data: [100, 200, 300, 500, 400, 300, 200],
        fill: false,
        backgroundColor: "rgb(44, 123, 229)",
        borderColor: "rgb(44, 123, 229)",
        tension: 0.1,
        pointRadius: 0,
      },
      {
        label: "April",
        data: [50, 50, 50, 50, 200, 300, 400],
        fill: false,
        backgroundColor: "rgba(44, 123, 229, 0.5)",
        borderColor: "rgba(44, 123, 229, 0.3)",
        tension: 0.1,
        pointRadius: 0,
      },
    ],
  },
  options: {
    responsive: true,
    interaction: {
      mode: "index", // Hiển thị tất cả các điểm theo tọa độ x
      intersect: false, // Không yêu cầu di chuột trực tiếp lên điểm để kích hoạt
    },
    scales: {
      x: {
        display: false,
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        // display: false,
        position: "bottom",
      },
      tooltip: {
        enabled: true,
      },
    },
  },
});
