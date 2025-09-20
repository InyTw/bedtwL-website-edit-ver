
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

const availablePlayers = ["bedtwL", "InyTw", "UnlimitFPS", "Itz_OuO", "CoolCat_487"];

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