import Sidebar from "@/components/sidebar/sidebar";
import "./orderPage.css";
import { FiSearch } from "react-icons/fi";
import OrderTablePage from "@/components/recentOrders/recentOrders";

const Orders = () => {
  return (
    <main className="OrderPageContainer">
      <div className="ProductsView">
        <div className="productList">
          <OrderTablePage />
        </div>
      </div>
    </main>
  );
};

export default Orders;
