import React from 'react';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { io } from 'socket.io-client';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link to="/" className="text-xl font-bold text-gray-900">
            TaskBoard
          </Link>
          <div className="space-x-4">
            <Link to="/" className="text-gray-600 hover:text-gray-900">Home</Link>
            <Link to="/boards" className="text-gray-600 hover:text-gray-900">Boards</Link>
            <Link to="/login" className="text-gray-600 hover:text-gray-900">Login</Link>
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/boards" element={<BoardsPage />} />
        <Route path="/boards/:id" element={<BoardDetailPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="*" element={<div>404 - Not Found</div>} />
      </Routes>
    </div>
  );
}

function HomePage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-20 text-center">
      <h1 className="text-5xl font-bold text-gray-900 mb-6">Realtime Task Board</h1>
      <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
        Collaborative boards with live updates and Python-powered analytics.
      </p>
      <div className="space-x-4">
        <Link
          to="/boards"
          className="bg-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
        >
          Get Started
        </Link>
        <Link
          to="/login"
          className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Login
        </Link>
      </div>
    </div>
  );
}

function BoardsPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Boards</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="border rounded-lg p-6 hover:shadow-md transition-shadow">
          <h3 className="text-lg font-semibold mb-2">New Board</h3>
          <p className="text-gray-600 mb-4">Click to create a new collaborative board</p>
          <button className="w-full bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700">
            Create Board
          </button>
        </div>
      </div>
    </div>
  );
}

function BoardDetailPage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Board Name</h1>
      <div className="grid grid-cols-3 gap-6 mb-12">
        <div className="bg-white border rounded-lg p-6 shadow-sm">
          <h2 className="font-semibold text-gray-900 mb-4">Todo</h2>
          <div className="space-y-2">
            <div className="bg-gray-50 p-3 rounded text-sm">Sample task</div>
          </div>
        </div>
        <div className="bg-white border rounded-lg p-6 shadow-sm">
          <h2 className="font-semibold text-gray-900 mb-4">In Progress</h2>
          <div className="h-32 bg-gray-50 rounded flex items-center justify-center text-gray-500">
            Empty
          </div>
        </div>
        <div className="bg-white border rounded-lg p-6 shadow-sm">
          <h2 className="font-semibold text-gray-900 mb-4">Done</h2>
          <div className="h-32 bg-gray-50 rounded flex items-center justify-center text-gray-500">
            Empty
          </div>
        </div>
      </div>
      <div className="bg-white border rounded-lg p-8 shadow-sm">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Insights</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center p-6">
            <div className="text-3xl font-bold text-indigo-600">12</div>
            <div className="text-sm text-gray-600">Total Tasks</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function LoginPage() {
  return (
    <div className="max-w-md mx-auto px-6 py-20">
      <div className="bg-white rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">Login</h1>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Sign in
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <a href="/register" className="text-indigo-600 hover:underline">Sign up</a>
        </p>
      </div>
    </div>
  );
}

function RegisterPage() {
  return (
    <div className="max-w-md mx-auto px-6 py-20">
      <div className="bg-white rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">Sign Up</h1>
        {/* Same form structure as login */}
      </div>
    </div>
  );
}

export default App;
