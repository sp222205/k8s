const API = window.API_URL || "/api";

const root = document.getElementById("root");

async function fetchMessages() {
  const res = await fetch(API + "/messages");
  const data = await res.json();

  root.innerHTML = `
    <h1>Messages</h1>
    <ul>
      ${data.map(m => `<li>${m.text}</li>`).join("")}
    </ul>
    <input id="msg" placeholder="Enter message"/>
    <button onclick="sendMessage()">Send</button>
  `;
}

async function sendMessage() {
  const text = document.getElementById("msg").value;

  await fetch(API + "/messages", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ text })
  });

  fetchMessages();
}

fetchMessages();