import React, { Dispatch, SetStateAction } from 'react';
import ImageKit from '../ui/ImageKit';
import SearchbarMobile from './searchbar/SearchbarMobile';
import Link from 'next/link';
import CartSidebar from '../Sidebars/CartSidebar';
import SidebarMobile from '../Sidebars/SidebarMobile';
import { SearchProductListing } from '@/types/searchListing';
import { User } from '@/types/user';

interface HeaderRightProps {
  user: User | null;
  isMd: boolean;
  search: string;
  urlCSC: string;
  openSub: boolean;
  showCart: boolean;
  openSide: boolean;
  searchbarIsShowed: boolean;
  showProductListing: boolean;
  productListing?: SearchProductListing;
  handleCloseAll: () => void;
  handleMouseOver: () => void;
  handleMouseLeave: () => void;
  setSearch: Dispatch<SetStateAction<string>>;
  setOpenSub: Dispatch<SetStateAction<boolean>>;
  setOpenSide: Dispatch<SetStateAction<boolean>>;
  setShowCart: Dispatch<SetStateAction<boolean>>;
  setOpenMonCompte: Dispatch<SetStateAction<boolean>>;
  setSearchbarIsShowed: Dispatch<SetStateAction<boolean>>;
}

const HeaderRight = ({
  user,
  isMd,
  search,
  urlCSC,
  openSub,
  showCart,
  openSide,
  productListing,
  searchbarIsShowed,
  showProductListing,
  setOpenSub,
  setOpenSide,
  setSearch,
  setShowCart,
  handleCloseAll,
  handleMouseOver,
  handleMouseLeave,
  setOpenMonCompte,
  setSearchbarIsShowed,
}: HeaderRightProps) => {
  return (
    <div
      className={
        'gap-2 flex flex-1 flex-row justify-end start-center lg:items-center'
      }
    >
      <a
        role="button"
        className="hidden md:flex p-[6px] mt-[0.2rem] lcc-trigger-searchbar"
        onMouseOver={handleCloseAll}
        onClick={() => setSearchbarIsShowed((b) => !b)}
      >
        <ImageKit
          src="/icons/search.svg"
          width={32}
          height={32}
          alt="search icon"
        />
      </a>
      {!isMd && (
        <SearchbarMobile
          search={search}
          productListing={productListing}
          searchbarIsShowed={searchbarIsShowed}
          showProductListing={showProductListing}
          setSearch={setSearch}
          setSearchbarIsShowed={setSearchbarIsShowed}
        />
      )}
      {(isMd && user?.logged && user?.firstname) ? (
        <span
          role="button"
          className="text-[15px] font-extralight !font-roboto-condensed underline mr-[10px] tracking-[0.5px] p-[6px] hidden lg:flex"
          onMouseOver={handleCloseAll}
          onClick={() => setOpenMonCompte(true)}
        >
          {user.firstname}
        </span>
      ) : (
        <Link
          href={urlCSC + '/mon-compte'}
          className="p-[6px] hidden lg:flex"
          onMouseOver={handleCloseAll}
        >
          <ImageKit
            src="/icons/Account.svg"
            width={32}
            height={32}
            alt="user circle icon"
          />
        </Link>
      )}
      <CartSidebar showCart={showCart} setShowCart={setShowCart} onMouseOver={handleCloseAll} />
      {/* Menu mobile - Chargement différé */}
      <SidebarMobile
        user={user}
        openSide={openSide}
        setOpenSide={setOpenSide}
        openSub={openSub}
        setOpenSub={setOpenSub}
        handleCloseAll={handleCloseAll}
        handleMouseOver={handleMouseOver}
        handleMouseLeave={handleMouseLeave}
      />
    </div>
  );
};

export default HeaderRight;
