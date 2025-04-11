async function buscarUsuarios() {
  const res = await fetch('http://localhost:3000/users');
  const usuarios = await res.json();
  const tbody = document.querySelector('#userTable tbody');
  tbody.innerHTML = '';
  usuarios.forEach(usuario => adicionarUsuarioNaTabela(usuario));
}

function adicionarUsuarioNaTabela(usuario) {
  const tbody = document.querySelector('#userTable tbody');
  const linha = document.createElement('tr');
  Object.entries(usuario).forEach(([chave, valor]) => {
    if (chave !== '_id' && chave !== '__v') {
      const td = document.createElement('td');
      td.contentEditable = true;
      td.innerText = valor;
      td.dataset.key = chave;
      linha.appendChild(td);
    }
  });
  linha.dataset.id = usuario._id;
  linha.addEventListener('blur', () => atualizarUsuario(linha), true);
  tbody.appendChild(linha);
}

async function atualizarUsuario(linha) {
  const id = linha.dataset.id;
  const usuarioAtualizado = {};
  linha.querySelectorAll('td').forEach(td => {
    usuarioAtualizado[td.dataset.key] = td.innerText;
  });
  await fetch('http://localhost:3000/users/' + id, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(usuarioAtualizado)
  });
}

buscarUsuarios();
