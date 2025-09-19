
function copyIP() {
    navigator.clipboard.writeText("bedtwL.com").then(() => {
        const button = document.querySelector('.copy-btn');
        button.innerText = "Copied!";
        button.style.backgroundColor = "#4CAF50";

        setTimeout(() => {
            button.innerText = "Copy IP";
            button.style.backgroundColor = "#007BFF";
        }, 2000);
    }).catch(err => {
        console.error("Error copying IP: ", err);
    });
}
const copybtn = document.querySelector('.copy-btn');
if (copybtn) copybtn.addEventListener('click', copyIP);

function navbar() {
    const navbar = document.getElementById("navbar");
    navbar.innerHTML += `<div class="nav-button"><a href="/">Home</a></div>`;
    navbar.innerHTML += `<div class="nav-button"><a href="/api-docs.html">API Docs</a></div>`;
    navbar.innerHTML += `<div class="nav-button"><a href="/stats.html">Player Stats</a></div>`;
}
navbar();
const statsform = document.getElementById("statsform");

if (statsform) {
    statsform.addEventListener("submit", function (e) {
        e.preventDefault();

        const name = document.getElementById("stats").value.trim();
        const result = document.getElementById("result");

        if (!name) {
            result.innerText = "Please enter a player name.";
            return;
        }

        const url = `https://api.bedtwl.com/api/v1/player/bwffa?player=${encodeURIComponent(name)}`;

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error("API error: " + response.status);
                }
                return response.json();
            })
            .then(data => {
                const datae = JSON.stringify(data, null, 2);
                // Replace this with how you want to display the result
                result.innerHTML = `<span>Kills: </span>${datae.kills}</span><span>Deaths: </span><span>${datae.deaths}</span><br><span>Best Kill Streak: </span><span>${datae.best_killstreak}</span><span>Last Kill Streak: </span><span>${datae.last_killstreak}</span><br><span>Skill: </span><span>${datae.skill}</span<br><span>Skill level: </span><span>${datae.skill_levl}</span><br>`;
            })
            .catch(error => {
                result.innerText = "Error fetching data: " + error.message;
            });
    });
}

// 假資料示範，可以換成實際 API
const otherPlayers = [
  { name: "Notch", level: 10, coins: 1234 },
  { name: "Steve", level: 8, coins: 890 },
  { name: "Alex", level: 12, coins: 2345 },
];

const playersGrid = document.getElementById('playersGrid');
otherPlayers.forEach(player => {
  const card = document.createElement('div');
  card.classList.add('player-card');
  card.innerHTML = `
    <h3>${player.name}</h3>
    <p>Level: ${player.level}</p>
    <p>Coins: ${player.coins}</p>
  `;
  playersGrid.appendChild(card);
});

const availablePlayers = ["InyTw", "bedtwL", "Notch", "Steve"];

const playerInput = document.getElementById('playerInput');
const suggestions = document.getElementById('suggestions');

// 顯示建議
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

// 點擊輸入框顯示全部玩家
playerInput.addEventListener('focus', () => {
  showSuggestions();
});

// 輸入文字時篩選建議
playerInput.addEventListener('input', () => {
  const val = playerInput.value;
  showSuggestions(val);
});

// 點擊頁面其他地方隱藏建議
document.addEventListener('click', (e) => {
  if (!playerInput.contains(e.target) && !suggestions.contains(e.target)) {
    suggestions.innerHTML = '';
  }
});


// 取得伺服器即時人數
function updateOnlinePlayers() {
  fetch('https://api.mcsrvstat.us/2/bedtwl.com') // 你的 API URL
    .then(res => res.json())
    .then(data => {
      // 假設 API 回傳 { online: 123, max: 500 }
      document.getElementById('onlinePlayers').textContent =
        `${data.online} / ${data.max} players online`;
    })
    .catch(err => {
      console.error(err);
      document.getElementById('onlinePlayers').textContent = "Error fetching data";
    });
}

// 初始載入時更新一次
updateOnlinePlayers();

// 每 30 秒自動更新一次
setInterval(updateOnlinePlayers, 30000);

function toggleMenu() {
  document.querySelector(".navbar").classList.toggle("show");
}
