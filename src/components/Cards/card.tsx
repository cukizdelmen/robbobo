"use client";

import React, { useEffect, useState } from "react";
import "./card.css";
import { BsPersonWorkspace } from "react-icons/bs";
import { useData } from "@/Providers/dataProvider";

const Card = () => {
  const { orders, fetchOrders, loading, fetchOrderStats, fetchProductStats } =
    useData();

  const [stats, setStats] = useState({
    totalOrders: 0,
    activeOrders: 0,
    dailyOrders: 0,
    completedOrders: 0,
    totalProducts: 0,
  });

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  useEffect(() => {
    const loadStats = async () => {
      const orderResult = await fetchOrderStats();
      const productResult = await fetchProductStats();
      setStats({ ...orderResult, ...productResult });
    };
    loadStats();
  }, [fetchOrderStats, fetchProductStats]);

  return (
    <div className="cardContainer">
      <div className="card">
        <span className="cardTitle">Total Orders</span>
        <div className="cardRow">
          <span className="CardDigit">{stats.totalOrders}</span>
          <div className="cardIconBox">
            <BsPersonWorkspace className="cardIcon" />
          </div>
        </div>
      </div>
      <div className="card">
        <span className="cardTitle">Total Products</span>
        <div className="cardRow">
          <span className="CardDigit">{stats.totalProducts}</span>
          <div className="cardIconBox">
            <BsPersonWorkspace className="cardIcon" />
          </div>
        </div>
      </div>
      <div className="card">
        <span className="cardTitle">Active Orders</span>
        <div className="cardRow">
          <span className="CardDigit">{stats.activeOrders}</span>
          <div className="cardIconBox">
            <BsPersonWorkspace className="cardIcon" />
          </div>
        </div>
      </div>
      <div className="card">
        <span className="cardTitle">Total Completed</span>
        <div className="cardRow">
          <span className="CardDigit">{stats.completedOrders}</span>
          <div className="cardIconBox">
            <BsPersonWorkspace className="cardIcon" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
