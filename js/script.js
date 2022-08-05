let formulario = document.querySelector("form");
let info = document.getElementById("info");




formulario.addEventListener("submit", function (e) {

  e.preventDefault;

  let url = "https://pokeapi.co/api/v2/pokemon/";
  let nome = document.getElementById("name");


  //concatenar url com input
  url = url + nome.value;

  //transformar valores em minusculas
  url = url.toLocaleLowerCase();

  //id info
  let resposta = document.getElementById("info");

  //id pokemon
  let imagem = document.getElementById("imgpokemon");

  
  fetch(url)
    //depois
    .then((response) => {
      response
        .json()

        //depois
        .then(function (data) {
          //inserir nome e tipo do pokemon
          resposta.innerHTML =
            "Nome: " +
            maiuscula(data.name) +
            "<br>" +
            "Type: " +
            maiuscula(data.types[0].type.name);

          //inserir imagem do pokemon
          imagem.innerHTML =
            " <img src='" +
            data.sprites.back_default +
            "'><img src='" +
            data.sprites.front_default +
            "'>";
        })

        
        //caso erro
        .catch(function (err) {
          if (
            err == "SyntaxError: Unexpected token N in JSON at position 0" ||
            err ==
              "TypeError: Cannot read properties of undefined (reading '0')" ||
              nome.length < 0 
          ){

            function naoEncontrado(){
              resposta.innerHTML = "Pokemon não encontrado ! 😥";
              document.getElementById("name").focus();
              document.getElementById("name").value = '';
              imagem.innerHTML = ''
            }
            naoEncontrado()

            function removeAviso(){
              setTimeout (function(){
                resposta.innerHTML = "";
              },2000)
              
            }
            removeAviso()
          }

          console.log(err);
        });
    });
});

//primeira letra maiúscula
function maiuscula(val) {
  //1° letra - posição 0, transformar em maiúscula
  //val.substr(1) - juntar a partir do 1°
  return val[0].toUpperCase() + val.substr(1);
}


