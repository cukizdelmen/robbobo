"use client";

import { useEffect, useState } from "react";

export default function ScreenGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isAllowed, setIsAllowed] = useState(true);

  useEffect(() => {
    const checkScreen = () => setIsAllowed(window.innerWidth >= 1127);
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  if (!isAllowed) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          background: "#f8f9fa",
          textAlign: "center",
          padding: "1.5rem",
        }}
      >
        <h2 style={{ color: "#222", marginBottom: "1rem", fontSize: "1.5rem" }}>
          Access Restricted
        </h2>
        <p style={{ color: "#555", maxWidth: "400px", lineHeight: "1.6" }}>
          This website is optimized for desktop screens. Please use a larger
          device or increase your browser window size to continue.
        </p>
      </div>
    );
  }

  return <>{children}</>;
}
