'use client';

import { Input } from '@/components/ui/input';
import Link from 'next/link';
import Image from 'next/image';
import { createNewsletter, NewsletterPayload } from '@/services/newsletter';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { useState } from 'react';
import ModalNewsletter from './ModalNewsletter';
import NewsletterConfirmForm from './NewsLetterConfirmForm';

//form error type
export type FormError = {
  [champ: string]: string
}

const FooterSubscribeSection = () => {
  //state variable
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [message, setMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('')
  const [confirmForm, setConfirmForm] = useState(false) // true si status  = confirm_form
  const [showButtons, setShowButtons] = useState(false) // true si status = confirm ou confirm_form
  const [formErrorMessage, setFormErrorMessage] = useState<FormError>({}) // erreurs lier au formulaire de confirmation

  // fonction pour update les messages d'erreur lier au formulaire
  const updateFormError = (champ: string, message: string | null) => {
    setFormErrorMessage(prev => {
      const newErrors = { ...prev }

      if (message) {
        // Ajouter l'erreur seulement si elle n'existe pas encore
        if (!newErrors[champ]) {
          newErrors[champ] = message
        }
      } else {
        // Supprimer l'erreur si le champ devient valide
        delete newErrors[champ]
      }

      return newErrors
    })
  }

  //fonction d'aide pour convertir le champ en string
  const getString = (value: FormDataEntryValue | null, champ?: string): string | undefined => {
    const stringifiedValue = typeof value === 'string' ? value.trim() : undefined;

    if (!stringifiedValue && champ) {
      updateFormError(champ, `Le champ ${champ} ne peut pas être vide`)
    } else if (champ) {
      updateFormError(champ, null)
    }

    return stringifiedValue
  }

  const validateAllFields = (values: Record<string, FormDataEntryValue>): boolean => {
    let valid = true;

    if (confirmForm) {
      const champs = ['firstname', 'lastname'];
      champs.forEach(champ => {
        const str = getString(values[champ], champ === 'firstname' ? 'prenom' : 'nom');
        if (!str) valid = false;
      });
    }

    return valid;
  };

  // fonction qui s'occupe de la subsmission du formulaire
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    //transforme les valeur contenue dans form data sous form de clé valeur
    const formData = new FormData(e.currentTarget);  
    const rawValues = Object.fromEntries(formData.entries());

    // valide les champs du confirm_form
    const isValid = validateAllFields(rawValues);
    if (!isValid) {
      setShowModal(true);
      return;
    }

    if (!executeRecaptcha) {
      setMessage('reCAPTCHA non prêt');
      return;
    }

    setLoading(true);
    setShowModal(true);

    try {
      const token = await executeRecaptcha('newsletter');

      const basePayload: NewsletterPayload = {
        mail_newsletter: rawValues.mail_newsletter as string,
        confirm: rawValues.confirm === 'true',
        recaptcha_token: token,
      };

      const payload: NewsletterPayload = confirmForm
        ? {
            ...basePayload,
            firstname: getString(rawValues.firstname, 'prenom'),
            lastname: getString(rawValues.lastname, 'nom'),
            phone: getString(rawValues.phone),
          }
        : basePayload;

      setEmail(payload.mail_newsletter);

      const newsletter = await createNewsletter(payload);
      console.log('Newsletter response:', newsletter);

      if (newsletter?.status === 'info' || newsletter?.status === 'success') {
        setMessage('✅ Cette adresse mail est déjà abonnée à la Newsletter. ✉️');
        setShowButtons(false);
        setConfirmForm(false);
      } else if (newsletter?.status === 'confirm' || newsletter?.status === 'confirm_form') {
        setMessage('Confirmer votre abonnement à la Newsletter');
        setShowButtons(true);
        setConfirmForm(newsletter.status === 'confirm_form');
      }
    } catch (error) {
      setMessage("😕 Oups, une erreur est survenue. Essayez encore une fois.");
    } finally {
      setLoading(false);
    }
    
  };
  
  return (
    <div className="w-full flex flex-col md:flex-row justify-between gap-5 p-3 md:p-5">
      <ModalNewsletter 
        className='w-full sm:w-4/5 flex flex-col gap-y-5' 
        show={showModal} 
        loading={loading} 
        isNotSubscribe={showButtons}
        onClose={() => setShowModal(false)}
      >
        <div className='text-[20px] font-bold'>{message}</div>
        <form method='POST' onSubmit={handleSubmit} className="flex flex-col gap-y-5 flex-between">
          <input type="hidden" name="mail_newsletter" value={email?? null} />
          <input type="hidden" name="confirm" value="true" />
          {/* confirm form */}
          {confirmForm && (
            <NewsletterConfirmForm defaultValues={{
              firstname: '', 
              lastname: '', 
              phone: '', 
              formError: formErrorMessage
            }} />
          )}
          
          {/* boutton de validation */}
          {showButtons && (
            <div className="w-full flex items-center justify-center pb-4 text-[20px] font-semibold font-din gap-x-5">
              <button 
                className="cursor-pointer font-bold text-black bg-white text-base px-8 py-5 rounded-full border border-black"
                type="button" 
                onClick={() => setShowModal(false)}
              >
                Annuler
              </button>
              <button 
                className="cursor-pointer font-bold text-white bg-black text-base px-8 py-5 rounded-full border border-black"
                type="submit"
              >
                Valider
              </button>
            </div>
          )}
        </form>
      </ModalNewsletter>

      <form
        method="POST"
        className="flex flex-col md:flex-row w-full md:w-4/5 bg-white px-8 pt-8 pb-8 md:pb-[17px] gap-5 rounded-[50px] md:rounded-full"
        onSubmit={handleSubmit}
      >
        <div className='flex flex-col w-full'>
          <Input
            placeholder="votre@email.com"
            type="email"
            name="mail_newsletter"
            className="flex-1 bg-[#f1f1f1] border-none rounded-2xl p-5 text-lg placeholder:text-[22px] placeholder:text-gray-400"
          />
          <span className="text-[10px] py-0 px-[10px] text-center !font-roboto-condensed font-extralight leading-normal">
              <span className="text-[#666] py-0 px-[2px]">This site is protected by reCAPTCHA and the Google</span>
              <a className="text-[#24b9d7] italic" href="https://policies.google.com/privacy" target="_blank">Privacy Policy</a>
              <span className="text-[#666]"> and </span>
              <a className="text-[#24b9d7] italic" href="https://policies.google.com/terms" target="_blank">Terms of Service</a>
              <span className="text-[#666]"> apply.</span>
          </span>
        </div>
        <button
          type="submit"
          className="bg-black hover:bg-slate-700 text-base px-8 py-5 font-bold text-white rounded-full relative mt-4 md:mt-0 md:mb-[15px]"
        >
          Envoyer
        </button>
      </form>
      <div className="flex justify-between items-center bg-white rounded-full flex-center ps-6 pe-10 py-5 gap-5 mt-4 md:mt-0 w-full md:w-1/5">
        <Link
          className="hover:text-[#334155] hover:scale-[101%] hover:-translate-y-[5%] transition-transform"
          href="https://www.youtube.com/@chacunsoncafe433"
          target="_blank"
        >
          <Image
            src="/icons/youtube.svg"
            alt="Youtube"
            width={56}
            height={50}
            className="w-auto h-[50px]"
            loading="lazy"
          />
        </Link>
        <Link
          className="hover:text-[#334155] hover:scale-[101%] hover:-translate-y-[5%] transition-transform"
          href="https://www.linkedin.com/company/chacun-son-caf%C3%A9/"
          target="_blank"
        >
          <Image
            src="/icons/linkedin.svg"
            alt="LinkedIn"
            width={42}
            height={42}
            className="w-[42px] h-[42px]"
            loading="lazy"
          />
        </Link>
        <Link
          className="hover:text-[#334155] hover:scale-[101%] hover:-translate-y-[5%] transition-transform"
          href="https://www.instagram.com/chacunsoncafe/"
          target="_blank"
        >
          <Image
            src="/icons/instagram.svg"
            alt="LinkedIn"
            width={42}
            height={42}
            className="w-[42px] h-[42px]"
            loading="lazy"
          />
        </Link>
      </div>
    </div>
  );
};

export default FooterSubscribeSection;
