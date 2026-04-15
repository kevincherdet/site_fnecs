import Image from 'next/image';
import Link from 'next/link';

const informationLinks = [
  { label: 'La Fédération', href: '/federation' },
  { label: 'Notre mission', href: '/federation#mission' },
  { label: 'Adhérer', href: '/adhesion' },
  { label: 'Contact', href: '/contact' },
  { label: 'Mentions légales', href: '/mentions-legales' },
  { label: 'Politique de confidentialité', href: '/politique-confidentialite' },
];

const syndicatLinks = [
  { label: 'Trouver mon syndicat', href: '/trouver-syndicat' },
  { label: 'Annuaire', href: '/annuaire' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Espace presse', href: '/presse' },
  { label: 'Application mobile', href: '/app' },
];

export default function Footer() {
  return (
    // Footer — Figma nœud 1:631 (Footer 1 Lift blue) — bg gris foncé, 4 colonnes
    <footer className="bg-gris-fonce text-white">
      <div className="mx-auto max-w-[1280px] px-6 py-16 sm:px-10 sm:py-20 lg:py-[80px]">
        {/* Rangée principale : 4 colonnes (logo / Information / Syndicat / Newsletter) */}
        <div className="flex flex-col gap-12 lg:flex-row lg:gap-[105px]">
          {/* Colonne 1 : logo + signature + socials */}
          <div className="flex w-full flex-col gap-5 lg:w-[229px] lg:flex-none">
            <div className="relative h-[77px] w-full">
              <Image
                src="/brand/logo-fnecs-footer.svg"
                alt="FNECS CFE-CGC Commerce et Services"
                fill
                sizes="229px"
                className="object-contain object-left"
              />
            </div>
            {/* H3 signature — dégradé vertical bleu→vert (bg-clip-text) — exact Figma */}
            <p
              className="font-display text-[24px] font-bold uppercase leading-[1.15] lg:text-[30px]"
              style={{
                background: 'linear-gradient(to bottom, #154fe5 0%, #008c35 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                color: 'transparent',
              }}
            >
              Fédération de l&apos;encadrement du Commerce et des Services
            </p>
            {/* Social icons LinkedIn + Facebook — ronds blanc/10, 35×35 */}
            <div className="flex items-center gap-3">
              <a
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn FNECS"
                className="flex h-[35px] w-[35px] items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden
                  className="h-4 w-4"
                >
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93zM6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37z" />
                </svg>
              </a>
              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook FNECS"
                className="flex h-[35px] w-[35px] items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden
                  className="h-4 w-4"
                >
                  <path d="M12 2.04c-5.5 0-10 4.49-10 10.02c0 5 3.66 9.15 8.44 9.9v-7H7.9v-2.9h2.54V9.85c0-2.51 1.49-3.89 3.78-3.89c1.09 0 2.23.19 2.23.19v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.9h-2.33v7a10 10 0 0 0 8.44-9.9c0-5.53-4.5-10.02-10-10.02" />
                </svg>
              </a>
            </div>
          </div>

          {/* Colonnes 2 & 3 : Information + Syndicat */}
          <div className="flex flex-col gap-12 sm:flex-row sm:gap-[107px]">
            {/* Colonne 2 : Information */}
            <nav aria-label="Informations" className="flex flex-col gap-[15px]">
              <h3 className="font-display text-[18px] font-bold uppercase leading-[1.31]">
                Information
              </h3>
              {informationLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-base leading-[1.14] text-white opacity-75 transition-opacity hover:opacity-100"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Colonne 3 : Syndicat */}
            <nav aria-label="Syndicat" className="flex flex-col gap-[15px]">
              <h3 className="font-display text-[18px] font-bold uppercase leading-[1.31]">
                Syndicat
              </h3>
              {syndicatLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-base leading-[1.14] text-white opacity-75 transition-opacity hover:opacity-100"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Colonne 4 : Newsletter (carte blanc/33, rounded-[20], p-[24]) */}
          <div className="flex flex-col gap-[10px] rounded-[20px] bg-white/[0.33] p-6 lg:w-[343px] lg:flex-none">
            <h3 className="font-display text-[18px] font-bold uppercase leading-[1.31] text-white">
              Newsletter
            </h3>
            <form className="flex w-full items-center gap-[5px]">
              <div
                className="flex h-12 flex-1 items-center rounded-[100px] bg-white px-[18px]"
                style={{ boxShadow: '0px 1px 2px 0px rgba(0,0,0,0.05)' }}
              >
                <input
                  type="email"
                  placeholder="Votre email"
                  className="w-full border-0 bg-transparent text-base text-noir-confede placeholder:text-[#c2c6d1] focus:outline-none"
                />
              </div>
              <button
                type="submit"
                aria-label="S'inscrire à la newsletter"
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-[#154fe5] to-vert-fede text-white transition-[filter] hover:brightness-105"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                  className="h-6 w-6"
                >
                  <path d="M7 7h10v10" />
                  <path d="M7 17 17 7" />
                </svg>
              </button>
            </form>
          </div>
        </div>

        {/* Divider blanc opacity-20 */}
        <div className="mt-12 h-px w-full bg-white/20 lg:mt-[60px]" />

        {/* Copyright centré */}
        <p className="mt-6 text-center text-base leading-[1.14] text-white lg:mt-[21px]">
          © Fédération Nationale de l&apos;Encadrement du Commerce et des Services
          CFE-CGC {new Date().getFullYear()} · Site réalisé par La Faabrick Cherdet
        </p>
      </div>
    </footer>
  );
}
