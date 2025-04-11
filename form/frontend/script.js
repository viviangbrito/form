async function fetchUsers() {
  const res = await fetch('http://localhost:3000/users');
  const users = await res.json();
  const tbody = document.querySelector('#userTable tbody');
  tbody.innerHTML = '';
  users.forEach(user => addUserToTable(user));
}

function addUserToTable(user) {
  const tbody = document.querySelector('#userTable tbody');
  const row = document.createElement('tr');
  Object.entries(user).forEach(([key, value]) => {
    if (key !== '_id' && key !== '__v') {
      const td = document.createElement('td');
      td.contentEditable = true;
      td.innerText = value;
      td.dataset.key = key;
      row.appendChild(td);
    }
  });
  row.dataset.id = user._id;
  row.addEventListener('blur', () => updateUser(row), true);
  tbody.appendChild(row);
}

async function updateUser(row) {
  const id = row.dataset.id;
  const updatedUser = {};
  row.querySelectorAll('td').forEach(td => {
    updatedUser[td.dataset.key] = td.innerText;
  });
  await fetch('http://localhost:3000/users/' + id, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedUser)
  });
}

function addUserRow() {
  const tbody = document.querySelector('#userTable tbody');
  const row = document.createElement('tr');
  const keys = ['name', 'email', 'age', 'phone', 'city', 'state', 'country', 'role', 'status'];
  keys.forEach(key => {
    const td = document.createElement('td');
    td.contentEditable = true;
    td.dataset.key = key;
    row.appendChild(td);
  });
  const saveBtn = document.createElement('button');
  saveBtn.innerText = 'Save';
  saveBtn.onclick = async () => {
    const newUser = {};
    row.querySelectorAll('td').forEach(td => {
      newUser[td.dataset.key] = td.innerText;
    });
    const res = await fetch('http://localhost:3000/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newUser)
    });
    const savedUser = await res.json();
    row.remove();
    addUserToTable(savedUser);
  };
  row.appendChild(saveBtn);
  tbody.appendChild(row);
}

fetchUsers();
