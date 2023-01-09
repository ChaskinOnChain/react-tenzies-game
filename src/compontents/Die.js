import React from "react"

export default function Die(props) {
  return (
    <div onClick={props.holdDice} className={`${props.isHeld} die`}>
      <h3 className="die-value">{props.value}</h3>
    </div>
  )
}
