import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-fnecs-blue text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <p className="text-lg font-bold">FNECS CFE-CGC</p>
            <p className="mt-2 text-sm text-blue-200">
              Fédération Nationale de l&apos;Encadrement du Commerce et des Services
            </p>
            <div className="mt-4 text-sm text-blue-200 space-y-1">
              <p>9, rue de Rocroy — 75010 Paris</p>
              <p>Tél. 01 53 26 99 90</p>
            </div>
          </div>

          {/* Col 1 */}
          <div>
            <ul className="space-y-2 text-sm">
              <li><Link href="/federation" className="text-blue-100 hover:text-white">La Fédération</Link></li>
              <li><Link href="/federation#mission" className="text-blue-100 hover:text-white">Notre mission</Link></li>
              <li><Link href="/actualites" className="text-blue-100 hover:text-white">Actualités</Link></li>
              <li><Link href="/trouver-syndicat" className="text-blue-100 hover:text-white">Trouver mon syndicat</Link></li>
              <li><Link href="/faq" className="text-blue-100 hover:text-white">FAQ</Link></li>
            </ul>
          </div>

          {/* Col 2 */}
          <div>
            <ul className="space-y-2 text-sm">
              <li><Link href="/adhesion" className="text-blue-100 hover:text-white">Adhérer</Link></li>
              <li><Link href="/contact" className="text-blue-100 hover:text-white">Contact</Link></li>
              <li><Link href="/presse" className="text-blue-100 hover:text-white">Espace presse</Link></li>
              <li><Link href="/app" className="text-blue-100 hover:text-white">Application mobile</Link></li>
            </ul>
          </div>

          {/* Col 3 — Infolettre + RS */}
          <div>
            <p className="text-sm font-semibold">Infolettre</p>
            <form className="mt-2 flex gap-2">
              <input
                type="email"
                placeholder="Email"
                className="flex-1 rounded-full px-4 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-fnecs-accent"
              />
              <button
                type="submit"
                className="rounded-full bg-fnecs-accent px-4 py-2 text-sm font-semibold text-fnecs-blue hover:bg-yellow-400 transition-colors"
              >
                OK
              </button>
            </form>
            <p className="mt-4 text-sm font-semibold">Suivez-nous</p>
            <div className="mt-2 flex gap-3">
              <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-xs">Li</span>
              <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-xs">X</span>
              <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-xs">Fb</span>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-blue-400/30 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-blue-200">
            &copy; Fédération Nationale de l&apos;Encadrement du Commerce et des Services CFE-CGC {new Date().getFullYear()}
            {' — '}Site réalisé par <span className="text-blue-100">La Faabrick Cherdet</span>
          </p>
          <div className="flex gap-4 text-xs text-blue-200">
            <Link href="/mentions-legales" className="hover:text-white">Mentions légales</Link>
            <Link href="/politique-confidentialite" className="hover:text-white">Politique de confidentialité</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
