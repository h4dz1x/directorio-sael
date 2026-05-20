import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { BookUser, LogOut, Moon, Sun, Shield } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Layout() {
  const { user, role, signOut } = useAuth();
  const navigate = useNavigate();
  const [dark, setDark] = useState(() =>
    localStorage.getItem('theme') === 'dark' ||
    (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)
  );

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
    localStorage.setItem('theme', dark ? 'dark' : 'light');
  }, [dark]);

  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-primary-700 dark:text-primary-400 font-bold text-lg"
          >
            <BookUser size={24} />
            <span className="hidden sm:inline">Directorio SAEL</span>
          </button>

          <div className="flex items-center gap-3">
            {role === 'admin' && (
              <span className="hidden sm:inline-flex items-center gap-1 text-xs font-medium bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400 px-2 py-1 rounded-full">
                <Shield size={12} />
                Admin
              </span>
            )}
            <span className="text-sm text-gray-600 dark:text-gray-400 hidden md:block">
              {user?.email}
            </span>
            <button
              onClick={() => setDark(!dark)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400 transition"
              title={dark ? 'Modo claro' : 'Modo oscuro'}
            >
              {dark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button
              onClick={handleSignOut}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400 transition"
              title="Cerrar sesión"
            >
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <Outlet />
      </main>
    </div>
  );
}
