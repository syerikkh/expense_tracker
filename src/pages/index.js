import { Inter } from "next/font/google";
import { AppIcon } from "@/components/Icons/AppIcon";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Cookies from "js-cookie";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(
        "https://expense-tracker-backend-qlrz.onrender.com/login",
        {
          email,
          password,
        }
      );
      if (res.status === 200) {
        const { token, userId } = res.data.data;
        Cookies.set("authToken", token);
        setMessage("Successfully signed in!");
        setTimeout(() => {
          router.push(`/dashboard/${userId}`);
        }, 1500);
      } else {
        setMessage("Invalid email or password");
      }
    } catch (error) {
      console.error("Error during login:", error);
      setMessage("Failed to log in. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-[100vw] h-[100vh] flex lg:flex-row flex-col lg:justify-center items-center">
      <div className="lg:w-1/2 w-full lg:h-full h-[200px] bg-[#0166FF] flex justify-center items-center">
        <h1 className="text-white text-3xl lg:text-9xl font-bold">
          Track
          <br /> Your
          <br /> Expenses
        </h1>
      </div>
      <div className="w-1/2 mt-10 flex justify-center items-center">
        <div className="flex flex-col gap-10 justify-center items-center w-96">
          <div className="flex justify-center items-center gap-3">
            <AppIcon />
            <h1 className="font-semibold text-3xl">Geld</h1>
          </div>
          <div className="text-center flex gap-3 flex-col">
            <h1 className="font-semibold text-3xl">Welcome Back</h1>
            <p className="text-xl text-[#334155]">
              Welcome back, Please enter your details
            </p>
          </div>
          {message && (
            <p className="mb-4 text-center text-red-500">{message}</p>
          )}
          <form onSubmit={handleLogIn} className="w-full">
            <div className="mb-4">
              <label
                className="block mb-2 text-sm font-bold text-gray-700"
                htmlFor="email"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full text-black px-3 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:border-blue-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-6">
              <label
                className="block mb-2 text-sm font-bold text-gray-700"
                htmlFor="password"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full text-black px-3 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:border-blue-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Log In"}
            </button>
          </form>
          <div className="flex items-center justify-center">
            <div className="text-center flex gap-2">
              <p>Don’t have an account?</p>
              <Link href={"/signUp"}>
                <button className="text-[#0166FF]">Sign up</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
