const express = require("express");
const bodyparser = require("body-parser");
const cors = require('cors');

var arrayCli = []
let wordgabarito = [['m','a','n','t','o'],['m','i','r','a','r'],['a','n','d','a','r'],['p','a','u','l','o']]
var wordlist = wordgabarito[Math.floor(Math.random()*wordgabarito.length)]
var result =[];

function convertToArray(pal){
    let array = []
    for(i=0;i<5;i++){
        array.push(pal[i])
    }
    return array
}

function validaPalavra(arrayCli){
    let gabarito = [];
    for (let [idx] of wordlist.entries()) {
        if (arrayCli[idx] === wordlist[idx]) {
          gabarito.push("v");
        } else if (
          arrayCli[idx] !== wordlist[idx] &&
          wordlist.includes(arrayCli[idx])
        ) {
          gabarito.push("a");
        } else {
          gabarito.push("c");
        }
      }
    return gabarito;
}

var app = express();
app.use(express.static(__dirname + '/'))
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use(cors());

app.get('/', (req,res) => {
    res.sendFile(__dirname + "/index.html")
})

app.post('/send', (req,res) => {
    arrayCli = convertToArray(req.body.palavra)
    result = validaPalavra(arrayCli)
    res.send(result)
})

const port = process.env.PORT || 3000;
app.listen(port)