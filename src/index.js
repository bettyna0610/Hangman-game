
import {getPuzzle} from './requests'



class Hangman  {
    constructor(word, guesses) {
    this.word = word.toLowerCase().split('')
    this.guesses  = guesses
    this.guessedLetter = []
    this.status='playing'
    }
    getPuzzle() {
        let puzzle = ''

        this.word.forEach((letter) => {
            if(this.guessedLetter.includes(letter) || letter === ' ') {
               puzzle = puzzle + letter
            } else {
                puzzle = puzzle + '*'
            }
            
        })
    
    
    return puzzle
    }
    statusConsole() {
        const finished = this.word.every((letter) => {
        
            return this.guessedLetter.includes(letter) || letter ===' '})
    
        
            if(finished)  {
                this.status = 'finished'
            } else if(this.guesses === 0) {
                this.status = 'failed'
            } else {
                this.status = 'playing'
            }
    
            
        
        return this.status
    
    }
    makeGuess(character) {
        if(this.status ==='playing') {
            const isUnique = !this.guessedLetter.includes(character)
            const badGuess = !this.word.includes(character)
            if(isUnique) {
                this.guessedLetter.push(character)
               
                console.log(this.guessedLetter)
                console.log(this.guesses)
            }
              else {
                  console.log('This character has already been guessed.')
        
            }
        
            if(isUnique && badGuess) {
                this.guesses = this.guesses-1
            }
            
           this.statusConsole()
        }
    }
    statusMessage() {
        const message = document.querySelector('#guesses')
        const word = this.word.join('')
        
         if(this.status ==='playing') {
             message.textContent = `Guesses left:${this.guesses}.`
         } else if(this.status ==='finished') {
             message.textContent = 'Great job! You guessed the word!'
         } else if(this.status ==='failed') {
             message.textContent = `Nice try! The word was:${word}.`
         }
     
        return message.textContent
    }
    
}



let game1





window.addEventListener('keypress', function(e) {
    const guess = String.fromCharCode(e.charCode)
    console.log(guess)
    game1.makeGuess(guess)
    let guessed = document.createElement('span')
    guessed.classList.add('guessedStyle')
    guessed.textContent = guess
    document.querySelector("#guessedLetter").appendChild(guessed)
   
    render()
})

const render = () => {
    
    let puzzleEl = document.querySelector("#puzzle")
   
    puzzleEl.innerHTML=''
    game1.statusMessage()

    const displayLetter = game1.getPuzzle().split('')

    displayLetter.forEach((letter) => {
        const spanLetter =document.createElement('span')
        spanLetter.textContent = letter
        puzzleEl.appendChild(spanLetter)
        console.log(spanLetter)
       
        
    })
     console.log(game1.getPuzzle())
     
     
}

const startGame = async () => {
    const puzzle = await getPuzzle('2')
    game1 = new Hangman(puzzle,5)
    
    render()
    document.querySelector("#guessedLetter").innerHTML=''
}

document.querySelector('#reset').addEventListener('click', startGame)
startGame()
//Callback





