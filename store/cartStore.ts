import { create } from 'zustand';
import { Cart, UpdateCartPayload } from '@/types/cart';
import { fetchCart, createCart, updateCart, deleteCart, addDiscount, removeDiscount } from '@/services/cart';
import { createJSONStorage, persist } from 'zustand/middleware';

interface CartState {
  cart: Cart | null;
  loading: boolean;
  error: string | null;

  getCart: () => Promise<void>;
  createCart: (payload: Partial<Cart>) => Promise<void>;
  updateCart: (payload: UpdateCartPayload) => Promise<void>;
  deleteCart: (id_product: number) => Promise<void>;
  addDiscount: (code: string) => Promise<void>;
  removeDiscount: (id_cart_rule: string) => Promise<void>;
}

export const useCartStore = create<CartState>()(
    persist(
        (set) => ({
            cart: null,
            loading: false,
            error: null,

            getCart: async () => {
                set({ loading: true, error: null });
                try {
                    const cart = await fetchCart();
                    set({ cart });
                } catch (err: any) {
                    set({ error: err.message || 'Erreur lors du chargement du panier' });
                } finally {
                    set({ loading: false });
                }
            },

            createCart: async (payload) => {
                set({ loading: true, error: null });
                try {
                    const newCart = await createCart(payload);
                    set({ cart: newCart });
                } catch (err: any) {
                    set({ error: err.message || 'Erreur lors de la création du panier' });
                } finally {
                    set({ loading: false });
                }
            },

            addDiscount: async (code) => {
                set({ loading: true, error: null });
                try {
                    const res = await addDiscount(code);
                } catch (err: any) {
                    console.error(err.message);
                    set({ error: err.message || 'Erreur lors de l\'ajout du code promo au panier' });
                    throw new Error(err.message);
                } finally {
                    set({ loading: false });
                }
            },

            removeDiscount: async (id_cart_rule) => {
                set({ loading: true, error: null });
                try {
                    await removeDiscount(id_cart_rule);
                } catch (err: any) {
                    set({ error: err.message || 'Erreur lors de la suppréssion du code promo du panier' });
                } finally {
                    set({ loading: false });
                }
            },

            updateCart: async (payload: UpdateCartPayload) => {
                set({ loading: true, error: null });
                let previousCart: Cart | null = null;

                // Optimistic update
                set((state) => {
                    previousCart = state.cart; // pour rollback

                    if (!state.cart) return state;

                    const updatedProducts = state.cart.products.map((product) => {
                        if (product.id_product === payload.id_product) {
                            const newQty = payload.quantity;
                            const oldQty = parseInt(product.cart_quantity);
                            const pricePerItem = product.total_wt / oldQty || 0;
                            const newTotalPrice = pricePerItem * newQty

                            return {
                                ...product,
                                cart_quantity: newQty.toString(),
                                total_wt: newTotalPrice,
                            };
                        }
                        return product;
                    });

                    const newCartTotal = updatedProducts.reduce(
                        (acc, p) => acc + p.total_wt,
                        0
                    );

                    const newCartTotalItems = updatedProducts.reduce((acc, p) => acc + parseInt(p.cart_quantity.toString()), 0)

                    return {
                        cart: {
                            ...state.cart,
                            products: updatedProducts,
                            total: newCartTotal,
                            total_items: newCartTotalItems
                        },
                    };
                });

                try {
                    const updatedCart = await updateCart(payload);
                    set({ cart: updatedCart });
                } catch (err: any) {
                    set(() => ({
                        cart: previousCart, // rollback
                        error: err.message || 'Erreur lors de la mise à jour du panier',
                    }));
                } finally {
                    set({ loading: false });
                }
            },

            deleteCart: async (id_product: number) => {
                set({ loading: true, error: null });
                try {
                    const success = await deleteCart(id_product);
                    if (success) {
                        set({ cart: null });
                    } else {
                        throw new Error('La suppression du panier a échoué');
                    }
                } catch (err: any) {
                    set({ error: err.message || 'Erreur lors de la suppression du panier' });
                } finally {
                    set({ loading: false });
                }
            },
        }),
        {
            name: 'cart-storage',
            storage: createJSONStorage(() => localStorage),
        }
    )
);
