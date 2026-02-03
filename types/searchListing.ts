export interface SearchProductListing {
    rendered_products_top:    string;
    rendered_products:        string;
    rendered_products_bottom: string;
    result:                   Result;
    label:                    string;
    products:                 Product[];
    sort_orders:              SortOrder[];
    sort_selected:            boolean;
    pagination:               Pagination;
    rendered_facets:          string;
    rendered_active_filters:  string;
    js_enabled:               boolean;
    current_url:              string;
}

export interface Pagination {
    total_items:         string;
    items_shown_from:    number;
    items_shown_to:      number;
    current_page:        number;
    pages_count:         number;
    pages:               { [key: string]: Page };
    should_be_displayed: boolean;
}

export interface Page {
    type:      string;
    page:      number | null;
    clickable: boolean;
    current:   boolean;
    url:       string;
}

export interface Product {
    add_to_cart_url:              null | string;
    url:                          string;
    canonical_url:                string;
    labels:                       Labels;
    main_variants:                any[];
    id_product:                   string;
    price:                        string;
    reference:                    string;
    active:                       string;
    description_short:            string;
    link_rewrite:                 string;
    name:                         string;
    manufacturer_name:            string;
    position:                     string;
    category_name:                string;
    link:                         string;
    rate:                         number;
    tax_name:                     string;
    unit_price:                   string;
    cover:                        Cover;
    has_discount:                 boolean;
    discount_type:                null;
    discount_percentage:          null;
    discount_percentage_absolute: null;
    discount_amount:              null;
    price_amount:                 number;
    regular_price_amount:         number;
    regular_price:                string;
    discount_to_display:          null;
}

export interface Cover {
    bySize:             BySize;
    small:              Large;
    medium:             Large;
    large:              Large;
    legend:             string;
    id_image:           string;
    cover:              string;
    position:           string;
    associatedVariants: any[];
}

export interface BySize {
    small_default:  Large;
    cart_default:   Large;
    home_default:   Large;
    medium_default: Large;
    large_default:  Large;
}

export interface Large {
    url:    string;
    width:  number;
    height: number;
}

export interface Labels {
    tax_short: Tax;
    tax_long:  Tax;
}

export enum Tax {
    Ttc = "TTC",
}

export interface Result {
}

export interface SortOrder {
    entity:       string;
    field:        string;
    direction:    string;
    label:        string;
    urlParameter: string;
    current:      boolean;
    url:          string;
}
