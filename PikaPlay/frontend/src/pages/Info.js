import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import Image from '../components/Image';
import EncounterInfo from '../components/EncounterInfo';

export default function Info() {
    const [pokeInfo, setPokeInfo] = useState()
    const [speciesInfo, setSpeciesInfo] = useState()
    const [encounterInfo, setEncounterInfo] = useState()
    const [habitatInfo, setHabitatInfo] = useState()
    const [locationInfo, setLocationInfo] = useState()
    const [locationInfoExtended, setLocationInfoExtended] = useState()
    const [regionInfo, setRegionInfo] = useState()
    const {pokeName} = useParams();

    //remapping the colors because the provided colors
    //from the api are ugly 🤮
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
        
    }

    //const getLocationInfo = async () =>{
    //    await axios.get(`${encounterInfo[0].location_area.url}`).then(res =>{
    //        console.log("location info " + res.data)
    //        setLocationInfo(res.data)
    //    })
    //}
    
    //const getLocationInfoExpanded = async () =>{
    //    await axios.get(`${locationInfo.location.url}`).then(res =>{
    //        console.log("location info expanded " + res.data)
    //        setLocationInfoExtended(res.data)
    //    })
    //}

    //const getRegionInfo = async () =>{
    //    await axios.get(`${locationInfo.region.url}`).then(res =>{
    //        console.log(res.data)
    //        setRegionInfo(res.data)
    //    })
    //}

    useEffect(() =>{
        getinfo()
    }, [])

    useEffect(() =>{
        getSpeciesInfo()
        getEncounterInfo()
        //getRegionInfo()
    }, [pokeInfo])

    //useEffect(() =>{
    //    try{
    //        getRegionInfo()
    //    }catch(error){
    //        console.log(error)
    //    }
    //}, [locationInfo])
  return (
    <div className='page-container'>
        {pokeInfo && speciesInfo ? 
        <div className='poke-info-parent'>
            <div className='poke-content-parent'>
                <div className='poke-info-header'>
                    <p>{pokeInfo.name[0].toUpperCase() + pokeInfo.name.substring(1)}</p>
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
                    {/* encounter info */}
                    {encounterInfo ? 
                    <div className='ui-container'>
                        <p>Locations</p>
                        <div>
                            {encounterInfo.map(versions =>{
                                return(
                                    <EncounterInfo location_area= {versions.location_area.name.replace(/-/g,' ')} versions={versions.version_details}/>
                                    //{<option>{versions.version_details[0].version.name}</option>}
                                    )
                                })}
                        </div>
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
            />
        </div>
        : 
            null
        }
    </div>
  )
}
