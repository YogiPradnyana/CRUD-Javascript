let selectedRow = null;

// Show ALert
function showAlert(message, className) {
  const div = document.createElement('div');
  div.className = `alert alert-${className}`;
  div.appendChild(document.createTextNode(message));

  const container = document.querySelector('.container');
  const main = document.querySelector('.main');
  container.insertBefore(div, main);

  setTimeout(() => {
    document.querySelector('.alert').remove();
  }, 3000);
}

// Clear Fields
function clearFields() {
  document.querySelector('#nama').value = '';
  document.querySelector('#nim').value = '';
  document.querySelector('#jurusan').value = '';
}

// Add Data
document.querySelector('.add-btn').addEventListener('click', () => {
  // Get Fields
  const nama = document.querySelector('#nama').value;
  const nim = document.querySelector('#nim').value;
  const jurusan = document.querySelector('#jurusan').value;

  // Validated
  if (nama == '' || nim == '' || jurusan == '') {
    showAlert('All data must be filled in', 'danger');
  } else {
    if (selectedRow == null) {
      const list = document.querySelector('#mahasiswa-list');
      const tr = document.createElement('tr');
      tr.innerHTML = `
            <td>${nama}</td>
            <td>${nim}</td>
            <td>${jurusan}</td>
            <td>
                <a href="#" class="btn btn-warning btn-sm edit">Edit</a>
                <a href="#" class="btn btn-danger btn-sm hapus">Hapus</a>
            </td>
            `;
      list.appendChild(tr);

      showAlert('Mahasiswa has been added', 'success');
      selectedRow = null;
    } else {
      selectedRow.children[0].textContent = nama;
      selectedRow.children[1].textContent = nim;
      selectedRow.children[2].textContent = jurusan;
      showAlert('Mahasiswa has been edited', 'info');
      selectedRow = null;
    }
  }

  clearFields();
});

// Edit Data
document.querySelector('#mahasiswa-list').addEventListener('click', (e) => {
  let target = e.target;
  selectedRow = target.parentElement.parentElement;
  if (target.classList.contains('edit')) {
    document.querySelector('#nama').value = selectedRow.children[0].textContent;
    document.querySelector('#nim').value = selectedRow.children[1].textContent;
    document.querySelector('#jurusan').value = selectedRow.children[2].textContent;
  }
});

// Delete Data
document.querySelector('#mahasiswa-list').addEventListener('click', (e) => {
  let target = e.target;
  if (target.classList.contains('hapus')) {
    if (confirm('Apakah anda yakin?')) {
      target.parentElement.parentElement.remove();
      showAlert('Mahasiswa has been deleted', 'danger');
      selectedRow = null;
      clearFields();
    } else {
      selectedRow = null;
    }
  }
});
