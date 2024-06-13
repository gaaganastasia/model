import React from 'react';
import { Link as ScrolledLink } from "react-scroll";

function Header(props) {
  return (
    <header className="header">
      <ul className={`header__links`}>
        <li className='header__link'>
          <ScrolledLink to={'about'} spy={true} smooth={true} duration={500}>О нас</ScrolledLink>
        </li>
        <li className='header__link'>
          <ScrolledLink to={'story'} spy={true} smooth={true} duration={500}>История</ScrolledLink>
        </li>
        <li className='header__link'>
          <ScrolledLink to={'ddd'} spy={true} smooth={true} duration={500}>3д</ScrolledLink>
        </li>
        <li className='header__link'>
          <ScrolledLink to={'contacts'} spy={true} smooth={true} duration={500}>Контакты</ScrolledLink>
        </li>
      </ul>

    </header>
  );
}

export default Header;