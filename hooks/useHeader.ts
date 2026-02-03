import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { usePathname } from 'next/navigation';
import { useAppStore } from '@/store/appStore';
import { useCartStore } from '@/store/cartStore';
import useMediaQuery from '@/lib/useMediaQuery';

export const useHeader = () => {
  const pathname = usePathname();

  const {
    openModalVideo: isModalVideoOpen,
    setOpenModalVideo: setIsModalVideoOpen,
    height: divHeight,
    setHeight: setDivHeight,
    getUser,
    user
  } = useAppStore((state) => state);
  const getCart = useCartStore((state) => state.getCart);

  const [openMonCompte, setOpenMonCompte] = useState(false);
  const [openSub, setOpenSub] = useState(false);
  const [openSide, setOpenSide] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showCart, setShowCart] = useState<boolean>(false);
  const [toggle, setToggle] = useState(false);
  const [ads, setAds] = useState('Livraison gratuite dès 49 €');
  const [fade, setFade] = useState({
    opacity: 'opacity-1',
    me: 'md:me-[83px]',
  });

  const divRef = useRef<HTMLDivElement | null>(null);

  const topModalCompte = useMemo(() => {
    return `!top-[${divHeight}px]`
  }, [divHeight])

  const isMd = useMediaQuery('(min-width: 768px)');

  // Optimiser le handleScroll avec requestAnimationFrame
  const handleScroll = useCallback(() => {
    requestAnimationFrame(() => {
      const currentScrollY = window.scrollY;
      if (currentScrollY <= 136) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY) {
        setIsVisible(false);
      } else {
        setOpenSub(false);
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    });
  }, [lastScrollY]);
  const handleMouseOver = () => setOpenSub(true);
  const handleMouseLeave = () => setOpenSub(false);
  const handleCloseAll = () => {
    setOpenSide(false);
    setOpenSub(false);
  };

  useEffect(() => {
    const init = async () => {
      const user = await getUser();
      if (!user) {
        console.error('Utilisateur non connecté');
      }
    };
    init();
  }, [getUser]);

  useEffect(() => {
    getCart();
  }, [getCart]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setFade((prev) => ({ ...prev, opacity: 'opacity-0' }));

      setTimeout(() => {
        if (toggle) {
          setFade((prev) => ({ ...prev }));
          setAds('Livraison gratuite dès 49 €');
        } else {
          setFade((prev) => ({ ...prev }));
          setAds('-10% en vous inscrivant à la newsletter');
        }
        setToggle((prev) => !prev);
        setFade((prev) => ({ ...prev, opacity: 'opacity-1' }));
      }, 300);
    }, 15 * 1000); // 15 secondes

    return () => clearInterval(intervalId); // nettoyage à la destruction
  }, [toggle]);

  useEffect(() => {
    const updateDivHeight = () => {
      if (pathname) {
        if (
          pathname.startsWith('/projects/') ||
          pathname.startsWith('/methodologie-sur-le-terrain/') ||
          pathname.startsWith('/strategie-et-gouvernance/')
        )
          setDivHeight(0);
        else divRef.current && setDivHeight(divRef.current.offsetHeight + 32);
      }
    };
    updateDivHeight();
    window.addEventListener('resize', updateDivHeight);
    return () => {
      window.removeEventListener('resize', updateDivHeight);
    };
  }, [pathname, setDivHeight]);

  useEffect(() => {
    if (openMonCompte) {
      document.body.style.overflow = 'auto';
    }
  }, [openMonCompte])


  return {
    ads,
    isMd,
    fade,
    user,
    toggle,
    divRef,
    openSub,
    openSide,
    showCart,
    pathname,
    divHeight,
    isVisible,
    openMonCompte,
    topModalCompte,
    isModalVideoOpen,
    setOpenSub,
    setShowCart,
    setOpenSide,
    setDivHeight,
    setOpenMonCompte,
    handleCloseAll,
    handleMouseOver,
    handleMouseLeave,
    setIsModalVideoOpen,
  };
};
