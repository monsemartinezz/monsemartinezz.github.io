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
