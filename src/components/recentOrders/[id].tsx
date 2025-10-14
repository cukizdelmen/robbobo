"use client";

import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useData } from "@/Providers/dataProvider";

export default function OrderDetailsPage() {
  const { id } = useParams();
  const { fetchOrderById, currentOrder, loading } = useData();

  useEffect(() => {
    if (id) fetchOrderById(id as string);
  }, [id, fetchOrderById]);

  if (loading) return <p>Loading order details...</p>;
  if (!currentOrder) return <p>No order found.</p>;

  return (
    <div className="orderDetailsContainer">
      <h1>Order #{currentOrder.id.substring(0, 8)}</h1>
      <p>Customer: {currentOrder.profiles?.full_name}</p>
      <p>Status: {currentOrder.status}</p>
      <p>Date: {new Date(currentOrder.created_at).toLocaleDateString()}</p>
      <p>Total: ${currentOrder.total_amount}</p>

      <h2>Items</h2>
      <ul>
        {currentOrder.items?.map((item: any) => (
          <li key={item.id}>
            {item.product_name} — Qty: {item.quantity} — ${item.price}
          </li>
        ))}
      </ul>
    </div>
  );
}
