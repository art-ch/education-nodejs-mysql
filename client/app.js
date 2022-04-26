"use strict";
document.addEventListener('DOMContentLoaded', () => {
    fetch('http://localhost:5000/getAll')
        .then((response) => response.json())
        .then((data) => loadHTMLTable(data['data']));
});
const loadHTMLTable = (data) => {
    const table = document.querySelector('table tbody');
    //   const tableHTML = '';
    console.log(data);
    if (table && data.length === 0) {
        table.innerHTML = `<tr><td class="no-data" colspan="5">No Data</td></tr>`;
    }
};
