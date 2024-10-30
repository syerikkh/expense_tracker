import React, { useState } from "react";
import { AppIcon } from "@/components/Icons/AppIcon";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios";
import Cookies from "js-cookie";

export default function SignUp() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (password !== rePassword) {
      alert("Passwords do not match");
      setLoading(false);
      return;
    }
    try {
      const res = await axios.post("http://192.168.1.5:8000/signup", {
        name,
        email,
        password,
      });
      if (res.status === 200) {
        console.log("data", res.data);
        const { token, user } = res.data;
        Cookies.set("authToken", token);
        setMessage("Successfully signed up!");
        setTimeout(() => {
          router.push(`/dashboard/${user.userId}`);
        }, 1500);
      } else if (res.status === 409) {
        setMessage("Email already exists");
      } else {
        setMessage("Invalid email or password");
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setMessage("Email already exists");
      } else {
        console.error("Error during sign up:", error);
        setMessage("Failed to sign up. Please try again.");
      }
    } finally {
      setLoading(false);
    }
    setName("");
    setEmail("");
    setPassword("");
    setRePassword("");
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
      <div className="w-full lg:w-1/2 mt-10 lg:mt-0 flex justify-center items-center">
        <div className="flex flex-col gap-10 justify-center items-center w-96">
          <div className="flex justify-center items-center gap-3">
            <AppIcon />
            <h1 className="font-semibold text-3xl">Geld</h1>
          </div>
          <div className="text-center flex gap-3 flex-col">
            <h1 className="font-semibold text-3xl">Create your account</h1>
          </div>
          {message && (
            <p className="mb-4 text-center text-red-500">{message}</p>
          )}
          <form onSubmit={handleSignUp} className="w-full">
            <div className="mb-4">
              <label
                className="block mb-2 text-sm font-bold text-gray-700"
                htmlFor="name"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full text-black px-3 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:border-blue-500"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
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
            <div className="mb-4">
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
            <div className="mb-6">
              <label
                className="block mb-2 text-sm font-bold text-gray-700"
                htmlFor="rePassword"
              >
                Re-Password
              </label>
              <input
                type="password"
                id="rePassword"
                className="w-full text-black px-3 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:border-blue-500"
                value={rePassword}
                onChange={(e) => setRePassword(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
              disabled={loading}
            >
              {loading ? "Signing up..." : "Sign up"}
            </button>
          </form>
          <div className="flex items-center justify-center">
            <div className="text-center flex gap-2">
              <p>Already have an account?</p>
              <Link href="/">
                <div className="text-[#0166FF]">Log in</div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
