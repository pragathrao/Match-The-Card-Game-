import { useEffect, useState } from 'react'
import './App.css'
import Card from './Components/Card'

const cardImages = [
  { "src": "/img/helmet-1.png", matched: false },
  { "src": "/img/potion-1.png", matched: false },
  { "src": "/img/ring-1.png", matched: false },
  { "src": "/img/scroll-1.png", matched: false },
  { "src": "/img/shield-1.png", matched: false },
  { "src": "/img/sword-1.png", matched: false },
]

function App() {

  const [Cards, setCards] = useState([])
  const [Turns, setTurns] = useState(0)
  const [ChoiceOne, setChoiceOne] = useState(null)
  const [ChoiceTwo, setChoiceTwo] = useState(null)

  //shuffle cards

  const shuffleCard = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .map((card) => ({ ...card, id: Math.random() }))
      .sort(() => Math.random() - 0.5)
    setCards(shuffledCards)
    setTurns(0)
  }

  //handle a choice

  function HandleChoice(card) {
    ChoiceOne === null ? setChoiceOne(card) : setChoiceTwo(card)
  }

  // check if the 2 cards match 

  useEffect(() => {
    if (ChoiceOne && ChoiceTwo != null) {
      if (ChoiceOne.src === ChoiceTwo.src) {
        setCards((prev) => {
          return (
            prev.map(card => {
              if (card.src === ChoiceTwo.src) {
                return { ...card, matched: true }
              } else {
                return card
              }
            })
          )
        })
        Reset()
      } else {
        setTimeout(() => Reset(), 1000)
      }
    }
  }, [ChoiceOne, ChoiceTwo])

  console.log(Cards)

  function Reset() {
    setChoiceTwo(null)
    setChoiceOne(null)
    setTurns((prev) => prev + 1)
  }

  return (
    <div className="App">
      <h1>Card Game </h1>
      <button onClick={shuffleCard}>New Game</button>
      {Turns === 20 ? <h1>Game Over</h1> : <div className="card-grid">
        {Cards.map((card) => {
          return (
            <Card
              key={card.key}
              src={card.src}
              Card={card}
              HandleChoice={HandleChoice}
              flipped={card === ChoiceOne || card === ChoiceTwo || card.matched === true}
            />
          )
        })}
      </div>}
      <h1> Turns : {Turns}</h1>

    </div>
  )
}

export default App