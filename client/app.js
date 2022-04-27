"use strict";
var _a;
document.addEventListener('DOMContentLoaded', () => {
    fetch('http://localhost:5000/getAll')
        .then((response) => response.json())
        .then((data) => loadHTMLTable(data['data']));
});
(_a = document.querySelector('table tbody')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', (e) => {
    var _a;
    // @ts-expect-error
    if (e.target.className === 'delete-row-btn') {
        // @ts-expect-error
        const id = e.target.dataset.id;
        fetch(`http://localhost:5000/delete/${id}`, { method: 'DELETE' })
            .then((response) => response.json())
            .then((data) => {
            if (data.success) {
                location.reload();
            }
        });
    }
    // @ts-expect-error
    if (e.target.className === 'edit-row-btn') {
        // @ts-expect-error
        const id = e.target.dataset.id;
        const updateSection = (document.querySelector('#update-name'));
        updateSection.hidden = false;
        // @ts-expect-error
        (_a = document.querySelector('#update-name-input')) === null || _a === void 0 ? void 0 : _a.dataset.id = id;
    }
});
const addBtn = document.querySelector('#add-name-btn');
const updateBtn = document.querySelector('#update-name-btn');
const searchBtn = document.querySelector('#search-btn');
addBtn === null || addBtn === void 0 ? void 0 : addBtn.addEventListener('click', () => {
    const nameInput = document.querySelector('#name-input');
    const name = nameInput === null || nameInput === void 0 ? void 0 : nameInput.value;
    nameInput.value = '';
    fetch('http://localhost:5000/insert', {
        headers: {
            'Content-type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({ name })
    })
        .then((response) => response.json())
        .then((data) => insertRowIntoTable(data['data']));
});
updateBtn.addEventListener('click', () => {
    const updateNameInput = (document.querySelector('#update-name-input'));
    fetch(`http://localhost:5000/update`, {
        method: 'PATCH',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            id: updateNameInput.dataset.id,
            name: updateNameInput.value
        })
    })
        .then((response) => response.json())
        .then((data) => {
        if (data.success) {
            location.reload();
        }
    });
});
searchBtn.addEventListener('click', () => {
    const search = document.querySelector('#search-input');
    const searchValue = search.value;
    fetch(`http://localhost:5000/search/${searchValue}`)
        .then((response) => response.json())
        .then((data) => loadHTMLTable(data['data']));
});
const loadHTMLTable = (data) => {
    const table = document.querySelector('table tbody');
    if (data.length === 0) {
        table.innerHTML = `<tr><td class="no-data" colspan="5">No Data</td></tr>`;
        return;
    }
    let tableHTML = '';
    data.forEach(({ id, name, date_added }) => {
        tableHTML += '<tr>';
        tableHTML += `<td>${id}</td>`;
        tableHTML += `<td>${name}</td>`;
        tableHTML += `<td>${new Date(date_added).toLocaleString()}</td>`;
        tableHTML += `<td><button class="edit-row-btn" data-id=${id}>Edit</button></td>`;
        tableHTML += `<td><button class="delete-row-btn" data-id=${id}>Delete</button></td>`;
        tableHTML += '</tr>';
    });
    table.innerHTML = tableHTML;
};
const insertRowIntoTable = (data) => {
    const table = document.querySelector('table tbody');
    const isTableData = table.querySelector('.no-data');
    let tableHTML = '<tr>';
    for (let key in data) {
        if (data.hasOwnProperty(key)) {
            if (key === 'dateAdded') {
                data[key] = new Date(data[key]).toLocaleString();
            }
            tableHTML += `<td>${data[key]}</td>`;
        }
    }
    tableHTML += `<td><button class="edit-row-btn" data-id=${data.id}>Edit</button></td>`;
    tableHTML += `<td><button class="delete-row-btn" data-id=${data.id}>Delete</button></td>`;
    tableHTML += '</tr>';
    if (isTableData) {
        table.innerHTML = tableHTML;
    }
    else {
        const newRow = table.insertRow();
        newRow.innerHTML = tableHTML;
    }
};
