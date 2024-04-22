///Funcionamento do switch de temas
document.addEventListener("DOMContentLoaded", function () {
  let theme_toggler = document.querySelector("#theme");

  // Função para alternar o tema
  function toggleTheme() {
    document.body.classList.toggle("dark-mode");

    // Verificar se a classe 'dark-mode' está presente no corpo do documento
    let isDarkMode = document.body.classList.contains("dark-mode");

    // Armazenar a preferência de tema no localStorage
    localStorage.setItem("tema", isDarkMode ? "dark" : "light");
  }

  theme_toggler.addEventListener("click", toggleTheme);

  let temaArmazenado = localStorage.getItem("tema");

  if (temaArmazenado === "dark") {
    document.body.classList.add("dark-mode");
  } else {
    document.body.classList.remove("dark-mode");
  }
});

const themeBtn = document.querySelector(".fa-circle-half-stroke");
themeBtn.addEventListener("click", function () {
  themeBtn.classList.toggle("flipped");
});
