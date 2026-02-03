import { Logo } from '../Logo';
import ImageKit from '../ui/ImageKit';

const LogoSection = () => {
  return (
    <div className="h-full flex flex-1 gap-4 justify-start items-center relative z-[102]">
      <Logo />
      <div className="w-[25px] md:w-[30px] relative lg:left-[0%] flex-center">
        <ImageKit
          src="/Images/b-corporation-logo.webp"
          alt="let's catch carbon certificat"
          width={130}
          height={224}
          className="w-[25px] md:w-[30px] h-auto object-contain"
          loading="lazy"
          fetchPriority="low"
        />
      </div>
    </div>
  );
};

export default LogoSection;
