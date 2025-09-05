"use client";

import axios from "axios";
import React, { useCallback, useState } from "react";
import Input from "../components/input";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import Image from "next/image";

const Auth = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [variant, setVariant] = useState("login");

  const toggleVariant = () => {
    setVariant((currentVariant) =>
      currentVariant === "login" ? "register" : "login"
    );
  };

  const login = useCallback(async () => {
    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: true,
        callbackUrl: "/home",
      });

      if (result?.ok) {
        window.location.href = "/home";
      } else {
        alert("Invalid credentials");
      }
    } catch (error) {
      console.log(error);
    }
  }, [email, password]);

  const register = useCallback(async () => {
    try {
      await axios.post("/api/register", {
        email,
        name,
        password,
      });
      await login();
    } catch (error) {
      console.log(error);
    }
  }, [email, name, password, login]);

  return (
    <div
      className="relative w-full h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/bg.webp')" }}
    >
      {/* Logo top-left */}
      <nav className="absolute top-4 left-4 z-20">
        <Image
          src="/logo.jpg"
          alt="Logo"
          width={64}
          height={64}
          className="h-16 w-auto cursor-pointer"
          onClick={() => router.push("/home")}
        />
      </nav>

      {/* Centered Auth Form */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="bg-black bg-opacity-80 px-8 py-10 rounded-md shadow-lg w-full max-w-md">
          <h2 className="text-white text-4xl font-semibold text-center mb-8">
            {variant === "login" ? "Login" : "Register"}
          </h2>

          <div className="flex flex-col gap-4">
            {variant === "register" && (
              <Input
                label="Username"
                onChange={(ev) => setName(ev.target.value)}
                id="name"
                type="text"
                value={name}
              />
            )}

            <Input
              label="Email"
              onChange={(ev) => setEmail(ev.target.value)}
              id="email"
              type="email"
              value={email}
            />

            <Input
              label="Password"
              onChange={(ev) => setPassword(ev.target.value)}
              id="password"
              type="password"
              value={password}
            />
          </div>

          <button
            onClick={variant === "login" ? login : register}
            className="bg-red-600 hover:bg-red-700 transition w-full py-3 mt-8 text-white rounded-md"
          >
            {variant === "login" ? "Login" : "Sign Up"}
          </button>

          {/* Social login */}
          <div className="flex items-center justify-center gap-6 mt-6">
            <div
              onClick={() => signIn("google", { callbackUrl: "/home" })}
              className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition"
            >
              <FcGoogle size={30} />
            </div>
            <div
              onClick={() => signIn("github", { callbackUrl: "/home" })}
              className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition"
            >
              <FaGithub size={30} />
            </div>
          </div>

          {/* Toggle login/register */}
          <p className="text-neutral-400 text-center mt-6">
            {variant === "login"
              ? "First time using our app?"
              : "Already have an account?"}
            <span
              onClick={toggleVariant}
              className="text-white hover:underline cursor-pointer ml-1"
            >
              {variant === "login" ? " Create an account" : " Login"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
