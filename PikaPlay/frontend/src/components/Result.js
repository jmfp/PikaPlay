import React from 'react'

export default function Result(props) {
  
  return (
    <div className='poke-container' onClick={props.onClick}>
        <p>{props.pokeName}</p>
        <img className='poke-image' src={props.img}/>
        <p>#{props.pokeNum}</p>
    </div>
  )
}
