import Link from 'next/link';
import React from 'react';
import ImageKit from '../ui/ImageKit';
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '../ui/sheet';
import { Nav } from '../Nav';
import { User } from '@/types/user';

interface SidebarMobileProps {
  user: User | null;
  openSide: boolean;
  setOpenSide: (show: boolean) => void;
  openSub: boolean;
  setOpenSub: (show: boolean) => void;
  handleMouseOver: () => void;
  handleMouseLeave: () => void;
  handleCloseAll: () => void;
}

const SidebarMobile = ({
  user,
  openSide,
  setOpenSide,
  openSub,
  setOpenSub,
  handleCloseAll,
  handleMouseLeave,
  handleMouseOver,
}: SidebarMobileProps) => {
  return (
    <div className="h-full flex lg:hidden lcc-searchbar">
      <Sheet open={openSide} onOpenChange={setOpenSide}>
        <SheetTrigger asChild>
          <a href="#" className="p-[10px]" onClick={() => {}}>
            <ImageKit
              src="/icons/hamburger.svg"
              width={28}
              height={28}
              alt="hamburger icon"
            />
          </a>
        </SheetTrigger>
        <SheetContent className="w-[100vw] h-full bg-white lg:hidden z-[999] overflow-y-auto pt-16">
          <SheetHeader>
            <Link
              href={`${process.env.NEXT_PUBLIC_REDIRECT}/mon-compte`}
              className="flex items-center justify-start gap-2 absolute top-5 left-6 font-roboto"
            >
              <ImageKit
                src="/icons/Account.svg"
                alt="account icon"
                width={32}
                height={32}
              />
              <span className="font-semibold text-[#24B9D7] text-[1rem] leading-none font-roboto tracking-[0.5px]">
                { user?.logged ? user.firstname : 'Connexion' }
              </span>
            </Link>
            <div className="border-b border-black flex absolute top-[72px] left-0 h-[1px] w-full !mt-0"></div>
          </SheetHeader>
          <SheetTitle>
            <span className="sr-only">Menu Mobile</span>
          </SheetTitle>
          <Nav
            openSub={openSub}
            setOpenSub={setOpenSub}
            handleMouseOver={handleMouseOver}
            handleMouseLeave={handleMouseLeave}
            handleCloseAll={handleCloseAll}
          />
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default SidebarMobile;
