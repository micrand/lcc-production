export interface Cart {
    cart_id:                number;
    products:               Product[];
    total:                  number;
    total_items:            number;
    catched_carbon:         number;
    restored_biodiversity:  number;
    summary_totals:         SummaryTotals;
    summary_discount:       SummaryDiscount[];
}

export interface Product {
    id_product_attribute:                string;
    id_product:                          string;
    cart_quantity:                       string;
    id_shop:                             string;
    id_customization:                    null;
    name:                                string;
    is_virtual:                          string;
    description_short:                   string;
    available_now:                       string;
    available_later:                     string;
    id_category_default:                 string;
    id_supplier:                         string;
    id_manufacturer:                     string;
    manufacturer_name:                   string;
    on_sale:                             string;
    ecotax:                              string;
    additional_shipping_cost:            string;
    available_for_order:                 string;
    show_price:                          string;
    price:                               number;
    active:                              string;
    unity:                               string;
    unit_price_ratio:                    string;
    quantity_available:                  string;
    width:                               string;
    height:                              string;
    depth:                               string;
    out_of_stock:                        string;
    weight:                              number;
    available_date:                      string;
    date_add:                            Date;
    date_upd:                            Date;
    quantity:                            number;
    link_rewrite:                        string;
    category:                            string;
    unique_id:                           string;
    id_address_delivery:                 string;
    advanced_stock_management:           string;
    supplier_reference:                  string;
    customization_quantity:              null;
    price_attribute:                     null;
    ecotax_attr:                         null;
    reference:                           string;
    weight_attribute:                    null;
    ean13:                               string;
    isbn:                                string;
    upc:                                 string;
    mpn:                                 string;
    minimal_quantity:                    string;
    wholesale_price:                     string;
    id_image:                            string;
    legend:                              string;
    reduction_type:                      number;
    is_gift:                             boolean;
    reduction:                           number;
    reduction_without_tax:               number;
    price_without_reduction:             number;
    specific_prices:                     any[];
    stock_quantity:                      number;
    price_without_reduction_without_tax: number;
    price_with_reduction:                number;
    price_with_reduction_without_tax:    number;
    total:                               number;
    total_wt:                            number;
    price_wt:                            number;
    reduction_applies:                   boolean;
    quantity_discount_applies:           boolean;
    allow_oosp:                          number;
    features:                            Feature[];
    attributes:                          string;
    attributes_small:                    string;
    rate:                                number;
    tax_name:                            string;
    image_url:                            string;
    product_url:                            string;
}

export interface Feature {
    id_feature:       string;
    id_product:       string;
    id_feature_value: string;
}

export interface SummaryTotals {
    total_shipping:     number;
    total_products_wt:  number;
    total_price:        number;
    total_discounts:    number;
}

export interface SummaryDiscount {
    id:     string;
    name:   string;
    code:   string;
    value:  number;
}

export interface UpdateCartPayload {
    id_product: string;
    quantity: number;
}
