const tamanho = 8;
const quantidadeNavios = 10;

let tabuleiro = [];
let naviosRestantes = quantidadeNavios;

function iniciarJogo() {
  tabuleiro = [];
  naviosRestantes = quantidadeNavios;
  document.getElementById("mensagem").innerText =
    "Clique em uma posição para atacar!";
  const tabuleiroHTML = document.getElementById("tabuleiro");
  tabuleiroHTML.innerHTML = "";

  for (let i = 0; i < tamanho; i++) {
    tabuleiro[i] = [];
    for (let j = 0; j < tamanho; j++) {
      tabuleiro[i][j] = 0;

      const celula = document.createElement("div");
      celula.classList.add("celula");
      celula.dataset.linha = i;
      celula.dataset.coluna = j;
      celula.addEventListener("click", atacar);

      tabuleiroHTML.appendChild(celula);
    }
  }

  posicionarNavios();
}

function posicionarNavios() {
  let naviosColocados = 0;

  while (naviosColocados < quantidadeNavios) {
    let linha = Math.floor(Math.random() * tamanho);
    let coluna = Math.floor(Math.random() * tamanho);

    if (tabuleiro[linha][coluna] === 0) {
      tabuleiro[linha][coluna] = 1;
      naviosColocados++;
    }
  }
}

function atacar(event) {
  const celula = event.target;
  const linha = celula.dataset.linha;
  const coluna = celula.dataset.coluna;

  if (
    celula.classList.contains("acerto") ||
    celula.classList.contains("erro")
  ) {
    return;
  }

  if (tabuleiro[linha][coluna] === 1) {
    celula.classList.add("acerto");
    celula.innerHTML = "💥";
    naviosRestantes--;

    if (naviosRestantes === 0) {
      document.getElementById("mensagem").innerText = "🎉 Você venceu!";
    }
  } else {
    celula.classList.add("erro");
    celula.innerHTML = "🌊";
  }
}

function reiniciarJogo() {
  iniciarJogo();
}

iniciarJogo();
