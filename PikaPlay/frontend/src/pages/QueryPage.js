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
            await axios.get(`https://pokeapi.co/api/v2/pokemon/${val.toLowerCase()}`).then(res =>{
                displayInfo(val.toLowerCase())
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
            setPokeList(res.data.results)
        })
    }

    
    const{limit, offset} = useParams()
    let _limit = Number(limit);
    let _offset = Number(offset);

    const nextPage = () =>{
        if(offset != 857){
            _offset += Number(_limit);
            getPokeList()
            navigate(`/query/${_limit}/${_offset}`)
        }
    }

    const backPage = () =>{
        if(offset > 0){
            _offset -= _limit
            getPokeList()
            navigate(`/query/${_limit}/${_offset}`)
        }
    }

  return (
    <div className='page-container'>
        <div className='service-container-3'>
            <TextInput className='input-field' placeholder='search' onChange={(e)=>setSearchPoke(e.target.value)}/>
            <Button text='search' onClick={() => search(searchPoke)} className='round-button-menu'/>
        </div>
        <div className='ui-container'>
            <div className='grid'>
                {pokeList.length > 0 ?
                    pokeList.map((mon, i) =>{
                        if(i+1 <= 809){
                            return(
                                <Result 
                                    pokeName={mon.name[0].toUpperCase() + mon.name.substr(1)} 
                                    img={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${(i+1 + Number(_offset))}.png`} 
                                    pokeNum={(i+1) + Number(_offset)}
                                    onClick={() => displayInfo(`${mon.name}`)}
                                />
                            )
                        }
                    })
                :null}
            </div>
        </div>
        <div className='footer-container'>
            <Button className='round-button-menu' text='Back' onClick={backPage }/>
            <Button className='round-button-menu' text='Next' onClick={nextPage}/>

        </div>
    </div>
  )
}
