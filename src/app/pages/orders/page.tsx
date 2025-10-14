import Sidebar from "@/components/sidebar/sidebar";
import "./orderPage.css";
import { FiSearch } from "react-icons/fi";
import OrderTablePage from "@/components/recentOrders/recentOrders";

const Orders = () => {
  return (
    <main className="OrderPageContainer">
      <div className="sidebarComponent">
        <Sidebar />
      </div>
      <div className="ProductsView">
        <div className="searchContainer">
          <FiSearch />
          <input type="search" placeholder="Search Here" />
        </div>
        <div className="productList">
          <OrderTablePage />
        </div>
      </div>
    </main>
  );
};

export default Orders;
