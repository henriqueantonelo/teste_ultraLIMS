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

///funcionamento da busca por CEP
function limpa_formulário_cep() {
  //Limpa valores do formulário de cep.
  document.getElementById("rua").value = "";
  document.getElementById("bairro").value = "";
  document.getElementById("cidade").value = "";
  document.getElementById("uf").value = "";
  document.getElementById("ibge").value = "";
}

function meu_callback(conteudo) {
  if (!("erro" in conteudo)) {
    //Atualiza os campos com os valores.
    document.getElementById("cepResult").value = conteudo.cep;
    document.getElementById("rua").value = conteudo.logradouro;
    document.getElementById("bairro").value = conteudo.bairro;
    document.getElementById("cidade").value = conteudo.localidade;
    document.getElementById("uf").value = conteudo.uf;
    document.getElementById("ibge").value = conteudo.ibge;
    document.querySelector(".result-table").classList.remove("hidden");
  } //end if.
  else {
    //CEP não Encontrado.
    limpa_formulário_cep();
    alert("CEP não encontrado.");
  }
}

function pesquisacep(valor) {
  //Nova variável "cep" somente com dígitos.
  var cep = valor.replace(/\D/g, "");

  //Verifica se campo cep possui valor informado.
  if (cep != "") {
    //Expressão regular para validar o CEP.
    var validacep = /^[0-9]{8}$/;

    //Valida o formato do CEP.
    if (validacep.test(cep)) {
      //Cria um elemento javascript.
      var script = document.createElement("script");

      //Sincroniza com o callback.
      script.src =
        "https://viacep.com.br/ws/" + cep + "/json/?callback=meu_callback";

      //Insere script no documento e carrega o conteúdo.
      document.body.appendChild(script);
    } //end if.
    else {
      //cep é inválido.
      limpa_formulário_cep();
      alert("Formato de CEP inválido.");
    }
  } //end if.
  else {
    //cep sem valor, limpa formulário.
    limpa_formulário_cep();
  }
}

// Local storage das buscas e criação da tabela
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form");
  const tableBody = document.querySelector("#userDataTable tbody");
  let savedUserData = JSON.parse(localStorage.getItem("userData")) || [];
  // Objeto para rastrear a direção de ordenação por cada coluna
  let sortDirection = {};
  const input = document.getElementById("cep");

  function renderUserTable() {
    tableBody.innerHTML = "";

    if (!Array.isArray(savedUserData)) {
      savedUserData = [];
    }

    // Criação da tabela para cada cep pesquisado
    savedUserData.forEach((userData) => {
      const newRow = document.createElement("tr");

      const cepCell = document.createElement("td");
      const fullNameCell = document.createElement("td");
      const emailCell = document.createElement("td");
      const passwordCell = document.createElement("td");
      const ufCell = document.createElement("td");
      const ibgeCell = document.createElement("td");

      cepCell.textContent = userData.cepResult;
      fullNameCell.textContent = userData.bairro;
      emailCell.textContent = userData.cidade;
      passwordCell.textContent = userData.rua;
      ufCell.textContent = userData.uf;
      ibgeCell.textContent = userData.ibge;

      newRow.appendChild(cepCell);
      newRow.appendChild(fullNameCell);
      newRow.appendChild(emailCell);
      newRow.appendChild(passwordCell);
      newRow.appendChild(ufCell);
      newRow.appendChild(ibgeCell);

      tableBody.appendChild(newRow);
    });
  }

  renderUserTable();

  // Função para fazer a busca e armazenar o dado
  form.addEventListener("submit", async function (event) {
    event.preventDefault();
    try {
      // Chama a função pesquisacep com o valor do campo de entrada e aguarda sua conclusão
      await new Promise((resolve, reject) => {
        pesquisacep(input.value);
        // Define um temporizador para verificar se a busca do CEP foi concluída
        const checkInterval = setInterval(() => {
          const cepResult = document.getElementById("cepResult").value;
          if (cepResult !== "") {
            clearInterval(checkInterval);
            resolve(); // Resolve a Promise quando a busca do CEP estiver concluída
          }
        }, 100);
      });

      // Captura os valores preenchidos após a busca do CEP
      const cepResult = document.getElementById("cepResult").value;
      const bairro = document.getElementById("bairro").value;
      const rua = document.getElementById("rua").value;
      const cidade = document.getElementById("cidade").value;
      const uf = document.getElementById("uf").value;
      const ibge = document.getElementById("ibge").value;

      // Identificando se o cep buscado já está na tabela
      const existingUserIndex = savedUserData.findIndex(
        (user) => user.cepResult === cepResult
      );
      // Se estiver, move ele para o topo da tabela
      if (existingUserIndex !== -1) {
        savedUserData.splice(existingUserIndex, 1);
      }

      // Cria um novo objeto com os dados capturados
      const newUser = {
        cepResult: cepResult,
        bairro: bairro,
        rua: rua,
        cidade: cidade,
        uf: uf,
        ibge: ibge,
      };

      // Adiciona o novo usuário à lista de dados salvos
      savedUserData.unshift(newUser);

      // Atualiza os dados na localStorage
      localStorage.setItem("userData", JSON.stringify(savedUserData));

      // Renderiza a tabela novamente com os novos dados
      renderUserTable();

      // Caso ocorra algum erro na busca
    } catch (error) {
      alert("Ocorreu um erro ao buscar e armazenar os dados.");
    }
  });
  // Função de ordenação para colunas específicas
  function sortTable(columnName) {
    if (!sortDirection[columnName] || sortDirection[columnName] === "desc") {
      // Ordenação crescente
      savedUserData.sort((a, b) => a[columnName].localeCompare(b[columnName]));
      sortDirection[columnName] = "asc";
    } else {
      // Ordenação decrescente
      savedUserData.sort((a, b) => b[columnName].localeCompare(a[columnName]));
      sortDirection[columnName] = "desc";
    }

    renderUserTable();

    // Rotacionando verticalmente as setas de acordo com a ordenação
    const arrows = document.querySelectorAll(".fa-sort-down");
    if (sortDirection[columnName] == "asc") {
      arrows.forEach((arrow) => arrow.classList.add("flip-vertical"));
    } else {
      arrows.forEach((arrow) => arrow.classList.remove("flip-vertical"));
    }
  }

  // Pegando apenas as colunas bairro cidade e estado para ordenar
  const bairroTableHeader = document.getElementById("bairroHeader");
  const cidadeTableHeader = document.getElementById("cidadeHeader");
  const estadoTableHeader = document.getElementById("estadoHeader");
  bairroTableHeader.addEventListener("click", function () {
    const columnName = bairroTableHeader.dataset.column;
    sortTable(columnName);
  });
  cidadeTableHeader.addEventListener("click", function () {
    const columnName = cidadeTableHeader.dataset.column;
    sortTable(columnName);
  });
  estadoTableHeader.addEventListener("click", function () {
    const columnName = estadoTableHeader.dataset.column;
    sortTable(columnName);
  });
});
