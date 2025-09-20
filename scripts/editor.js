if(!sessionStorage.getItem("loggedInUser")) {
  alert("Unauthorized!"); 
  window.location.href = "login.html";
}

// 從 localStorage 或 JSON 檔讀新聞
let newsItems = JSON.parse(localStorage.getItem("newsItems")) || [];

function renderNewsList() {
  const list = document.getElementById("newsList");
  list.innerHTML = "";
  newsItems.forEach(item => {
    const div = document.createElement("div");
    div.innerHTML = `${item.id} - ${item.title} <button onclick="editNews('${item.id}')">Edit</button>`;
    list.appendChild(div);
  });
}
renderNewsList();

document.getElementById("newsForm").addEventListener("submit", e=>{
  e.preventDefault();
  const id = document.getElementById("newsId").value;
  const title = document.getElementById("newsTitle").value;
  const content = document.getElementById("newsContent").value;
  const date = document.getElementById("newsDate").value;

  const existingIndex = newsItems.findIndex(n=>n.id===id);
  if(existingIndex>=0) newsItems[existingIndex]={id,title,content,date};
  else newsItems.push({id,title,content,date});

  localStorage.setItem("newsItems", JSON.stringify(newsItems));
  renderNewsList();
  alert("Saved!");
});

function editNews(id) {
  const item = newsItems.find(n=>n.id===id);
  document.getElementById("newsId").value = item.id;
  document.getElementById("newsTitle").value = item.title;
  document.getElementById("newsContent").value = item.content;
  document.getElementById("newsDate").value = item.date;
}
