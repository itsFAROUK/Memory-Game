import { useState, useEffect, use } from 'react'

import SingleCard from './components/SingleCard'

import helmet from './assets/helmet-1.png'
import potion from './assets/potion-1.png'
import ring from './assets/ring-1.png'
import scroll from './assets/scroll-1.png'
import shield from './assets/shield-1.png'
import sword from './assets/sword-1.png'

const cardImages = [
  {src: helmet, matched: false},
  {src: potion, matched: false},
  {src: ring, matched: false},
  {src: scroll, matched: false},
  {src: shield, matched: false},
  {src: sword, matched: false}
]

function App() {
  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(undefined)
  const [choiceTwo, setChoiceTwo] = useState(undefined)
  const [disabled, setDisabled] = useState(false)

  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map(card => ({id: Math.random(), ...card}))
    
    setChoiceOne(undefined)
    setChoiceTwo(undefined)
    setCards(shuffledCards)
    setTurns(0)
  }

  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true)
      checkIfMatch()
    }
  }, [choiceOne, choiceTwo])

  function checkIfMatch() {
    if (choiceOne.src === choiceTwo.src) {
      setCards(prevCards =>
        prevCards.map(card =>
          card.src === choiceOne.src ? { ...card, matched: true } : card
        )
      )
    } 
    setTimeout(() => resetTurn(), 1000)
  }

  const resetTurn = () => {
    setChoiceOne(undefined)
    setChoiceTwo(undefined)
    setTurns(prev => prev + 1)
    setDisabled(false)
  }

  useEffect(() => shuffleCards(), [])

  return (
    <div className="max-w-[860px] w-10/12 my-10 mx-auto">
      <h1 className="text-4xl font-bold mb-7">Magic Match</h1>
      <button 
        className="py-1.5 px-3 border rounded-sm bg-transparent font-bold cursor-pointer hover:bg-[#c23866]"
        onClick={shuffleCards}
      >New Game</button>

      <ul className="grid grid-cols-4 gap-5 mt-10">
        {cards.map(card => (
          <SingleCard 
            key={card.id} 
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}/>
        ))}
      </ul>

      <p>Truns: {turns}</p>
    </div>
  )
}

export default App
