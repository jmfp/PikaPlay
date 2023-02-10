import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import Image from '../components/Image';

export default function Info() {
    const [pokeInfo, setPokeInfo] = useState()
    const [speciesInfo, setSpeciesInfo] = useState()
    const [encounterInfo, setEncounterInfo] = useState()
    const [habitatInfo, setHabitatInfo] = useState()
    const [locationInfo, setLocationInfo] = useState()
    const [locationInfoExtended, setLocationInfoExtended] = useState()
    const [regionInfo, setRegionInfo] = useState()
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

    const getEncounterInfo = async () =>{
        await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokeInfo.id}/encounters`).then(res =>{
            console.log(res.data)
            setEncounterInfo(res.data)
        })
        //await axios.get(`https://pokeapi.co/api/v2/pokemon-habitat/${speciesInfo.habitat.name}/`).then(res =>{
        //    console.log(res.data)
        //    setHabitatInfo(res.data)
        //})
        
    }

    const getLocationInfo = async () =>{
        await axios.get(`${encounterInfo[0].location_area.url}`).then(res =>{
            console.log(res.data)
            setLocationInfo(res.data)
        })
    }

    const getLocationInfoExpanded = async () =>{
        await axios.get(`${locationInfo.location.url}`).then(res =>{
            console.log(res.data)
            setLocationInfoExtended(res.data)
        })
    }

    const getRegionInfo = async () =>{
        await axios.get(`${locationInfo.region.url}`).then(res =>{
            console.log(res.data)
            setRegionInfo(res.data)
        })
    }

    useEffect(() =>{
        getinfo()
    }, [])

    useEffect(() =>{
        getSpeciesInfo()
        getEncounterInfo()
        getLocationInfo()
        getLocationInfoExpanded()
        getRegionInfo()
    }, [pokeInfo])

    useEffect(() =>{
        getLocationInfo()
        getLocationInfoExpanded()
        getRegionInfo()
    }, [encounterInfo])

    useEffect(() =>{
        try{

            getRegionInfo()
        }catch(error){
            console.log(error)
        }
    }, [locationInfo])
  return (
    <div className='page-container'>
        {pokeInfo && speciesInfo ? 
        <div className='poke-info-parent'>
            <div className='poke-content-parent'>

                <div className='poke-info-header'>
                    <p>{pokeInfo.name}</p>
                    <p>{`#${pokeInfo.id}`}</p>
                </div>
                <div className='poke-sprites' style={{filter: 'blur(0)'}}>
                    <img className='poke-image-header' src={pokeInfo.sprites.front_default}/>
                    <img className='poke-image-header' src={pokeInfo.sprites.back_default}/>
                    <img className='poke-image-header' src={pokeInfo.sprites.front_shiny}/>
                    <img className='poke-image-header' src={pokeInfo.sprites.back_shiny}/>
                </div>
                <div className='poke-entry'>
                    <p>{speciesInfo.flavor_text_entries[0].flavor_text}</p>
                    {pokeInfo ? 
                    <select>

                        {pokeInfo.game_indices.map(versions =>{
                            return(

                                <option>{versions.version.name}</option>
                            )
                        })}
                    </select>
                    : null}
                    {locationInfoExtended ? 
                    <div>
                        <p>{locationInfoExtended.region.name}</p>
                        <p>{locationInfoExtended.names[2].name}</p>
                    </div>
                    : null}
                </div>
            </div>
            <Image 
                className="poke-info-container" 
                backgroundImage="f" 
                image={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokeInfo.id}.png`}
                filter='blur(16px)'
                backgroundColor={colors[speciesInfo.color.name]}
            >
            </Image>
        </div>
        : 
            null
        }
    </div>
  )
}
