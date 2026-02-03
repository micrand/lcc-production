import { useRef, useEffect } from 'react';
import SubTitle from '../ui/SubTitle';
import ImageKit from '../ui/ImageKit';
import useMediaQuery from '@/lib/useMediaQuery';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const subtitleText = (
  <>
    Nous ne sommes pas la dernière génération à devoir agir pour le climat,{' '}
    <br />
    mais la première à nous lancer avec enthousiasme
    <br />
    dans cette épopée climatique pour changer notre destinée.
  </>
);

const SectionsPionniers2 = () => {
  const isLg = useMediaQuery('(min-width: 1024px)');
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imgWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isLg) return;

    const section = sectionRef.current;
    const text = textRef.current;
    const imgWrapper = imgWrapperRef.current;

    if (!section || !text || !imgWrapper) return;

    // Reset styles
    gsap.set(text, { clearProps: 'all' });
    gsap.set(imgWrapper, { minWidth: '100%', minHeight: '45%' });

    // Fonction de reset pour éviter la duplication
    const resetStyles = (soft: boolean = false) => {
      if (soft) {
        gsap.to(imgWrapper, {
          minWidth: '100%',
          minHeight: '45%',
          duration: 0.2,
          ease: 'linear'
        });
      } else {
        gsap.set(imgWrapper, { minWidth: '100%', minHeight: '45%' });
      }
    };

    // Ajout : resize handler pour rendre l'image réactive
    const handleResize = () => {
      resetStyles(true);
    };
    window.addEventListener('resize', handleResize);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 99px',
          end: '+=700',
          scrub: true,
          pin: true,
          anticipatePin: 1,
        },
      });

      // // Texte : shrink & hide
      tl.to(
        text,
        {
          y: '-250%',
          duration: 3.8,
          ease: 'power1.inOut',
        },
        0
      );

      // Image : expand to full viewport
      tl.to(
        imgWrapper,
        {
          width: '100vw',
          height: '100vh',
          maxWidth: '100vw',
          maxHeight: '100vh',
          bottom: 0,
          position: 'absolute',
          zIndex: 10,
          duration: 2.5,
          ease: 'linear',
        },
        '-=3.5'
      );

      // On reset, restore position (fin de section)
      ScrollTrigger.create({
        trigger: section,
        start: 'bottom top',
        onEnterBack: () => resetStyles(true),
        onLeave: () => resetStyles(true),
        onLeaveBack: () => resetStyles(true),
      });
    }, section);

    return () => {
      ctx.revert();
      window.removeEventListener('resize', handleResize);
    };
  }, [isLg]);

  return (
    <section
      id="Pionnier2"
      ref={sectionRef}
      className="relative overflow-visible"
    >
      <div
        className="lg:h-[calc(100vh-99px)] relative w-full flex flex-col items-center justify-between lg:justify-between gap-[3rem] lg:gap-2 overflow-visible"
        id="generations"
      >
        <div
          className="max-w-[1605px] px-[16px] overflow-visible pt-4 lg:pt-[calc(50vh-356px)]"
          ref={textRef}
        >
          <div className="h-full flex-col gap-[0px] flex-center pt-[8px] xl:pb-[2rem] z-[88]">
            <p className="w-full font-din text-h3 lg:text-h2 5xl:text-h1 font-black text-[#244f19] leading-[48px] lg:leading-[76px] 5xl:leading-[102px] text-center -tracking-[3px]">
              Soyons des pionniers, <br />
              écrivons notre légende !
            </p>
            <SubTitle className="text-center">{subtitleText}</SubTitle>
          </div>
        </div>
        <div className="w-full flex-center h-[60%] lg:h-[45%]">
          <div
            ref={imgWrapperRef}
            className="h-full xl:px-0 flex-center p-0 flex-1 relative lg:min-h-[45%] lg:min-w-[100%] lg:max-w-[100%] lg:max-h-[100vh]"
            style={{ overflow: 'hidden' }}
          >
            <ImageKit
              src="/Images/CommunityLarge1920.webp"
              alt="LCC_people"
              className="aspect-[1920/1090] h-full min-h-full hidden lg:inline w-auto object-cover object-bottom absolute bottom-0"
              width={1920}
              height={1090}
              loading="eager"
            />
            <ImageKit
              src="/Images/communitySection.webp"
              alt="LCC_people"
              className="w-full h-full lg:hidden object-cover object-bottom flex"
              width={330}
              height={303}
              quality={50}
              loading="eager"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};
export default SectionsPionniers2;
