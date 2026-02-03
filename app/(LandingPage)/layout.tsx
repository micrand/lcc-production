'use client';

import dynamic from 'next/dynamic';
const Footer = dynamic(() => import('@/components/Footer'));
import Header from '@/components/Header';
import { useAppStore } from '@/store/appStore';
import { useEffect } from 'react';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import Script from 'next/script';
import { usePathname } from 'next/navigation';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_KEY || ''} // 🔁 remplace par ta vraie clé site (publique)
      scriptProps={{
        async: true,
        defer: true,
        appendTo: 'head',
        nonce: undefined,
      }}
    >
      <RootContent>{children}</RootContent>
    </GoogleReCaptchaProvider>
  );
}

function GAListener() {
  const pathname = usePathname();

  useEffect(() => {
    if (process.env.NEXT_PUBLIC_ENV === 'prod') {
      window.gtag?.('config', '3H87G68DF2', {
        page_path: pathname,
      })
    }
  }, [pathname])
  return null;
}

function RootContent({ children }: { children: React.ReactNode }) {
  const isProd = process.env.NEXT_PUBLIC_ENV === "prod";
  const bgColor = useAppStore((state) => state.bgColor);

  useEffect(() => {
    import('aos').then((AOS) => AOS.init());
  }, []);

  useEffect(() => {
    const prevBg = document.body.style.backgroundColor;
    document.body.style.backgroundColor = bgColor || '#fff';
    document.body.style.transition = 'background 650ms ease-in';
    document.body.style.willChange = 'background';
    return () => {
      document.body.style.backgroundColor = prevBg;
    };
  }, [bgColor]);

  return (
    <>
      {isProd && (
        <>
          {/* Script externe GA */}
          <Script
            src="https://www.googletagmanager.com/gtag/js?id=G-3H87G68DF2"
            strategy="afterInteractive"
          />
          {/* Initialisation GA */}
          <Script id="ga-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              window.gtag = gtag;
              gtag('js', new Date());
              gtag('config', 'G-3H87G68DF2', { send_page_view: false });
            `}
          </Script>
          {/* Listener SPA */}
          <GAListener />
        </>
      )}
      <div
        style={{
          background: bgColor,
          transition: 'background 650ms ease-in',
          willChange: 'background',
        }}
        className="w-full relative"
      >
        <Header />
        {children}
        <Footer />
        <div id="modalOverlay" className="modal-overlay"></div>
      </div>
    </>
  );
}
