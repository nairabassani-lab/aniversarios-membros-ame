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
        extendedProps: { dbId: m.id, nome: m.nome, dia: m.dia, mes: m.mes, endereco: m.endereco || '' }
      });
    });
  });
  return eventos;
}

let calendar;

async function inicializarCalendario() {
  const { data: membros, error } = await db
    .from('aniversariantes')
    .select('id, nome, dia, mes, endereco')
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
    },
    datesSet: function() {
      const titulo = document.querySelector('.fc-toolbar-title');
      if (titulo && titulo.textContent) {
        titulo.textContent = titulo.textContent.charAt(0).toUpperCase() + titulo.textContent.slice(1);
      }
    }
  });
  calendar.render();
}

function abrirModal(event) {
  const { dbId, nome, dia, mes, endereco } = event.extendedProps;
  const mesStr = String(mes).padStart(2, '0');
  const diaStr = String(dia).padStart(2, '0');

  document.getElementById('edit-id').value = dbId;
  document.getElementById('edit-nome').value = nome;
  document.getElementById('edit-data').value = new Date().getFullYear() + '-' + mesStr + '-' + diaStr;
  document.getElementById('edit-endereco').value = endereco || '';

  document.getElementById('modal-overlay').style.display = 'flex';
}

function fecharModal() {
  document.getElementById('modal-overlay').style.display = 'none';
}

async function salvarEdicao() {
  const id = document.getElementById('edit-id').value;
  const nome = document.getElementById('edit-nome').value.trim();
  const dataISO = document.getElementById('edit-data').value;
  const endereco = document.getElementById('edit-endereco').value.trim();

  if (!nome || !dataISO) {
    alert('Preencha o nome e a data.');
    return;
  }

  const partes = dataISO.split('-');
  const dia = parseInt(partes[2], 10);
  const mes = parseInt(partes[1], 10);

  const { data: atualizado, error } = await db
    .from('aniversariantes')
    .update({ nome, dia, mes, endereco: endereco || null })
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

  const { error } = await db
    .from('aniversariantes')
    .insert([{ nome, dia, mes, endereco: endereco || null }]);

  if (error) {
    alert('Erro ao adicionar: ' + error.message);
    return;
  }

  document.getElementById('nome').value = '';
  document.getElementById('data').value = '';
  document.getElementById('endereco').value = '';

  await inicializarCalendario();
}

document.addEventListener('DOMContentLoaded', inicializarCalendario);
