import React from 'react'
import blue from '../images/poke-blue.jpeg'
import red from '../images/poke-red.jpeg'
import green from '../images/poke-green.jpeg'
import yellow from '../images/poke-yellow.jpeg'
import silver from '../images/poke-silver.png'
import gold from '../images/poke-gold.png'
import crystal from '../images/poke-crystal.png'
import ruby from '../images/poke-ruby.png'
import sapphire from '../images/poke-sapphire.jpg'
import emerald from '../images/poke-emerald.jpeg'
import firered from '../images/poke-firered.jpeg'
import leafgreen from '../images/poke-leafgreen.jpg'
import diamond from '../images/poke-diamond.jpeg'
import heartgold from '../images/poke-heartgold.jpeg'
import soulsilver from '../images/poke-soulsilver.jpeg'
import pearl from '../images/poke-pearl.jpeg'
import platinum from '../images/poke-platinum.png'
import black from '../images/poke-black.png'
import white from '../images/poke-white.png'
import white2 from '../images/poke-white-2.png'
import black2 from '../images/poke-black-2.png'
import x from '../images/poke-x.png'
import y from '../images/poke-y.webp'
import omega from '../images/poke-omega-ruby.png'
import alpha from '../images/poke-alpha-sapphire.png'

export default function EncounterInfo(props) {

    const versionColors = {
        "red": "",
        "blue": "",
        "green": "",
        "yellow": "",
        "silver": "",
        "gold": "",
        "crystal": "",
        "ruby": "",
        "sapphire": "",
        "emerald": "",
        "firered": "",
        "leafgreen": "",
        "diamond": "",
        "pearl": "",
        "platinum": "",
        "black": "",
        "white": "",
    }

    const versionPictures = {
        "red": red,
        "blue": blue,
        "green": green,
        "yellow": yellow,
        "silver": silver,
        "gold": gold,
        "crystal": crystal,
        "ruby": ruby,
        "sapphire": sapphire,
        "emerald": emerald,
        "firered": firered,
        "leafgreen": leafgreen,
        "diamond": diamond,
        "pearl": pearl,
        "platinum": platinum,
        "heartgold": heartgold,
        "soulsilver": soulsilver,
        "black": black,
        "white": white,
        "white-2": white2,
        "black-2": black2,
        "x": x,
        "y": y,
        "omega-ruby": omega,
        "alpha-sapphire": alpha
    }

    const replaceDash = (dashedString) =>{
        dashedString.replace(/-/g, " ")
    }

    const capitalize = (lowerString) =>{
        let newString = lowerString[0].toUpperCase() + lowerString.substring(1)
        return newString
    }
  return (
    <div className='poke-encounter'>
        <p>{props.location_area}</p>
        <div className="grid">
            {props.versions ? props.versions.map(versions =>{
                return(
                    <img className='card-image' src={versionPictures[`${versions.version.name}`]}/>
                    //<img className='card-image' src={`../images/poke-${versions.version.name}.jpeg`}/>
                    //<p>{versions.version.name}</p>
                )
            }): null}
        </div>
    </div>
  )
}
