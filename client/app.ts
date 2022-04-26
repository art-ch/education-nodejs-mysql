document.addEventListener('DOMContentLoaded', () => {
  loadHTMLTable([]);
});

const loadHTMLTable = (data: any) => {
  const table = document.querySelector('table tbody');
  //   const tableHTML = '';

  if (table && data.length === 0) {
    table.innerHTML = `<tr><td class="no-data" colspan="5">No Data</td></tr>`;
  }
};
