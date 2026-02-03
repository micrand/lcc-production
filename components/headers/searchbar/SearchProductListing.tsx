import { FadeWrapper } from '@/components/ui/FadeWrapper';
import { SearchProductListing as SearchProductListingType } from '@/types/searchListing';
import React from 'react';
import ProductListing from './ProductListing';

interface SearchProductListingProps {
    showProductListing: boolean;
    productListing?: SearchProductListingType;
}

const SearchProductListing = ({
    showProductListing,
    productListing,
}: SearchProductListingProps) => {
  return (
    <FadeWrapper
      className="fixed flex w-full h-[calc(100vh-99px)] max-h-[calc(100vh-99px)] backdrop-blur-md z-10 top-[99px]"
      isOpen={showProductListing}
    >
      <ProductListing productListing={productListing} />
    </FadeWrapper>
  );
};

export default SearchProductListing;
