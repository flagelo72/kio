const messages = [
  "Te amo muchísimo ❤️🥰",
  "Gracias por estar en mi vida 🌟✨",
  "Eres mi persona favorita 💕👨‍👧",
  "Tu sonrisa me da alegría 😊💫",
  "Sos el mejor padre 💪👑",
  "Verte cansado hace que quiera sacarte una sonrisa 🥹💖",
  "Eres lo mejor que me ha pasado 🧸💘",
  "Tus detalles son los mejores 🎁💝",
  "Tu amor me guía 🧭💓",
  "Tus abrazos son mi refugio favorito 🤗🏡",
  "Gracias por enseñarme lo que es la fortaleza 🛡️❤️‍🔥",
  "Te amo, pa 💖👨‍👧"
];
const heartEmojis = [
    "❤️"
];

function createTextBubble() {
  const bubble = document.createElement("div");
  bubble.className = "text-bubble";
  bubble.innerText = messages[Math.floor(Math.random() * messages.length)];

  const left = Math.random() * 80 + 10;
  const top = Math.random() * 80 + 10;

  bubble.style.left = left + "vw";
  bubble.style.top = top + "vh";

  const container = document.getElementById("bubbles-text");
  container.appendChild(bubble);

  setTimeout(() => bubble.remove(), 6000);
}

setInterval(createTextBubble, 1200);

function createHeart() {
  const heart = document.createElement("div");
  heart.className = "heart";
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.animationDuration = Math.random() * 3 + 4 + "s";
  heart.style.width = heart.style.height = Math.random() * 15 + 10 + "px";

  document.getElementById("heart-container").appendChild(heart);

  setTimeout(() => heart.remove(), 8000);
}

setInterval(createHeart, 500);


let emojiInterval = null;

function mostrarVideo() {
  const container = document.getElementById("video-container");
  const video = document.getElementById("video-padre");

  container.style.display = "block";
  video.play();

  // Comenzar generación constante de emojis
  if (!emojiInterval) {
    emojiInterval = setInterval(generarEmojiCorazones, 400);
  }

  // Cuando el video termine, detener los emojis
  video.onended = () => {
    clearInterval(emojiInterval);
    emojiInterval = null;
  };
}

function generarEmojiCorazones() {
  const contenedor = document.getElementById("emoji-container");
  const emojis = ["❤️", "💖", "💘", "💕", "💞", "🩷", "💗", "💓"];
  const emoji = document.createElement("div");

  emoji.className = "emoji-heart";
  emoji.innerText = emojis[Math.floor(Math.random() * emojis.length)];
  emoji.style.left = Math.random() * 90 + "vw";
  emoji.style.top = Math.random() * 80 + "vh";

  contenedor.appendChild(emoji);

  setTimeout(() => emoji.remove(), 4000);
}


function ocultarBoton(){
  const Boton= document.getElementById('boton');

  Boton.style.display='none';
}

