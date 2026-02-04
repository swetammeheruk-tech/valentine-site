const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const yesResult = document.getElementById("yesResult");

const envelope = document.getElementById("envelope");
const noteModal = document.getElementById("noteModal");
const closeModal = document.getElementById("closeModal");

const memoryModal = document.getElementById("memoryModal");
const closeMemory = document.getElementById("closeMemory");
const memoryTitle = document.getElementById("memoryTitle");
const memoryText = document.getElementById("memoryText");

const heartsLayer = document.getElementById("hearts");

// YES: reveal the sweet section + confetti-ish hearts burst
yesBtn.addEventListener("click", () => {
  yesResult.classList.remove("hidden");
  burstHearts(18);
  yesBtn.disabled = true;
});

// NO: move away when user tries to hover/tap
function moveNoButton() {
  const padding = 16;
  const vw = window.innerWidth;
  const vh = window.innerHeight;

  const rect = noBtn.getBoundingClientRect();
  const maxX = vw - rect.width - padding;
  const maxY = vh - rect.height - padding;

  const x = Math.max(padding, Math.floor(Math.random() * maxX));
  const y = Math.max(padding, Math.floor(Math.random() * maxY));

  noBtn.style.position = "fixed";
  noBtn.style.left = `${x}px`;
  noBtn.style.top = `${y}px`;
}

noBtn.addEventListener("mouseenter", moveNoButton);
noBtn.addEventListener("click", moveNoButton); // mobile tap

// Envelope modal
envelope.addEventListener("click", () => {
  noteModal.classList.remove("hidden");
  burstHearts(10);
});
closeModal.addEventListener("click", () => noteModal.classList.add("hidden"));
noteModal.addEventListener("click", (e) => {
  if (e.target === noteModal) noteModal.classList.add("hidden");
});

// Memories
document.querySelectorAll(".memory").forEach(btn => {
  btn.addEventListener("click", () => {
    memoryTitle.textContent = btn.dataset.title;
    memoryText.textContent = btn.dataset.text;
    memoryModal.classList.remove("hidden");
    burstHearts(8);
  });
});
closeMemory.addEventListener("click", () => memoryModal.classList.add("hidden"));
memoryModal.addEventListener("click", (e) => {
  if (e.target === memoryModal) memoryModal.classList.add("hidden");
});

// Surprises
document.querySelectorAll(".surprise").forEach(btn => {
  btn.addEventListener("click", () => {
    alert(btn.dataset.msg);
    burstHearts(6);
  });
});

// Floating hearts background
function spawnHeart() {
  const heart = document.createElement("div");
  heart.className = "heart";
  heart.textContent = Math.random() > 0.2 ? "💗" : "💞";
  heart.style.left = `${Math.random() * 100}vw`;
  heart.style.bottom = `-20px`;
  const dur = 6 + Math.random() * 6;
  heart.style.animationDuration = `${dur}s`;
  heart.style.fontSize = `${14 + Math.random() * 18}px`;
  heartsLayer.appendChild(heart);
  setTimeout(() => heart.remove(), dur * 1000);
}
setInterval(spawnHeart, 450);

function burstHearts(n=12){
  for(let i=0;i<n;i++){
    setTimeout(spawnHeart, i*60);
  }
}
