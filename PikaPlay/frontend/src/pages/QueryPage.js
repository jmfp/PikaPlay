import React, {useState, useEffect} from 'react'
import axios from 'axios';
import Result from '../components/Result';
import { useNavigate, useParams } from 'react-router-dom';
import TextInput from '../components/TextInput'
import Button from '../components/Button'

export default function QueryPage() {
    const [pokeList, setPokeList] = useState([]);
    const [searchPoke, setSearchPoke] = useState('')
    const navigate = useNavigate();

    const displayInfo = (pokeName) =>{
        navigate(`/info/${pokeName}`)
    }

    const search = async (val) =>{
        if(val === ''){
            return
        }
        try {
            await axios.get(`https://pokeapi.co/api/v2/pokemon/${val}`).then(res =>{
                displayInfo(val)
            //console.log(res.data)
            //setPokeList(res.data)
            })
        } catch (error) {
            console.log(error.message)
            return
        }
    }

    useEffect(() => {
        getPokeList()
    }, [])
    const getPokeList = async () =>{
        await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${_limit}&offset=${_offset}`).then(res =>{  
            console.log(res.data.results)
            setPokeList(res.data.results)
        })
    }

    
    const{limit, offset} = useParams()
    console.log(offset)
    let _limit = Number(limit);
    let _offset = Number(offset);

    const nextPage = () =>{
        _offset += Number(_limit);
        if(_offset >= 1009){
            _offset = 1008
        }
        navigate(`/query/${_limit}/${_offset}`)
        //getPokeList()
    }

    const backPage = () =>{
        if(offset > limit){
            offset -= limit;
        }
    }

  return (
    <div className='page-container'>
        <TextInput className='input-field' placeholder='search' onChange={(e)=>setSearchPoke(e.target.value)}/>
        <Button text='search' onClick={() => search(searchPoke)}/>
        <div className='ui-container'>
            <div className='grid'>
                {pokeList.length > 0 ?
                    pokeList.map((mon, i) =>{
                        return(
                            <Result 
                                pokeName={mon.name[0].toUpperCase() + mon.name.substr(1)} 
                                img={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${(i+1 + Number(_offset))}.png`} 
                                pokeNum={(i+1) + Number(_offset)}
                                onClick={() => displayInfo(`${mon.name}`)}
                            />
                        )
                    })
                :null}
            </div>
        </div>
        <Button className='round-button-static' text='Next Page' onClick={nextPage}/>
    </div>
  )
}
