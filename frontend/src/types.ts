export interface User {
  id: number;
  name: string;
  email: string;
  role: "admin";
}

export interface Perfume {
  id: number;
  name: string;
  slug: string;
  brand: string;
  gender: string;
  short_description: string;
  description: string;
  price: number;
  image_url: string | null;
  country_of_origin: string;
  size_options: string[];
  stock_status: string;
  stock: Record<string, number> | null;
  persistence: string;
  fragrance_family: string;
  recipe: string;
  top_notes: string[];
  heart_notes: string[];
  base_notes: string[];
  longevity: string;
  sillage: string;
  vibe: string;
  when_to_wear: string;
  feeling: string;
  average_rating: number;
  reviews_count: number;
  reviews: Array<{
    author: string;
    rating: number;
    comment: string;
    date: string;
  }>;
  bottle_images: string[];
  packaging_images: string[];
  lifestyle_images: string[];
  ingredients: string[];
  delivery_info: string;
  return_policy: string;
  authenticity_guarantee: string;
  is_best_seller: boolean;
  is_trending: boolean;
  similar_slugs: string[];
  seasons?: string[];
}

export interface OrderResponse {
  message: string;
  order: AdminOrder;
}

export interface AdminOrder {
  id: number;
  perfume: string | null;
  perfume_slug: string | null;
  customer_name: string;
  customer_address: string;
  customer_phone: string | null;
  purchase_option: string;
  quantity: number;
  total_price: number;
  status: string;
  created_at: string | null;
}