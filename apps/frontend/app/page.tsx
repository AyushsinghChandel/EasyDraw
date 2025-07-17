'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50 flex flex-col">
      <header className="py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold text-indigo-600">EasyDraw</h1>
          <div className="space-x-4">
            <Link href="/signin">
              <button className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors">
                Sign In
              </button>
            </Link>
            <Link href="/signup">
              <button className="px-6 py-2 bg-white text-indigo-600 border border-indigo-600 rounded-md hover:bg-indigo-50 transition-colors">
                Sign Up
              </button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-grow flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-6">
          Collaborate and Create with EasyDraw
        </h2>
        <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mb-8">
          Join rooms, draw together in real-time, and chat seamlessly. Unleash your creativity with friends and teams!
        </p>
      </main>


      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-3xl font-bold text-gray-900 text-center mb-12">Why Choose EasyDraw?</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-6 bg-indigo-50 rounded-lg shadow-md">
              <h4 className="text-xl font-semibold text-indigo-600 mb-4">Real-Time Collaboration</h4>
              <p className="text-gray-600">Draw with multiple users in real-time, perfect for brainstorming and teamwork.</p>
            </div>
            <div className="p-6 bg-indigo-50 rounded-lg shadow-md">
              <h4 className="text-xl font-semibold text-indigo-600 mb-4">Create and Join Rooms</h4>
              <p className="text-gray-600">Easily set up private or public rooms to start drawing with your team or friends.</p>
            </div>
            <div className="p-6 bg-indigo-50 rounded-lg shadow-md">
              <h4 className="text-xl font-semibold text-indigo-600 mb-4">In-Room Chat</h4>
              <p className="text-gray-600">Communicate effortlessly with built-in chat while you create together.</p>
            </div>
            <div className="p-6 bg-indigo-50 rounded-lg shadow-md">
              <h4 className="text-xl font-semibold text-indigo-600 mb-4">Intuitive Drawing Tools</h4>
              <p className="text-gray-600">User-friendly tools to bring your ideas to life with ease and precision.</p>
            </div>
            <div className="p-6 bg-indigo-50 rounded-lg shadow-md">
              <h4 className="text-xl font-semibold text-indigo-600 mb-4">Cross-Platform Access</h4>
              <p className="text-gray-600">Access EasyDraw from any device, anywhere, anytime.</p>
            </div>
            <div className="p-6 bg-indigo-50 rounded-lg shadow-md">
              <h4 className="text-xl font-semibold text-indigo-600 mb-4">Secure and Private</h4>
              <p className="text-gray-600">Your creations and chats are safe with our robust security measures.</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-6 px-4 sm:px-6 lg:px-8 bg-indigo-600 text-white text-center">
        <p className="text-sm">© 2025 EasyDraw. All rights reserved.</p>
      </footer>
    </div>
  );
}