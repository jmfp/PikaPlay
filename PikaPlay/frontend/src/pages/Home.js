import React from 'react'
import axios from 'axios'
import Image from '../components/Image'
import pic from '../images/pika.png'
import Header from '../components/Header'

export default function Home() {


  const testApi = async() =>{
    await axios.get("http://localhost:5000/api/products/add-product").then(res =>{
      console.log(res.data)
    })
  }

  return (
    <div>
      <Header/>
      <Image className="hero-image" backgroundImage="f" image={pic}>
        <h1>Lets see if this text works the quick brown fox jumped over the lazy dog</h1>
      </Image>
      <div className='page-container'>
          <p>Home</p>
          <div className='round-button-static' onClick={testApi}>Click</div>
      </div>
    </div>
    )
}
