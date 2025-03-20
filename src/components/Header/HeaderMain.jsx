import React from 'react';
import Logo from './Logo';
import Buttons from './Buttons';
import { useNavigate } from 'react-router';

function Header1({ handleOpenModal }) {

  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('/')
  }

  return (
    <div>
      <div className="px-[120px] py-[30py] h-[100px] w-[1920] flex justify-between items-center">
        <Logo onClick = {handleLogoClick}/>
        <Buttons/>
      </div>
    </div>
  );
}

export default Header1;
