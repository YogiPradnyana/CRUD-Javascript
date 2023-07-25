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

// renderNomer
function renderNumber() {
  const numberElements = document.querySelectorAll('.number');
  let length = numberElements.length;

  let iteration = 0;
  for (let i = 0; i < length; i++) {
    iteration = i + 1;
    numberElements[i].innerHTML = iteration;
    console.log(iteration);
  }
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
            <td class="number"></td>
            <td>${nama}</td>
            <td>${nim}</td>
            <td>${jurusan}</td>
            <td>
                <a href="#" class="btn btn-warning btn-sm edit">Edit</a>
                <a href="#" class="btn btn-danger btn-sm hapus">Hapus</a>
            </td>
            `;
      list.appendChild(tr);
      renderNumber();

      showAlert('Mahasiswa has been added', 'success');
      selectedRow = null;
    } else {
      selectedRow.children[1].textContent = nama;
      selectedRow.children[2].textContent = nim;
      selectedRow.children[3].textContent = jurusan;
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
    document.querySelector('#nama').value = selectedRow.children[1].textContent;
    document.querySelector('#nim').value = selectedRow.children[2].textContent;
    document.querySelector('#jurusan').value = selectedRow.children[3].textContent;
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
      renderNumber();
    } else {
      selectedRow = null;
    }
  }
});
