import { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "../api/axiosInstance";
import * as THREE from "three";
import CLOUDS from "vanta/src/vanta.clouds";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const vantaRef = useRef(null);
  const [vantaEffect, setVantaEffect] = useState(null);

  // 🌤️ Initialize VANTA Background
  useEffect(() => {
    if (!vantaEffect) {
      const effect = CLOUDS({
        el: vantaRef.current,
        THREE,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.0,
        minWidth: 200.0,
        skyColor: 0x48b9d4, // 💙 Sky color
        cloudColor: 0xdadae0, // ☁️ Cloud color
        sunColor: 0xca924f, // 🌞 Sun color
      });
      setVantaEffect(effect);
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  // 🧾 Handle form submission
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const { data } = await axios.post("/auth/register", {
        name,
        email,
        password,
      });
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/");
    } catch (_err) {
      setError("Registration failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      ref={vantaRef}
      className="min-h-screen flex items-center justify-center relative overflow-hidden font-[Poppins]"
    >
      {/* Overlay for better contrast */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>

      {/* Register Form */}
      <form
        onSubmit={handleSubmit}
        className="relative z-10 w-full max-w-sm bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-2xl space-y-6 border border-gray-200"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Create Account
        </h2>
        <p className="text-center text-gray-500 text-sm mb-2">
          Register to start posting jobs
        </p>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Name
          </label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            type="password"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {error && (
          <div className="text-sm text-red-600 text-center">{error}</div>
        )}

        <button
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-semibold tracking-wide shadow-md hover:bg-blue-700 transform hover:scale-[1.02] transition-all duration-300 disabled:opacity-70"
        >
          {loading ? "Creating account..." : "Register"}
        </button>

        <div className="text-sm text-gray-700 text-center">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-600 font-medium hover:underline transition-colors"
          >
            Login
          </Link>
        </div>
      </form>
    </div>
  );
}
