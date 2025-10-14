import { DataProvider } from "@/Providers/dataProvider";
import { AdminAuthProvider } from "../../Providers/AdminAuthProvider";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminAuthProvider>
      <DataProvider>{children}</DataProvider>
    </AdminAuthProvider>
  );
}
