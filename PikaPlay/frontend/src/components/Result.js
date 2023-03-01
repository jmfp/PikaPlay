import React from 'react'
import pic from '../images/pokeback.png'

export default function Result(props) {
  
  return (
    <div className='poke-container' onClick={props.onClick} style={{backgroundImage: `url(${pic})`}}>
        <img className='poke-image' src={props.img}/>
        <p>{props.pokeName}</p>
    </div>
  )
}
