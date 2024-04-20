///Funcionamento do switch de temas
let theme_toggler = document.querySelector("#theme");

theme_toggler.addEventListener("click", function () {
  document.body.classList.toggle("dark-mode");
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
    document.getElementById("rua").value = conteudo.logradouro;
    document.getElementById("bairro").value = conteudo.bairro;
    document.getElementById("cidade").value = conteudo.localidade;
    document.getElementById("uf").value = conteudo.uf;
    document.getElementById("ibge").value = conteudo.ibge;
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
      //Preenche os campos com "..." enquanto consulta webservice.
      document.getElementById("rua").value = "...";
      document.getElementById("bairro").value = "...";
      document.getElementById("cidade").value = "...";
      document.getElementById("uf").value = "...";
      document.getElementById("ibge").value = "...";

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

const button = document.getElementById("search-button");
const input = document.getElementById("cep");
button.addEventListener("click", function () {
  console.log("hahah");
  pesquisacep(input.value);
});
input.addEventListener("click", function () {
  console.log("gagasfas");
});
const ruaInput = document.getElementById("rua");
const bairroInput = document.getElementById("bairro");
const cidadeInput = document.getElementById("cidade");
const ufInput = document.getElementById("uf");
const ibgeInput = document.getElementById("ibge");

/// Armazenando os dados no local storage
// let store = () => {
//   let ruaValue = ruaInput.value;
//   // let bairroValue = bairroInput.value;
//   // let cidadeValue = cidadeInput.value;
//   // let ufValue = ufInput.value;
//   // let ibgeValue = ibgeInput.value;
//   setData(ruaValue);
//   table();
// };

// let table = () => {
//   let html = ``;
//   let data = getData(); // handler for getting item from local storage
//   if (data) {
//     data.forEach((value, item) => {
//       console.log(value, item);
//     });
//   }
// };
