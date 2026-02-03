import Link from 'next/link';
import React from 'react';

const API_URL_CSC = process.env.NEXT_PUBLIC_API_URL_CSC;

const CheckoutButton = () => {
  return (
    <div className="px-5 flex">
      <Link
        href={API_URL_CSC + '/commande'}
        className="bg-black text-white font-roboto-condensed font-semibold text-center text-[15px] py-2 px-5 w-full rounded-full leading-snug"
      >
        Passer la commande
      </Link>
    </div>
  );
};

export default CheckoutButton;
