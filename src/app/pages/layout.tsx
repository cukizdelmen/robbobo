import { DataProvider } from "@/Providers/dataProvider";
import { AdminAuthProvider } from "../../Providers/AdminAuthProvider";
import Head from "@/components/head/head";
import "../globals.css";
import Sidebar from "@/components/sidebar/sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const styles = {
    padding: "1rem",
  };

  return (
    <main style={styles}>
      <AdminAuthProvider>
        <div className="head">
          <Head />
        </div>
        <div className="pageLayout">
          <div className="sidebarComp">
            <div className="fixed">
              <Sidebar />
            </div>
          </div>
          <div className="mainPageComp">
            <DataProvider>{children}</DataProvider>
          </div>
        </div>
      </AdminAuthProvider>
    </main>
  );
}
