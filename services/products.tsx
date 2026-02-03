import { SearchProductListing } from "@/types/searchListing";

const API_URL_CSC = process.env.NEXT_PUBLIC_API_URL_CSC!;

export const getSearchProducts = async (search: string): Promise<SearchProductListing | undefined> => {
    try {
        const formData = new FormData();
        formData.append('s', search);
        formData.append('resultsPerPage', '10');
        const res = await fetch(`${API_URL_CSC}/recherche`, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });
        if (!res.ok) {
            throw new Error('Erreur lors de la recherche de produit')
        }
        const data = await res.json();
        return data;
    } catch (err: any) {
        console.error(err.message);
    }
}