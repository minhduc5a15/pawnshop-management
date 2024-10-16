fetch("tran_data.json")
  .then((response) => response.json())
  .then((data) => {
    const tbody = document.getElementById("tbody");
    let i = 1;
    data.forEach((item) => {
      const row = document.createElement("tr");
      row.setAttribute("data-status", item.status);
      row.setAttribute("class", "even:bg-gray-400 odd:bg-white");

      row.innerHTML = `
        <td class="p-2.5 text-center">${item.id}</td>
        <td class="p-2.5 text-center">${item.customer}</td>
        <td class="p-2.5 text-center">${item.loan}</td>
        <td class="p-2.5 text-center">${item.interest_rate}</td>
        <td class="p-2.5 text-center">${item.date_created}</td>
        <td class="p-2.5 text-center">${item.expiration_date}</td>
        <td class="p-2.5 text-center">${item.status}</td>
        `;

      tbody.appendChild(row);
    });
  });

  

function filterTableStatus() {
  let y = 1;
  const filterValue = document.getElementById("statusFilter").value;
  const rows = document.getElementById("tbody").getElementsByTagName("tr");

  // Lặp qua tất cả các hàng của bảng
  for (let i = 0; i < rows.length; i++) {
    const rowStatus = rows[i].getAttribute("data-status");
    rows[i].setAttribute("class", "");

    // Kiểm tra điều kiện lọc
    if (filterValue === "all" || rowStatus === filterValue) {
      rows[i].style.display = ""; // Hiển thị hàng phù hợp
      if(y % 2 == 0){
        rows[i].setAttribute("class", "bg-gray-400");
        y++;
      }
      else{
        rows[i].setAttribute("class", "bg-white");
        y++;
      }
    } else {
      rows[i].style.display = "none"; // Ẩn hàng không phù hợp
    }
  }
}
