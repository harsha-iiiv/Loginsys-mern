import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';


const Header = () => (
  <header>
    <AppBar id="appbar"></AppBar>
    
    <Link id="links" to="/">Home</Link>
  
   
    <nav>
      <Link id="links" to="/About">About</Link>
     </nav>

    
  </header>
);

export default Header;
