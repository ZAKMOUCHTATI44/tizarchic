type Price = {
  id: string;
  is_calculated_price_price_list: boolean;
  is_calculated_price_tax_inclusive: boolean;
  calculated_amount: number;
  raw_calculated_amount: {
    value: string;
    precision: number;
  };
  is_original_price_price_list: boolean;
  is_original_price_tax_inclusive: boolean;
  original_amount: number;
  raw_original_amount: {
    value: string;
    precision: number;
  };
  currency_code: string;
  calculated_price: {
    id: string;
    price_list_id: string | null;
    price_list_type: string | null;
    min_quantity: number | null;
    max_quantity: number | null;
  };
  original_price: {
    id: string;
    price_list_id: string | null;
    price_list_type: string | null;
    min_quantity: number | null;
    max_quantity: number | null;
  };
};

type Variant = {
  id: string;
  title: string;
  sku: string | null;
  barcode: string | null;
  ean: string | null;
  upc: string | null;
  allow_backorder: boolean;
  manage_inventory: boolean;
  hs_code: string | null;
  origin_country: string | null;
  mid_code: string | null;
  material: string | null;
  weight: number | null;
  length: number | null;
  height: number | null;
  width: number | null;
  variant_rank: number;
  product_id: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  calculated_price: Price;
};

type Image = {
  id: string;
  url: string;
  rank: number;
  product_id: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
};

type OptionValue = {
  id: string;
  value: string;
  option_id: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
};

type Option = {
  id: string;
  title: string;
  product_id: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  values: OptionValue[];
};

type Collection = {
  id: string;
  title: string;
  handle: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
};

type Type = {
  id: string;
  value: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  products?: Product[];
};

type Product = {
  id: string;
  title: string;
  subtitle: string | null;
  description: string;
  handle: string;
  is_giftcard: boolean;
  discountable: boolean;
  thumbnail: string;
  collection_id: string;
  type_id: string;
  weight: number | null;
  length: number | null;
  height: number | null;
  width: number | null;
  hs_code: string | null;
  origin_country: string | null;
  mid_code: string | null;
  material: string | null;
  created_at: string;
  updated_at: string;
  type: Type;
  collection: Collection;
  options: Option[];
  tags: string[];
  images: Image[];
  variants: Variant[];
};

type TypePagination = {
  product_types: Type[];
  count: number;
  offset: number;
  limit: number;
};

type ProductPagination = {
  products: Product[];
  count: number;
  offset: number;
  limit: number;
};

type ProductCategory = {
  id: string;
  name: string;
  description: string;
  handle: string;
  rank: number;
  parent_category_id: string;
  created_at: string;
  updated_at: string;
  deleted_at: string;
};

type ProductCategoriesResponse = {
  limit: number;
  offset: number;
  count: number;
  product_categories: ProductCategory[];
};

interface Cart {
  id: string;
  region: Region;
  region_id: string;
  customer_id: string;
  sales_channel_id: string;
  email: string;
  currency_code: string;
  shipping_address: Address;
  billing_address: Address;
  items: CartItem[];
  shipping_methods: ShippingMethod[];
  payment_collection: PaymentCollection;
  created_at: string;
  updated_at: string;
  total: number;
  subtotal: number;
  item_total: number
  tax_total: number;
  discount_total: number;
  gift_card_total: number;
  shipping_total: number;
  promotions: Promotion[];
}

interface Region {
  id: string;
  name: string;
  currency_code: string;
  automatic_taxes: boolean;
  countries: Country[];
  payment_providers: PaymentProvider[];
  created_at: string;
  updated_at: string;
}

interface Country {
  id: string;
  iso_2: string;
  iso_3: string;
  num_code: number;
  name: string;
  display_name: string;
}

interface PaymentProvider {
  id: string;
  is_enabled: boolean;
}

interface Address {
  id: string;
  customer_id: string;
  first_name: string;
  last_name: string;
  phone: string;
  company: string;
  address_1: string;
  address_2: string;
  city: string;
  country_code: string;
  province: string;
  postal_code: string;
  created_at: string;
  updated_at: string;
}

interface CartItem {
  id: string;
  title: string;
  quantity: number;
  product: Product;
  variant: Variant;
  unit_price: number;
  tax_lines: TaxLine[];
  adjustments: Adjustment[];
}

interface TaxLine {
  id: string;
  description: string;
  rate: number;
  total: number;
}

interface Adjustment {
  id: string;
  code: string;
  amount: number;
}

interface ShippingMethod {
  id: string;
  name: string;
  amount: number;
  tax_lines: TaxLine[];
  adjustments: Adjustment[];
}

interface PaymentCollection {
  id: string;
  currency_code: string;
  amount: number;
  status: string;
  payment_providers: PaymentProvider[];
  payments: Payment[];
}

interface Payment {
  id: string;
  amount: number;
  currency_code: string;
  provider_id: string;
}

interface Promotion {
  id: string;
  code: string;
  is_automatic: boolean;
}
