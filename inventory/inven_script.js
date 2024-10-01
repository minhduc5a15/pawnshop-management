fetch('inven_data.json')
.then(response => response.json())
.then(data => {
    const tbody = document.getElementById('tbody');

    data.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>${item.name}</td>
        <td>${item.contract_value}</td>
        <td>${item.mortgage_amount}</td>
        <td>${item.mortgage_date}</td>
        <td>${item.date}</td>
        <td>${item.rate}</td>
        <td>${item.status}</td>
        `;

        tbody.appendChild(row);
    });
})