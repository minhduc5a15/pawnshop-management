const ctxx = document.getElementById("DueToday").getContext("2d");
const myPieChart = new Chart(ctxx, {
  type: "pie", // Loại biểu đồ: 'pie' hoặc 'doughnut'
  data: {
    labels: ["Red", "Blue"],
    datasets: [
      {
        data: [90, 10], // Dữ liệu cho các phần của biểu đồ
        backgroundColor: [
          "rgba(255, 99, 132, 1)", // Màu đỏ
          "rgba(54, 162, 235, 1)", // Màu xanh
        ],
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
        borderWidth: 1,
      },
    ],
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom", // Đặt legend ở bên phải
        labels: {
          usePointStyle: true, // Hiển thị các chấm tròn thay vì ô vuông
        },
      },
      tooltip: {
        enabled: true, // Bật tooltip khi di chuột
      },
    },
  },
});
