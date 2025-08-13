'use client';

import Link from 'next/link';
import { useState } from 'react';
import axios from "axios";
import { useRouter } from 'next/navigation'


export default function SignIn() {
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();
  const handleSubmit = async (e:any) => {
    e.preventDefault();
    try{
        const response = await axios.post('http://localhost:3002/signin', {
                username,
                password
            });
            const token = response.data.token;
            localStorage.setItem("token", token);
            localStorage.setItem("email", username);
            console.log('Signin Success:', response.data);
    }catch(e){
        console.log("something wrong happened");
        return;
    }
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-950 to-black flex flex-col">
      <main className="flex-grow flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-6">
          Sign In to EasyDraw
        </h2>
        <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mb-8">
          Welcome back! Access your collaborative boards.
        </p>

        <div className="w-full max-w-md bg-gray-900 p-8 rounded-xl shadow-2xl border border-gray-800">
          <div className="mt-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 text-left">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              id="email"
              onChange={(e) => setUserName(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-gray-800 border border-gray-600 text-white rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="you@example.com"
              required
            />
          </div>
          <div className="mt-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-300 text-left">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-gray-800 border border-gray-600 text-white rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="••••••••"
              required
            />
          </div>
          <div className="mt-6">
            <button
              onClick={handleSubmit}
              className="w-full px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 transition-colors"
            >
              Sign In
            </button>
          </div>
          <p className="mt-4 text-sm text-gray-400">
            Don't have an account?{' '}
            <Link href="/signup" className="text-blue-400 hover:text-blue-300 font-medium">
              Sign up here
            </Link>
          </p>
        </div>
      </main>

      <footer className="py-6 px-4 sm:px-6 lg:px-8 bg-black text-gray-400 text-center">
        <p className="text-sm">© 2025 EasyDraw. All rights reserved.</p>
      </footer>
    </div>
  );
}