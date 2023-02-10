import React, {useState} from 'react'
import axios from 'axios'
import Header from '../components/Header'

export default function Register() {
  const [reqdata, setData] = useState({firstName: '', userName: 'akuno', email: 'testemail@gmail.com', password:'password'})
  const [focus, setFocus] = useState(true)
  const addUser = ()=>{
    axios.post('http://localhost:5000/api/users/add-user', reqdata)
  }
  const login = () =>{
    axios.post('http://localhost:5000/api/users/login', reqdata).then(res =>{
      console.log(res.data)
      localStorage.setItem('user', res.data._id)
      localStorage.setItem('auth', res.data.auth)
    })
  }
  return (
    <div className='page-container'>
      <Header/>
      {focus? 
      <div>
        <input placeholder='username' onChange={(e)=>setData({...reqdata, userName: e.target.value})}/>
        <input placeholder='First Name' onChange={(e)=>setData({...reqdata, firstName: e.target.value})}/>
        <input type='email' placeholder='email' onChange={(e)=>setData({...reqdata, email: e.target.value})}/>
        <input type='password' placeholder='Password' onChange={(e)=>setData({...reqdata, password: e.target.value})}/>
        <button onClick={addUser}>test</button>
        <button onClick={() => setFocus(false)}>Login</button>
      </div>
      :
      <div>
        <input type='email' placeholder='email' onChange={(e) => setData({...reqdata, email: e.target.value})}/>
        <input type='password' placeholder='password' onChange={(e) => setData({...reqdata, password: e.target.value})}/>
        <button onClick={login}>login</button>
        <button onClick={() => setFocus(false)}>Login</button>
      </div>
    }
    
    </div>
  )
}
