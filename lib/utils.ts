import { type ClassValue, clsx } from "clsx";
import { RefObject } from "react";
import { twMerge } from "tailwind-merge";

// NOTE: This function is from ShadCN and should not be edited
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
function capitalizeWords(str: string) {
  return str.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());
}

export const truncateText = (text: string, length: number) => {
  if (text.length <= length) return text;
  return text.substring(0, length) + '...';
};


type DisplayName = 0 | 1 | '0' | '1';
export function getFullName(firstname: string, lastname?: string | null, displayName: DisplayName = 0, customerType: 1 | 2 | 3 = 1, companyName: string | null = null) {
  const fullname = [firstname, displayName == 1 ? lastname : `${lastname ? lastname.split('')[0] : ''}.`].join(' ');
  return capitalizeWords((customerType == 1 ?  fullname : companyName || fullname).toLowerCase());
}

// Fonction générique handleScroll
export const handleScrollBg = (elementRef: React.RefObject<HTMLElement>, onThresholdReached: () => void, onThresholdLeft: () => void, onThresholdEnd: (bgColor: string) => void) => {
  if (elementRef.current) {
    const elementRect = elementRef.current.getBoundingClientRect();
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
    const scrollY = window.scrollY || window.pageYOffset;
    const elementTop = elementRect.top;
    const elementHeight = elementRect.height;
    const scrollPercentage = ((viewportHeight - elementTop) / elementHeight) * 100;

    if (scrollY == 0) {
      onThresholdLeft();
    } else if (scrollPercentage >= 100) {
      onThresholdEnd('#ff37fc')
    } else if (scrollPercentage >= 66) {
      onThresholdReached();
    } else {
      onThresholdLeft();
    }
  }
};

export function executeOnIntersection(element: HTMLElement, callback: () => void, threshold = 0.25) {
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          if (entry.intersectionRatio >= 0.25 && entry.isIntersecting) {
            callback();
          }
        });
      },
      { threshold }
    );

    observer.observe(element);
    return () => observer.disconnect(); // Nettoie l'observateur lors du démontage
  } else {
    console.log('IntersectionObserver is not supported in this browser.');
  }
}

export const executeAtSectionEnd = (sectionRef: RefObject<HTMLDivElement>, callback: (bgColor: string) => void) => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.intersectionRatio == 1 && entry.isIntersecting) {
        callback('#ff37fc');
      }
    });
  }, {
    threshold: 1, // Déclenchez l'observer dès que l'élément entre dans la vue
  });

  // Commencez à observer l'élément spécifié
  if (sectionRef.current) {
    observer.observe(sectionRef.current);
  }

  // Retournez une fonction pour nettoyer l'observer si nécessaire
  return () => {
    observer.disconnect();
  };
}

export const formatNumberWithSpaces = (num: number | string): string => {
  return Number(num).toLocaleString('fr-FR');
}

// Créer Slug pour projet
export const createSlug = (title: string, maxLength: number = 60): string => {
  const slug = title
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/\b(de|d[’']une?|le|la|les|l[’']|du|des|et|un|une|d[’])\b/gi, '') // Stop words
    .replace(/['’]/g, '-')
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s]+/g, '-')
    .replace(/--+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');

  // Retourne le slug tronqué à maxLength sans couper un mot au milieu
  // maxlength à 60 puisque Google limite l'affichage des URLs à ~60 caractères dans les résultats de recherche. 
  return slug.length <= maxLength
    ? slug
    : slug.substring(0, slug.lastIndexOf('-', maxLength));
};

/* Extract ID From Slug (type 'TITLE-ID') */
export const getIDFromProjectSlug = (slug: string) => {
  const parts = slug.split('-');
  return parts.pop() || '';
}
  
export const formatEuroPrice = (number: number, currency: string = 'EUR', digits: number = 2): string => {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: digits,
    maximumFractionDigits: digits
  }).format(number);
}

/**
 * Retourne l'unité de mesure (avec gestion du pluriel) pour le CO2 capturé.
 *
 * @param {number} cartCatchedCarbon - Quantité de CO2 capturé en kilos.
 * @returns {'kilo' | 'kilos' | 'tonne' | 'tonnes'} - L'unité appropriée avec gestion du singulier/pluriel.
 *
 * @example
 * getCarbonUnit(1);    // 'kilo'
 * getCarbonUnit(10);   // 'kilos'
 * getCarbonUnit(1001); // 'tonnes'
 * getCarbonUnit(1000); // 'kilos'
 */
export const getCarbonUnit = (cartCatchedCarbon: number): 'kilo' | 'kilos' | 'tonne' | 'tonnes' => {
  if (cartCatchedCarbon > 1000) {
    const tonnes = cartCatchedCarbon / 1000;
    return tonnes === 1 ? 'tonne' : 'tonnes';
  } else {
    return cartCatchedCarbon === 1 ? 'kilo' : 'kilos';
  }
}