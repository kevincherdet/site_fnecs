import Image from 'next/image';
import Link from 'next/link';

// Partenaires hardcodés (logos téléchargés depuis Strapi local vers public/home/partenaires/).
// Quand Strapi sera déployé en prod (Scaleway), rebasculer sur fetchStrapi + orderPartenaires().
// Ordre validé par Kevin.
const PARTENAIRES = [
  { nom: 'Klesia', lien: 'https://www.klesia.fr/', logo: '/home/partenaires/klesia.svg' },
  { nom: 'AG2R La Mondiale', lien: 'https://www.ag2rlamondiale.fr/', logo: '/home/partenaires/ag2r.svg' },
  { nom: 'Malakoff Humanis', lien: 'https://www.malakoffhumanis.com/', logo: '/home/partenaires/malakoff-humanis.png' },
  { nom: 'Apicil', lien: 'https://mon.apicil.com/', logo: '/home/partenaires/apicil.png' },
  { nom: 'Uni Prévoyance', lien: 'https://www.uniprevoyance.fr/', logo: '/home/partenaires/uniprevoyance.png' },
  { nom: 'Groupe VYV', lien: 'https://www.groupe-vyv.fr/', logo: '/home/partenaires/vyv.svg' },
  { nom: 'OCIRP', lien: 'https://www.ocirp.fr/', logo: '/home/partenaires/ocirp.svg' },
  { nom: 'Aésio', lien: 'https://www.aesio.fr/', logo: '/home/partenaires/aesio.svg' },
  { nom: 'La Mutuelle Générale', lien: 'https://www.lamutuellegenerale.fr/', logo: '/home/partenaires/mutuelle-generale.svg' },
  { nom: 'Macif', lien: 'https://www.macif.fr/', logo: '/home/partenaires/macif.svg' },
  { nom: 'Up Coop', lien: 'https://up.coop/pourquoi-choisir-upcoop/', logo: '/home/partenaires/upcoop.svg' },
  { nom: 'Sextant Expertise', lien: 'https://www.sextant-expertise.fr/', logo: '/home/partenaires/sextant.png' },
  { nom: 'Secafi', lien: 'https://www.secafi.com/evenements-et-ressources/traits-dunion/', logo: '/home/partenaires/secafi.png' },
] as const;

export default function Home() {
  const partenaires = PARTENAIRES;
  return (
    <>
      {/* Hero — proposition Untitled-1.ai : H1 centré + bande photo duotone bleu + 4 cartes overlap */}
      <section aria-labelledby="hero-title" className="relative bg-white">
        {/* H1 centré sur fond blanc */}
        <div className="mx-auto flex max-w-[1280px] flex-col items-center px-6 py-6 text-center sm:px-10 sm:py-8 lg:py-10">
          <h1
            id="hero-title"
            className="inline-block bg-gradient-to-r from-[#154fe5] from-[40%] to-[#008440] to-[60%] bg-clip-text font-display text-[30px] font-bold uppercase leading-[1.1] text-transparent sm:text-[36px] lg:text-[42px]"
          >
            Accompagner, soutenir et faire progresser
          </h1>
          <p className="mt-2 inline-block bg-gradient-to-r from-[#154fe5] from-[40%] to-[#008440] to-[60%] bg-clip-text font-sans text-[18px] font-bold leading-[1.2] text-transparent sm:text-[22px] lg:text-[26px]">
            la place de l&apos;encadrement dans l&apos;entreprise
          </p>
        </div>

        {/* Bande photo pleine largeur avec duotone bleu */}
        <div className="relative">
          <div className="relative h-[320px] sm:h-[400px] lg:h-[460px]">
            <Image
              src="/home/hero/photo-band.jpg"
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover"
              style={{ objectPosition: '50% 40%' }}
            />
            {/* Teinte bleue légère en multiply — préserve les couleurs de la photo */}
            <div
              aria-hidden
              className="absolute inset-0 bg-bleu-fede mix-blend-multiply"
              style={{ opacity: 0.22 }}
            />

            {/* Texte overlay positionné bas (laisse respirer les visages de la photo) */}
            <div className="relative z-10 flex h-full items-end justify-center px-6 pb-16 text-center sm:pb-20 lg:pb-28">
              <div>
                <p className="font-display text-[24px] font-bold uppercase leading-[1.15] text-white sm:text-[30px] lg:text-[38px]">
                  Votre quotidien est le nôtre
                </p>
                <p className="mt-2 font-display text-[16px] italic leading-[1.4] text-white sm:text-[18px] lg:text-[20px]">
                  Parce que nous vivons les mêmes réalités que vous
                </p>
              </div>
            </div>
          </div>

          {/* 4 cartes — stacked sur mobile sous la photo, chevauchement sur desktop */}
          <div className="relative z-20 mx-auto max-w-[1280px] px-6 pb-12 sm:px-10 lg:-mt-16 lg:pb-20">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-3">
              {[
                {
                  icon: '/home/hero/icon-conseil.svg',
                  title: "J'ai besoin d'un conseil",
                  tag: 'Avancer avec des réponses claires',
                },
                {
                  icon: '/home/hero/icon-juridique.svg',
                  title: 'Je recherche une aide juridique',
                  tag: 'Comprendre, sécuriser, agir',
                },
                {
                  icon: '/home/hero/icon-formation.svg',
                  title: 'Je veux me former',
                  tag: 'Développer vos compétences',
                },
                {
                  icon: '/home/hero/icon-soutien.svg',
                  title: "J'ai besoin de soutien",
                  tag: 'Être accompagné, simplement',
                },
              ].map((c) => (
                <Link
                  key={c.title}
                  href="/contact"
                  className="flex flex-col items-center gap-3 rounded-[20px] bg-white px-4 py-6 text-center transition-transform hover:-translate-y-1"
                  style={{
                    boxShadow:
                      '0px 20px 25px -5px rgba(0,0,0,0.1), 0px 8px 10px -6px rgba(0,0,0,0.1)',
                  }}
                >
                  <Image
                    src={c.icon}
                    alt=""
                    width={64}
                    height={64}
                    className="h-14 w-auto"
                    unoptimized
                  />
                  <h2 className="font-display text-[18px] font-bold uppercase leading-[1.2] tracking-[0.5px] text-bleu-fede lg:text-[20px]">
                    {c.title}
                  </h2>
                  <p className="text-base leading-[1.3] text-gris-fonce">
                    {c.tag}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Actualités — Figma nœud 1:317 (Blog / 34 /) — positionné après le hero */}
      {/* Fond : récupéré du layout 1 Figma (Accompagnement) — dégradé bleu clair très pâle → blanc */}
      <section
        aria-labelledby="actualites-title"
        className="bg-[#f9f9f9]"
      >
        {/* Container 1:318 : même pattern que le hero (max-w-[1280px] + px-10 => contenu 1200 à partir de 1280px) */}
        {/* Padding vertical Figma desktop : 80. Fallback mobile réduit. */}
        <div className="mx-auto flex max-w-[1280px] flex-col gap-[40px] px-6 py-16 sm:px-10 sm:py-20 lg:py-[80px]">
          {/* Section title 1:319 + bouton "Voir tout" 1:330 */}
          <div className="flex flex-col items-start gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-col items-start gap-[10px]">
              {/* Badge Média 1:322 — bleu-confede/10 px-3 py-1 rounded-full gap-2 */}
              <div className="inline-flex items-center gap-2 rounded-full bg-bleu-confede/10 px-3 py-1">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                  className="h-[9px] w-[9px] shrink-0 text-bleu-fede"
                >
                  <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2" />
                  <path d="M18 14h-8" />
                  <path d="M15 18h-5" />
                  <path d="M10 6h8v4h-8V6Z" />
                </svg>
                <span className="font-display text-xs font-bold uppercase leading-4 tracking-[1.2px] text-bleu-fede">
                  Média
                </span>
              </div>
              {/* H2 1:328 — dégradé bleu→vert comme Témoignages (signature visuelle) */}
              {/* leading-[1.1] pour laisser respirer la descendante du "g" avec bg-clip-text */}
              <h2
                id="actualites-title"
                className="inline-block bg-gradient-to-r from-[#154fe5] from-[40%] to-[#008440] to-[60%] bg-clip-text font-display text-[24px] font-bold leading-[1.1] text-transparent sm:text-[30px] lg:text-[38px]"
              >
                Actualités
              </h2>
              {/* Sous-titre 1:329 — Calibri Regular 16, leading-[1.14], #42474f */}
              <p className="text-base leading-[1.14] text-gris-fonce">
                Toute l&apos;information syndicale
              </p>
            </div>

            {/* "Voir tout le fil d'info" 1:330 — Barlow Bold 14, #E34E36 (rouge confédé), + arrow-up-right 24px */}
            <Link
              href="/actualites"
              className="inline-flex items-center gap-2 font-display text-base font-bold leading-[1.5] text-vert-fede transition-opacity hover:opacity-80"
            >
              <span>Voir tout le fil d&apos;info</span>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
                className="h-6 w-6 shrink-0"
              >
                <path d="M7 7h10v10" />
                <path d="M7 17 17 7" />
              </svg>
            </Link>
          </div>

          {/* Row 1 : vedette (786×362) + side card (394×222, alignée en haut) — 1:334, gap-[20px] */}
          <div className="flex flex-col items-stretch gap-[20px] lg:flex-row lg:items-start lg:justify-center">
            {/* Featured card 1:335 — image de fond + gradient navy bas→haut + contenu */}
            <article className="relative flex min-h-[400px] flex-col justify-end overflow-hidden rounded-[20px] px-[34px] pb-[34px] pt-[120px] sm:min-h-[362px] lg:w-[786px] lg:flex-none lg:pt-[200px]">
              <Image
                src="/home/actualites/featured-strasbourg.jpg"
                alt=""
                fill
                sizes="(max-width: 1024px) 100vw, 786px"
                className="object-cover"
              />
              {/* Gradient overlay 1:336 — bottom→top : rgba(0,43,80,0.9) → transparent */}
              <div
                aria-hidden
                className="absolute inset-0 rounded-[20px]"
                style={{
                  background:
                    'linear-gradient(to top, rgba(0,43,80,0.9) 0%, rgba(0,43,80,0) 100%)',
                }}
              />
              {/* Contenu au-dessus du gradient, gap-[10px] */}
              <div className="relative flex flex-col gap-[10px]">
                <div className="flex items-center">
                  <span className="inline-flex items-center rounded-[100px] bg-neutral-lightest px-2 py-1 font-display text-xs font-bold uppercase leading-4 tracking-[1.2px] text-black">
                    Salaires &amp; égalité
                  </span>
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="font-display text-[28px] font-bold uppercase leading-[1.15] text-white lg:text-[30px]">
                    Transparence salariale : 16 % d&apos;écart H/F pour les cadres
                  </h3>
                  <p className="text-base leading-[1.14] text-white">
                    Publication annuelle des écarts et fourchettes salariales
                    obligatoires dans les offres : la directive européenne
                    transposée d&apos;ici juin 2026 redéfinit les règles pour les
                    cadres du commerce et des services.
                  </p>
                </div>
              </div>
            </article>

            {/* Side card 1:342 — contenu actualisé : formation Ouverture sur le Syndicalisme */}
            <article
              className="flex flex-1 flex-col gap-4 rounded-[20px] bg-white p-6"
              style={{ boxShadow: '0px 1px 2px 0px rgba(0,0,0,0.05)' }}
            >
              <span className="inline-flex w-fit items-center rounded-[100px] bg-neutral-lightest px-2 py-1 font-display text-xs font-bold uppercase leading-4 tracking-[1.2px] text-black">
                Formation
              </span>
              <h3 className="font-display text-[18px] font-bold uppercase leading-[1.31] lg:text-[20px] text-bleu-fede">
                Ouverture sur le syndicalisme
              </h3>
              <p className="font-display text-sm font-bold uppercase tracking-[1.2px] text-vert-fede">
                2 &amp; 3 février 2026
              </p>
              <p className="text-base leading-[1.14] text-gris-fonce">
                Porte d&apos;entrée du cursus CFS. Présentation de la CFE-CGC et
                bases du syndicalisme.
              </p>
              <Link
                href="/formations"
                className="mt-auto inline-flex items-center gap-2 text-sm leading-[1.5] text-bleu-confede transition-opacity hover:opacity-80"
              >
                <span>S&apos;inscrire</span>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                  className="h-6 w-6 shrink-0"
                >
                  <path d="M7 7h10v10" />
                  <path d="M7 17 17 7" />
                </svg>
              </Link>
            </article>
          </div>

          {/* Row 2 : 3 cartes — 1:356, gap-[40px] */}
          <div className="flex flex-col gap-6 lg:flex-row lg:gap-[40px]">
            {/* Card 1 : Rupture conventionnelle 2026 — blanche, bordure gauche 4px #154fe5 */}
            <article
              className="flex flex-1 flex-col gap-4 rounded-[20px] border-l-4 border-transparent p-6 [background:linear-gradient(#fff,#fff)_padding-box,linear-gradient(to_bottom,#154fe5,#008440)_border-box]"
              style={{ boxShadow: '0px 1px 2px 0px rgba(0,0,0,0.05)' }}
            >
              <span className="inline-flex w-fit items-center rounded-[100px] bg-neutral-lightest px-2 py-1 font-display text-xs font-bold uppercase leading-4 tracking-[1.2px] text-black">
                Droit social
              </span>
              <h3 className="font-display text-[18px] font-bold uppercase leading-[1.31] lg:text-[20px] text-bleu-fede">
                Rupture conventionnelle : durcissement en 2026
              </h3>
              <p className="text-base leading-[1.14] text-gris-fonce">
                Contribution employeur portée à 40 %, durée d&apos;indemnisation
                chômage ramenée à 15 mois : les nouvelles règles applicables
                depuis janvier.
              </p>
              <a
                href="https://www.cci.fr/actualites/durcissement-de-la-rupture-conventionnelle-ce-qui-attend-les-entreprises-en-2026"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto inline-flex items-center gap-2 text-sm leading-[1.5] text-bleu-confede transition-opacity hover:opacity-80"
              >
                <span>Lire la suite</span>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                  className="h-6 w-6 shrink-0"
                >
                  <path d="M7 7h10v10" />
                  <path d="M7 17 17 7" />
                </svg>
              </a>
            </article>

            {/* Card 2 : 1er mai intersyndical — fond bleu fédé plein */}
            <article
              className="flex flex-1 flex-col gap-4 rounded-[20px] bg-bleu-fede p-6"
              style={{ boxShadow: '0px 1px 2px 0px rgba(0,0,0,0.05)' }}
            >
              <span className="inline-flex w-fit items-center rounded-[100px] bg-neutral-lightest px-2 py-1 font-display text-xs font-bold uppercase leading-4 tracking-[1.2px] text-black">
                Intersyndical
              </span>
              <h3 className="font-display text-[18px] font-bold uppercase leading-[1.31] lg:text-[20px] text-white">
                1er mai : courrier au Premier ministre
              </h3>
              <p className="text-base leading-[1.14] text-white">
                Huit organisations syndicales, dont la CFE-CGC, dénoncent la
                proposition de loi autorisant le travail le 1ᵉʳ mai et demandent
                le retrait du projet de décret.
              </p>
              <a
                href="https://www.cfecgc.org/actualites/1er-mai-courrier-intersyndical-au-premier-ministre"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto inline-flex items-center gap-2 text-sm leading-[1.5] text-white transition-opacity hover:opacity-80"
              >
                <span>Lire la suite</span>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                  className="h-6 w-6 shrink-0"
                >
                  <path d="M7 7h10v10" />
                  <path d="M7 17 17 7" />
                </svg>
              </a>
            </article>

            {/* Card 3 : Tourisme social et familial — nouvelle grille 2026 */}
            <article
              className="flex flex-1 flex-col gap-4 rounded-[20px] border-l-4 border-transparent p-6 [background:linear-gradient(#fff,#fff)_padding-box,linear-gradient(to_bottom,#154fe5,#008440)_border-box]"
              style={{ boxShadow: '0px 1px 2px 0px rgba(0,0,0,0.05)' }}
            >
              <span className="inline-flex w-fit items-center rounded-[100px] bg-neutral-lightest px-2 py-1 font-display text-xs font-bold uppercase leading-4 tracking-[1.2px] text-black">
                Convention collective
              </span>
              <h3 className="font-display text-[18px] font-bold uppercase leading-[1.31] lg:text-[20px] text-bleu-fede">
                Tourisme social et familial : grille 2026 revalorisée
              </h3>
              <p className="text-base leading-[1.14] text-gris-fonce">
                Hausse moyenne de 2,30 % sur l&apos;ensemble de la grille depuis
                janvier, seconde revalorisation programmée au 1ᵉʳ mai : les
                nouveaux minima de la branche.
              </p>
              <a
                href="https://www.juristique.org/conventionnel/salaires-tourisme-social-familial-2026"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto inline-flex items-center gap-2 text-sm leading-[1.5] text-bleu-confede transition-opacity hover:opacity-80"
              >
                <span>Lire la suite</span>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                  className="h-6 w-6 shrink-0"
                >
                  <path d="M7 7h10v10" />
                  <path d="M7 17 17 7" />
                </svg>
              </a>
            </article>
          </div>
        </div>
      </section>

      {/* Nos valeurs — Figma nœud 1:400 (Layout / 238 /) */}
      {/* Structure particulière : le titre "Nos valeurs" est DANS la colonne centrale, au-dessus de la carte Engagée. */}
      {/* items-start sur la row => Constructive/Humaine restent en haut, Engagée est visuellement plus bas (décalée par le titre). */}
      {/* Fond blanc fidèle à la maquette. On ajuste ici uniquement le fond. */}
      <section
        aria-labelledby="valeurs-title"
        className="bg-white"
      >
        <div className="mx-auto max-w-[1280px] px-6 py-16 sm:px-10 sm:py-20 lg:py-[80px]">
          {/* Row 1:402 : flex gap-[48], items-start, justify-center */}
          <div className="flex flex-col items-stretch gap-12 lg:flex-row lg:items-start lg:justify-center lg:gap-[48px]">
            {/* Valeur 1 : Constructive (Figma 1:403) — w-[384], illus 133×175 */}
            <div className="flex flex-col items-center gap-[10px] p-6 lg:flex-1 lg:max-w-[384px]">
              <Image
                src="/home/valeurs/constructive.svg"
                alt=""
                width={133}
                height={175}
                className="h-[175px] w-auto"
                unoptimized
              />
              {/* Label gradient bleu→vert fédé */}
              <div className="flex items-center justify-center bg-gradient-to-r from-[#154fe5] to-[#008440] px-3 py-1">
                <p className="font-display text-[18px] font-bold uppercase leading-[1.31] lg:text-[20px] text-white">
                  Constructive
                </p>
              </div>
              <p className="w-full text-center text-base leading-[1.5] text-gris-fonce">
                Trouver des solutions concrètes pour avancer, en privilégiant le
                dialogue
              </p>
            </div>

            {/* Valeur 2 : colonne centrale — Badge + Titre "Nos valeurs" + Carte Engagée */}
            <div className="flex flex-col items-center gap-[10px] lg:flex-1 lg:max-w-[384px]">
              {/* Badge FNECS 1:410 avec picto streamline HR 16×16 */}
              <div className="inline-flex items-center gap-2 rounded-full bg-bleu-confede/10 px-3 py-1">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                  className="h-4 w-4 shrink-0 text-bleu-fede"
                >
                  <path d="M9.749 9.75a2.25 2.25 0 1 0 4.499 0a2.25 2.25 0 0 0-4.499 0m6 6a4.05 4.05 0 0 0-3.75-3a4.05 4.05 0 0 0-3.75 3m1.875-13.125a1.875 1.875 0 1 0 3.75 0a1.875 1.875 0 0 0-3.75 0M19.499 12a1.875 1.875 0 1 0 3.75 0a1.875 1.875 0 0 0-3.75 0m-9.375 9.375a1.875 1.875 0 1 0 3.75 0a1.875 1.875 0 0 0-3.75 0M.749 12a1.875 1.875 0 1 0 3.75 0a1.875 1.875 0 0 0-3.75 0M16.5 4.2a9.04 9.04 0 0 1 3.3 3.3m0 9a9.04 9.04 0 0 1-3.3 3.3m-9 0a9.04 9.04 0 0 1-3.3-3.3m0-9a9.04 9.04 0 0 1 3.3-3.3" />
                </svg>
                <span className="font-display text-xs font-bold uppercase leading-4 tracking-[1.2px] text-bleu-fede">
                  FNECS
                </span>
              </div>
              {/* H2 "Nos valeurs" 1:415 — 46px Barlow Bold leading-none bleu-fede text-center */}
              <h2
                id="valeurs-title"
                className="text-center font-display text-[24px] font-bold leading-none text-bleu-fede sm:text-[30px] lg:text-[38px]"
              >
                Nos valeurs
              </h2>
              {/* Carte Engagée (nested in middle column) — illus 128×156 */}
              <div className="flex flex-col items-center gap-[10px] p-6">
                <Image
                  src="/home/valeurs/engagee.svg"
                  alt=""
                  width={128}
                  height={156}
                  className="h-[156px] w-auto"
                  unoptimized
                />
                <div className="flex items-center justify-center bg-gradient-to-r from-[#154fe5] to-[#008440] px-3 py-1">
                  <p className="font-display text-[18px] font-bold uppercase leading-[1.31] lg:text-[20px] text-white">
                    Engagée
                  </p>
                </div>
                <p className="w-full text-center text-base leading-[1.5] text-gris-fonce">
                  Toujours au service des salariés en restant apolitique
                </p>
              </div>
            </div>

            {/* Valeur 3 : Humaine (Figma 1:423) — w-[384], illus 159×103 (landscape) */}
            <div className="flex flex-col items-center gap-[10px] p-6 lg:flex-1 lg:max-w-[384px]">
              <Image
                src="/home/valeurs/humaine.svg"
                alt=""
                width={159}
                height={103}
                className="h-[103px] w-auto"
                unoptimized
              />
              <div className="flex items-center justify-center bg-gradient-to-r from-[#154fe5] to-[#008440] px-3 py-1">
                <p className="font-display text-[18px] font-bold uppercase leading-[1.31] lg:text-[20px] text-white">
                  Humaine
                </p>
              </div>
              <p className="w-full text-center text-base leading-[1.5] text-gris-fonce">
                Pour nous, la construction d&apos;une société juste est
                primordiale. Chaque personne a une place prépondérante dans
                l&apos;organisation en incluant le respect, l&apos;empathie et la
                solidarité dans nos décisions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA — Notre force, c'est le terrain */}
      <section
        className="relative overflow-hidden bg-white py-12 sm:py-14 lg:py-[60px]"
        style={{
          backgroundImage:
            'radial-gradient(circle, rgba(194,198,209,0.5) 1.1px, transparent 1.1px)',
          backgroundSize: '18px 18px',
        }}
      >
        <div className="mx-auto max-w-[1280px] px-6 sm:px-10">
          <div
            className="flex flex-col gap-8 rounded-[20px] p-8 text-white shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] sm:p-10 lg:flex-row lg:items-center lg:justify-between lg:gap-10 lg:p-[60px]"
            style={{
              background: 'linear-gradient(to right, #154fe5 0%, #008440 100%)',
            }}
          >
            <div className="min-w-0 flex-1">
              <div className="flex flex-col gap-4">
                <h2 className="font-display text-[24px] font-bold leading-none text-white sm:text-[30px] lg:text-[38px]">
                  Notre force, c&apos;est le terrain
                </h2>
                <p className="max-w-[720px] text-base leading-[1.14] text-bleu-clair">
                  Des femmes et des hommes engagés, qui comprennent vos réalités
                  parce qu&apos;ils les vivent aussi.
                </p>
              </div>
            </div>
            <p className="hidden text-xl sm:text-2xl font-medium leading-relaxed max-w-3xl mx-auto">
              Notre force, c&apos;est le terrain : des femmes et des hommes engagés,
              qui comprennent vos réalités parce qu&apos;ils les vivent aussi.
            </p>
            <div className="shrink-0">
              <Link
                href="/adhesion"
                className="inline-flex items-center justify-center rounded-full border bg-white px-[21px] py-[11px] font-display text-sm font-bold uppercase leading-4 tracking-[1.2px] text-[#002b50] transition-colors hover:bg-gray-50"
                style={{
                  borderColor: 'rgba(194,198,209,0.2)',
                  boxShadow: '0px 1px 2px 0px rgba(0,0,0,0.05)',
                }}
              >
                Adhérer en 3 minutes
              </Link>
            </div>
            <div className="hidden mt-8">
              <Link
                href="/adhesion"
                className="rounded-full bg-vert-fede px-8 py-3 text-base font-semibold text-bleu-fede hover:brightness-105 transition-all"
              >
                J&apos;adhère
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Témoignages (placeholder — en attente de Témoignages.docx) */}
      <section className="bg-gradient-to-b from-[rgba(173,197,227,0.16)] to-[rgba(255,255,255,0.16)] py-12 sm:py-14 lg:py-[60px]">
        <div className="mx-auto max-w-[1280px] px-6 sm:px-10">
          <div className="mx-auto flex max-w-[768px] flex-col items-center gap-[32px] text-center">
            <div className="flex flex-col items-center gap-[10px]">
              {/* Badge "Avis" — Iconify gridicons:speaker 13×13 exact Figma */}
              <div className="inline-flex items-center gap-2 rounded-full bg-bleu-confede/10 px-3 py-1">
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden
                  className="h-[13px] w-[13px] shrink-0 text-bleu-fede"
                >
                  <path d="M19 8v6c1.7 0 3-1.3 3-3s-1.3-3-3-3m-8-1H4c-1.1 0-2 .9-2 2v4c0 1.1.9 2 2 2h1v3c0 1.1.9 2 2 2h2v-5h2l4 4h2V3h-2z" />
                </svg>
                <span className="font-display text-xs font-bold uppercase leading-4 tracking-[1.2px] text-bleu-fede">
                  Avis
                </span>
              </div>

              {/* H2 "Témoignages" — gradient bleu-fede → vert-fede, aligné sur la charte */}
              {/* leading-[1.1] au lieu de leading-none : laisse respirer la descendante du "g" qui peut se faire clipper avec bg-clip-text */}
              <h2 className="inline-block bg-gradient-to-r from-[#154fe5] from-[40%] to-[#008440] to-[60%] bg-clip-text font-display text-[24px] font-bold leading-[1.1] text-transparent sm:text-[30px] lg:text-[38px]">
                T&eacute;moignages
              </h2>
            </div>

            {/* Quote 1:508 — taille agrandie à 18px (Figma 14px, Kevin a demandé de grossir x2) */}
            <blockquote className="max-w-full text-lg leading-[1.5] text-noir-confede">
              &ldquo;Quand j&apos;ai &eacute;t&eacute; &eacute;lue d&eacute;l&eacute;gu&eacute;e syndicale il y a deux ans, je ne savais pas par o&ugrave; commencer. La FNECS m&apos;a form&eacute;e, conseill&eacute;e, mise en relation avec d&apos;autres &eacute;lus du commerce. Aujourd&apos;hui, je m&egrave;ne mes n&eacute;gociations avec une vraie assurance.&rdquo;
            </blockquote>

            {/* Avatar 1:509 — photo 64×64 ronde + nom/fonction */}
            <div className="flex flex-col items-center gap-4">
              <div className="relative h-16 w-16 overflow-hidden rounded-full">
                <Image
                  src="/home/temoignages/marion-lemaire-portrait.png"
                  alt="Marion Lemaire"
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              </div>

              <div className="flex flex-col items-center gap-1">
                <p className="text-base font-bold leading-[1.14] text-noir-confede">
                  Marion Lemaire
                </p>
                <p className="text-sm leading-[1.14] text-bleu-confede">
                  D&eacute;l&eacute;gu&eacute;e syndicale CFE-CGC, Leroy Merlin
                </p>
              </div>
            </div>
          </div>

          <div className="hidden">
            <h2 className="text-2xl font-bold text-bleu-fede">Témoignages</h2>
          </div>
          <div className="hidden mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
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

      {/* App mobile — Figma nœud 1:611 (Layout / 238 /) */}
      {/* Bannière horizontale avec dégradé bleu→vert + image phones en arrière-plan droit */}
      {/* Fond : motif de points — MÊME pattern que la section CTA (cohérence visuelle demandée par Kevin) */}
      <section
        aria-labelledby="app-title"
        className="bg-white"
        style={{
          backgroundImage:
            'radial-gradient(circle, rgba(194,198,209,0.5) 1.1px, transparent 1.1px)',
          backgroundSize: '18px 18px',
        }}
      >
        <div className="mx-auto max-w-[994px] px-6 py-16 sm:px-10 sm:py-20 lg:py-[80px]">
          {/* Content 1:613 — bannière h-[403], p-[60], rounded-[20], shadow, relative */}
          <div
            className="relative flex min-h-[360px] items-center overflow-hidden rounded-[20px] px-8 py-10 sm:p-12 lg:min-h-[403px] lg:p-[60px]"
            style={{ boxShadow: '0px 1px 2px 0px rgba(0,0,0,0.05)' }}
          >
            {/* Background : dégradé bleu→vert (1:613 bg gradient) */}
            <div
              aria-hidden
              className="absolute inset-0 rounded-[20px]"
              style={{
                background: 'linear-gradient(to right, #154fe5 0%, #008440 100%)',
              }}
            />
            {/* Image phones 1:613 — positionnée absolument selon les pourcentages Figma */}
            {/* Masquée sur mobile (le texte doit rester lisible) */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 hidden overflow-hidden rounded-[20px] lg:block"
            >
              <Image
                src="/home/app/phones-mockup.png"
                alt=""
                width={2000}
                height={1500}
                className="absolute max-w-none"
                style={{
                  left: '53.42%',
                  top: '-15.56%',
                  width: '45.75%',
                  height: '136.16%',
                }}
                unoptimized
              />
            </div>

            {/* Content block 1:614 — Badge + H2 + description + bouton */}
            <div className="relative flex flex-1 flex-col gap-[32px] items-start">
              <div className="flex flex-col items-start gap-[16px]">
                {/* Badge "L'application mobile" 1:618 — bg white/10, picto tdesign:app-filled 12×12 */}
                <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1">
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden
                    className="h-3 w-3 shrink-0 text-white"
                  >
                    <path d="M12.5 6.5a5 5 0 1 1 10 0a5 5 0 0 1-10 0M2 2h9v9H2zm0 11h9v9H2zm11 0h9v9h-9z" />
                  </svg>
                  <span className="font-display text-xs font-bold uppercase leading-4 tracking-[1.2px] text-white">
                    L&apos;application mobile
                  </span>
                </div>

                {/* H2 1:624 — 46px Barlow Bold leading-none blanc */}
                <h2
                  id="app-title"
                  className="font-display text-[24px] font-bold leading-none text-white sm:text-[30px] lg:text-[38px]"
                >
                  L&apos;app CFE-CGC CS
                </h2>

                {/* Description 1:625 — 16px Calibri, leading-[1.14], bleu clair (#adc5e3) */}
                <p className="text-base leading-[1.14] text-bleu-clair lg:max-w-[440px]">
                  Accédez à vos informations, vos documents et vos outils, à tout
                  moment.
                </p>
              </div>

              {/* Bouton "Téléchargez l'app" 1:626 — fond blanc, border, icône download 24×24 + texte */}
              <a
                href="/app"
                className="inline-flex items-center gap-2 rounded-full border bg-white px-[21px] py-[11px] font-display text-sm font-bold uppercase leading-4 tracking-[1.2px] text-[#002b50] transition-colors hover:bg-gray-50"
                style={{
                  borderColor: 'rgba(194,198,209,0.2)',
                  boxShadow: '0px 1px 2px 0px rgba(0,0,0,0.05)',
                }}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden
                  className="h-6 w-6 shrink-0"
                >
                  <path d="m12 16l-5-5l1.4-1.45l2.6 2.6V4h2v8.15l2.6-2.6L17 11zm-6 4q-.825 0-1.412-.587T4 18v-3h2v3h12v-3h2v3q0 .825-.587 1.413T18 20z" />
                </svg>
                <span>Téléchargez l&apos;app</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter — Figma nœud 1:444 (Blog / 34 /) */}
      {/* Structure : col gauche = badge + H2 + sous-titre + formulaire. Col droite = 3 petites cartes (Actu/Ressources/Décryptages) */}
      <section
        aria-labelledby="newsletter-title"
        className="bg-neutral-lightest"
      >
        <div className="mx-auto max-w-[1280px] px-6 py-16 sm:px-10 sm:py-20 lg:py-[80px]">
          <div className="flex flex-col items-stretch gap-[40px] lg:flex-row lg:items-center">
            {/* Col gauche : contenu + formulaire */}
            <div className="flex w-full flex-col gap-[10px] lg:w-[551px] lg:flex-none">
              {/* Badge "Newsletter" 1:448 — picto ic:baseline-email 12×12 */}
              <div className="inline-flex w-fit items-center gap-2 rounded-full bg-bleu-confede/10 px-3 py-1">
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden
                  className="h-3 w-3 shrink-0 text-bleu-fede"
                >
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2m0 4l-8 5l-8-5V6l8 5l8-5z" />
                </svg>
                <span className="font-display text-xs font-bold uppercase leading-4 tracking-[1.2px] text-bleu-fede">
                  Newsletter
                </span>
              </div>

              {/* H2 1:453 — bleu fédé (uniformisé avec les autres H2 de la page, fix cohérence) */}
              <h2
                id="newsletter-title"
                className="font-display text-[24px] font-bold leading-none text-bleu-fede sm:text-[30px] lg:text-[38px]"
              >
                Actualités, décryptages, ressources
              </h2>

              {/* Sous-titre 1:454 */}
              <p className="text-base leading-[1.14] text-gris-fonce">
                L&apos;essentiel pour rester informé
              </p>

              {/* Formulaire 1:455 — input + bouton gradient */}
              <form className="mt-4 flex w-full items-center gap-[5px]">
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
                  className="inline-flex h-12 shrink-0 cursor-pointer items-center justify-center rounded-full bg-gradient-to-r from-[#154fe5] to-vert-fede px-5 py-[10px] font-display text-sm font-bold uppercase leading-4 tracking-[1.2px] text-white transition-[filter] hover:brightness-105"
                  style={{
                    boxShadow:
                      '0px 20px 25px -5px rgba(0,0,0,0.1), 0px 8px 10px -6px rgba(0,0,0,0.1)',
                  }}
                >
                  Je reste informé
                </button>
              </form>
            </div>

            {/* Col droite : 3 cartes Actu / Ressources / Décryptages */}
            <div className="flex flex-1 flex-col gap-[10px] sm:flex-row sm:items-end sm:justify-end lg:gap-[10px]">
              {/* Carte 1 : Actualités (bleu fédé) */}
              <article
                className="flex flex-1 flex-col items-start gap-[10px] rounded-[20px] bg-white p-6"
                style={{ boxShadow: '0px 1px 2px 0px rgba(0,0,0,0.05)' }}
              >
                {/* Icône wpf:news 26×26 dans badge bleu clair 40×40 rounded-8 */}
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-lg"
                  style={{ backgroundColor: 'rgba(173,197,227,0.34)' }}
                >
                  <svg
                    viewBox="0 0 26 26"
                    fill="currentColor"
                    aria-hidden
                    className="h-[26px] w-[26px] text-bleu-fede"
                  >
                    <path d="M16.906 1.969a1 1 0 0 0-.125.031H1a1 1 0 0 0-.094 0A1 1 0 0 0 0 3v15.969c0 2.365 1.319 3.818 2.563 4.437C3.806 24.025 5 24 5 24h16.125c.175 0 1.176-.026 2.313-.594c1.186-.593 2.427-1.959 2.53-4.125v-.062c.002-.022.031-.04.032-.063A1 1 0 0 0 26 19a1 1 0 0 0 0-.094V8s-.004-.702-.375-1.438c-.337-.667-1.147-1.4-2.281-1.53A1 1 0 0 0 23 4.968h-5V3.187A1 1 0 0 0 18 3a1 1 0 0 0 0-.125v-.093l-.031-.063v-.031a1 1 0 0 0-.032-.094a1 1 0 0 0-.062-.094a1 1 0 0 0-.094-.156a1 1 0 0 0-.093-.063a1 1 0 0 0-.125-.125h-.032A1 1 0 0 0 17.188 2a1 1 0 0 0-.282-.031M2 4h14v1.75a1 1 0 0 0 0 .406V18.97c0 1.28.406 2.275.969 3.031H5s-.454.002-1-.156a3.4 3.4 0 0 1-.563-.219C2.681 21.249 2 20.68 2 18.969zm2 2c-.551 0-1 .449-1 1v2c0 .551.449 1 1 1h10c.551 0 1-.449 1-1V7c0-.551-.449-1-1-1zm14 .969h2.188c-.187.548-.188 1-.188 1V18a1 1 0 1 0 2 0V8c.002-.028.025-.275.156-.531c.139-.27.209-.469.844-.469c.63 0 .703.19.844.469c.133.265.154.534.156.562V19a1 1 0 0 0 0 .094c-.027 1.588-.692 2.127-1.438 2.5C21.802 21.974 21 22 21 22s-.8-.021-1.563-.406S18 20.643 18 18.969zM3.719 12A1.004 1.004 0 0 0 4 14h3a1 1 0 1 0 0-2H4a1 1 0 0 0-.094 0a1 1 0 0 0-.094 0a1 1 0 0 0-.093 0m6 0A1.004 1.004 0 0 0 10 14h4a1 1 0 1 0 0-2h-4a1 1 0 0 0-.094 0a1 1 0 0 0-.094 0a1 1 0 0 0-.093 0m-6 3A1.004 1.004 0 0 0 4 17h3a1 1 0 1 0 0-2H4a1 1 0 0 0-.094 0a1 1 0 0 0-.094 0a1 1 0 0 0-.093 0m6 0A1.004 1.004 0 0 0 10 17h4a1 1 0 1 0 0-2h-4a1 1 0 0 0-.094 0a1 1 0 0 0-.094 0a1 1 0 0 0-.093 0m-5.5 3a1.004 1.004 0 0 0 .281 2H7a1 1 0 1 0 0-2H4.5a1 1 0 0 0-.094 0a1 1 0 0 0-.093 0a1 1 0 0 0-.094 0m5.5 0A1.004 1.004 0 0 0 10 20h4a1 1 0 1 0 0-2h-4a1 1 0 0 0-.094 0a1 1 0 0 0-.094 0a1 1 0 0 0-.093 0" />
                  </svg>
                </div>
                <h3 className="font-display text-[18px] font-bold uppercase leading-[1.31] lg:text-[20px] text-bleu-fede">
                  Actualités
                </h3>
                <p className="text-base leading-[1.14] text-gris-fonce">
                  Les dernières nouvelles de la fédération et du terrain.
                </p>
              </article>

              {/* Carte 2 : Ressources (noir confédé) — légèrement plus haute */}
              <article
                className="flex flex-1 flex-col items-start gap-[10px] rounded-[20px] bg-white p-6 sm:self-stretch"
                style={{ boxShadow: '0px 1px 2px 0px rgba(0,0,0,0.05)' }}
              >
                {/* Icône mdi:book-open-page-variant dans badge noir très léger 40×40 rounded-8 */}
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-lg"
                  style={{ backgroundColor: 'rgba(35,31,32,0.08)' }}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden
                    className="h-[22px] w-[22px] text-noir-confede"
                  >
                    <path d="m19 2l-5 4.5v11l5-4.5zM6.5 5C4.55 5 2.45 5.4 1 6.5v14.66c0 .25.25.5.5.5c.1 0 .15-.07.25-.07c1.35-.65 3.3-1.09 4.75-1.09c1.95 0 4.05.4 5.5 1.5c1.35-.85 3.8-1.5 5.5-1.5c1.65 0 3.35.31 4.75 1.06c.1.05.15.03.25.03c.25 0 .5-.25.5-.5V6.5c-.6-.45-1.25-.75-2-1V19c-1.1-.35-2.3-.5-3.5-.5c-1.7 0-4.15.65-5.5 1.5V6.5C10.55 5.4 8.45 5 6.5 5" />
                  </svg>
                </div>
                <h3 className="font-display text-[18px] font-bold uppercase leading-[1.31] lg:text-[20px] text-noir-confede">
                  Ressources
                </h3>
                <p className="text-base leading-[1.14] text-gris-fonce">
                  Guides pratiques, fiches juridiques et outils pour accompagner
                  les élus au quotidien.
                </p>
              </article>

              {/* Carte 3 : Décryptages (vert fédé) */}
              <article
                className="flex flex-1 flex-col items-start gap-[10px] rounded-[20px] bg-white p-6"
                style={{ boxShadow: '0px 1px 2px 0px rgba(0,0,0,0.05)' }}
              >
                {/* Icône tabler:microscope-filled 24×24 dans badge vert 40×40 rounded-8 */}
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-lg"
                  style={{ backgroundColor: 'rgba(0,132,64,0.15)' }}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden
                    className="h-6 w-6 text-vert-fede"
                  >
                    <path d="m15.707 4.293l3 3a1 1 0 0 1 0 1.414l-1.553 1.555a7 7 0 0 1-.256 9.74L19 20a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2h1v-1a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2v1h4a5 5 0 0 0 3.737-8.323l-3.03 3.03a1 1 0 0 1-1.414 0l-.793-.792l-.793.792a1 1 0 1 1-1.414-1.414l.792-.793l-.792-.793a1 1 0 0 1 0-1.414l6-6a1 1 0 0 1 1.414 0m2-2l3 3a1 1 0 1 1-1.414 1.414l-3-3a1 1 0 1 1 1.414-1.414" />
                  </svg>
                </div>
                <h3 className="font-display text-[18px] font-bold uppercase leading-[1.31] lg:text-[20px] text-vert-fede">
                  Décryptages
                </h3>
                <p className="text-base leading-[1.14] text-gris-fonce">
                  Nos éclairages d&apos;experts sur l&apos;actualité juridique et
                  sociale.
                </p>
              </article>
            </div>
          </div>
        </div>
      </section>

      {/* Partenaires — titre sur le modèle "Nos valeurs" (badge + H2 bleu fédé centré) */}
      {/* Grille uniforme : chaque logo dans un cadre de taille fixe avec object-contain */}
      <section
        aria-labelledby="partenaires-title"
        className="bg-white"
      >
        <div className="mx-auto max-w-[1280px] px-6 py-16 sm:px-10 sm:py-20 lg:py-[80px]">
          {/* Title block — pas de badge ici (redondant avec "Nos partenaires") */}
          <div className="flex flex-col items-center gap-[10px] text-center">
            {/* H2 style Nos valeurs : 46px Barlow Bold leading-none bleu-fede */}
            <h2
              id="partenaires-title"
              className="font-display text-[24px] font-bold leading-none text-bleu-fede sm:text-[30px] lg:text-[38px]"
            >
              Nos partenaires
            </h2>
          </div>

          {/* Grille uniforme — 2 rangées (7 + 6 logos), cellules de taille FIXE identique sur les 2 rangées */}
          {/* pour que les logos de la rangée 1 aient la même taille visuelle que ceux de la rangée 2 */}
          {/* Tailles pensées pour garantir 7 logos sur 1 ligne à partir de lg (1024px) */}
          <div className="mt-12 flex flex-col gap-y-8 sm:mt-16 lg:mt-[60px]">
            {[partenaires.slice(0, 7), partenaires.slice(7)].map((row, rowIndex) => (
              <div
                key={rowIndex}
                className="flex flex-wrap items-center justify-center gap-x-3 gap-y-6 sm:gap-x-4 lg:flex-nowrap xl:gap-x-6"
              >
                {row.map((p) => (
                  <a
                    key={p.nom}
                    href={p.lien}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={p.nom}
                    className="flex h-16 w-[100px] shrink-0 items-center justify-center transition-transform hover:scale-105 sm:h-20 sm:w-[120px] xl:w-[140px]"
                  >
                    <Image
                      src={p.logo}
                      alt={`Logo ${p.nom}`}
                      width={140}
                      height={80}
                      className="max-h-full max-w-full object-contain"
                      unoptimized
                    />
                  </a>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
