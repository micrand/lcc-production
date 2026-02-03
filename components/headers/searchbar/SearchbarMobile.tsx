import ImageKit from '@/components/ui/ImageKit';
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
} from '@/components/ui/sheet';
import Searchbar from './Searchbar';
import { useRouter } from 'next/navigation';
import { SearchProductListing } from '@/types/searchListing';
import { Dispatch, SetStateAction } from 'react';
import ProductListing from './ProductListing';

interface SearchbarMobileProps {
  search: string;
  searchbarIsShowed: boolean;
  showProductListing: boolean;
  productListing?: SearchProductListing;
  setSearch: Dispatch<SetStateAction<string>>;
  setSearchbarIsShowed: Dispatch<SetStateAction<boolean>>;
}

const URL_CSC = process.env.NEXT_PUBLIC_REDIRECT;

const SearchbarMobile = ({
  search,
  productListing,
  searchbarIsShowed,
  showProductListing,
  setSearch,
  setSearchbarIsShowed,
}: SearchbarMobileProps) => {
  const { push } = useRouter();
  return (
    <div className="h-full flex lg:hidden relative">
      <Sheet open={searchbarIsShowed} onOpenChange={setSearchbarIsShowed}>
        <SheetTrigger asChild>
          <a
            role="button"
            onClick={() => setSearchbarIsShowed((b) => !b)}
            className="p-[6px] mt-[0.2rem] lcc-trigger-searchbar"
          >
            <ImageKit
              src="/icons/search.svg"
              width={32}
              height={32}
              alt="search icon"
            />
          </a>
        </SheetTrigger>
        <SheetContent
          withoutCloseButton={true}
          className="h-screen pt-[5px] z-[9999] px-0"
        >
          <SheetHeader className="border-b border-[#e5e5e5] pb-[13px] px-5">
            <ImageKit
              src="/icons/arrow-left.svg"
              alt="arrow left icon"
              width={50}
              height={50}
              original={true}
              className="w-[32px] h-[32px] absolute top-[17px] left-[16px]"
            />
            <Searchbar
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onSubmit={() =>
                push(`${URL_CSC}/recherche?controller=search&s=${search}`)
              }
              searchIconURL="/icons/search.svg"
            />
          </SheetHeader>
          {showProductListing && (
            <ProductListing productListing={productListing} />
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default SearchbarMobile;
