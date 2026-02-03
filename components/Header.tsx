'use client';

import { useHeader } from '@/hooks/useHeader';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import ImageKit from './ui/ImageKit';
import CartSidebar from './Sidebars/CartSidebar';
import SidebarMobile from './Sidebars/SidebarMobile';
import ModalMonCompte from './modals/ModalMonCompte';
import TopBanner from './headers/TopBanner';
import LogoSection from './headers/LogoSection';
import { useSearchbarLogic } from '@/hooks/useSearchbarLogic';
import HeaderCenter from './headers/HeaderCenter';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import SearchProductListing from './headers/searchbar/SearchProductListing';
import SearchbarMobile from './headers/searchbar/SearchbarMobile';
import HeaderRight from './headers/HeaderRight';

const ModalCsc = dynamic(
  () => import('./ui/modals').then((mod) => mod.ModalCsc),
  { ssr: false }
);

const URL_CSC = process.env.NEXT_PUBLIC_REDIRECT;

const Header = () => {
  const {
    ads,
    isMd,
    user,
    fade,
    toggle,
    divRef,
    openSub,
    openSide,
    showCart,
    divHeight,
    isVisible,
    openMonCompte,
    topModalCompte,
    isModalVideoOpen,
    setOpenSub,
    setShowCart,
    setOpenSide,
    handleCloseAll,
    handleMouseOver,
    handleMouseLeave,
    setOpenMonCompte,
    setIsModalVideoOpen,
  } = useHeader();

  const {
    search,
    navRef,
    navWidth,
    searchbarRef,
    searchbarWidth,
    productListing,
    searchbarIsShowed,
    showProductListing,
    setSearch,
    setSearchbarIsShowed,
    setShowProductListing
  } = useSearchbarLogic();

  const { push } = useRouter();

  useEffect(() => {
    if ((productListing?.products.length) !== 0 && isVisible && searchbarIsShowed && (search.length > 2)) {
      setShowProductListing(true);
    } else {
      setShowProductListing(false);
    }
  }, [isVisible, productListing?.products.length, search.length, searchbarIsShowed, setSearch, setShowProductListing])

  useEffect(() => {
    if (!isVisible) {
      setSearch('');
      setSearchbarIsShowed(false);
    }
  }, [isVisible, setSearch, setSearchbarIsShowed])

  return (
    <div
      style={{
        height: divHeight ?? (!isMd ? 129 : 136) + 'px',
        willChange: 'height',
      }}
      className={`w-full relative z-[99]`}
    >
      <header
        className={`transition-transform duration-300 ease-in-out fixed flex-center flex-col top-0 left-0 right-0 z-100 !will-change-transform ${
          isVisible ? 'translate-y-0' : '-translate-y-[500px]'
        }`}
      >
        <TopBanner ads={ads} toggle={toggle} fade={fade} />
        <div
          ref={divRef}
          className={`!w-full mx-['auto'] p-0 xl:px-[0] top-0 bg-white`}
        >
          <div className="w-full px-4 md:px-4 py-2 flex-center z-[101]">
            <LogoSection />
            {/* Navigation - Chargement différé */}
            <HeaderCenter
              search={search}
              navRef={navRef}
              openSub={openSub}
              navWidth={navWidth}
              searchbarRef={searchbarRef}
              searchbarWidth={searchbarWidth}
              searchbarIsShowed={searchbarIsShowed}
              onSubmit={() => push(`${URL_CSC}/recherche?controller=search&s=${search}`)}
              setSearch={setSearch}
              setOpenSub={setOpenSub}
              handleCloseAll={handleCloseAll}
              handleMouseOver={handleMouseOver}
              handleMouseLeave={handleMouseLeave}
            />

            {/*button store*/}
            <HeaderRight
              user={user}
              isMd={isMd}
              search={search}
              urlCSC={URL_CSC!}
              openSub={openSub}
              showCart={showCart}
              openSide={openSide}
              productListing={productListing}
              searchbarIsShowed={searchbarIsShowed}
              showProductListing={showProductListing}
              setOpenSub={setOpenSub}
              setOpenSide={setOpenSide}
              setSearch={setSearch}
              setShowCart={setShowCart}
              handleCloseAll={handleCloseAll}
              handleMouseOver={handleMouseOver}
              handleMouseLeave={handleMouseLeave}
              setOpenMonCompte={setOpenMonCompte}
              setSearchbarIsShowed={setSearchbarIsShowed}
            />
          </div>
        </div>
        {isMd && <SearchProductListing productListing={productListing} showProductListing={showProductListing} />}
      </header>
      {isMd && <ModalMonCompte open={openMonCompte} onClose={() => setOpenMonCompte(false)} topModalCompte={topModalCompte} />}

      {/* Modal vidéo - Chargement différé */}
      {isModalVideoOpen && (
        <ModalCsc
          show={isModalVideoOpen}
          onClose={() => setIsModalVideoOpen(false)}
          className={'p-0 aspect-video w-[100%] rounded-none'}
        >
          <iframe
            width="100%"
            height="100%"
            className="aspect-video"
            src="https://www.youtube.com/embed/FsGYYOLUGig?si=W3oY70_JLq0rca-s"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </ModalCsc>
      )}
    </div>
  );
};

export default Header;
