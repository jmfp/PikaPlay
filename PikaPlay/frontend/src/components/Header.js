import React from 'react'
import {Link} from 'react-router-dom'

export default function Header() {
  return (
    <header className='header-invis'>
        <div className='logo-container'>
            <Link to='/'>Home</Link>
            <Link to='/query'>query</Link>
        </div>
    </header>
  )
}
