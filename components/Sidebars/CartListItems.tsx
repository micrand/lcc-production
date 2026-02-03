'use client';

import { useEffect, useState } from 'react';
import CartItem from '../cart/CartItem';
import { useCartStore } from '@/store/cartStore';

export default function CartListItems() {
  const cart = useCartStore((state) => state.cart);
  const updateCart = useCartStore((state) => state.updateCart);
  const removeItem = useCartStore((state) => state.deleteCart);
  const [quantities, setQuantities] = useState<number[]>([]);

  useEffect(() => {
    if (!cart) return;
    setQuantities(cart.products.map((p) => parseFloat(p.cart_quantity)));
  }, [cart]);

  const syncCart = async (index: number, newQuantities: number[]) => {
    if (!cart) return;
    updateCart({
      id_product: cart.products[index].id_product,
      quantity: newQuantities[index],
    }); // maj du store
  };

  const handleIncrease = (index: number) => {
    const newQuantities = [...quantities];
    newQuantities[index]++;
    setQuantities(newQuantities);
    syncCart(index, newQuantities);
  };

  const handleDecrease = (index: number) => {
    const newQuantities = [...quantities];
    if (newQuantities[index] > 1) {
      newQuantities[index]--;
      setQuantities(newQuantities);
      syncCart(index, newQuantities);
    }
  };

  const handleRemove = async (index: number) => {
    if (!cart) return;
    const updatedProducts = [...cart.products];
    updatedProducts.splice(index, 1);
    await removeItem(parseInt(cart.products[index].id_product)); // maj dans zustand
    setQuantities(cart.products.map((p) => p.quantity)); // maj local
  };

  const handleChange = async (index: number, value: number) => {
    setQuantities((quantities) => {
      let result = [...quantities];
      result[index] = value;
      return result;
    });
  };

  if (!cart) return <div />;

  return (
    <div className="h-[calc(100vh-610px)]">
      {cart?.total_items === 0 ? (
        <span className="text-[15px] font-extralight">
          Il n&apos;y a plus d'articles dans votre panier
        </span>
      ) : (
        ''
      )}
      <div className="flex flex-col gap-[15px] h-full overflow-auto items-start justify-start">
        {cart.products.map((product, index) => (
          <CartItem
            key={product.unique_id}
            product={product}
            quantity={quantities[index]}
            onIncrease={() => handleIncrease(index)}
            onDecrease={() => handleDecrease(index)}
            onRemove={() => handleRemove(index)}
            onChange={(value) => handleChange(index, value)}
          />
        ))}
      </div>
    </div>
  );
}
