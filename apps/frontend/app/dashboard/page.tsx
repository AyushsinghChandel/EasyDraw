'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';

interface Room {
  id: number;
  slug: string;
  adminId: string;
}

export default function Dashboard() {
  const [userInitial, setUserInitial] = useState('');
  const [newRoomName, setNewRoomName] = useState('');
  const [joinRoomSlug, setJoinRoomSlug] = useState('');
  const [userRooms, setUserRooms] = useState<Room[]>([]);
  const router = useRouter();

  useEffect(() => {
    const email = localStorage.getItem('email');
    const token = localStorage.getItem('token');
    
    if (email) {
      setUserInitial(email.charAt(0).toUpperCase());
    }

    if (!token) {
      router.push('/signin');
      return;
    }

    const fetchUserRooms = async () => {
      try {
        const response = await axios.get('http://localhost:3002/my-rooms', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserRooms(response.data.rooms);
      } catch (error) {
        console.error('Failed to fetch user rooms:', error);
      }
    };

    fetchUserRooms();
  }, [router]);

const handleCreateRoom = async () => {
    if (!newRoomName.trim()) {
      alert('Please enter a room name.');
      return;
    }
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://localhost:3002/room',
        { name: newRoomName },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      router.push(`/canvas/${response.data.roomId}`);
    } catch (error) {
      console.error('Failed to create room:', error);
      
      // Check if the error is from Axios and has a response from the server
      if (axios.isAxiosError(error) && error.response) {
        // Show the specific error message from your backend
        alert(`Error: ${error.response.data.message}`);
      } else {
        // Show a generic message for other types of errors
        alert('An unexpected error occurred. Please try again.');
      }
    }
  };

  const handleJoinRoom = async () => {
    if (!joinRoomSlug.trim()) {
      alert('Please enter a room name to join.');
      return;
    }
    try {
      const response = await axios.get(`http://localhost:3002/room/${joinRoomSlug}`);
      if (response.data.room) {
        router.push(`/canvas/${response.data.room.id}`);
      } else {
        alert('Room not found.');
      }
    } catch (error) {
      console.error('Failed to find room:', error);
      alert('Could not find the specified room.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-950 to-black text-white">
      <header className="py-4 px-4 sm:px-6 lg:px-8 border-b border-gray-800">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-400">EasyDraw</h1>
          <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-lg">
            {userInitial}
          </div>
        </div>
      </header>

      <main className="py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">Your Dashboard</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-900 p-6 rounded-xl border border-gray-800 flex flex-col gap-6">
              <div>
                <h3 className="text-xl font-semibold mb-3">Create a New Room</h3>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newRoomName}
                    onChange={(e) => setNewRoomName(e.target.value)}
                    placeholder="Enter new room name"
                    className="flex-grow px-3 py-2 bg-gray-800 border border-gray-600 rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                  <button
                    onClick={handleCreateRoom}
                    className="px-4 py-2 bg-blue-600 rounded-md hover:bg-blue-500 transition-colors"
                  >
                    Create
                  </button>
                </div>
              </div>

              <hr className="border-gray-700" />

              <div>
                <h3 className="text-xl font-semibold mb-3">Join a Room</h3>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={joinRoomSlug}
                    onChange={(e) => setJoinRoomSlug(e.target.value)}
                    placeholder="Enter room name to join"
                    className="flex-grow px-3 py-2 bg-gray-800 border border-gray-600 rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                  <button
                    onClick={handleJoinRoom}
                    className="px-4 py-2 bg-gray-700 rounded-md hover:bg-gray-600 transition-colors"
                  >
                    Join
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
              <h3 className="text-xl font-semibold mb-4">My Rooms</h3>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {userRooms.length > 0 ? (
                  userRooms.map((room) => (
                    // FIX: Corrected path for the Link component
                    <Link
                      key={room.id}
                      href={`/canvas/${room.id}`}
                      className="block p-4 bg-gray-800 rounded-md hover:bg-gray-700 transition-colors"
                    >
                      <span className="font-medium">{room.slug}</span>
                    </Link>
                  ))
                ) : (
                  <p className="text-gray-400">You haven't created any rooms yet.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}