'use client';

import Image from 'next/image';
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
  { label: 'Contacts', href: '/contact' },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-black/5 bg-white/95 backdrop-blur">
      <div className="mx-auto max-w-[1280px] px-6 sm:px-10">
        <div className="flex h-[72px] items-center justify-between gap-8">
          {/* Logo */}
          <Link
            href="/"
            aria-label="Accueil — FNECS CFE-CGC Commerce et Services"
            className="relative block h-[52px] w-[175px] shrink-0"
          >
            <Image
              src="/brand/logo-fnecs.svg"
              alt="FNECS CFE-CGC Commerce et Services"
              fill
              priority
              sizes="175px"
              className="object-contain object-left"
            />
          </Link>

          {/* Cluster droit : nav + actions groupés (fidèle au Column Figma) */}
          <div className="hidden items-center gap-8 lg:flex">
            <nav className="flex items-center gap-8">
              {navItems.map((item) => (
                <div
                  key={item.href}
                  className="relative"
                  onMouseEnter={() => item.children && setOpenDropdown(item.label)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <Link
                    href={item.href}
                    className="text-base font-bold leading-[1.14] text-bleu-fede transition-colors hover:text-bleu-confede"
                  >
                    {item.label}
                  </Link>
                  {item.children && openDropdown === item.label && (
                    <div className="absolute left-0 top-full mt-2 w-56 rounded-xl bg-white py-2 shadow-lg ring-1 ring-black/5">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block px-4 py-2 text-sm text-gris-fonce transition-colors hover:bg-bleu-fede/5 hover:text-bleu-fede"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>

            <div className="flex items-center gap-[10px]">
              {/* Loupe recherche — placeholder visuel, à brancher quand /recherche existera */}
              <button
                type="button"
                aria-label="Rechercher"
                className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-bleu-fede transition-colors hover:bg-bleu-fede/5"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                  className="h-5 w-5"
                >
                  <circle cx="11" cy="11" r="7" />
                  <path d="m20 20-3.5-3.5" />
                </svg>
              </button>
              <Link
                href="/adhesion"
                className="inline-flex h-10 w-[160px] items-center justify-center rounded-full bg-gradient-to-r from-bleu-fede to-vert-fede px-5 font-display text-sm font-bold uppercase tracking-[1.2px] text-white transition-[filter] hover:brightness-105"
              >
                J&apos;adhère
              </Link>
              <Link
                href="/connexion"
                className="inline-flex h-10 w-[160px] items-center justify-center rounded-full border border-bleu-confede px-5 font-display text-sm font-bold uppercase tracking-[1.2px] text-bleu-fede transition-colors hover:bg-bleu-fede/5"
              >
                Se connecter
              </Link>
            </div>
          </div>

          {/* Burger mobile */}
          <button
            type="button"
            className="p-2 text-bleu-fede lg:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={menuOpen}
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Menu mobile */}
      {menuOpen && (
        <div className="space-y-4 border-t border-black/5 bg-white px-6 py-6 lg:hidden">
          {navItems.map((item) => (
            <div key={item.href}>
              <Link
                href={item.href}
                className="block text-base font-bold text-bleu-fede"
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </Link>
              {item.children && (
                <div className="ml-4 mt-2 space-y-2 border-l border-black/10 pl-4">
                  {item.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className="block text-sm text-gris-fonce"
                      onClick={() => setMenuOpen(false)}
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          <hr className="border-black/10" />
          <div className="flex flex-col gap-3">
            <Link
              href="/adhesion"
              onClick={() => setMenuOpen(false)}
              className="inline-flex h-10 items-center justify-center rounded-full bg-gradient-to-r from-bleu-fede to-vert-fede px-5 font-display text-sm font-bold uppercase tracking-[1.2px] text-white shadow-md shadow-black/10"
            >
              J&apos;adhère
            </Link>
            <Link
              href="/connexion"
              onClick={() => setMenuOpen(false)}
              className="inline-flex h-10 items-center justify-center rounded-full border border-bleu-confede bg-white px-5 font-display text-sm font-bold uppercase tracking-[1.2px] text-bleu-fede"
            >
              Se connecter
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
