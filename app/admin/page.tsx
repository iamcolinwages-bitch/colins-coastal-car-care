'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, Sparkles } from 'lucide-react';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Email and password check
    if (email === 'iamcolinwages@gmail.com' && password === 'feelingblue2001') {
      // Store in session/cookie
      sessionStorage.setItem('admin_auth', 'true');
      router.push('/admin/dashboard');
    } else {
      setError('Incorrect email or password');
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/10 rounded-full mb-4">
            <div className="text-4xl font-bold">
              <span className="text-primary">C</span>
              <span className="text-white">4</span>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Admin Portal</h1>
          <p className="text-gray-400">Colin's Coastal Car Care</p>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-xl p-8">
          <div className="flex items-center gap-2 mb-6">
            <Lock className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-semibold text-white">Secure Login</h2>
          </div>

          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-white font-semibold mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError('');
                }}
                className="w-full bg-black border border-gray-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-primary"
                placeholder="Enter admin email"
              />
            </div>

            <div className="mb-6">
              <label className="block text-white font-semibold mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError('');
                }}
                className="w-full bg-black border border-gray-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-primary"
                placeholder="Enter admin password"
              />
              {error && <p className="text-primary text-sm mt-2">{error}</p>}
            </div>

            <button
              type="submit"
              className="w-full bg-primary hover:bg-primary-dark text-white py-3 rounded-lg font-semibold transition-colors"
            >
              Login to Dashboard
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-gray-800">
            <p className="text-gray-500 text-sm text-center">
              Authorized access only
            </p>
          </div>
        </div>

        <div className="mt-6 text-center">
          <a href="/" className="text-gray-400 hover:text-primary transition-colors text-sm">
            ← Back to Website
          </a>
        </div>
      </div>
    </div>
  );
}
