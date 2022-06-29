let grade = document.getElementById('grade')
let contButtonTotal = 0;
let contPosButton = 0;
let startPosButton = 0;
let contIPal = 0;
let tentativas = 1;
let acertou = ['v','v','v','v','v']
var palavrasDig;



function getWords(){
    let unidade = document.getElementsByClassName("unidade")
    let words = [];
    for(i=startPosButton;i<contButtonTotal;i++){
        words.push(unidade[i].textContent)
    }
    startPosButton+= 5;
    return words.join("");
}

function criarGrades(){
    let cont = 1;
    for(let i = 0; i < 6; i++){
        let linha = document.createElement('div')
        linha.setAttribute("id","square"+ (i+1))
        for(let j=0; j<5;j++){
            let unidade = document.createElement('div')
            unidade.className = 'unidade'
            unidade.textContent = ""
            linha.appendChild(unidade)
        }
        grade.appendChild(linha)
    }
}

function pressButton(value){
   let unidade = document.getElementById("square"+tentativas)
    
    if(value == "erase"){
        unidade.childNodes[contPosButton-1].textContent = ""
        contPosButton --
    } else{
        if(value == "enter"){
            if(contPosButton < 5){
                alert("A palavra precisa ter 5 letras!!");
            } else{
                palavrasDig = getWords();
                enviarPalavra(palavrasDig)
            }
        } else{
            if(unidade.childNodes[contPosButton].textContent == ""){
                unidade.childNodes[contPosButton].textContent = value
            }
           contPosButton++
           contButtonTotal++
        }
        
    }
   
}

function recebePalavra(contIPal, resultServ, unidade){
    for (let [idx] of resultServ.entries()) {
        if(resultServ[idx] == 'v'){
            unidade.childNodes[idx].style.backgroundColor = "green"
        } else{
            if(resultServ[idx] == 'a'){
                unidade.childNodes[idx].style.backgroundColor = "yellow"
            } else{
                unidade.childNodes[idx].style.backgroundColor = "gray"
            }
        }
    }
}

function enviarPalavra(palavrasDig){
    var settings = {
        "url": "https://wordlegamepucc.herokuapp.com/send",
        "method": "POST",
        "timeout": 0,
        "headers": {
          "Content-Type": "application/json"
        },
        "data": JSON.stringify({
          "palavra": palavrasDig
        }),
      };
      
      $.ajax(settings).done(function (response) {
        let unidade = document.getElementById("square"+tentativas)
        let resultServ = []
        resultServ = response
        recebePalavra(contIPal,resultServ,unidade)
        contIPal += 5
        tentativas++
        contPosButton = 0

        if(tentativas >= 7){
            alert("Você perdeu!, esgotou as tentativas")
        }    
        if(JSON.stringify(resultServ) == JSON.stringify(acertou)){
            alert("Parabéns, você acertou!")
        }
      });
}






criarGrades();
