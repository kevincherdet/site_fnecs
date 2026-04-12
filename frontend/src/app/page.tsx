import Image from 'next/image';
import Link from 'next/link';
import { fetchStrapi, strapiMedia } from '@/lib/strapi';

const piliers = [
  {
    titre: 'Conseil',
    description: 'Avancer avec des réponses claires.',
  },
  {
    titre: 'Juridique',
    description: 'Comprendre, sécuriser, agir.',
  },
  {
    titre: 'Formations',
    description: 'Développer vos compétences.',
  },
  {
    titre: 'Soutien',
    description: 'Être accompagné, simplement.',
  },
];

const valeurs = [
  { titre: 'Humaine', description: '' },
  { titre: 'Constructive', description: '' },
  { titre: 'Engagée', description: '' },
];

interface StrapiPartenaire {
  id: number;
  documentId: string;
  nom: string;
  lien: string | null;
  ordre: number | null;
  logo: { url: string } | null;
}

async function getPartenaires(): Promise<StrapiPartenaire[]> {
  try {
    const res = await fetchStrapi<StrapiPartenaire[]>('/partenaires', {
      'populate': 'logo',
      'sort': 'ordre:asc',
      'pagination[pageSize]': '50',
    });
    return res.data;
  } catch {
    return [];
  }
}

export default async function Home() {
  const partenaires = await getPartenaires();
  return (
    <>
      {/* Hero */}
      <section className="relative bg-fnecs-blue text-white overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-36">
          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
              Accompagner, soutenir et faire progresser la place de l&apos;encadrement dans l&apos;entreprise
            </h1>
            <div className="mt-8">
              <Link
                href="/trouver-syndicat"
                className="rounded-full bg-fnecs-accent px-8 py-3 text-base font-semibold text-fnecs-blue hover:bg-yellow-400 transition-colors"
              >
                Trouver mon syndicat
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Actualité à la une (carrousel placeholder) */}
      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-fnecs-blue">Actualité à la une</h2>
          <div className="mt-8 relative">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="rounded-xl bg-white shadow-sm border border-gray-100 overflow-hidden">
                  <div className="h-44 bg-gray-200 flex items-center justify-center text-gray-400">
                    Image article
                  </div>
                  <div className="p-5">
                    <span className="inline-block text-xs font-medium text-fnecs-blue bg-blue-50 px-2 py-1 rounded">
                      Brève
                    </span>
                    <h3 className="mt-3 font-semibold text-gray-900">La dernière actualité</h3>
                    <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                      Carrousel des 3 dernières actus. Les contenus seront gérés depuis Strapi.
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-8 text-center">
            <Link
              href="/actualites"
              className="inline-block rounded-full border-2 border-fnecs-blue px-6 py-2.5 text-sm font-semibold text-fnecs-blue hover:bg-fnecs-blue hover:text-white transition-colors"
            >
              Toute l&apos;actualité
            </Link>
          </div>
        </div>
      </section>

      {/* Accompagnement — Comment nous vous accompagnons */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-fnecs-blue">Comment nous vous accompagnons</h2>
          </div>
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {piliers.map((pilier) => (
              <div
                key={pilier.titre}
                className="rounded-xl bg-white border border-gray-100 shadow-sm p-6 text-center hover:shadow-md transition-shadow"
              >
                <h3 className="text-lg font-bold text-fnecs-blue uppercase tracking-wide">{pilier.titre}</h3>
                <p className="mt-3 text-sm text-gray-600">{pilier.description}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link
              href="/federation#role"
              className="inline-block rounded-full border-2 border-fnecs-blue px-6 py-2.5 text-sm font-semibold text-fnecs-blue hover:bg-fnecs-blue hover:text-white transition-colors"
            >
              En savoir plus
            </Link>
          </div>
        </div>
      </section>

      {/* Nos valeurs */}
      <section className="py-16 bg-fnecs-blue text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold">Nos valeurs</h2>
          </div>
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6">
            {valeurs.map((valeur) => (
              <div key={valeur.titre} className="rounded-xl bg-white/10 p-8 text-center">
                <h3 className="text-xl font-bold uppercase tracking-wide">{valeur.titre}</h3>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link
              href="/federation#valeurs"
              className="inline-block rounded-full border-2 border-white/30 px-6 py-2.5 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
            >
              En savoir plus
            </Link>
          </div>
        </div>
      </section>

      {/* CTA — Notre force, c'est le terrain */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-gradient-to-r from-fnecs-blue to-fnecs-blue-light p-10 sm:p-14 text-center text-white">
            <p className="text-xl sm:text-2xl font-medium leading-relaxed max-w-3xl mx-auto">
              Notre force, c&apos;est le terrain : des femmes et des hommes engagés,
              qui comprennent vos réalités parce qu&apos;ils les vivent aussi.
            </p>
            <div className="mt-8">
              <Link
                href="/adhesion"
                className="rounded-full bg-fnecs-accent px-8 py-3 text-base font-semibold text-fnecs-blue hover:bg-yellow-400 transition-colors"
              >
                J&apos;adhère
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Témoignages (placeholder — en attente de Témoignages.docx) */}
      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-fnecs-blue">Témoignages</h2>
          </div>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { citation: 'La FNECS m\'a accompagné dans mes fonctions d\'élu CSE avec un soutien juridique de qualité.', nom: 'Adhérent FNECS', fonction: 'Élu CSE, Commerce de gros' },
              { citation: 'Grâce aux formations proposées, j\'ai pu monter en compétences sur les sujets économiques.', nom: 'Adhérent FNECS', fonction: 'Délégué syndical, Tourisme' },
              { citation: 'Un réseau solide et des interlocuteurs toujours disponibles. Je recommande.', nom: 'Adhérent FNECS', fonction: 'Secrétaire CSE, Habillement' },
            ].map((t, i) => (
              <blockquote key={i} className="rounded-xl bg-white shadow-sm border border-gray-100 p-6">
                <p className="text-gray-700 italic">&ldquo;{t.citation}&rdquo;</p>
                <footer className="mt-4">
                  <p className="font-semibold text-sm text-gray-900">{t.nom}</p>
                  <p className="text-xs text-gray-500">{t.fonction}</p>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* App + Infolettre (section combinée) */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* App */}
            <div className="rounded-2xl bg-gray-50 border border-gray-100 p-8 sm:p-10 flex flex-col justify-between">
              <div>
                <h2 className="text-xl font-bold text-fnecs-blue">L&apos;app CFE-CGC CS</h2>
                <p className="mt-2 text-lg font-medium text-gray-900">Téléchargez l&apos;application mobile</p>
                <p className="mt-4 text-sm text-gray-600 leading-relaxed">
                  Accédez à vos informations, vos documents et vos outils, à tout moment.
                </p>
              </div>
              <div className="mt-6">
                <button className="rounded-full bg-fnecs-blue px-6 py-3 text-sm font-semibold text-white hover:bg-fnecs-blue-dark transition-colors">
                  Télécharger
                </button>
              </div>
            </div>

            {/* Infolettre */}
            <div className="rounded-2xl bg-fnecs-blue text-white p-8 sm:p-10 flex flex-col justify-between">
              <div>
                <h2 className="text-xl font-bold">Infolettre</h2>
                <p className="mt-4 text-sm text-blue-100 leading-relaxed">
                  Actualités, décryptages, ressources : l&apos;essentiel pour rester informé.
                </p>
              </div>
              <form className="mt-6 flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Votre adresse email"
                  className="flex-1 rounded-full px-5 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-fnecs-accent"
                />
                <button
                  type="submit"
                  className="rounded-full bg-fnecs-accent px-6 py-3 text-sm font-semibold text-fnecs-blue hover:bg-yellow-400 transition-colors whitespace-nowrap"
                >
                  Je m&apos;inscris
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Partenaires */}
      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-fnecs-blue">Nos partenaires</h2>
          </div>
          <div className="mt-10 flex flex-wrap justify-center items-center gap-8 sm:gap-12">
            {partenaires.map((p) => {
              const logoUrl = p.logo ? strapiMedia(p.logo.url) : null;
              if (!logoUrl) return null;

              const wrapper = (children: React.ReactNode) =>
                p.lien ? (
                  <a
                    key={p.documentId}
                    href={p.lien}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="grayscale hover:grayscale-0 transition-all opacity-70 hover:opacity-100"
                    title={p.nom}
                  >
                    {children}
                  </a>
                ) : (
                  <div key={p.documentId} className="grayscale opacity-70" title={p.nom}>
                    {children}
                  </div>
                );

              return wrapper(
                <Image
                  src={logoUrl}
                  alt={`Logo ${p.nom}`}
                  width={120}
                  height={48}
                  className="h-12 w-auto object-contain"
                  unoptimized
                />
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
