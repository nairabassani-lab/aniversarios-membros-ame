const SUPABASE_URL = 'https://ofcavumxshycjgkqrgkt.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9mY2F2dW14c2h5Y2pna3FyZ2t0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIyOTk0ODgsImV4cCI6MjA4Nzg3NTQ4OH0.YpMzz0zoUo_E3bugkq9yN9dl_tkDoKUrI2Xp_amn46Y';
const db = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

const membrosIniciais = [
  { nome: "Amélia Gomes", data: "04/01" },
  { nome: "Fernanda Gomes", data: "15/01" },
  { nome: "Janaína", data: "19/01" },
  { nome: "Humberto", data: "19/01" },
  { nome: "Márcio", data: "21/01" },
  { nome: "Rodrigo", data: "26/01" },
  { nome: "Lilian", data: "27/01" },
  { nome: "Sofia", data: "30/01" },
  { nome: "Bernardo", data: "30/01" },
  { nome: "Antonella Gonçalves", data: "07/02" },
  { nome: "Tita", data: "14/02" },
  { nome: "Simone", data: "18/02" },
  { nome: "Cristiane Gonçalves", data: "19/02" },
  { nome: "Davi Cipriano", data: "23/02" },
  { nome: "Helena", data: "26/02" },
  { nome: "Luiza", data: "01/03" },
  { nome: "Valcir", data: "03/03" },
  { nome: "Sarti", data: "09/03" },
  { nome: "Vantuir", data: "10/03" },
  { nome: "Michele Cipriano", data: "10/03" },
  { nome: "Ana", data: "18/03" },
  { nome: "Erika Gomes", data: "18/03" },
  { nome: "Gabriel", data: "25/03" },
  { nome: "Gisa", data: "26/03" },
  { nome: "Laura Barcelos", data: "20/03" },
  { nome: "Gabrieli", data: "04/04" },
  { nome: "Marli", data: "12/04" },
  { nome: "Kaliane", data: "13/04" },
  { nome: "Ceuza", data: "16/04" },
  { nome: "Wagner F. Dalla Lana", data: "22/04" },
  { nome: "Dryelle David", data: "24/04" },
  { nome: "Mayelle", data: "05/05" },
  { nome: "Lucas Dorneles", data: "07/05" },
  { nome: "Danusa", data: "13/05" },
  { nome: "Daniel", data: "20/05" },
  { nome: "Airton", data: "24/05" },
  { nome: "Bruno", data: "24/05" },
  { nome: "Tiago", data: "15/06" },
  { nome: "Letícia Fernanda", data: "19/06" },
  { nome: "Terezinha", data: "27/06" },
  { nome: "Jessika Gomes", data: "06/07" },
  { nome: "Lusardo Neves", data: "09/07" },
  { nome: "Március", data: "10/07" },
  { nome: "Pedro Dutra", data: "12/07" },
  { nome: "Naomi Gomes", data: "14/07" },
  { nome: "Felipe", data: "18/07" },
  { nome: "Marcelo Uberti", data: "20/07" },
  { nome: "Duda A", data: "07/08" },
  { nome: "Rodrigo", data: "12/08" },
  { nome: "Duda P", data: "20/08" },
  { nome: "Valnei", data: "21/08" },
  { nome: "Alice", data: "24/08" },
  { nome: "Gabriel Souza", data: "24/08" },
  { nome: "Janine", data: "30/08" },
  { nome: "Paulo", data: "03/09" },
  { nome: "Grazi", data: "09/09" },
  { nome: "Mariane", data: "14/09" },
  { nome: "Luísa Neves", data: "20/09" },
  { nome: "Natália", data: "27/09" },
  { nome: "Ísis Barreto", data: "27/09" },
  { nome: "Andrieli", data: "28/09" },
  { nome: "Vithor", data: "28/09" },
  { nome: "Eliane", data: "02/10" },
  { nome: "Patrícia", data: "15/10" },
  { nome: "Adria Barreto", data: "17/10" },
  { nome: "Fernanda Argenta", data: "22/10" },
  { nome: "Naira", data: "27/10" },
  { nome: "Alcionir", data: "04/11" },
  { nome: "Franciele", data: "08/11" },
  { nome: "Francisca", data: "15/11" },
  { nome: "Jemima Vautero", data: "20/11" },
  { nome: "Christyn", data: "25/11" },
  { nome: "Carina Schwarke", data: "29/11" },
  { nome: "Fernanda Barcelos", data: "03/12" },
  { nome: "Márcia Rosângela Freitas", data: "09/12" },
  { nome: "Matheus Lara", data: "11/12" },
  { nome: "Grazi", data: "15/12" },
  { nome: "Pietro", data: "17/12" },
  { nome: "Fabiana Ramos", data: "21/12" }
];

function criarEventos(membros) {
  const anoAtual = new Date().getFullYear();
  const eventos = [];
  membros.forEach(m => {
    const dia = String(m.dia).padStart(2, '0');
    const mes = String(m.mes).padStart(2, '0');
    [anoAtual, anoAtual + 1].forEach(ano => {
      eventos.push({
        id: String(m.id) + '-' + ano,
        title: '\uD83C\uDF82 ' + m.nome,
        start: ano + '-' + mes + '-' + dia,
        allDay: true,
        backgroundColor: '#e67e00',
        borderColor: '#e67e00',
        extendedProps: { dbId: m.id, nome: m.nome, dia: m.dia, mes: m.mes, ano: m.ano || '', endereco: m.endereco || '', fotoUrl: m.foto_url || '' }
      });
    });
  });
  return eventos;
}

let calendar;

async function inicializarCalendario() {
  const { data: membros, error } = await db
    .from('aniversariantes')
    .select('id, nome, dia, mes, ano, endereco, foto_url')
    .order('mes')
    .order('dia');

  if (error) {
    console.error('Erro ao carregar aniversariantes:', error.message);
    return;
  }

  const eventos = criarEventos(membros);

  if (calendar) {
    calendar.destroy();
  }

  const calendarEl = document.getElementById('calendar');
  calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: 'dayGridMonth',
    locale: 'pt-br',
    events: eventos,
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,listYear'
    },
    buttonText: {
      today: 'Hoje',
      month: 'Mês',
      list: 'Lista'
    },
    eventClick: function(info) {
      abrirModal(info.event);
    }
  });
  calendar.render();
}

function abrirModal(event) {
  const { dbId, nome, dia, mes, ano, endereco, fotoUrl } = event.extendedProps;

  document.getElementById('edit-id').value = dbId;
  document.getElementById('edit-nome').value = nome;
  document.getElementById('edit-dia').value = dia;
  document.getElementById('edit-mes').value = mes;
  document.getElementById('edit-ano').value = ano || '';
  document.getElementById('edit-endereco').value = endereco || '';
  document.getElementById('edit-foto').value = '';

  const preview = document.getElementById('edit-foto-preview');
  const img = document.getElementById('edit-foto-img');
  if (fotoUrl) {
    img.src = fotoUrl;
    preview.style.display = 'block';
  } else {
    preview.style.display = 'none';
    img.src = '';
  }

  document.getElementById('modal-overlay').style.display = 'flex';
}

function fecharModal() {
  document.getElementById('modal-overlay').style.display = 'none';
}

async function uploadFoto(arquivo, id) {
  const ext = arquivo.name.split('.').pop();
  const caminho = id + '.' + ext;
  const { error } = await db.storage.from('fotos').upload(caminho, arquivo, { upsert: true });
  if (error) { alert('Erro ao enviar foto: ' + error.message); return null; }
  const { data } = db.storage.from('fotos').getPublicUrl(caminho);
  return data.publicUrl;
}

async function salvarEdicao() {
  const id = document.getElementById('edit-id').value;
  const nome = document.getElementById('edit-nome').value.trim();
  const dia = parseInt(document.getElementById('edit-dia').value, 10);
  const mes = parseInt(document.getElementById('edit-mes').value, 10);
  const ano = document.getElementById('edit-ano').value;
  const endereco = document.getElementById('edit-endereco').value.trim();
  const arquivoFoto = document.getElementById('edit-foto').files[0];

  if (!nome || !dia || !mes) {
    alert('Preencha o nome, dia e mês.');
    return;
  }

  let fotoUrl = null;
  if (arquivoFoto) {
    if (arquivoFoto.size > 1.5 * 1024 * 1024) {
      alert('A foto deve ter no máximo 1,5 MB.');
      return;
    }
    fotoUrl = await uploadFoto(arquivoFoto, id);
    if (!fotoUrl) return;
  }

  const campos = { nome, dia, mes, ano: ano ? parseInt(ano, 10) : null, endereco: endereco || null };
  if (fotoUrl) campos.foto_url = fotoUrl;

  const { data: atualizado, error } = await db
    .from('aniversariantes')
    .update(campos)
    .eq('id', id)
    .select();

  if (error) {
    alert('Erro ao salvar: ' + error.message);
    return;
  }

  if (!atualizado || atualizado.length === 0) {
    alert('Permiss\u00e3o negada pelo banco de dados. Execute o script fix_rls_policies.sql no Supabase.');
    return;
  }

  fecharModal();
  await inicializarCalendario();
}

async function excluirAniversariante() {
  const id = document.getElementById('edit-id').value;
  const nome = document.getElementById('edit-nome').value;

  if (!confirm('Deseja excluir "' + nome + '"?')) return;

  const { data: excluido, error } = await db
    .from('aniversariantes')
    .delete()
    .eq('id', id)
    .select();

  if (error) {
    alert('Erro ao excluir: ' + error.message);
    return;
  }

  if (!excluido || excluido.length === 0) {
    alert('Permiss\u00e3o negada pelo banco de dados. Execute o script fix_rls_policies.sql no Supabase.');
    return;
  }

  fecharModal();
  await inicializarCalendario();
}

document.getElementById('modal-overlay').addEventListener('click', function(e) {
  if (e.target === this) fecharModal();
});

async function adicionarAniversariante() {
  const nome = document.getElementById('nome').value.trim();
  const dataISO = document.getElementById('data').value;
  const endereco = document.getElementById('endereco').value.trim();

  if (!nome || !dataISO) {
    alert('Por favor, preencha o nome e a data.');
    return;
  }

  const partes = dataISO.split('-');
  const dia = parseInt(partes[2], 10);
  const mes = parseInt(partes[1], 10);
  const anoNasc = parseInt(partes[0], 10);
  const arquivoFoto = document.getElementById('foto').files[0];

  if (arquivoFoto && arquivoFoto.size > 1.5 * 1024 * 1024) {
    alert('A foto deve ter no máximo 1,5 MB.');
    return;
  }

  // Tenta inserir com o campo 'ano'. Se a coluna não existir ainda, insere sem ele.
  let { data: inserido, error } = await db
    .from('aniversariantes')
    .insert([{ nome, dia, mes, ano: anoNasc, endereco: endereco || null }])
    .select();

  if (error && error.message.toLowerCase().includes('ano')) {
    const resultado = await db
      .from('aniversariantes')
      .insert([{ nome, dia, mes, endereco: endereco || null }])
      .select();
    inserido = resultado.data;
    error = resultado.error;
  }

  if (error) {
    alert('Erro ao adicionar: ' + error.message);
    return;
  }

  if (!inserido || inserido.length === 0) {
    alert('Permissão negada pelo banco de dados. Execute o script fix_rls_policies.sql no Supabase.');
    return;
  }

  // Faz upload da foto se houver
  if (arquivoFoto) {
    const novoId = inserido[0].id;
    const fotoUrl = await uploadFoto(arquivoFoto, novoId);
    if (fotoUrl) {
      await db.from('aniversariantes').update({ foto_url: fotoUrl }).eq('id', novoId);
    }
  }

  alert('Aniversariante adicionado com sucesso!');
  document.getElementById('nome').value = '';
  document.getElementById('data').value = '';
  document.getElementById('endereco').value = '';
  document.getElementById('foto').value = '';

  await inicializarCalendario();
}

document.addEventListener('DOMContentLoaded', inicializarCalendario);
