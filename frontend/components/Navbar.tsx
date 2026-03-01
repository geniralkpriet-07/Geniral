'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Menu, X, LogOut, LayoutDashboard } from 'lucide-react';

const links = [
  { href: '/events', label: 'Events' },
];

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<{ name?: string; email: string; role?: string } | null>(null);

  const readUser = () => {
    try {
      const stored = localStorage.getItem('user');
      const token = localStorage.getItem('token');
      setUser(stored && token ? JSON.parse(stored) : null);
    } catch {
      setUser(null);
    }
  };

  useEffect(() => {
    readUser();
    // Re-read whenever another tab or the same page updates localStorage
    window.addEventListener('storage', readUser);
    // Custom event for same-tab updates (login / signup)
    window.addEventListener('authChange', readUser);
    return () => {
      window.removeEventListener('storage', readUser);
      window.removeEventListener('authChange', readUser);
    };
  }, [pathname]); // re-run on route change too

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    window.dispatchEvent(new Event('authChange'));
    router.push('/events');
  };

  const isAdmin = user?.role === 'campus_captain';
  const dashHref = isAdmin ? '/dashboard' : '/dashboard';

  return (
    <nav className="fixed top-0 inset-x-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-14">
        {/* Logo */}
        <Link href="/events" className="font-bold text-black text-lg">
          KaiCampus
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`text-sm font-medium transition-colors ${
                pathname === l.href ? 'text-black font-semibold' : 'text-gray-500 hover:text-black'
              }`}
            >
              {l.label}
            </Link>
          ))}

          {user ? (
            <>
              <Link
                href={dashHref}
              className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-black font-medium transition-colors"
              >
                <LayoutDashboard className="w-4 h-4" />
                {isAdmin ? 'Admin Panel' : 'Dashboard'}
              </Link>
              <button
                onClick={handleLogout}
              className="flex items-center gap-1.5 ml-2 px-3 py-1.5 border border-gray-300 text-gray-600 hover:text-black hover:border-black text-sm font-medium transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link
                href="/signup"
                className="ml-2 px-3 py-1.5 border border-gray-300 text-black hover:border-black text-sm font-medium transition-colors"
              >
                Sign Up
              </Link>
              <Link
                href="/login"
                className="px-3 py-1.5 bg-black text-white text-sm font-medium hover:bg-gray-800 transition-colors"
              >
                Sign In
              </Link>
            </>
          )}
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden text-gray-600" onClick={() => setOpen(!open)} title={open ? 'Close menu' : 'Open menu'} aria-label={open ? 'Close menu' : 'Open menu'}>
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-gray-200 bg-white px-4 py-4 flex flex-col gap-3">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-gray-600 hover:text-black font-medium"
            >
              {l.label}
            </Link>
          ))}
          {user ? (
            <>
              <Link
                href={dashHref}
                onClick={() => setOpen(false)}
                className="px-3 py-2 border border-gray-300 text-black font-medium text-center"
              >
                {isAdmin ? 'Admin Panel' : 'Dashboard'}
              </Link>
              <button
                onClick={() => { handleLogout(); setOpen(false); }}
                className="px-3 py-2 bg-gray-100 text-gray-700 font-medium text-center"
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link
                href="/signup"
                onClick={() => setOpen(false)}
                className="px-3 py-2 border border-gray-300 text-black font-medium text-center"
              >
                Sign Up
              </Link>
              <Link
                href="/login"
                onClick={() => setOpen(false)}
                className="px-3 py-2 bg-black text-white font-medium text-center"
              >
                Sign In
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}

