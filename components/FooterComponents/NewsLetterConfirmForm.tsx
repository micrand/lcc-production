'use client';

import React from 'react';
import { FormError } from './FooterSubscribeSection';

type ContactInputsProps = {
  defaultValues?: {
    firstname?: string;
    lastname?: string;
    phone?: string;
    formError? : FormError
  };
};

const ContactInputs: React.FC<ContactInputsProps> = ({ defaultValues = {} }) => {
  return (
    <div className='w-full flex flex-col gap-y-3'>
      {/* firstname */}
      <div className='w-full h-auto'>
        <input
          type='text'
          name='firstname'
          defaultValue={defaultValues.firstname}
          placeholder='Prénom*'
          className={`w-full h-[50px] px-5 bg-gray-200 border rounded-lg ${defaultValues.formError?.['prenom'] ? 'border-red-400' : ''}`}
        />
        {/* span pour afficher le message d'erreur */}
        {defaultValues.formError?.['prenom'] && (
          <span className="text-sm text-red-400">
            {defaultValues.formError['prenom']}
          </span>
        )}
      </div>

      {/* lastname */}
      <div className='w-full h-auto'>
        <input
          type='text'
          name='lastname'
          defaultValue={defaultValues.lastname}
          placeholder='nom*'
          className={`w-full h-[50px] px-5 bg-gray-200 border rounded-lg ${defaultValues.formError?.['nom'] ? 'border-red-400' : ''}`}
        />
        {/* span pour afficher le message d'erreur */}
        {defaultValues.formError?.['nom'] && (
          <span className="text-sm text-red-400">
            {defaultValues.formError['nom']}
          </span>
        )}
      </div>

      {/* phone Number */}
      <input
        type='text'
        name='phone'
        defaultValue={defaultValues.phone}
        placeholder='Téléphone'
        className='w-full h-[50px] px-5 bg-gray-200 border rounded-lg'
      />
    </div>
  );
};

export default ContactInputs;
