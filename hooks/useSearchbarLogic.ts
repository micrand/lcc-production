import { useSearchProductStore } from '@/store/searchProductStore';
import debounce from 'lodash.debounce';
import { useEffect, useMemo, useRef, useState } from 'react';

export const useSearchbarLogic = () => {
  const getSearch = useSearchProductStore((state) => state.getSearchProducts);
  const productListing = useSearchProductStore((state) => state.search);

  const [search, setSearch] = useState('');
  const [navWidth, setNavWidth] = useState(0);
  const [searchbarWidth, setSearchbarWidth] = useState(0);
  const [searchbarIsShowed, setSearchbarIsShowed] = useState(false);
  const [showProductListing, setShowProductListing] = useState(false);

  const navRef = useRef<HTMLDivElement>(null);
  const searchbarRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const debouncedSearch = useMemo(
    () =>
      debounce((value: string) => {
        getSearch(value);
      }, 300),
    [getSearch]
  );

  useEffect(() => {
    if (search.length >= 3) {
      debouncedSearch(search);
    }

    return () => {
      debouncedSearch.cancel();
    };
  }, [search, debouncedSearch]);

  useEffect(() => {
    if (searchbarRef.current) {
      setSearchbarWidth((document.body.scrollWidth / 3) - 40);
    }
    if (navRef.current) {
      setNavWidth(navRef.current.scrollWidth);
      if (searchbarIsShowed) {
        navRef.current.style.pointerEvents = 'none';
      } else {
        timeoutRef.current = setTimeout(() => {
          if (navRef.current) navRef.current.style.pointerEvents = 'auto';
        }, 300);
      }
    }
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [searchbarIsShowed]);

  useEffect(() => {
    const handleEscapeDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (searchbarIsShowed) {
          setSearchbarIsShowed(false);
        }
      }
    };
    const handleClickOut = (event: MouseEvent) => {
      const target = event?.target as HTMLDivElement;
      if (
        !target.classList.contains('lcc-searchbar') &&
        !target.classList.contains('lcc-trigger-searchbar')
      ) {
        if (searchbarIsShowed) {
          setSearchbarIsShowed(false);
        }
      }
    };

    if(searchbarIsShowed) {
      const searchbar = document.querySelector('input.lcc-searchbar') as HTMLInputElement;
      searchbar.focus();
    } else {
      setSearch('');
    }

    window.addEventListener('keydown', handleEscapeDown);
    document.addEventListener('click', handleClickOut);

    return () => {
      document.removeEventListener('click', handleClickOut);
      window.removeEventListener('keydown', handleEscapeDown);
    };
  }, [searchbarIsShowed]);

  return {
    search,
    navRef,
    navWidth,
    searchbarRef,
    productListing,
    searchbarWidth,
    searchbarIsShowed,
    showProductListing,
    setSearch,
    setSearchbarIsShowed,
    setShowProductListing
  };
};
