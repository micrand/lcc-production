'use client';

import ImageKit from '../ui/ImageKit';
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetClose,
  SheetHeader,
  SheetTitle,
} from '../ui/sheet';
import CloseSVG from '../ui/icons/CloseSVG';
import ImpactClimatBanner from './ImpactClimatBanner';
import CartListItems from './CartListItems';
import CartSummary from './CartSummary';
import CheckoutButton from './CheckoutButton';
import { useCartStore } from '@/store/cartStore';
import DiscountSection from './DiscountSection';

interface CartSidebarProps {
  showCart: boolean;
  setShowCart: (show: boolean) => void;
  onMouseOver?: () => void;
}

const CartSidebar = ({ showCart, setShowCart, onMouseOver }: CartSidebarProps) => {
  const cartStore = useCartStore((state) => state.cart);

  const capturedCarbon =
    (cartStore?.catched_carbon ?? 0) > 1000
      ? Math.round((cartStore?.catched_carbon ?? 0) / 1000)
      : Math.round(cartStore?.catched_carbon ?? 0);
  const itemsCount = cartStore?.total_items ?? 0;

  return (
    <div className="flex">
      <Sheet open={showCart} onOpenChange={setShowCart}>
        <SheetTrigger asChild>
          <a role="button" className="p-[6px] relative" onMouseOver={onMouseOver}>
            <ImageKit
              src="/icons/shopping_bag.svg"
              width={32}
              height={32}
              alt="shopping bag icon"
            />
            {itemsCount !== 0 ? (
              <span className="absolute bg-[#fb0000] bottom-[5px] font-bold right-[8px] font-roboto text-[10px] top-auto left-auto w-max p-[3px] rounded-full h-[13px] text-white flex-center ">
                {itemsCount}
              </span>
            ) : (
              ''
            )}
          </a>
        </SheetTrigger>
        <SheetContent
          side={'right'}
          className="max-w-full w-auto h-[calc(100vh-30px)] lg:w-[375px] lg:h-full bg-white z-[999] overflow-y-auto pt-[15px] px-[30px] pb-[40px] top-[15px] right-[15px] left-[15px] lg:top-0 lg:right-0 lg:left-auto rounded-[15px] lg:rounded-none"
        >
          <SheetClose>
            <CloseSVG />
          </SheetClose>
          <SheetHeader>
            <p className="flex items-center justify-start text-[28px] font-semibold gap-2 absolute top-3 left-8 !font-roboto-condensed leading-tight">
              Panier{' '}
              {itemsCount > 0
                ? `${itemsCount}`
                : ''}
            </p>
          </SheetHeader>
          <SheetTitle>
            <span className="sr-only">Menu Mobile</span>
          </SheetTitle>
          <div className="flex flex-col gap-[5px] w-full pt-6 !font-roboto-condensed">
            <ImpactClimatBanner capturedCarbon={capturedCarbon} />
            <CartListItems />
            <div className="flex flex-col">
              <CartSummary cart={cartStore} />
              <DiscountSection cart={cartStore} />
              <CheckoutButton />
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default CartSidebar;
