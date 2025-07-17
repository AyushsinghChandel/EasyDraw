'use client';

import Link from 'next/link';
import { use, useState } from 'react';
import axios from "axios";
import { useRouter } from 'next/navigation'


export default function SignUp() {
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
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50 flex flex-col">
      <main className="flex-grow flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-6">
          Create Your EasyDraw Account
        </h2>
        <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mb-8">
          Sign in to start collaborating and creating with EasyDraw!
        </p>

        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
          <div className="mt-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              id="email"
              onChange={(e) => setUserName(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mt-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter your password"
              required
            />
          </div>
          <div className="mt-6">
            <button
              onClick={handleSubmit}
              className="w-full px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
            >
              Sign In
            </button>
          </div>
          <p className="mt-4 text-sm text-gray-600">
            Don't have an account?{' '}
            <Link href="/signup" className="text-indigo-600 hover:text-indigo-800 font-medium">
              Sign up here
            </Link>
          </p>
        </div>
      </main>

      <footer className="py-6 px-4 sm:px-6 lg:px-8 bg-indigo-600 text-white text-center">
        <p className="text-sm">© 2025 EasyDraw. All rights reserved.</p>
      </footer>
    </div>
  );
}