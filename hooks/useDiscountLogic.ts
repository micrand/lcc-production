import { useCartStore } from '@/store/cartStore';
import { FormEvent, useEffect, useRef, useState } from 'react';

export const useDiscountLogic = () => {
  const addDiscount = useCartStore((state) => state.addDiscount);
  const removeDiscount = useCartStore((state) => state.removeDiscount);
  const getCart = useCartStore((state) => state.getCart);

  const [codeDiscount, setCodeDiscount] = useState('');
  const [isAddingDiscount, setIsAddingDiscount] = useState(false);
  const [discountMessageError, setDiscountMessageError] = useState('');
  const [contentMessageHeight, setContentMessageHeight] = useState(0);
  const [triggerHeight, setTriggerHeight] = useState(22.5);
  const [isTriggerShowDelay, setIsTriggerShowDelay] = useState(true);
  const [discountLoading, setDiscountLoading] = useState(false);

  const contentMessageRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const triggerTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleSubmitDiscount = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setDiscountLoading(true);
    await addDiscount(codeDiscount)
      .then(async () => {
        setIsAddingDiscount(false);
        setCodeDiscount('');
        await getCart();
      })
      .catch((err) => {
        setDiscountMessageError(err.message);
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(() => {
          setDiscountMessageError('');
        }, 10000);
      })
      .finally(() => {
        setDiscountLoading(false);
      });
  };

  const handleRemoveDiscount = async (id_cart_rule: string) => {
    setDiscountLoading(true);
    await removeDiscount(id_cart_rule).finally(() => {
      setDiscountLoading(false);
    });
    await getCart();
  };

  useEffect(() => {
    if (contentMessageRef.current) {
      setContentMessageHeight(contentMessageRef.current.scrollHeight);
    }
    if (triggerRef.current) {
      setTriggerHeight(triggerRef.current.scrollHeight);
    }

    if (triggerTimeoutRef.current) {
      clearTimeout(triggerTimeoutRef.current);
    }

    if (!isAddingDiscount) {
      triggerTimeoutRef.current = setTimeout(() => {
        setIsTriggerShowDelay(true);
      }, 400);
    } else {
      setIsTriggerShowDelay(false);
    }

    return () => {
      if (triggerTimeoutRef.current) {
        clearTimeout(triggerTimeoutRef.current);
      }
    };
  }, [isAddingDiscount, discountMessageError]);

  return {
    codeDiscount,
    isAddingDiscount,
    discountMessageError,
    contentMessageHeight,
    triggerHeight,
    isTriggerShowDelay,
    discountLoading,
    contentMessageRef,
    triggerRef,
    setCodeDiscount,
    setIsAddingDiscount,
    handleSubmitDiscount,
    handleRemoveDiscount
  }
};
