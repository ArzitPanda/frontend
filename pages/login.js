// Login.js

import React, { useState } from "react";
import axios from "axios";
import Link from "next/link";
import { backend_url } from "../URL";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const loginHandler = async () => {
    if (username && password) {
      try {
        const token = await axios.post(backend_url + "/auth/login", {
          username,
          password,
        });

        console.log(token);
      } catch (error) {
        console.log(error);
        alert(error.toString());
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-500">
      <div className="bg-white p-8 rounded shadow-md w-full md:w-96">
        <h2 className="text-3xl font-semibold text-center text-blue-500 mb-6">
          Login
        </h2>
        <div>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-gray-600 text-sm font-medium"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              className="mt-1 p-2 w-full border rounded-md"
              placeholder="Enter your username"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-600 text-sm font-medium"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              name="password"
              className="mt-1 p-2 w-full border rounded-md"
              placeholder="Enter your password"
            />
          </div>
          <button
            onClick={loginHandler}
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Login
          </button>
        </div>
        <div className="mt-4 text-center text-sm text-gray-600">
          <p>
            New User?{" "}
            <Link href="/signup" className="text-blue-500">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
