"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import supabase from "../Config/supabseClient";

const HomePage = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { data: admin, error: queryError } = await supabase
        .from("admins")
        .select("*")
        .eq("email", email.trim().toLowerCase())
        .maybeSingle();

      if (queryError || !admin) {
        setError("Admin not found");
        return;
      }

      if (admin.password !== password) {
        setError("Invalid credentials");
        return;
      }

      sessionStorage.setItem("admin", JSON.stringify(admin));
      router.push("./pages/home");
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="loginPage">
      {loading && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.66)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 10,
          }}
        >
          <div
            className="spinner"
            style={{
              border: "6px solid #f3f3f3",
              borderTop: "6px solid #007bff",
              borderRadius: "50%",
              width: "50px",
              height: "50px",
              animation: "spin 1s linear infinite",
            }}
          />
          <style jsx>{`
            @keyframes spin {
              0% {
                transform: rotate(0deg);
              }
              100% {
                transform: rotate(360deg);
              }
            }
          `}</style>
        </div>
      )}

      <div className="formContainer">
        <h2>Admin Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Admin Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ display: "block", marginBottom: "10px", width: "100%" }}
          />
          <input
            type="password"
            placeholder="Admin Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ display: "block", marginBottom: "10px", width: "100%" }}
          />
          {error && <p style={{ color: "red" }}>{error}</p>}
          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default HomePage;
