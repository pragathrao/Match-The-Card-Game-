import React from 'react'
import "./Card.css"

function Card(props) {

    function HandleClick() {
        props.HandleChoice(props.Card)
    }
    
    return (
        <div className="card" key={props.id}>
            <div className = {props.flipped ? "flipped" : ""}>
                <img className="front" src={props.src} alt="card front" />
                <img className="back" src="/img/cover.png" alt="card backs" onClick={HandleClick} />
            </div>
        </div>
    )
}

export default Card
