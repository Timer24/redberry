import React from 'react';
import Logo from './Logo';
import Buttons from './Buttons';

function Header1({ handleOpenModal }) {

  return (
    <div>
      <div className="px-[120px] py-[30py] h-[100px] w-[1920] flex justify-between items-center">
        <Logo/>
        <Buttons/>
      </div>
      <p className="ml-[120px] mt-[30px] font-[FiraGO] font-semibold text-[34px] leading-[100%] tracking-[0%]">დავალებების გვერდი</p>
    </div>
  );
}

export default Header1;
