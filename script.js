const sobre = document.getElementById("sobre");
const tapa = document.querySelector(".tapa");
const contenido = document.getElementById("contenido");
const musica = document.getElementById("musica");

sobre.addEventListener("click", () => {
  sobre.classList.add("abierto");
  setTimeout(() => {
    document.getElementById("contenedorSobre").style.display = "none";
  contenido.style.display = "block";
  musica.play();

  setTimeout(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, 100);
}, 1200);

});

function mostrarFrase(button) {
  const frase = button.nextElementSibling;
  frase.style.display = "block";
  button.disabled = true;
}

const canvas = document.getElementById("ruleta");
const ctx = canvas.getContext("2d");
const girarBtn = document.getElementById("girarBtn");
const premioResultado = document.getElementById("premioResultado");

const premios = ["Casarnos 🤵‍♂️👰", "Masaje 💆‍♂️", "Un día donde tu mandas 🫵", "Casarnos 🤵‍♂️👰", "Un deseo ✨", "Una cita romática 😏😻"];
const numPremios = premios.length;
const anguloPorPremio = 2 * Math.PI / numPremios;

let anguloActual = 0;
let girando = false;

function dibujarRuleta() {
  for (let i = 0; i < numPremios; i++) {
    const start = anguloPorPremio * i;
    const end = start + anguloPorPremio;
    ctx.beginPath();
    ctx.fillStyle = i % 2 === 0 ? "#53bad9ff" : "#f6f288ff";
    ctx.moveTo(150, 150);
    ctx.arc(150, 150, 150, start, end);
    ctx.fill();
    ctx.save();
    ctx.translate(150, 150);
    ctx.rotate(start + anguloPorPremio / 2);
    ctx.fillStyle = "#333";
    ctx.font = "14px Poppins";
    ctx.fillText(premios[i], 60, 0);
    ctx.restore();
  }
}


function girarRuleta() {
  if (girando) return;
  girando = true;
  premioResultado.textContent = "";

  let giro = Math.random() * 360 + 720; // 2 a 3 vueltas completas
  let velocidad = giro / 100;
  let pasos = 100;
  let pasoActual = 0;

  const animar = () => {
    if (pasoActual < pasos) {
      anguloActual += velocidad * Math.PI / 180;
      canvas.style.transform = `rotate(${anguloActual}rad)`;
      pasoActual++;
      requestAnimationFrame(animar);
    } else {
      const anguloFinal = anguloActual % (2 * Math.PI);
      const indiceGanador = Math.floor(numPremios - (anguloFinal / anguloPorPremio)) % numPremios;
      premioResultado.textContent = `🎊 Te ganaste: ${premios[indiceGanador]}`;
      girando = false;
    }
  };

  animar();
}

dibujarRuleta();
girarBtn.addEventListener("click", girarRuleta);
