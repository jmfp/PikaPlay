import React, {useState, useEffect} from 'react'
import axios from 'axios';

export default function QueryPage() {
    const [pokeList, setPokeList] = useState([]);

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
                pokeList.map(mon =>{
                    return(<p style={{color: 'white'}}>{mon.name}</p>)
                })
            :null}
        </div>
    </div>
  )
}
