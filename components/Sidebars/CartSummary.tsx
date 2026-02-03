import { formatEuroPrice } from '@/lib/utils';
import { Cart } from '@/types/cart';

const CartSummary = ({ cart }: { cart: Cart | null }) => {
  const subtotal = formatEuroPrice(
    cart?.summary_totals.total_products_wt ?? 0.0
  );
  const totalDiscounts = formatEuroPrice(
    cart?.summary_totals.total_discounts ?? 0
  );
  const shippingPrice =
    (cart?.summary_totals.total_shipping ?? 0) > 0
      ? formatEuroPrice(cart?.summary_totals.total_shipping ?? 0)
      : 'Offerte';
  const total = formatEuroPrice(cart?.total ?? 0.0);

  return (
    <div className="flex flex-col">
      <div className="flex flex-col pt-5 px-5 pb-2">
        <div className="flex justify-between text-[16px] leading-normal font-roboto-condensed">
          <span className="font-[400]">Sous-total</span>
          <span className="font-extralight">{subtotal}</span>
        </div>
        {!!cart?.summary_totals.total_discounts ? (
          <div className="flex justify-between text-[16px] leading-normal font-roboto-condensed">
            <span className="font-[400]">Réduction(s)</span>
            <span className="font-extralight">- {totalDiscounts}</span>
          </div>
        ) : (
          ''
        )}
        {cart?.products.length !== 0 && (
          <div className="flex justify-between text-[16px] leading-normal font-roboto-condensed">
            <span className="font-[400]">Livraison</span>
            <span className="font-extralight">{shippingPrice}</span>
          </div>
        )}
      </div>
      <div className="flex justify-between font-bold text-[20px] px-5 pt-[10px] pb-[33.5px] leading-tight font-roboto-condensed">
        <span>Total TTC</span>
        <span>{total}</span>
      </div>
    </div>
  );
};

export default CartSummary;
