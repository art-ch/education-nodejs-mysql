document.addEventListener('DOMContentLoaded', () => {
  fetch('http://localhost:5000/getAll')
    .then((response) => response.json())
    .then((data) => loadHTMLTable(data['data']));
});

document.querySelector('table tbody')?.addEventListener('click', (e) => {
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
    const updateSection = <HTMLDivElement>(
      document.querySelector('#update-name')
    );
    updateSection.hidden = false;
    // @ts-expect-error
    document.querySelector('#update-name-input')?.dataset.id = id;
  }
});

const addBtn = <HTMLButtonElement>document.querySelector('#add-name-btn');
const updateBtn = <HTMLButtonElement>document.querySelector('#update-name-btn');
const searchBtn = <HTMLButtonElement>document.querySelector('#search-btn');

addBtn?.addEventListener('click', () => {
  const nameInput = <HTMLInputElement>document.querySelector('#name-input');
  const name = nameInput?.value;
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
  const updateNameInput = <HTMLInputElement>(
    document.querySelector('#update-name-input')
  );

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
  const search = <HTMLInputElement>document.querySelector('#search-input');
  const searchValue = search.value;

  fetch(`http://localhost:5000/search/${searchValue}`)
    .then((response) => response.json())
    .then((data) => loadHTMLTable(data['data']));
});

const loadHTMLTable = (data: any) => {
  const table = <HTMLTableElement>document.querySelector('table tbody');
  if (data.length === 0) {
    table.innerHTML = `<tr><td class="no-data" colspan="5">No Data</td></tr>`;
    return;
  }
  let tableHTML = '';

  data.forEach(({ id, name, date_added }: any) => {
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

const insertRowIntoTable = (data: any) => {
  const table = <HTMLTableElement>document.querySelector('table tbody');
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
  } else {
    const newRow = table.insertRow();
    newRow.innerHTML = tableHTML;
  }
};
