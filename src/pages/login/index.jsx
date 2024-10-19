import MainLayout from 'components/MainLayout';
import { useState } from 'react';
import { MdLock } from 'react-icons/md';

const HalamanLogin = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const correctPassword = import.meta.env.VITE_AUTH_PASSWORD;

  const handleLogin = () => {
    if (password === correctPassword) {
      localStorage.setItem(import.meta.env.VITE_AUTH_KEY, true);
      window.location.href = '/';
    } else {
      setError('Password salah!');
    }
  };

  return (
    <MainLayout>
      <div className="px-5">
        <h1>Selamat datang di SiTunting!</h1>
        <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="space-y-4">
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MdLock className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Masukkan password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div>
              <button
                onClick={handleLogin}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#4A90E2] hover:bg-blue-700"
              >
                Masuk
              </button>
            </div>
          </div>

          {error && <div className="mt-3 text-sm text-red-600 text-center">{error}</div>}
        </div>
      </div>
    </MainLayout>
  );
};

export default HalamanLogin;
