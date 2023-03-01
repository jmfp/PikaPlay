import React from 'react'
import {Link} from 'react-router-dom'

export default function Header() {
  return (
    <div className='header'>
        <div className='logo-container'>
            <Link to='/'>Home</Link>
            <Link to='/query'>query</Link>
            <input placeholder='search' className='input-field'/>
        </div>
    </div>
  )
}
