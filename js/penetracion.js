
const cards = document.querySelectorAll(".card");
const terminal = document.getElementById("terminal");
const buttons = document.querySelectorAll("[data-mode]");

// Animación de entrada de las tarjetas
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  cards.forEach((card) => observer.observe(card));
} else {
  cards.forEach((card) => card.classList.add("show"));
}

// Resultados ficticios para el laboratorio educativo
const scenarios = {
  recon: [
    "root@cybersec:~$ reconocimiento --modo-demo",
    "[INFO] Analizando datos ficticios...",
    "[OK] Activo de ejemplo: demo.local",
    "[OK] Alcance: entorno simulado",
    "[INFO] Reconocimiento finalizado."
  ],

  audit: [
    "root@cybersec:~$ auditoria --modo-demo",
    "[INFO] Revisando controles ficticios...",
    "[OK] HTTPS: configuración de ejemplo verificada",
    "[WARN] Revisar dependencias de prueba",
    "[INFO] Auditoría simulada finalizada."
  ],

  report: [
    "root@cybersec:~$ informe --generar-demo",
    "[INFO] Organizando hallazgos de ejemplo...",
    "[OK] Resumen ejecutivo preparado",
    "[OK] Recomendaciones incluidas",
    "[OK] Informe de demostración generado."
  ]
};

let runId = 0;

function runLab(mode) {
  if (!scenarios[mode]) return;

  const currentRun = ++runId;
  const lines = scenarios[mode];
  let index = 0;

  terminal.replaceChildren();

  function printLine() {
    if (currentRun !== runId || index >= lines.length) {
      return;
    }

    const line = document.createElement("p");
    line.textContent = lines[index];

    if (
      index === 0 ||
      lines[index].startsWith("[OK]")
    ) {
      line.classList.add("green");
    }

    terminal.appendChild(line);
    index++;

    if (index < lines.length) {
      window.setTimeout(printLine, 450);
    } else {
      const cursor = document.createElement("span");
      cursor.className = "cursor";
      terminal.appendChild(cursor);
    }
  }

  printLine();
}

// Conectar botones con la terminal
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    runLab(button.dataset.mode);
  });
});
