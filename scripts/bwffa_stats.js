// BWFFA stats

  const availablePlayers = ["bedtwL", "InyTw", "UnlimitFPS", "Itz_OuO", "CoolCat_487"];
  const playerInput = document.getElementById('playerInput');
  const suggestions = document.getElementById('suggestions');
  const form = document.getElementById('playerForm');
  const resultDiv = document.getElementById('result');
  const resultContent = document.getElementById('resultContent');

function showSuggestions(filter = "") {
  suggestions.innerHTML = '';
  const filtered = availablePlayers.filter(p => p.toLowerCase().includes(filter.toLowerCase()));
  filtered.forEach(p => {
    const div = document.createElement('div');
    div.textContent = p;
    div.addEventListener('click', () => {
      playerInput.value = p;
      suggestions.innerHTML = '';
    });
    suggestions.appendChild(div);
  });
}

  function showSuggestions(filter = '') {
    suggestions.innerHTML = '';
    let filtered = availablePlayers;

    if (filter) {
      const val = filter.toLowerCase();
      filtered = availablePlayers.filter(p => p.toLowerCase().includes(val));
    }

    filtered.forEach(p => {
      const div = document.createElement('div');
      div.textContent = p;
      div.addEventListener('mousedown', () => {
        playerInput.value = p;
        suggestions.innerHTML = '';
        form.dispatchEvent(new Event('submit', {cancelable: true, bubbles: true}));
      });
      suggestions.appendChild(div);
    });

    suggestions.style.display = filtered.length ? 'block' : 'none';
  }

  playerInput.addEventListener('focus', () => showSuggestions());
  playerInput.addEventListener('input', () => showSuggestions(playerInput.value));
  playerInput.addEventListener('blur', () => setTimeout(() => suggestions.style.display='none', 100));

  form.addEventListener('submit', function(e){
    e.preventDefault();
    const player = playerInput.value.trim();
    if (!player) return;

    fetch(`https://api.bedtwl.com/api/v1/player/bwffa?player=${encodeURIComponent(name)}`)
      .then(res => {
        if (!res.ok) throw new Error("Player not found or API error");
        return res.json();
      })
      .then(data => {
        resultContent.textContent = `{
  Kills: ${datae.kills},
  Deaths: ${datae.deaths},
  Best Kill Streak: ${datae.best_killstreak},
  Last Kill Streak: ${datae.last_killstreak},
  Skill: ${datae.skill},
  Skill level: ${datae.skill_levl}
}`;
        resultDiv.style.display = "block";
      })
      .catch(err => {
        resultContent.textContent = `Error: ${err.message}`;
        resultDiv.style.display = "block";
      });
  });