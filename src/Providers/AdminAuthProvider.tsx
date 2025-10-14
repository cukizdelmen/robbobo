"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface AdminAuthContextType {
  admin: any;
  loading: boolean;
  logout: () => void;
}

const AdminAuthContext = createContext<AdminAuthContextType>({
  admin: null,
  loading: true,
  logout: () => {},
});

export function AdminAuthProvider({ children }: { children: React.ReactNode }) {
  const [admin, setAdmin] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [currentAdmin, setCurrentAdmin] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const adminData = sessionStorage.getItem("admin");

    if (!adminData) {
      router.push("/");
    } else {
      setAdmin(JSON.parse(adminData));
    }

    setLoading(false);
  }, [router]);

  const logout = () => {
    setCurrentAdmin(null);
    sessionStorage.removeItem("admin");
    router.push("/");
  };

  return (
    <AdminAuthContext.Provider value={{ admin, loading, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export const useAdminAuth = () => useContext(AdminAuthContext);
