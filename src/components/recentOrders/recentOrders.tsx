"use client";

import { useEffect, useState } from "react";
import { useData } from "@/Providers/dataProvider";
import "./recentOrders.css";

export default function OrderTablePage() {
  const {
    orders = [],
    fetchOrders,
    updateOrder,
    deleteOrder,
    loading,
  } = useData();

  const [selectedOrder, setSelectedOrder] = useState<any | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchOrders?.();
  }, [fetchOrders]);

  const openModal = (order: any) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedOrder(null);
    setShowModal(false);
  };

  if (loading) return <p>Loading orders...</p>;

  return (
    <div className="orderContainer">
      <h1 className="text-3xl font-bold mb-4">Recent Orders</h1>

      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="px-4 py-2">Order ID</th>
            <th className="px-4 py-2">Customer</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Amount</th>
            <th className="px-4 py-2">Date</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(orders) && orders.length > 0 ? (
            orders.map((order) => (
              <tr key={order.id}>
                <td
                  className="px-4 py-2 text-blue-600 cursor-pointer"
                  onClick={() => openModal(order)}
                >
                  {order.id.substring(0, 8)}
                </td>
                <td className="px-4 py-2">
                  {order.profiles?.full_name || "No Name"}
                </td>
                <td className="px-4 py-2">{order.status}</td>
                <td className="px-4 py-2">${order.total_amount}</td>
                <td className="px-4 py-2">
                  {new Date(order.created_at).toLocaleDateString()}
                </td>
                <td className="px-4 py-2">
                  <button
                    className="btn-order"
                    onClick={() =>
                      updateOrder(order.id, { status: "shipped ✅" })
                    }
                  >
                    Mark Shipped
                  </button>
                  <button
                    className="text-red-600"
                    onClick={() => deleteOrder(order.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} className="text-center py-4">
                No orders yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* ===== Order Details Modal ===== */}
      {showModal && selectedOrder && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>
              &times;
            </button>

            <h2>Order #{selectedOrder.id.substring(0, 8)}</h2>
            <p>
              <strong>Customer:</strong>{" "}
              {selectedOrder.profiles?.full_name || "N/A"}
            </p>
            <p>
              <strong>Status:</strong> {selectedOrder.status}
            </p>
            <p>
              <strong>Total:</strong> ${selectedOrder.total_amount}
            </p>
            <p>
              <strong>Date:</strong>{" "}
              {new Date(selectedOrder.created_at).toLocaleDateString()}
            </p>

            <h3>Items</h3>
            {selectedOrder.items && selectedOrder.items.length > 0 ? (
              <div className="order-items-grid">
                {selectedOrder.items.map((item: any) => (
                  <div key={item.id} className="order-item-card">
                    <img
                      src={
                        item.image_url ||
                        (item.Product_images?.[0] ?? "/no-image.png")
                      }
                      alt={item.product_name}
                      className="order-item-image"
                    />
                    <div className="order-item-info">
                      <h4>{item.product_name}</h4>
                      <p>Qty: {item.quantity}</p>
                      <p>Price: ${item.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p>No items found for this order.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
