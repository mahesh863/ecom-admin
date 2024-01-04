import React from 'react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet';
import { LogOut, Menu } from 'lucide-react';
import { Button, buttonVariants } from './ui/button';
import MENU_OPTIONS from '@/constants/menu';
import Link from 'next/link';

const MenuSheet = () => {
  return (
    <Sheet>
      <SheetTrigger className='text-white'>
        <Menu className='h-8 w-8' />
      </SheetTrigger>
      <SheetContent className='flex flex-col flex-1 bg-[#151515] text-white'>
        <SheetHeader>
          <SheetTitle className='text-2xl text-center text-white '>
            Control Pannel
          </SheetTitle>
        </SheetHeader>
        {MENU_OPTIONS.map((option) => (
          <Link key={option?.name} href={option.path} className='font-bold'>
            {option.name}
          </Link>
        ))}

        <SheetFooter>
          <Button variant='secondary' className='w-full'>
            Sign out
            <LogOut className='ml-2' />
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default MenuSheet;
