
document.getElementById('btn_TranHis').addEventListener('click', function() {
    Change_page('TranHis');
});
document.getElementById('btn_NewTran').addEventListener('click', function() {
    Change_page('NewTran');
});
document.getElementById('btn_TranX').addEventListener('click', function() {
    Change_page('TranX');
});

function Change_page(x) {
    document.getElementById('TranHis').style.display = 'none';
    document.getElementById('NewTran').style.display = 'none';
    document.getElementById('TranX').style.display = 'none';

    if(x == 'TranHis'){
        document.getElementById(x).style.display = 'block';
        document.getElementById('active').style.transform = 'translateX(75%)';
    }
    if(x == 'NewTran'){
        document.getElementById(x).style.display = 'flex';
        document.getElementById('active').style.transform = 'translateX(325%)';
    }
    if(x == 'TranX'){
        document.getElementById(x).style.display = 'flex';
        document.getElementById('active').style.transform = 'translateX(575%)';
    }
}


fetch('trans_data.json')
.then(response => response.json())
.then(data => {
    const tbody = document.getElementById('tbody');

    data.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>${item.id}</td>
        <td>${item.customer}</td>
        <td>${item.loan}</td>
        <td>${item.interest_rate}</td>
        <td>${item.date_created}</td>
        <td>${item.expiration_date}</td>
        <td>${item.status}</td>
        `;

        tbody.appendChild(row);
    });
})