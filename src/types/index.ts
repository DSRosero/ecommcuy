export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  short_description: string;
  price_cop: number;
  original_price_cop?: number;
  stock: number;
  category_id: string;
  category_name?: string;
  images: string[];
  features: string[];
  specs: Record<string, string>;
  rating: number;
  review_count: number;
  is_featured: boolean;
  is_new?: boolean;
  badge?: string;
  created_at?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon?: string;
  product_count?: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface ShippingInfo {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  department: string;
  notes?: string;
}

export interface Order {
  id?: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  shipping_address: string;
  shipping_city: string;
  shipping_department: string;
  notes?: string;
  total_cop: number;
  status: "pending" | "paid" | "shipped" | "delivered" | "cancelled";
  payment_method: string;
  payment_id?: string;
  items: {
    product_id: string;
    product_name: string;
    quantity: number;
    unit_price_cop: number;
    subtotal_cop: number;
    image_url: string;
  }[];
  created_at?: string;
}
