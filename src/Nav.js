import React from 'react'
import './nav.css';
//Link include karke mujhe home ke page se about jana hai to wo kar sakde ne aur khi aur bhi jana hai to wo bhi kar sakde ne
import {Link} from 'react-router-dom';
function Nav() {
    return (
       <nav className='nav-class' >
         <h1>Logo</h1>
         <ul className='list' >
           <Link to='/' >
           <li>Home</li>
           </Link>
           <Link to='/about'>
           <li>About</li>
           </Link>
           <Link to='/movies'>
           <li>Movies</li>
           </Link>
         </ul>
       </nav>
    )
}

export default Nav