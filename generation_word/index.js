const words = require('./words.js')
const express = require('express');
var cors = require('cors')
const app = express();

app.use(cors())
 

var wordslist = []
var validlist = []
var usedWords = []
for (let i = 0; i < words.length; i++) {
    wordslist.push(words[i].word)   
    words[i]["occurrenceInDigits"] = words[i].occurrence * 100

    if(words[i].occurrence > 0.000001) {
      validlist.push(words[i].word)
    }
}

const port = 3000;

var word = "actor"
var lastdate = "6/4/2022"

// get date from env
let currentdate = new Date().toLocaleDateString()

app.get('/', (req, res) => res.send(getRandomWord()));

getRandomWord = () => {
	currentdate = new Date().toLocaleDateString()
    if(lastdate != currentdate){ 
        
        lastdate = currentdate
        randomvar = Math.floor(Math.random())
        word = validlist[randomvar * validlist.length];
        usedWords.push(word)
        // function to check if word is present in usedWords
        
        
        return(JSON.stringify({word}))
    }
    else return(JSON.stringify({word}));

}

app.get('/random', (req, res) => {
  let randomword = validlist[Math.floor(Math.random() * validlist.length)]
  res.send({
    randomword
  })
});


app.listen(process.env.PORT || 3000, () => {
    
})