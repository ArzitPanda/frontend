// Signup.js

import React from "react";
import Link from "next/link";
import axios from "axios";
import { backend_url } from "../URL";
import { useRouter } from "next/router";

const Signup = () => {

  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const router = useRouter()

  const signupHandler = async () => {
    if (username && email && password) {
      try {
        const data = await axios.post(backend_url + "/auth/signup", {
          username,
          email,
          password,
        });
        console.log(data)
        if (data.data?.message==="User registered successfully") {

              router.push("/login");

      
        }
      
      } catch (error) {
        console.log(error);
        alert(error.toString());
      }
    }
  };


  
  return (
    <div className="min-h-screen flex items-center justify-center bg-white md:bg-blue-500">
      <div className="bg-white p-8 rounded shadow-md w-full md:w-96">
        <h2 className="text-3xl font-semibold text-center text-blue-500 mb-6">
          Sign Up
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
              className="mt-1 p-2 w-full border rounded-md"
              placeholder="Enter your username"
              onChange={(e)=>{setUsername(e.target.value)}}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-600 text-sm font-medium"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="mt-1 p-2 w-full border rounded-md"
              placeholder="Enter your email"
              onChange={(e)=>{setEmail(e.target.value)}}
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
              name="password"
              className="mt-1 p-2 w-full border rounded-md"
              placeholder="Enter your password"
              onChange={(e)=>{setPassword(e.target.value)}}
            />
          </div>
          <button
            onClick={signupHandler}
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Sign Up
          </button>
        </div>
        <div className="mt-4 text-center text-sm text-gray-600">
          <p>
            Already have an account?{" "}
            <Link href="/login" className="text-blue-500">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
