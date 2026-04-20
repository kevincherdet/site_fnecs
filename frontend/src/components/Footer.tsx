import Image from 'next/image';
import Link from 'next/link';

const col2Links = [
  { label: 'La Fédération', href: '/federation' },
  { label: 'Actualités', href: '/actualites' },
  { label: 'Contacts', href: '/contact' },
  { label: 'Trouver mon syndicat', href: '/trouver-syndicat' },
];

const col3Links = [
  { label: 'Annuaire', href: '/annuaire' },
  { label: 'Formations', href: '/formations' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Espace presse', href: '/presse' },
];

export default function Footer() {
  return (
    // Footer — bg gris clair (neutral-lightest, cohérent avec la section Newsletter)
    <footer className="bg-neutral-lightest text-gris-fonce">
      <div className="mx-auto max-w-[1280px] px-6 py-16 sm:px-10 sm:py-20 lg:py-[80px]">
        {/* Rangée principale : 4 colonnes centrées verticalement sur desktop */}
        <div className="flex flex-col gap-12 lg:flex-row lg:items-center lg:gap-[105px]">
          {/* Colonne 1 : logo + signature + socials */}
          <div className="flex w-full flex-col gap-5 lg:w-[229px] lg:flex-none">
            <div className="relative h-[77px] w-full">
              <Image
                src="/brand/logo-fnecs-footer-dark.svg"
                alt="CFE-CGC Commerce et Services"
                fill
                sizes="229px"
                className="object-contain object-left"
              />
            </div>
            {/* Coordonnées — PDF Site - Textes : adresse, tél, email sous le logo */}
            <address className="flex flex-col gap-1 not-italic text-base leading-[1.4] text-gris-fonce">
              <span>9, rue de Rocroy</span>
              <span>75010 Paris</span>
              <a
                href="tel:+33153269990"
                className="transition-colors hover:text-bleu-fede"
              >
                Tél. 01 53 26 99 90
              </a>
              <a
                href="mailto:commerceservices@cfecgc.fr"
                className="transition-colors hover:text-bleu-fede"
              >
                commerceservices@cfecgc.fr
              </a>
            </address>
          </div>

          {/* Colonnes 2 & 3 : listes de liens sans titre */}
          <div className="flex flex-col gap-12 sm:flex-row sm:gap-[107px]">
            <nav aria-label="Liens principaux" className="flex flex-col gap-[15px]">
              {col2Links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-base leading-[1.14] text-gris-fonce transition-colors hover:text-bleu-fede"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <nav aria-label="Liens secondaires" className="flex flex-col gap-[15px]">
              {col3Links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-base leading-[1.14] text-gris-fonce transition-colors hover:text-bleu-fede"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Colonne 4 : Newsletter compacte (monochrome) + icônes RS N&B */}
          <div className="flex flex-col gap-4 lg:w-[343px] lg:flex-none">
            <div
              className="flex flex-col gap-2 rounded-[16px] bg-white p-4"
              style={{ boxShadow: '0px 1px 2px 0px rgba(0,0,0,0.05)' }}
            >
              <h3 className="font-display text-[16px] font-bold uppercase leading-[1.31] text-noir-confede">
                Newsletter
              </h3>
              <form className="flex w-full items-center gap-[5px]">
                <div className="flex h-10 flex-1 items-center rounded-[100px] bg-neutral-lightest px-[14px]">
                  <input
                    type="email"
                    placeholder="Votre email"
                    className="w-full border-0 bg-transparent text-sm text-noir-confede placeholder:text-[#c2c6d1] focus:outline-none"
                  />
                </div>
                <button
                  type="submit"
                  aria-label="S'inscrire à la newsletter"
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-noir-confede text-white transition-opacity hover:opacity-80"
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
                    <path d="M7 7h10v10" />
                    <path d="M7 17 17 7" />
                  </svg>
                </button>
              </form>
            </div>

            {/* Icônes RS — N&B */}
            <div className="flex items-center gap-3">
              <a
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn FNECS"
                className="text-noir-confede transition-opacity hover:opacity-70"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden
                  className="h-6 w-6"
                >
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93zM6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37z" />
                </svg>
              </a>
              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook FNECS"
                className="text-noir-confede transition-opacity hover:opacity-70"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden
                  className="h-6 w-6"
                >
                  <path d="M12 2.04c-5.5 0-10 4.49-10 10.02c0 5 3.66 9.15 8.44 9.9v-7H7.9v-2.9h2.54V9.85c0-2.51 1.49-3.89 3.78-3.89c1.09 0 2.23.19 2.23.19v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.9h-2.33v7a10 10 0 0 0 8.44-9.9c0-5.53-4.5-10.02-10-10.02" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Divider gris foncé 15% */}
        <div className="mt-12 h-px w-full bg-gris-fonce/15 lg:mt-[60px]" />

        {/* Liens légaux + copyright centrés — PDF Site - Textes */}
        <p className="mt-6 text-center text-base leading-[1.4] text-gris-fonce lg:mt-[21px]">
          <Link
            href="/mentions-legales"
            className="transition-colors hover:text-bleu-fede"
          >
            Mentions légales
          </Link>
          <span aria-hidden> – </span>
          <Link
            href="/politique-confidentialite"
            className="transition-colors hover:text-bleu-fede"
          >
            Politique de confidentialité
          </Link>
        </p>
        <p className="mt-2 text-center text-base leading-[1.4] text-gris-fonce">
          © Fédération Nationale de l&apos;Encadrement du Commerce et des Services
          CFE-CGC {new Date().getFullYear()} · Site réalisé par La Faabrick Cherdet
        </p>
      </div>
    </footer>
  );
}
