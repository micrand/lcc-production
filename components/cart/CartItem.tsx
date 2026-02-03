'use client';

import Link from 'next/link';
import ImageKit from '../ui/ImageKit';
import { formatEuroPrice } from '@/lib/utils';
import { Product } from '@/types/cart';

interface Props {
  product: Product;
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  onRemove: () => void;
  onChange: (number: number) => void;
}

export default function CartItem({
  product,
  quantity,
  onIncrease,
  onDecrease,
  onRemove,
  onChange
}: Props) {
  return (
    <div className="flex flex-col gap-[15px] bg-[#F9F9F4] p-[15px] pb-6 rounded-[12px]">
      <div className="flex">
        <div className="flex align-middle w-[75px] relative m-[10px]">
          <img src={product.image_url} alt={product.name} className="w-full" />
        </div>
        <div className="flex ps-[10px]">
          <Link
            className="font-roboto-condensed font-extralight text-[15px]"
            href={product.product_url}
          >
            {product.name}
          </Link>
        </div>
      </div>
      <div className="flex items-baseline gap-3">
        <div className="flex w-min">
          <button
            type="button"
            onClick={onDecrease}
            className="bg-[#282F2A] mx-[5px] font-normal text-[20px] text-white rounded-full flex-center h-[27px] w-[27px] leading-none"
          >
            -
          </button>
          <input
            type="number"
            readOnly
            value={quantity}
            onChange={(e) => onChange(parseInt(e.target.value))}
            className="px-2 py-[2.8px] text-center border-none w-[30px] bg-transparent font-semibold outline-none"
          />
          <button
            type="button"
            onClick={onIncrease}
            className="bg-[#282F2A] mx-[5px] font-normal text-[20px] text-white rounded-full flex-center h-[27px] w-[27px] leading-none"
          >
            +
          </button>
        </div>
        <button type="button" onClick={onRemove} className="px-2">
          <ImageKit
            src="/icons/pictopoubelle.svg"
            alt="trash can icon"
            width={14}
            height={17.26}
            className="opacity-[0.3]"
          />
        </button>
        <span className="mt-auto mb-0 text-[15px] ms-auto font-roboto-condensed">
          {formatEuroPrice(product.total_wt)}
        </span>
      </div>
    </div>
  );
}
