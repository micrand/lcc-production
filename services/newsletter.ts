export interface Newsletter {
    status:  string;
    message: string;
    data:    Data;
}

export interface Data {
    score:  number;
    niveau: string;
}
export interface NewsletterPayload {
    mail_newsletter: string;
    recaptcha_token: string;
    confirm?: boolean;
    firstname? : String;
    lastname? : String;
    phone? : String;
}

export const createNewsletter = async (data: NewsletterPayload): Promise<Newsletter> => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL_CSC || 'https://localhost/site-csc';
  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
    Accept: 'application/x-www-form-urlencoded',
  };

  // securiser les valeur entrer par l'utilisateur pour des soucis de securiter
  const escapeHtml = (str: string): string => {
    return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
  };
  
  // fonction de verification de la validiter des champs avant de les ajouter dans le body
  const appendIfValid = (field: string, value: unknown) => {
    if (typeof value === 'string' && value.trim() !== '') {
      const sanitized = escapeHtml(value.trim());
      body.append(field, sanitized);
    }
  };

  // construction du body de la requete
  const body = new URLSearchParams();
  body.append('mail_newsletter', escapeHtml(data.mail_newsletter));
  body.append('recaptcha_token', data.recaptcha_token);
  body.append('confirm', data.confirm ? 'true' : 'false');
  appendIfValid('firstname', data.firstname);
  appendIfValid('lastname', data.lastname);
  appendIfValid('phone', data.phone);

  try {
    const response = await fetch(`${API_URL}/module/csc_brevo/newsletter`, {
      method: 'POST',
      headers,
      body: body.toString(),
    });
    if (!response.ok) {
      throw new Error('Failed to create newsletter subscription');
    }
    return response.json();
  } catch (error) {
    console.error('Error creating newsletter subscription:', error);
    throw error;
  }
};
