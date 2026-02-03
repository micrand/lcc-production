import Link from "next/link";

const URL_CSC = process.env.NEXT_PUBLIC_REDIRECT;

interface TopBannerProps {
    ads: string;
    toggle: boolean;
    fade: {
        opacity: string;
        me: string;
    };
};

const TopBanner = ({ ads, toggle, fade }: TopBannerProps) => {
  return (
    <div className="bg-black flex flex-center text-center w-full py-[5px] gap-[5px]">
      <div
        className={`flex flex-center text-center w-full gap-[17px] leading-[22.5px] ${fade.me}`}
      >
        <Link
          href={`${URL_CSC}${
            toggle ? '/content/21-tarifs-et-livraison' : '#csc-newsletter'
          }`}
          className={`${fade.opacity} transition-opacity font-roboto duration-300 text-[13px] text-white text-center hover:decoration-1 hover:underline`}
        >
          {ads}
        </Link>
        <span className="border-r border-white h-[22.5px] flex"></span>
        <Link
          href={`${URL_CSC}`}
          className="text-[13px] text-white text-center font-roboto hover:decoration-1 hover:underline"
        >
          Acheter du café
        </Link>
      </div>
    </div>
  );
};

export default TopBanner;
