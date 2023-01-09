import React from "react"
import Die from "./compontents/Die.js"
import { nanoid } from "nanoid"
import Confetti from "react-confetti"

function App() {
  const [dice, setDice] = React.useState(allNewDice())
  const [tenzies, setTenzies] = React.useState(false)

  React.useEffect(() => {
    const isHeldSame = dice.every((item) => item.isHeld)
    const firstValue = dice[0].value
    const isValueSame = dice.every((item) => item.value === firstValue)
    if (isHeldSame && isValueSame) {
      setTenzies(true)
      console.log("You won!")
    }
  }, [dice])

  function generateNewDie() {
    return { value: Math.floor(Math.random() * 6 + 1), isHeld: false, id: nanoid() }
  }

  function allNewDice() {
    let randomNumsArray = []
    for (let i = 0; i < 10; i++) {
      randomNumsArray.push(generateNewDie())
    }
    return randomNumsArray
  }

  function newNumbers() {
    if (!tenzies) {
      setDice((prevDice) => {
        return prevDice.map((item) => {
          return item.isHeld ? item : generateNewDie()
        })
      })
    } else {
      allNewDice()
      setTenzies(false)
    }
  }

  const diceElements = dice.map((item) => (
    <Die
      holdDice={() => holdDice(item.id)}
      value={item.value}
      key={item.id}
      isHeld={item.isHeld ? "isHeld" : "notHeld"}
    />
  ))

  function holdDice(id) {
    setDice((prevdice) => {
      return prevdice.map((item) => {
        return item.id === id ? { ...item, isHeld: true } : item
      })
    })
  }

  return (
    <main>
      {tenzies && <Confetti />}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its current value between
        rolls.
      </p>
      <div className="dice-container">{diceElements}</div>
      <button onClick={newNumbers}>{tenzies ? "New Game" : "Roll"}</button>
    </main>
  )
}

export default App
