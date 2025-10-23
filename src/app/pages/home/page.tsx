"use client";
import Card from "@/components/Cards/card";

import Image from "next/image";
import Profile from "../../../assets/profile.jpeg";
import { BiAddToQueue } from "react-icons/bi";
import Task from "@/components/taskbody/taskBody";
import { useData } from "@/Providers/dataProvider";
import { useEffect, useState } from "react";
import "./home.css";

export default function Home() {
  const { orders, fetchOrders, loading, fetchOrderStats } = useData();

  const [stats, setStats] = useState({
    totalOrders: 0,
    activeOrders: 0,
    dailyOrders: 0,
    completedOrders: 0,
  });

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  useEffect(() => {
    const loadStats = async () => {
      const result = await fetchOrderStats();
      setStats(result);
    };
    loadStats();
  }, [fetchOrderStats]);

  const recentOrders = orders.slice(0, 5);

  return (
    <main className="main">
      {/* <div className="mainView">
        <Card />
        <div className="overview"></div>
        <div>
          <h2 className="text-2xl font-bold mb-4">Recent Orders</h2>

          {loading ? (
            <p>Loading...</p>
          ) : recentOrders.length === 0 ? (
            <p>No recent orders</p>
          ) : (
            <table className="min-w-full border-collapse border border-gray-300">
              <thead>
                <tr className="tablehead">
                  <th className="px-4 py-2">Order ID</th>
                  <th className="px-4 py-2">Customer</th>
                  <th className="px-4 py-2">Status</th>
                  <th className="px-4 py-2">Amount</th>
                  <th className="px-4 py-2">Date</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order.id}>
                    <td className="px-4 py-2">{order.id.substring(0, 8)}</td>
                    <td className="px-4 py-2">
                      {order.profiles?.full_name || "No Name"}
                    </td>
                    <td className="px-4 py-2">
                      <span className={order.status.toLowerCase()}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-4 py-2">${order.total_amount}</td>
                    <td className="px-4 py-2">
                      {new Date(order.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
      <div className="board">
        <div className="profileShowcase">
          <div className="overlay"></div>
          <Image className="profileShowcaseImage" src={Profile} alt="profile" />
          <div className="profileInfo">
            <div className="profileDetails">
              <h2 className="profileName">Candid Dorwu</h2>
              <p className="profileRole">Super Admin</p>
            </div>
          </div>
        </div>

        <div className="taskboard">
          <div className="taskHeading">
            <h3 className="taskTitle">Reminder</h3>
            <button>
              <BiAddToQueue />
              Add Task
            </button>
          </div>
          <div className="taskBody">
            <Task />
            <Task />
          </div>
        </div>
      </div> */}

      <div className="page">
        <div className="actions">
          <Card />
        </div>
        <div className="addon">
          <div className="addon-Items-container"></div>
        </div>
      </div>
    </main>
  );
}
