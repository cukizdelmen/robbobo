import { FiSearch } from "react-icons/fi";
import "./searchbar.css";
import profile from "../../assets/profile.jpeg";
import Image from "next/image";
import { MdNotifications } from "react-icons/md";
import { SiImessage } from "react-icons/si";

const searchBar = () => {
  return (
    <main className="headercontainer">
      <div className="searchContainer">
        <FiSearch />
        <input type="search" placeholder="Search Here" />
      </div>

      <div className="notification">
        <SiImessage className="bell" />
        <div className="count">6</div>
      </div>
      <div className="profile">
        <div>
          <Image
            className="profileImage"
            src={profile}
            width={50}
            alt="profile Image"
          />
        </div>
        <div className="profileDesc">
          <span>
            Candid <br /> Dorwu
          </span>
        </div>
      </div>
    </main>
  );
};

export default searchBar;
