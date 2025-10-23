import styles from "./head.module.css";
import Image from "next/image";
import Profile from "../../assets/profile.jpeg";
import { BellRing, MessageCircleMore, Radar } from "lucide-react";
import { Colors } from "@/constants";

const Head = () => {
  return (
    <div className={styles.container}>
      <div className={styles.nameNGreetings}>
        <Image src={Profile} alt="Profile Image" className={styles.profile} />
        <div className={styles.greetings}>
          <span className={styles.profileName}>Hello, Candid Dorwu</span>
          <span className={styles.greet}>
            Good Afternoon, welcome back to your dashboard
          </span>
        </div>
      </div>
      <div className={styles.actionComponent}>
        <div className={styles.searchBar}>
          <input placeholder="search..." className={styles.input} />
          <span className={styles.radar}>
            <Radar color={Colors.white} />
          </span>
        </div>
        <div className={styles.message}>
          <MessageCircleMore color={Colors.bg} />
        </div>
        <div className={styles.notification}>
          <BellRing color={Colors.bg} />
        </div>
      </div>
    </div>
  );
};

export default Head;
