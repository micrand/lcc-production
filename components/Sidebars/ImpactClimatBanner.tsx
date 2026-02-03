import { getCarbonUnit } from '@/lib/utils';
import ImageKit from '../ui/ImageKit';

const ImpactClimatBanner = ({ capturedCarbon }: { capturedCarbon: number }) => {
  const carbonUnit = getCarbonUnit(capturedCarbon);
  return (
    <div className="flex justify-center mx-auto bg-[#D8FC31] rounded-lg text-[#244F18] py-[15px] px-[10px] gap-0">
      <div className="flex  flex-col text-end uppercase leading-[22px] border-r-2 border-[#244F18] pr-[10px]">
        <div className="text-[1rem] font-bold leading-[22px]">
          Avec cet achat
        </div>
        <div className="text-[20px] font-bold leading-[22px]">
          Votre Impact Climat
        </div>
      </div>
      <div className="flex gap-[2.5px] align-top h-full pl-[10px] pt-[7px]">
        <div className="flex gap-1 flex-col items-center justify-center me-[2.5px] min-w-max">
          <span className="text-[40px] leading-none font-bold">
            {capturedCarbon}
          </span>
          <ImageKit
            src="/icons/cart-increase-symbol.svg"
            alt="cart-increase-symbol"
            width={29.92}
            height={5.98}
            className="min-w-full text-[15px]"
          />
        </div>
        <div className="flex leading-[17px] text-[15px] font-bold">
          {carbonUnit} de CO2 Capturé
        </div>
      </div>
    </div>
  );
};

export default ImpactClimatBanner;
