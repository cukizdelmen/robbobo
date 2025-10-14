"use client";
import "./sidebar.css";
import { TbLayoutDashboardFilled, TbLogout2 } from "react-icons/tb";
import { IoBagHandleSharp } from "react-icons/io5";
import { GrGroup } from "react-icons/gr";
import { FaCartArrowDown } from "react-icons/fa6";
import { SiImessage } from "react-icons/si";
import Image from "next/image";
import logobit from "../../assets/logobit.png";
import Store from "../../app/pages/store/page";
import Link from "next/link";
import { useAdminAuth } from "../../Providers/AdminAuthProvider";
import { Flag } from "lucide-react";
const Sidebar = () => {
  const { logout } = useAdminAuth();
  return (
    <div className="container">
      <div className="logo">
        <Image src={logobit} width={50} height={50} alt="Image description" />
        <span className="logoName">Robbobo</span>
      </div>
      <ul className="links">
        <li className="linkItem">
          <a href="/pages/home" className="row">
            <TbLayoutDashboardFilled /> Home
          </a>
        </li>
        <li className="linkItem">
          <Link href="/pages/store" className="row">
            <IoBagHandleSharp className="icon" />
            Store
          </Link>
        </li>
        <li className="linkItem">
          <Link href="/pages/category" className="row">
            <IoBagHandleSharp className="icon" />
            Categories
          </Link>
        </li>
        <li className="linkItem">
          <Link href="/pages/users" className="row">
            <GrGroup />
            Users
          </Link>
        </li>
        <li className="linkItem">
          <Link href="/pages/orders" className="row">
            <FaCartArrowDown />
            Orders
          </Link>
        </li>
        <li className="linkItem">
          <Link href="/pages/orders" className="row">
            <SiImessage />
            Messages
          </Link>
        </li>
        <li className="linkItem">
          <Link href="/pages/banner" className="row">
            <Flag />
            Banner
          </Link>
        </li>
      </ul>
      <ul className="links">
        <li onClick={logout} className="linkItem">
          <div className="row logout">
            <TbLogout2 />
            Logout
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
