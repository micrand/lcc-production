// services/cartService.ts
import { User } from '@/types/user';
import { Cart, UpdateCartPayload } from '@/types/cart';

const API_URL_CSC = process.env.NEXT_PUBLIC_API_URL_CSC!;

export async function fetchUser(): Promise<User | null> {
  try {
    const res = await fetch(`${API_URL_CSC}/module/csc_verify_session/me`, {
      credentials: 'include',
    });
    const data = (await res.json()) as User;
    return data?.logged ? data : null;
  } catch (err) {
    console.error('Erreur lors de la récupération de l’utilisateur:', err);
    return null;
  }
}

// GET cart
export async function fetchCart(): Promise<Cart | null> {
  try {
    const res = await fetch(
      `${API_URL_CSC}/module/csc_verify_session/api`,
      { credentials: 'include' }
    );
    if (!res.ok) throw new Error();
    return await res.json();
  } catch (err) {
    console.error('Erreur lors de la récupération du panier:', err);
    return null;
  }
}

// CREATE cart
export async function createCart(payload: Partial<Cart>): Promise<Cart | null> {
  try {
    const res = await fetch(
      `${API_URL_CSC}/module/csc_verify_session/api`,
      {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      }
    );
    if (!res.ok) throw new Error();
    return await res.json();
  } catch (err) {
    console.error('Erreur lors de la création du panier:', err);
    return null;
  }
}

// UPDATE cart
export async function updateCart(updates: UpdateCartPayload): Promise<Cart | null> {
  try {
    const res = await fetch(
      `${API_URL_CSC}/module/csc_verify_session/api`,
      {
        method: 'PUT',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      }
    );
    if (!res.ok) throw new Error();
    return await res.json();
  } catch (err) {
    console.error('Erreur lors de la mise à jour du panier:', err);
    return null;
  }
}

// DELETE cart
export async function deleteCart(id_product: number): Promise<boolean> {
  try {
    const res = await fetch(
      `${API_URL_CSC}/module/csc_verify_session/api`,
      {
        method: 'DELETE',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({ id_product })
      }
    );
    return res.ok;
  } catch (err) {
    console.error('Erreur lors de la suppression du panier:', err);
    return false;
  }
}

export async function addDiscount(code: string): Promise<boolean> {
  try {
    const res = await fetch(`${API_URL_CSC}/module/csc_verify_session/cart_rule`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        code
      })
    });
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || 'Erreur inconnue');
    }
    return res.ok;

  } catch (err: any) {
    console.log('Erreur lors de l\'ajout du code promo dans le panier:', err.message);
    throw new Error(err.message);
    return false;
  }
}

export async function removeDiscount(id_cart_rule: string): Promise<boolean> {
  try {
    const res = await fetch(`${API_URL_CSC}/module/csc_verify_session/cart_rule`, {
      method: 'DELETE',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id_cart_rule
      })
    });
    return res.ok;
  } catch (err: any) {
    throw new Error(err);
    return false;
  }
}