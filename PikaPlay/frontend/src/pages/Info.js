import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import Image from '../components/Image';
import EncounterInfo from '../components/EncounterInfo';

export default function Info() {
    const [pokeInfo, setPokeInfo] = useState()
    const [speciesInfo, setSpeciesInfo] = useState()
    const [encounterInfo, setEncounterInfo] = useState()
    const [dexEntries, setDexEntries] = useState([{flavor_text: ''}])
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
            setPokeInfo(res.data)
        })
    }

    const getSpeciesInfo = async () =>{
        await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${pokeInfo.id}/`).then(res =>{
            setDexEntries(res.data.flavor_text_entries.filter(language => language.language.name === 'en'))
            setSpeciesInfo(res.data)
        })
    }

    const getEncounterInfo = async () =>{
        await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokeInfo.id}/encounters`).then(res =>{
            setEncounterInfo(res.data)
        })
        
    }

    useEffect(() =>{
        getinfo()
    }, [])

    useEffect(() =>{
        getSpeciesInfo()
        getEncounterInfo()
        //getRegionInfo()
    }, [pokeInfo])
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
                    <p>{dexEntries.length > 0 ? dexEntries[0].flavor_text : "Generation 9 info coming soon"}</p>
                    {/* encounter info */}
                    {encounterInfo ? 
                    <div className='ui-container' style={{marginTop: `400px`, backgroundColor: `#2b2d42`}}>
                        <p>Locations</p>
                        {encounterInfo.map(versions =>{
                            return(
                                <EncounterInfo location_area= {versions.location_area.name.replace(/-/g,' ')[0].toUpperCase() + versions.location_area.name.replace(/-/g,' ').substr(1)} versions={versions.version_details}/>
                                )
                            })}
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
