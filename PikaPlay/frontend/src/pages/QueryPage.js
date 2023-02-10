import React, {useState, useEffect} from 'react'
import axios from 'axios';
import Result from '../components/Result';
import { useNavigate } from 'react-router-dom';

export default function QueryPage() {
    const [pokeList, setPokeList] = useState([]);
    const navigate = useNavigate();


    const displayInfo = (pokeName) =>{
        navigate(`/info/${pokeName}`)
    }

    useEffect(() => {
        getPokeList()
    }, [])
    const getPokeList = async () =>{
        await axios.get('https://pokeapi.co/api/v2/pokemon?limit=151').then(res =>{  
            console.log(res.data.results)
            setPokeList(res.data.results)
        })
        await axios.get('https://pokeapi.co/api/v2/pokemon/pikachu').then(res =>{  
            console.log(res.data)
        })
    }

    let limit = 60;
    let offset = 60;

    const nextPage = () =>{
        offset += limit;
    }

    const backPage = () =>{
        if(offset > limit){
            offset -= limit;
        }
    }

  return (
    <div className='page-container'>
        <div className='ui-container'>
            {pokeList.length > 0 ?
                pokeList.map((mon, i) =>{
                    return(
                        <Result 
                        pokeName={mon.name} 
                        img={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${i+1}.png`} 
                        pokeNum={i+1}
                        onClick={() => displayInfo(`${mon.name}`)}
                        />
                    )
                })
            :null}
        </div>
    </div>
  )
}
