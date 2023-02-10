import React, {useState, useEffect} from 'react'
import axios from 'axios';
import Result from '../components/Result';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button'

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
        await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`).then(res =>{  
            console.log(res.data.results)
            setPokeList(res.data.results)
        })
    }

    let limit = 60;
    let offset = 0;

    const nextPage = () =>{
        offset += limit;
        getPokeList()
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
                        img={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${(i+1 + offset)}.png`} 
                        pokeNum={(i+1) + offset}
                        onClick={() => displayInfo(`${mon.name}`)}
                        />
                    )
                })
            :null}
        </div>
        {/*<Button className='round-button-static' text='Next Page' onClick={nextPage}/>*/}
    </div>
  )
}
