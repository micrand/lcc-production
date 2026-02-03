/* eslint-disable @next/next/no-img-element */
import { SearchProductListing as SearchProductListingType } from '@/types/searchListing';
import Link from 'next/link';
import React from 'react';

const ProductListing = ({ productListing, className = '' }: {productListing?: SearchProductListingType, className?: string }) => {
  return (
    <div className={`flex flex-col align-items bg-white w-full h-full max-h-min overflow-auto ${className}`}>
      <ul className="flex flex-col mx-auto max-w-[1031px] w-full gap-4 pt-4">
        {productListing?.products?.map((product) => {
          return (
            <li key={product.id_product}>
              <Link
                href={product.canonical_url || ''}
                className="flex items-center py-2 px-[17px] rounded-[1.5rem] gap-2 hover:bg-[#F1F1F1]"
              >
                <img
                  src={product.cover.medium.url}
                  alt={product.cover.legend}
                  width={50}
                  height={50}
                  className="w-[50px] h-[50px] "
                />
                <span className="!font-roboto font-normal text-[16.15px]">
                  {product.name}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ProductListing;
