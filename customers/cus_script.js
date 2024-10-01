fetch('https://pawnshop-server.onrender.com/api/customers')
.then(response => response.json())
.then(data => {
    const tbody = document.getElementById('tbody');

    data.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>${item.id}</td>
        <td>${item.name}</td>
        <td>${item.phoneNumber}</td>
        <td>${item.email}</td>
        `;
        tbody.appendChild(row);
    });
})