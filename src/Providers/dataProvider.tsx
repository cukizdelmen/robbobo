"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import supabase from "../Config/supabseClient";

export interface Product {
  id: string;
  name: string;
  price: number;
  created_at: string;
  sizes?: string[];
  colors?: string[];
  Product_images?: string[]; // ensure defined as array
  [key: string]: any;
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  product_name: string;
  quantity: number;
  price: number;
  image_url?: string;
}

export interface Order {
  id: string;
  user_id: string;
  total_amount: number;
  payment_reference: string;
  status: string;
  created_at: string;
  Order_address?: string | null;
  order_Region?: string | null;

  phone?: string | null;
  profiles?: {
    full_name: string | null;
    email: string | null;
    phone: string | null;
  };
  items?: OrderItem[];
}

interface OrderStats {
  totalOrders: number;
  activeOrders: number;
  dailyOrders: number;
  completedOrders: number;
}

export interface Category {
  id: number;
  Name: string;
  slug: string;
  description: string;
  image_url: string;
  imageFile?: File | null;
}

interface DataContextType {
  products: Product[];
  categories: Category[];
  orders: Order[];
  loading: boolean;
  fetchOrderStats: () => Promise<OrderStats>;
  error: string | null;
  fetchProducts: () => Promise<void>;
  fetchCategories: () => Promise<void>;
  createProduct: (newProduct: Partial<Product>) => Promise<Product>;
  updateProduct: (id: string, updates: Partial<Product>) => Promise<Product>;
  deleteProduct: (id: string) => Promise<void>;
  uploadImage: (file: File, productId: string) => Promise<string>;
  uploadMultipleImages: (files: File[], productId: string) => Promise<string[]>;
  createCategory: (newCategory: Partial<Category>) => Promise<Category>;
  deleteCategory: (id: number) => Promise<void>;
  updateCategory: (id: number, updates: Partial<Category>) => Promise<Category>;
  uploadCategoryImage: (file: File) => Promise<string>;
  fetchOrders: () => Promise<void>;
  createOrder: (newOrder: Partial<Order>) => Promise<Order>; // 🔹 NEW
  updateOrder: (id: string, updates: Partial<Order>) => Promise<Order>; // 🔹 NEW
  deleteOrder: (id: string) => Promise<void>;
  fetchProductStats: () => Promise<{ totalProducts: number }>;
  currentOrder: Order | null;
  fetchOrderById: (id: string) => Promise<Order | null>;
}

const DataContext = createContext<DataContextType | null>(null);

export function DataProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);

  /** Fetch products */
  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase
        .from("products")
        .select("*, Category_id(Name)")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setProducts(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  }, []);

  /** Fetch categories */
  const fetchCategories = useCallback(async () => {
    try {
      const { data, error } = await supabase.from("Category").select("*");
      if (error) throw error;
      setCategories(data || []);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  }, []);

  /** Create product */
  const createProduct = useCallback(async (newProduct: Partial<Product>) => {
    const { data, error } = await supabase
      .from("products")
      .insert(newProduct)
      .select()
      .single(); // return ONE product

    if (error) throw error;
    setProducts((prev) => [data, ...prev]);
    return data;
  }, []);

  /** Create category */
  const createCategory = useCallback(
    async (newCategory: Partial<Category>) => {
      const { data, error } = await supabase
        .from("Category")
        .insert(newCategory)
        .select()
        .single(); // return ONE category

      if (error) throw error;
      await fetchCategories();
      return data;
    },
    [fetchCategories]
  );

  /** Update product */
  const updateProduct = useCallback(
    async (id: string, updates: Partial<Product>) => {
      try {
        const { data, error } = await supabase
          .from("products")
          .update(updates)
          .eq("id", id)
          .select()
          .single();

        if (error) throw error;

        setProducts((prev) =>
          prev.map((item) => (item.id === id ? { ...item, ...data } : item))
        );

        return data;
      } catch (err: any) {
        console.error("Failed to update product:", err.message);
        throw err;
      }
    },
    []
  );

  /** Update category */
  const updateCategory = useCallback(
    async (id: number, updates: Partial<Category>) => {
      const { data, error } = await supabase
        .from("Category")
        .update(updates)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      await fetchCategories();
      return data;
    },
    [fetchCategories]
  );

  /** Delete product */
  const deleteProduct = useCallback(async (id: string) => {
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (error) throw error;
    setProducts((prev) => prev.filter((item) => item.id !== id));
  }, []);

  /** Delete category */
  const deleteCategory = useCallback(
    async (id: number) => {
      const { error } = await supabase.from("Category").delete().eq("id", id);
      if (error) throw error;
      await fetchCategories();
    },
    [fetchCategories]
  );

  /** Fetch orders */
  /** Fetch orders */
  const fetchOrders = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase
        .from("orders")
        .select(
          `
        *,
        profiles ( full_name, email, phone )
      `
        ) // 👈 join with profiles
        .order("created_at", { ascending: false });

      if (error) throw error;
      setOrders(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  }, []);

  /** Create order */
  const createOrder = useCallback(async (newOrder: Partial<Order>) => {
    const { data, error } = await supabase
      .from("orders")
      .insert(newOrder)
      .select()
      .single();

    if (error) throw error;
    setOrders((prev) => [data, ...prev]);
    return data;
  }, []);

  /** Update order */
  const updateOrder = useCallback(
    async (id: string, updates: Partial<Order>) => {
      const { data, error } = await supabase
        .from("orders")
        .update(updates)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;

      setOrders((prev) =>
        prev.map((item) => (item.id === id ? { ...item, ...data } : item))
      );

      return data;
    },
    []
  );

  /** Delete order */
  const deleteOrder = useCallback(async (id: string) => {
    const { error } = await supabase.from("orders").delete().eq("id", id);
    if (error) throw error;
    setOrders((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const fetchProductStats = useCallback(async (): Promise<{
    totalProducts: number;
  }> => {
    try {
      const { count } = await supabase
        .from("products")
        .select("*", { count: "exact", head: true });

      return { totalProducts: count || 0 };
    } catch (err) {
      console.error("Error fetching product stats:", err);
      return { totalProducts: 0 };
    }
  }, []);

  const fetchOrderStats = useCallback(async (): Promise<OrderStats> => {
    try {
      // Total orders
      const { count: totalOrders } = await supabase
        .from("orders")
        .select("*", { count: "exact", head: true });

      // Active orders (e.g. pending or processing)
      const { count: activeOrders } = await supabase
        .from("orders")
        .select("*", { count: "exact", head: true })
        .in("status", ["pending", "processing"]);

      // Daily orders (orders created today)
      const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
      const { count: dailyOrders } = await supabase
        .from("orders")
        .select("*", { count: "exact", head: true })
        .gte("created_at", `${today}T00:00:00`)
        .lte("created_at", `${today}T23:59:59`);

      // Completed orders
      const { count: completedOrders } = await supabase
        .from("orders")
        .select("*", { count: "exact", head: true })
        .eq("status", "shipped ✅");

      return {
        totalOrders: totalOrders || 0,
        activeOrders: activeOrders || 0,
        dailyOrders: dailyOrders || 0,
        completedOrders: completedOrders || 0,
      };
    } catch (err) {
      console.error("Error fetching order stats:", err);
      return {
        totalOrders: 0,
        activeOrders: 0,
        dailyOrders: 0,
        completedOrders: 0,
      };
    }
  }, []);

  const fetchOrderById = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    setCurrentOrder(null);

    try {
      // Adjust 'order_items' to your actual line-items table name if different.
      // We select the order, its profile, and the order's items in one call.
      const { data, error } = await supabase
        .from("orders")
        .select(
          `
        *,
        profiles (
          full_name,
          email,
          phone
        ),
        order_items ( * )
      `
        )
        .eq("id", id)
        .single();

      if (error) throw error;

      setCurrentOrder(data);
      return data;
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      setError(msg);
      console.error("fetchOrderById error:", msg);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  /** Upload single product image */
  const uploadImage = async (file: File, productId: string) => {
    const fileExt = file.name.split(".").pop();
    const fileName = `${productId}-${Date.now()}.${fileExt}`;
    const filePath = `product_images/${fileName}`;

    const { error } = await supabase.storage
      .from("ProductImages")
      .upload(filePath, file, { upsert: true });

    if (error) throw error;

    const { data } = supabase.storage
      .from("ProductImages")
      .getPublicUrl(filePath);

    return data.publicUrl;
  };

  /** Upload multiple product images */
  const uploadMultipleImages = async (files: File[], productId: string) => {
    try {
      const imageUrls: string[] = [];

      for (const file of files) {
        const fileExt = file.name.split(".").pop();
        const fileName = `${productId}-${Date.now()}-${Math.random()
          .toString(36)
          .substring(2, 8)}.${fileExt}`;
        const filePath = `product_images/${fileName}`;

        const { error } = await supabase.storage
          .from("ProductImages")
          .upload(filePath, file, { upsert: true });

        if (error) throw error;

        const { data } = supabase.storage
          .from("ProductImages")
          .getPublicUrl(filePath);

        imageUrls.push(data.publicUrl);
      }

      // 🔹 Fetch existing images for this product
      const { data: existingProduct, error: fetchError } = await supabase
        .from("products")
        .select("Product_images")
        .eq("id", productId)
        .single();

      if (fetchError) throw fetchError;

      const existing = existingProduct?.Product_images ?? [];
      const updated = [...existing, ...imageUrls];

      // 🔹 Update the product table with new image URLs
      const { error: updateError } = await supabase
        .from("products")
        .update({ Product_images: updated })
        .eq("id", productId);

      if (updateError) throw updateError;

      return updated; // return the full updated list of image URLs
    } catch (err) {
      console.error("Failed to upload multiple images:", err);
      throw err;
    }
  };

  /** Upload category image */
  const uploadCategoryImage = useCallback(async (file: File) => {
    const fileName = `${file.name}-${Date.now()}`;
    const filePath = `category_images/${fileName}`;

    const { data, error } = await supabase.storage
      .from("CategoryImages")
      .upload(filePath, file);

    if (error) throw error;

    const { data: publicUrlData } = supabase.storage
      .from("CategoryImages")
      .getPublicUrl(data.path);

    return publicUrlData.publicUrl;
  }, []);

  /** Subscribe to realtime changes */
  useEffect(() => {
    fetchProducts();
    fetchCategories();
    fetchOrders(); // 🔹 load orders too

    const orderChannel = supabase
      .channel("orders-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "orders" },
        () => {
          fetchOrders();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(orderChannel);
    };
  }, [fetchProducts, fetchCategories, fetchOrders]);

  return (
    <DataContext.Provider
      value={{
        products,
        orders,
        categories,
        loading,
        error,
        fetchOrderStats,
        createOrder,
        fetchOrders,
        updateOrder,
        fetchProducts,
        fetchCategories,
        createProduct,
        deleteOrder,
        updateProduct,
        deleteProduct,
        uploadImage,
        uploadMultipleImages,
        createCategory,
        deleteCategory,
        updateCategory,
        uploadCategoryImage,
        fetchProductStats,
        currentOrder,
        fetchOrderById,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
}
