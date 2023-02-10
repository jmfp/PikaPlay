import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import Image from '../components/Image';

export default function Info() {
    const [pokeInfo, setPokeInfo] = useState()
    const [speciesInfo, setSpeciesInfo] = useState()
    const {pokeName} = useParams();

    const colors = 
    {
        pink: 'rgba(238, 128, 167, 255)',
        blue: 'rgba(78, 170, 190, 255)',
        brown: 'rgba(188, 85, 105, 255)',
        black: 'rgba(53, 53, 85, 255)',
        red: 'rgba(235, 150, 95, 255)',
        green: 'rgba(147, 243, 197, 255)',
        purple: 'rgba(99, 59, 110, 255)',
        gray: 'rgba(98, 108, 127, 255)',
        yellow: 'rgba(245, 228, 134, 255)',
        white: 'rgba(255, 255, 255, 255)',
    }

    const getinfo = async () =>{
        await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokeName}`).then(res =>{
            console.log(res.data)
            setPokeInfo(res.data)
        })
    }

    const getSpeciesInfo = async () =>{
        await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${pokeInfo.id}/`).then(res =>{
            console.log(res.data)
            setSpeciesInfo(res.data)
        })
    }
    useEffect(() =>{
        getinfo()
    }, [])

    useEffect(() =>{
        getSpeciesInfo()
    }, [pokeInfo])
  return (
    <div className='page-container'>
        {pokeInfo && speciesInfo ? 
            <Image 
                className="hero-image" 
                backgroundImage="f" 
                image={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokeInfo.id}.png`}
                filter='blur(16px)'
                backgroundColor={colors[speciesInfo.color.name]}
            />
        : 
            null
        }
    </div>
  )
}
