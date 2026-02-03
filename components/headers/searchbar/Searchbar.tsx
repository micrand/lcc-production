import ImageKit from '@/components/ui/ImageKit';
import { ChangeEventHandler, FormEventHandler, Ref } from 'react';

interface SearchbarProps {
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  onSubmit?: FormEventHandler<HTMLFormElement>;
  ref?: Ref<HTMLDivElement>;
  searchIconURL?: string;
}

const Searchbar = ({
  value,
  onChange,
  onSubmit,
  ref,
  searchIconURL = '/icons/searchbar.svg',
}: SearchbarProps) => {
  return (
    <div ref={ref} className="flex overflow-hidden min-w-full w-full max-w-[635px] mx-auto">
      <form method="POST" onSubmit={onSubmit} className="flex w-full relative">
        <button
          type="submit"
          className="absolute top-1 right-[12px] md:left-[5px] outline-none flex h-[32px] w-[32px]"
        >
          <ImageKit
            src={searchIconURL}
            alt="searchbar icon"
            quality={100}
            width={50}
            height={50}
            className="h-[32px] w-[32px]"
            original={true}
          />
        </button>
        <input
          type="text"
          name="searchbar"
          id="searchbar"
          value={value}
          onChange={onChange}
          placeholder="Que recherchez-vous ?"
          className="
            lcc-searchbar
            flex w-full
            py-[10px] md:py-[11px] pe-[1rem] ps-4 md:ps-[35px] leading-none
            outline-none border border-[#909090] rounded-full
            text-[16px] md:text-[15px] text-black tracking-[1px] !font-roboto-condensed
            placeholder:!font-roboto-condensed placeholder:!text-[15px] placeholder:!text-black md:placeholder:tracking-[1px] placeholder:font-light
          "
          autoComplete="off"
        />
      </form>
    </div>
  );
};

export default Searchbar;
