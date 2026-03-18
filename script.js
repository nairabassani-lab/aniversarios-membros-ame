let calendar;
let eventos = JSON.parse(localStorage.getItem('aniversarios')) || [];
document.addEventListener('DOMContentLoaded', function() {
  const calendarEl = document.getElementById('calendar');
  calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: 'dayGridMonth',
    locale: 'pt-br',
    events: eventos,
    eventColor: '#F57C00'
  });
  calendar.render();
});

function adicionarAniversariante() {
  const nome = document.getElementById('nome').value;
  const data = document.getElementById('data').value;
  const endereco = document.getElementById('endereco').value;
  if (!nome || !data) {
    alert('Preencha nome e data!');
    return;
  }
  const evento = {
    title: nome + ' 🎂',
    start: data,
    description: endereco
  };
  eventos.push(evento);
  localStorage.setItem('aniversarios', JSON.stringify(eventos));
  calendar.addEvent(evento);
  document.getElementById('nome').value = '';
  document.getElementById('data').value = '';
  document.getElementById('endereco').value = '';
}