import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
      <nav className="navbar navbar-dark bg-dark">
        <div className="navbar-nav mr-auto flex-row">
          <Link to="/" className="nav-link mr-2">Home</Link>
          <Link to="/books" className="nav-link mr-2">Books</Link>
          <Link to="/create" className="nav-link mr-2">Create Book</Link>
        </div>
      </nav>



    );
  };
  
  export default Header;