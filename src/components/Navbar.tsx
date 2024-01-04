'use client';
import MaxWidthWrapper from './MaxWidth';
import Link from 'next/link';

const Navbar = () => {
  return (
    <div className='sticky z-50 top-0 inset-x-0 h-17 border-b border-gray-200 bg-black'>
      <header className='relative '>
        <MaxWidthWrapper>
          <div>
            <div className='flex'>
              <div className='flex h-16 items-center'>
                <Link href='/' className='text-3xl font-bold text-white'>
                  Dashboard
                </Link>
              </div>
            </div>
          </div>
        </MaxWidthWrapper>
      </header>
    </div>
  );
};

export default Navbar;
