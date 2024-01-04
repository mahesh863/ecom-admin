import MenuBar from '@/components/MenuBar';
import Navbar from '@/components/Navbar';
import React from 'react';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='h-screen'>
      <Navbar />
      <div className='grid grid-cols-7 h-[calc(100vh-70px)]'>
        <div className=' p-2 col-span-1 border-r'>
          <MenuBar />
        </div>
        <div className='col-span-6'>{children}</div>
      </div>
    </div>
  );
};

export default Layout;
