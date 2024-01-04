import MENU_OPTIONS from '@/constants/menu';
import Link from 'next/link';
import React from 'react';

const MenuBar = () => {
  return (
    <div className='text-white '>
      <div className='text-2xl font-bold text-center mt-2'>Control Pannel</div>
      <div className='flex flex-col	ml-2 mt-10'>
        {MENU_OPTIONS.map((option) => (
          <div
            key={option?.name}
            className='font-semibold w-full my-1 hover:text-slate-500'
          >
            <Link href={option.path}>{option.name}</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuBar;
