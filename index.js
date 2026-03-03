// const tickets = ;

let loading = true;

function init(tickets = []) {
  const container = document.getElementById('grid');

  container.innerHTML = '<div  class="loading">Загрузка билетов...</div>';

  container.innerHTML = '';
  const shuffled = [...tickets].sort(() => Math.random() - 0.5);

  shuffled.forEach((t, i) => {
    const card = document.createElement('div');
    card.className = 'card';
    card.onclick = (e) => {
      if (e.target.closest('.lamp-btn')) return;
      card.classList.toggle('is-flipped');
    };

    card.innerHTML = `
    <div class="card-inner">
      <div class="side front">
        <h3>${i + 1}</h3>
        <span>REACT EXAM</span>
      </div>
      <div class="side back">
        <div class="question">${t.q}</div>
        <button class="lamp-btn" onclick="showAns(this)">💡 Подсказка</button>
        <div class="answer">${t.a}</div>
      </div>
    </div>
    `;
    container.appendChild(card);
  });

}

function showAns(btn) {
  const ans = btn.nextElementSibling;
  ans.classList.toggle('show');
  btn.innerText = ans.classList.contains('show') ? '❌ Скрыть' : '💡 Подсказка';
}


async function fetchTickets() {
  const res = await fetch('https://69a69d302cd1d055268e501e.mockapi.io/api/tickets/list');
  const data = await res.json();
  init(data);
}

fetchTickets()