import { FormEventHandler, Ref, useEffect } from 'react';
import { Nav } from '../Nav';
import { HorizontaleCollapseWrapper } from '../ui/CollapseWrapper';
import Searchbar from './searchbar/Searchbar';

interface HeaderCenterProps {
  search: string;
  openSub: boolean;
  navWidth: number;
  searchbarWidth: number;
  searchbarIsShowed: boolean;
  navRef: Ref<HTMLDivElement>;
  searchbarRef: Ref<HTMLDivElement>;
  handleCloseAll: () => void;
  handleMouseOver: () => void;
  handleMouseLeave: () => void;
  setSearch: (s: string) => void;
  setOpenSub: (b: boolean) => void;
  onSubmit?: FormEventHandler<HTMLFormElement>;
}

const HeaderCenter = ({
  search,
  navRef,
  openSub,
  navWidth,
  searchbarRef,
  searchbarWidth,
  searchbarIsShowed,
  onSubmit,
  setSearch,
  setOpenSub,
  handleCloseAll,
  handleMouseOver,
  handleMouseLeave,
}: HeaderCenterProps) => {
  useEffect(() => {}, [searchbarIsShowed])
  return (
    <div
      ref={searchbarRef}
      className={`${searchbarIsShowed? 'flex-1': 'flex-auto'} h-full hidden lg:flex justify-center items-center`}
    >
      <HorizontaleCollapseWrapper
        isOpen={searchbarIsShowed}
        contentWidth={searchbarWidth}
      >
        <Searchbar
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onSubmit={onSubmit}
        />
      </HorizontaleCollapseWrapper>
      <HorizontaleCollapseWrapper
        isOpen={!searchbarIsShowed}
        contentWidth={navWidth}
      >
        <Nav
          ref={navRef}
          openSub={openSub}
          setOpenSub={setOpenSub}
          handleMouseOver={handleMouseOver}
          handleMouseLeave={handleMouseLeave}
          handleCloseAll={handleCloseAll}
        />
      </HorizontaleCollapseWrapper>
    </div>
  );
};

export default HeaderCenter;
