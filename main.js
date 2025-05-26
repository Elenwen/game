function getCircle(id) {
  return document.getElementById(id);
}
const replay = document.getElementById("replay");
const cadre = document.querySelector("div");

const circle1 = getCircle("1");
const circle2 = getCircle("2");
const circle3 = getCircle("3");
const circle4 = getCircle("4");
const circle5 = getCircle("5");
const circle6 = getCircle("6");

const size = document.querySelector("div");

let loopTimeoutId = null;
let score = 0;
let missed = 0;
let regame = false;
const scoreinput = document.getElementById("score");
scoreinput.innerText = `Votre score est de ${score}`;

function showCircle(circle, timeoutMs = 5000) {
  const maxX = size.offsetWidth - circle.offsetWidth;
  const maxY = size.offsetHeight - circle.offsetHeight;
  const x = Math.floor(Math.random() * maxX) * 0.9;
  const y = Math.floor(Math.random() * maxY) * 0.9;
  circle.style.left = `${x}px`;
  circle.style.top = `${y}px`;
  circle.style.display = "block";
  circle.timeoutId = setTimeout(() => {
    circle.style.display = "none";
    missed += 1;
  }, timeoutMs);
}

function hideOnClick(circle) {
  circle.addEventListener("click", function () {
    if (circle.timeoutId) {
      clearTimeout(circle.timeoutId);
      circle.timeoutId = null;
    }
    score = score + 10;
    circle.style.display = "none";
    scoreinput.innerText = `Votre score est de ${score}`;
  });
}
//essayer avec While true
for (let i = 1; i <= 6; i++) {
  const circle = getCircle(i.toString());
  if (circle) hideOnClick(circle);
}
function hideAllCircle() {
  for (let i = 1; i <= 6; i++) {
    const circle = getCircle(i.toString());
    if (circle) circle.style.display = "none";
  }
}

function startGame() {
  missed = 0;
  score = 0;
  let i = 1;
  regame = false;
  hideAllCircle();
  cadre.style.display = "block";
  scoreinput.style.fontSize = "initial";

  function loop() {
    if (missed >= 5 || regame === true) {
      hideAllCircle();
      cadre.style.display = "none";
      scoreinput.style.display = "flex";
      scoreinput.style.fontSize = "150px";
      return; // Ajoute ce return pour stopper la boucle
    }
    const circle = getCircle(i.toString());
    if (circle) showCircle(circle, 5000);
    i++;
    if (i > 6) i = 1;
    loopTimeoutId = setTimeout(loop, 1000); // Stocke l'id du timeout
  }
  loop();
}

replay.addEventListener("click", function () {
  regame = true;
  if (loopTimeoutId) clearTimeout(loopTimeoutId); // Annule la boucle en cours
  startGame();
});

startGame();
