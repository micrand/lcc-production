import React from 'react';
import Link from 'next/link';
import ModalLinkedInStyle from '../ui/ModalLinkedInStyle';
import { MonCompteModalData } from '../../constants';
import ChevronRightSVG from '../ui/icons/ChevronRightSVG';

const URL_CSC = process.env.NEXT_PUBLIC_REDIRECT;

interface ModalMonCompteProps {
  open: boolean;
  onClose: () => void;
  topModalCompte: string;
}



const ModalMonCompte = ({
  open,
  onClose,
  topModalCompte,
}: ModalMonCompteProps) => {
  return (
    <ModalLinkedInStyle
      show={open}
      title=""
      animation='fade'
      wrapperClassName={`${
        topModalCompte || '!top-[99px]'
      } !justify-end bg-transparent`}
      className="!w-[350px] !min-w-[350px] me-[80px] !rounded-[1.5rem] pt-2"
      headerClassName="border-none px-7"
      btnCloseClassName='!text-[22px]'
      onClose={onClose}
    >
      <ul className="px-10 pb-10 pt-2">
        {
            MonCompteModalData.map((item, index) => (
                <li key={index} className={`${MonCompteModalData.length !== (index + 1) && 'mb-[25px]'} h-[22.5px]`}>
                    <Link
                        className="text-[16px] font-medium !font-roboto-condensed leading-tight flex items-center justify-between"
                        href={URL_CSC + item.link}
                    >
                        {item.title}
                        <ChevronRightSVG />
                    </Link>
                </li>

            ))
        }
      </ul>
    </ModalLinkedInStyle>
  );
};

export default ModalMonCompte;
