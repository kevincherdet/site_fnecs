'use client';

import Link from 'next/link';
import { useState } from 'react';

const navItems = [
  {
    label: 'La Fédération',
    href: '/federation',
    children: [
      { label: 'Mission', href: '/federation#mission' },
      { label: 'Valeurs', href: '/federation#valeurs' },
      { label: 'Organigramme', href: '/federation#organigramme' },
      { label: 'CFE-CGC Commerce', href: '/federation#commerce' },
      { label: 'CFE-CGC Services', href: '/federation#services' },
    ],
  },
  { label: 'Actualités', href: '/actualites' },
  { label: 'Contact', href: '/contact' },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur border-b border-gray-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-xl font-bold text-fnecs-blue">
            FNECS <span className="text-sm font-normal text-gray-500">CFE-CGC</span>
          </Link>

          {/* Nav desktop */}
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <div
                key={item.href}
                className="relative"
                onMouseEnter={() => item.children && setOpenDropdown(item.label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <Link
                  href={item.href}
                  className="text-sm font-medium text-gray-700 hover:text-fnecs-blue transition-colors"
                >
                  {item.label}
                </Link>
                {item.children && openDropdown === item.label && (
                  <div className="absolute top-full left-0 mt-1 w-52 rounded-md bg-white shadow-lg ring-1 ring-black/5 py-1">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/connexion"
              className="text-sm font-medium text-gray-700 hover:text-fnecs-blue transition-colors"
            >
              Se connecter
            </Link>
            <Link
              href="/adhesion"
              className="rounded-full bg-fnecs-blue px-5 py-2 text-sm font-semibold text-white hover:bg-fnecs-blue-dark transition-colors uppercase tracking-wide"
            >
              J&apos;adhère
            </Link>
          </div>

          {/* Burger mobile */}
          <button
            className="md:hidden p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Menu mobile */}
      {menuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white px-4 py-4 space-y-3">
          {navItems.map((item) => (
            <div key={item.href}>
              <Link
                href={item.href}
                className="block text-sm font-medium text-gray-700"
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </Link>
              {item.children && (
                <div className="ml-4 mt-1 space-y-1">
                  {item.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className="block text-sm text-gray-500"
                      onClick={() => setMenuOpen(false)}
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          <hr className="border-gray-200" />
          <Link href="/connexion" className="block text-sm text-gray-700" onClick={() => setMenuOpen(false)}>
            Se connecter
          </Link>
          <Link
            href="/adhesion"
            className="block text-center rounded-full bg-fnecs-blue px-5 py-2 text-sm font-semibold text-white uppercase"
            onClick={() => setMenuOpen(false)}
          >
            J&apos;adhère
          </Link>
        </div>
      )}
    </header>
  );
}
