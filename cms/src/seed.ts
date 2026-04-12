import type { Core } from '@strapi/strapi';
import path from 'path';
import fs from 'fs';

// ── Membres uniques (70) ────────────────────────────────────────────────────

const members = [
  // Fédération
  { prenom: 'Jean-François', nom: 'LÉCUYER', email: 'jflecuyer@cfecgc-cs.fr', telephone: '06-80-62-85-68' },
  { prenom: 'Tania', nom: 'DAUCHY', email: 'tania.dauchy@fnecs.org', telephone: '06-16-02-76-51' },
  { prenom: 'Patrick', nom: 'LOUBIÉ', email: 'patrick.loubie@fnecs.org', telephone: '06-70-84-58-07' },
  { prenom: 'Jean-Yves', nom: 'PICOT', email: 'jean-yves.picot@fnecs.org', telephone: '06-24-25-55-30' },
  // SNEC
  { prenom: 'Philippe', nom: 'BANSE', email: 'pbanse@fnecs.org', telephone: '06-99-05-24-60' },
  { prenom: 'Nicolas', nom: 'NIVERT', email: 'nicolas.nivert@cfecgc-cs.fr', telephone: '06-42-23-09-76' },
  { prenom: 'Marc', nom: 'CHEVAL', email: 'mcheval@fnecs.org', telephone: '06-07-59-37-26' },
  { prenom: 'Philippe', nom: 'GERBAULT', email: 'pgerbault@fnecs.org', telephone: '06-62-69-10-77' },
  // SNES
  { prenom: 'François', nom: 'MARBOT', email: 'fmarbot@fnecs.org', telephone: '06-21-28-45-31' },
  { prenom: 'Nadia', nom: 'PAVLIK', email: 'nadia.pavlik@cfecgc-cs.fr', telephone: '06-23-13-23-95' },
  { prenom: 'Patrick', nom: 'MENARD', email: 'patrick.menard@cfecgc-cs.fr', telephone: '06-89-97-09-71' },
  { prenom: 'Sacha', nom: 'DELOR', email: 'sacha.delor@cfecgc-cs.fr', telephone: '06-82-02-42-33' },
  // Activités Diverses
  { prenom: 'Bruno', nom: 'PLUQUET', email: 'bruno.pluquet@fnecs.org', telephone: '06.29.47.67.14' },
  { prenom: 'Stéphane', nom: 'GUILLORY', email: 'activitesdiverses@cfecgc-cs.fr' },
  { prenom: 'Stéphane', nom: 'MARCHAL', email: 'activitesdiverses@cfecgc-cs.fr' },
  { prenom: 'Christelle', nom: 'LAUNE', email: 'christelle.laune@fnecs.org' },
  // Ameublement
  { prenom: 'Sylviane', nom: 'NGUYEN', email: 'snguyen@fnecs.org', telephone: '06.82.40.25.15' },
  { prenom: 'Mohammed', nom: 'CHADLI', email: 'mohammed.chadli@cfecgc-cs.fr' },
  { prenom: 'Christophe', nom: 'MONNEVEUX', email: 'christophe.monneveux@cfecgc-cs.fr' },
  { prenom: 'Christophe', nom: 'BLEHAUT', email: 'christophe.blehaut@cfecgc-cs.fr' },
  // Audiovisuel
  { prenom: 'Laurence', nom: 'GNONLONFOUN', email: 'lgnonlonfoun@fnecs.org', telephone: '06.71.64.75.07' },
  { prenom: 'Gilles', nom: 'MERAYO', email: 'g.merayo@cfecgc-cs.fr' },
  { prenom: 'Stéphane', nom: 'BAUMANN', email: 's.baumann@cfecgc-cs.fr' },
  { prenom: 'Michel', nom: 'NETZER', email: 'netzer.m@cfecgc-cs.fr' },
  // Bricolage
  { prenom: 'Olivier', nom: 'WAREMBOURG', email: 'bricolage@cfecgc-cs.fr', telephone: '06.16.96.49.64' },
  { prenom: 'Jean-Marc', nom: 'SFERRAZZA', email: 'bricolage@cfecgc-cs.fr' },
  { prenom: 'Olivier', nom: 'CARITEZ', email: 'bricolage@cfecgc-cs.fr' },
  { prenom: 'Grégory', nom: 'GUERS', email: 'bricolage@cfecgc-cs.fr' },
  // Chaussure
  { prenom: 'Sylvie', nom: 'LEDUC', email: 'chaussure@cfecgc-cs.fr', telephone: '06.69.64.33.35' },
  { prenom: 'Corinne', nom: 'LHERMITTE', email: 'chaussure@cfecgc-cs.fr' },
  // Commerce de Détail non alimentaire
  { prenom: 'Lucien', nom: 'TOURAT', email: 'lucien.tourat@fnecs.org', telephone: '06.71.43.49.63' },
  { prenom: 'François', nom: 'GAUTHIER', email: 'commercedetail@cfecgc-cs.fr' },
  { prenom: 'Eric', nom: 'SOUCHON', email: 'commercedetail@cfecgc-cs.fr' },
  { prenom: 'Anne', nom: 'MARQUE', email: 'commercedetail@cfecgc-cs.fr' },
  // Commerce de gros
  { prenom: 'Laurent', nom: 'LIAUBET', email: 'commercedegros@cfecgc-cs.fr', telephone: '06.11.12.24.41' },
  { prenom: 'Nadine', nom: 'MARTINEZ', email: 'commercedegros@cfecgc-cs.fr' },
  { prenom: 'Jean', nom: 'STURM', email: 'commercedegros@cfecgc-cs.fr' },
  { prenom: 'Nicolas', nom: 'VANOISE', email: 'commercedegros@cfecgc-cs.fr' },
  // e-commerce
  { prenom: 'Dominique', nom: 'CLAEYS', email: 'e.commerce@cfecgc-cs.fr', telephone: '06.49.62.95.17' },
  { prenom: 'Corinne', nom: 'SAMYN', email: 'csamyn@fnecs.org' },
  { prenom: 'Philippe', nom: 'VANHOENACKER', email: 'e.commerce@cfecgc-cs.fr' },
  { prenom: 'Jean-Jacques', nom: 'DELEU', email: 'Jean-jacques.Deleu@fnecs.org' },
  // Grands Magasins
  { prenom: 'Marie-Dominique', nom: 'LEGUEUX', email: 'grandsmagasins@cfecgc-cs.fr', telephone: '06.80.94.34.28' },
  { prenom: 'Lyse', nom: 'BODEC', email: 'grandsmagasins@cfecgc-cs.fr' },
  { prenom: 'Béatrice', nom: 'CAMUSET', email: 'grandsmagasins@cfecgc-cs.fr' },
  { prenom: 'Olivier', nom: 'DUVAL', email: 'grandsmagasins@cfecgc-cs.fr' },
  // Habillement
  { prenom: 'Guy', nom: 'BOUQUET', email: 'guy.bouquet@fnecs.org', telephone: '06.30.92.53.70' },
  { prenom: 'Vincent', nom: 'BOURSIER', email: 'habillement@cfecgc-cs.fr' },
  { prenom: 'Saïd', nom: 'JMAMMOU', email: 'habillement@cfecgc-cs.fr' },
  { prenom: 'André', nom: 'ROUGON', email: 'habillement@cfecgc-cs.fr' },
  // Import-Export
  { prenom: 'Philippe', nom: 'BENETEAU', email: 'philippe.beneteau@cfecgc-cs.fr', telephone: '06.82.87.95.03' },
  { prenom: 'Stéphane', nom: 'GROSMAIRE', email: 'stephane.grosmaire@cfecgc-cs.fr' },
  { prenom: 'Oury', nom: 'BOUSKILA', email: 'obouskila@fnecs.org' },
  { prenom: 'Abder', nom: 'HAMMOUCHE', email: 'import-export@cfecgc-cs.fr' },
  // Prévention Sécurité
  { prenom: 'Pascal', nom: 'PLANQUART', email: 'securite@cfecgc-cs.fr', telephone: '06.25.94.05.08' },
  { prenom: 'Charlemagne', nom: 'ONANA', email: 'c.onana@fnecs.org' },
  // Propreté 3D
  { prenom: 'Nadia', nom: 'LAMARI', email: 'proprete3d@cfecgc-cs.fr', telephone: '06.46.60.36.16' },
  { prenom: 'Miroljub', nom: 'PETROVIC', email: 'proprete3d@cfecgc-cs.fr' },
  { prenom: 'Véronique', nom: 'DEME', email: 'proprete3d@cfecgc-cs.fr' },
  // Services Funéraires
  { prenom: 'Xavier', nom: 'BRIOT', email: 'xbriot@fnecs.org', telephone: '06.61.39.59.63' },
  { prenom: 'Séverine', nom: 'PERUCH', email: 'severine.peruch@cfecgc-cs.fr' },
  { prenom: 'Yohann', nom: 'CHIREZ', email: 'Yohann.CHIREZ@cfecgc-cs.fr' },
  { prenom: 'Harrison', nom: 'WULLEMAN', email: 'harrison.wulleman@cfecgc-cs.fr' },
  // Services Tertiaires - Prestataires de Services
  { prenom: 'Dimitri', nom: 'MASCART', email: 'prestataires@cfecgc-cs.fr' },
  { prenom: 'Mattieu', nom: 'BYRDZIAK', email: 'prestataires@cfecgc-cs.fr' },
  // Tourisme
  { prenom: 'Franck', nom: 'QUEVILLON', email: 'franck.quevillon@cfecgc-cs.fr', telephone: '06.28.91.54.09' },
  { prenom: 'Laëtitia', nom: 'EON', email: 'laetitia.eon@cfecgc-cs.fr' },
  { prenom: 'Philippe', nom: 'FABRY', email: 'philippe.fabry@cfecgc-cs.fr' },
  // Travail Temporaire
  { prenom: 'Olivier', nom: 'DAIGNY', email: 'olivier.daigny@cfecgc-cs.fr', telephone: '06.20.48.21.23' },
  { prenom: 'Annaïck', nom: 'SORAYE', email: 'annaick.soraye@cfecgc-cs.fr' },
  { prenom: 'Lydia', nom: 'HORTA', email: 'lydia.horta@cfecgc-cs.fr' },
  { prenom: 'Monique', nom: 'BADTS', email: 'monique.badts@cfecgc-cs.fr' },
];

// ── Structures (20) ─────────────────────────────────────────────────────────

type StructureType = 'federation' | 'syndicat' | 'usn';

interface StructureDef {
  nom: string;
  type: StructureType;
  email?: string;
  syndicat?: string; // nom du syndicat parent (pour les USN)
  bureau: { membre: string; fonction: string }[]; // membre = "Prénom NOM"
}

const SNEC = 'SNEC - Syndicat National de l\'Encadrement du Commerce';
const SNES = 'SNES - Syndicat National de l\'Encadrement du Service';

const structures: StructureDef[] = [
  // ── Fédération ──
  {
    nom: 'FNECS CFE-CGC - Commerce et Services',
    type: 'federation',
    bureau: [
      { membre: 'Jean-François LÉCUYER', fonction: 'Président' },
      { membre: 'Tania DAUCHY', fonction: 'Secrétaire Générale' },
      { membre: 'Patrick LOUBIÉ', fonction: 'Secrétaire Général Adjoint' },
      { membre: 'Jean-Yves PICOT', fonction: 'Trésorier' },
    ],
  },
  // ── Syndicats ──
  {
    nom: SNEC,
    type: 'syndicat',
    bureau: [
      { membre: 'Philippe BANSE', fonction: 'Président' },
      { membre: 'Nicolas NIVERT', fonction: 'Secrétaire Général' },
      { membre: 'Marc CHEVAL', fonction: 'Trésorier' },
      { membre: 'Philippe GERBAULT', fonction: 'Trésorier Adjoint' },
    ],
  },
  {
    nom: SNES,
    type: 'syndicat',
    bureau: [
      { membre: 'François MARBOT', fonction: 'Président' },
      { membre: 'Nadia PAVLIK', fonction: 'Secrétaire Générale' },
      { membre: 'Patrick MENARD', fonction: 'Trésorier' },
      { membre: 'Sacha DELOR', fonction: 'Trésorier Adjoint' },
    ],
  },
  // ── USN SNEC (Commerce) ──
  {
    nom: 'Activités Diverses', type: 'usn', syndicat: SNEC,
    email: 'activitesdiverses@fnecs.org',
    bureau: [
      { membre: 'Bruno PLUQUET', fonction: 'Président' },
      { membre: 'Stéphane GUILLORY', fonction: 'Vice-Président' },
      { membre: 'Stéphane MARCHAL', fonction: 'Secrétaire Général' },
      { membre: 'Christelle LAUNE', fonction: 'Secrétaire Générale Adjointe' },
    ],
  },
  {
    nom: 'Ameublement', type: 'usn', syndicat: SNEC,
    email: 'ameublement@fnecs.org',
    bureau: [
      { membre: 'Sylviane NGUYEN', fonction: 'Présidente' },
      { membre: 'Mohammed CHADLI', fonction: 'Vice-Président' },
      { membre: 'Christophe MONNEVEUX', fonction: 'Secrétaire Général' },
      { membre: 'Christophe BLEHAUT', fonction: 'Secrétaire Général Adjoint' },
    ],
  },
  {
    nom: 'Audiovisuel', type: 'usn', syndicat: SNEC,
    email: 'audiovisuel@fnecs.org',
    bureau: [
      { membre: 'Laurence GNONLONFOUN', fonction: 'Présidente' },
      { membre: 'Gilles MERAYO', fonction: 'Vice-Président' },
      { membre: 'Stéphane BAUMANN', fonction: 'Secrétaire Général' },
      { membre: 'Michel NETZER', fonction: 'Secrétaire Général Adjoint' },
    ],
  },
  {
    nom: 'Bricolage', type: 'usn', syndicat: SNEC,
    email: 'bricolage@fnecs.org',
    bureau: [
      { membre: 'Olivier WAREMBOURG', fonction: 'Président' },
      { membre: 'Jean-Marc SFERRAZZA', fonction: 'Vice-Président' },
      { membre: 'Olivier CARITEZ', fonction: 'Secrétaire Général' },
      { membre: 'Grégory GUERS', fonction: 'Secrétaire Général Adjoint' },
    ],
  },
  {
    nom: 'Chaussure', type: 'usn', syndicat: SNEC,
    email: 'chaussure@fnecs.org',
    bureau: [
      { membre: 'Sylvie LEDUC', fonction: 'Présidente' },
      { membre: 'Corinne LHERMITTE', fonction: 'Secrétaire Générale' },
    ],
  },
  {
    nom: 'Commerce de Détail non alimentaire', type: 'usn', syndicat: SNEC,
    email: 'commercedetail@fnecs.org',
    bureau: [
      { membre: 'Lucien TOURAT', fonction: 'Président' },
      { membre: 'François GAUTHIER', fonction: 'Vice-Président' },
      { membre: 'Eric SOUCHON', fonction: 'Secrétaire Général' },
      { membre: 'Anne MARQUE', fonction: 'Secrétaire Générale Adjointe' },
    ],
  },
  {
    nom: 'Commerce de gros', type: 'usn', syndicat: SNEC,
    email: 'commercedegros@fnecs.org',
    bureau: [
      { membre: 'Laurent LIAUBET', fonction: 'Président' },
      { membre: 'Nadine MARTINEZ', fonction: 'Vice-Présidente' },
      { membre: 'Jean STURM', fonction: 'Secrétaire Général' },
      { membre: 'Nicolas VANOISE', fonction: 'Secrétaire Général Adjoint' },
    ],
  },
  {
    nom: 'e-commerce', type: 'usn', syndicat: SNEC,
    email: 'e.commerce@fnecs.org',
    bureau: [
      { membre: 'Dominique CLAEYS', fonction: 'Présidente' },
      { membre: 'Corinne SAMYN', fonction: 'Vice-Présidente' },
      { membre: 'Philippe VANHOENACKER', fonction: 'Secrétaire Général' },
      { membre: 'Jean-Jacques DELEU', fonction: 'Secrétaire Général Adjoint' },
    ],
  },
  {
    nom: 'Grands Magasins', type: 'usn', syndicat: SNEC,
    email: 'grandsmagasins@fnecs.org',
    bureau: [
      { membre: 'Marie-Dominique LEGUEUX', fonction: 'Présidente' },
      { membre: 'Lyse BODEC', fonction: 'Vice-Présidente' },
      { membre: 'Béatrice CAMUSET', fonction: 'Secrétaire Générale' },
      { membre: 'Olivier DUVAL', fonction: 'Secrétaire Général Adjoint' },
    ],
  },
  {
    nom: 'Habillement', type: 'usn', syndicat: SNEC,
    email: 'habillement@fnecs.org',
    bureau: [
      { membre: 'Guy BOUQUET', fonction: 'Président' },
      { membre: 'Vincent BOURSIER', fonction: 'Vice-Président' },
      { membre: 'Saïd JMAMMOU', fonction: 'Secrétaire Général' },
      { membre: 'André ROUGON', fonction: 'Secrétaire Général Adjoint' },
    ],
  },
  {
    nom: 'Import-Export', type: 'usn', syndicat: SNEC,
    email: 'import-export@fnecs.org',
    bureau: [
      { membre: 'Philippe BENETEAU', fonction: 'Président' },
      { membre: 'Stéphane GROSMAIRE', fonction: 'Vice-Président' },
      { membre: 'Oury BOUSKILA', fonction: 'Secrétaire Général' },
      { membre: 'Abder HAMMOUCHE', fonction: 'Secrétaire Général Adjoint' },
    ],
  },
  // ── USN SNES (Services) ──
  {
    nom: 'Prévention Sécurité', type: 'usn', syndicat: SNES,
    email: 'securite@fnecs.org',
    bureau: [
      { membre: 'Pascal PLANQUART', fonction: 'Président' },
      { membre: 'Patrick MENARD', fonction: 'Vice-Président' },
      { membre: 'Charlemagne ONANA', fonction: 'Secrétaire Général' },
    ],
  },
  {
    nom: 'Propreté 3D', type: 'usn', syndicat: SNES,
    email: 'proprete3d@fnecs.org',
    bureau: [
      { membre: 'Nadia LAMARI', fonction: 'Présidente' },
      { membre: 'Miroljub PETROVIC', fonction: 'Vice-Président' },
      { membre: 'Véronique DEME', fonction: 'Secrétaire Générale' },
    ],
  },
  {
    nom: 'Services Funéraires', type: 'usn', syndicat: SNES,
    email: 'servicesfuneraires@fnecs.org',
    bureau: [
      { membre: 'Xavier BRIOT', fonction: 'Président' },
      { membre: 'Séverine PERUCH', fonction: 'Vice-Présidente' },
      { membre: 'Yohann CHIREZ', fonction: 'Secrétaire Général' },
      { membre: 'Harrison WULLEMAN', fonction: 'Secrétaire Général Adjoint' },
    ],
  },
  {
    nom: 'Services Tertiaires - Prestataires de Services', type: 'usn', syndicat: SNES,
    email: 'prestataires@fnecs.org',
    bureau: [
      { membre: 'Sacha DELOR', fonction: 'Président' },
      { membre: 'Dimitri MASCART', fonction: 'Vice-Président' },
      { membre: 'Mattieu BYRDZIAK', fonction: 'Secrétaire Général' },
    ],
  },
  {
    nom: 'Tourisme', type: 'usn', syndicat: SNES,
    email: 'tourisme@fnecs.org',
    bureau: [
      { membre: 'Franck QUEVILLON', fonction: 'Président' },
      { membre: 'Laëtitia EON', fonction: 'Vice-Présidente' },
      { membre: 'Philippe FABRY', fonction: 'Secrétaire Général' },
    ],
  },
  {
    nom: 'Travail Temporaire', type: 'usn', syndicat: SNES,
    email: 'travailtemporaire@fnecs.org',
    bureau: [
      { membre: 'Olivier DAIGNY', fonction: 'Président' },
      { membre: 'Annaïck SORAYE', fonction: 'Vice-Présidente' },
      { membre: 'Lydia HORTA', fonction: 'Secrétaire Générale' },
      { membre: 'Monique BADTS', fonction: 'Secrétaire Générale Adjointe' },
    ],
  },
];

// ── Partenaires (13) ────────────────────────────────────────────────────────

const partenaires = [
  { nom: 'Klesia', lien: 'https://www.klesia.fr/', ordre: 1 },
  { nom: 'AG2R La Mondiale', lien: 'https://www.ag2rlamondiale.fr/', ordre: 2 },
  { nom: 'Malakoff Humanis', lien: 'https://www.malakoffhumanis.com/', ordre: 3 },
  { nom: 'Apicil', lien: 'https://mon.apicil.com/', ordre: 4 },
  { nom: 'Uni Prévoyance', lien: 'https://www.uniprevoyance.fr/', ordre: 5 },
  { nom: 'Groupe VYV', lien: 'https://www.groupe-vyv.fr/', ordre: 6 },
  { nom: 'OCIRP', lien: 'https://www.ocirp.fr/', ordre: 7 },
  { nom: 'Aésio', lien: 'https://www.aesio.fr/', ordre: 8 },
  { nom: 'La Mutuelle Générale', lien: 'https://www.lamutuellegenerale.fr/', ordre: 9 },
  { nom: 'Macif', lien: 'https://www.macif.fr/', ordre: 10 },
  { nom: 'Up Coop', lien: 'https://up.coop/pourquoi-choisir-upcoop/', ordre: 11 },
  { nom: 'Sextant Expertise', lien: 'https://www.sextant-expertise.fr/', ordre: 12 },
  { nom: 'Secafi', lien: 'https://www.secafi.com/evenements-et-ressources/traits-dunion/', ordre: 13 },
];

// ── Helpers ──────────────────────────────────────────────────────────────────

function slugify(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // remove accents
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

// ── Permissions API publiques ────────────────────────────────────────────────

const PUBLIC_ACTIONS = [
  'api::article.article.find',
  'api::article.article.findOne',
  'api::tag.tag.find',
  'api::structure.structure.find',
  'api::structure.structure.findOne',
  'api::membre.membre.find',
  'api::temoignage.temoignage.find',
  'api::partenaire.partenaire.find',
  'api::magazine.magazine.find',
  'api::capsule.capsule.find',
  'api::presse.presse.find',
  'api::presse.presse.findOne',
];

async function seedPublicPermissions({ strapi }: { strapi: Core.Strapi }) {
  const publicRole = await strapi.query('plugin::users-permissions.role').findOne({
    where: { type: 'public' },
  });
  if (!publicRole) return;

  const existingPerms = await strapi.query('plugin::users-permissions.permission').findMany({
    where: { role: publicRole.id },
  });
  const existingActions = new Set(existingPerms.map((p: any) => p.action));

  let count = 0;
  for (const action of PUBLIC_ACTIONS) {
    if (!existingActions.has(action)) {
      await strapi.query('plugin::users-permissions.permission').create({
        data: { action, role: publicRole.id, enabled: true },
      });
      count++;
    }
  }

  if (count > 0) {
    strapi.log.info(`Seed: ${count} permissions API publiques configurées.`);
  }
}

// ── Seed logic ──────────────────────────────────────────────────────────────

export async function seed({ strapi }: { strapi: Core.Strapi }) {
  if (process.env.SEED_DATA !== 'true') return;

  await seedPublicPermissions({ strapi });

  // Guard: don't seed structures twice
  const existing = await strapi.documents('api::structure.structure').findMany({ limit: 1 });
  if (existing.length > 0) {
    strapi.log.info('Seed: structures déjà présentes, ignoré.');
    await seedConventions({ strapi });
    await seedPartenaires({ strapi });
    return;
  }

  strapi.log.info('Seed: création des 70 membres...');

  const memberMap = new Map<string, string>(); // "Prénom NOM" → documentId

  for (const m of members) {
    const entry = await strapi.documents('api::membre.membre').create({
      data: { prenom: m.prenom, nom: m.nom, email: m.email, telephone: m.telephone },
      status: 'published',
    });
    memberMap.set(`${m.prenom} ${m.nom}`, entry.documentId);
  }

  strapi.log.info(`Seed: ${memberMap.size} membres créés.`);
  strapi.log.info('Seed: création des structures...');

  const structureMap = new Map<string, string>(); // nom → documentId

  // Phase 1: fédération et syndicats
  for (const s of structures.filter((s) => s.type !== 'usn')) {
    const bureau = s.bureau.map((b) => ({
      fonction: b.fonction,
      membre: memberMap.get(b.membre),
    }));

    const entry = await strapi.documents('api::structure.structure').create({
      data: { nom: s.nom, slug: slugify(s.nom), type: s.type, email: s.email, bureau },
      status: 'published',
    });
    structureMap.set(s.nom, entry.documentId);
  }

  // Phase 2: USN (avec syndicat_parent)
  for (const s of structures.filter((s) => s.type === 'usn')) {
    const bureau = s.bureau.map((b) => ({
      fonction: b.fonction,
      membre: memberMap.get(b.membre),
    }));

    const parentId = s.syndicat ? structureMap.get(s.syndicat) : undefined;

    const entry = await strapi.documents('api::structure.structure').create({
      data: {
        nom: s.nom,
        slug: slugify(s.nom),
        type: s.type,
        email: s.email,
        bureau,
        ...(parentId ? { syndicat_parent: parentId } : {}),
      },
      status: 'published',
    });
    structureMap.set(s.nom, entry.documentId);
  }

  strapi.log.info(`Seed: ${structureMap.size} structures créées.`);

  // ── Conventions collectives ──
  await seedConventions({ strapi });

  // ── Partenaires ──
  await seedPartenaires({ strapi });
}

async function seedPartenaires({ strapi }: { strapi: Core.Strapi }) {
  const existing = await strapi.documents('api::partenaire.partenaire').findMany({ limit: 1 });
  if (existing.length > 0) {
    strapi.log.info('Seed: partenaires déjà présents, ignoré.');
    await seedPartenaireLogos({ strapi });
    return;
  }

  strapi.log.info('Seed: création des partenaires...');

  for (const p of partenaires) {
    await strapi.documents('api::partenaire.partenaire').create({
      data: { nom: p.nom, lien: p.lien, ordre: p.ordre },
      status: 'published',
    });
  }

  strapi.log.info(`Seed: ${partenaires.length} partenaires créés.`);
  await seedPartenaireLogos({ strapi });
}

// ── Upload logos partenaires ────────────────────────────────────────────────

const LOGOS_DIR = path.resolve(process.cwd(), '..', 'frontend', 'public', 'logos');

const partenaireLogos: Record<string, { file: string; mime: string }> = {
  'Klesia': { file: 'klesia.svg', mime: 'image/svg+xml' },
  'AG2R La Mondiale': { file: 'ag2r-la-mondiale.svg', mime: 'image/svg+xml' },
  'Malakoff Humanis': { file: 'malakoff-humanis.png', mime: 'image/png' },
  'Apicil': { file: 'apicil.png', mime: 'image/png' },
  'Uni Prévoyance': { file: 'uni-prevoyance.png', mime: 'image/png' },
  'Groupe VYV': { file: 'groupe-vyv.svg', mime: 'image/svg+xml' },
  'OCIRP': { file: 'ocirp.svg', mime: 'image/svg+xml' },
  'Aésio': { file: 'aesio.svg', mime: 'image/svg+xml' },
  'La Mutuelle Générale': { file: 'la-mutuelle-generale.svg', mime: 'image/svg+xml' },
  'Macif': { file: 'macif.svg', mime: 'image/svg+xml' },
  'Up Coop': { file: 'upcoop.svg', mime: 'image/svg+xml' },
  'Sextant Expertise': { file: 'sextant-expertise.png', mime: 'image/png' },
  'Secafi': { file: 'secafi.png', mime: 'image/png' },
};

async function seedPartenaireLogos({ strapi }: { strapi: Core.Strapi }) {
  if (!fs.existsSync(LOGOS_DIR)) {
    strapi.log.warn(`Seed: dossier logos introuvable (${LOGOS_DIR}), logos ignorés.`);
    return;
  }

  const allPartenaires = await strapi.documents('api::partenaire.partenaire').findMany({
    limit: 100,
    populate: ['logo'],
    status: 'published',
  });

  // Ne traiter que les partenaires sans logo (version publiée)
  const withoutLogo = allPartenaires.filter((p: any) => !p.logo);
  if (withoutLogo.length === 0) {
    strapi.log.info('Seed: tous les logos partenaires sont déjà présents, ignoré.');
    return;
  }

  strapi.log.info(`Seed: upload de ${withoutLogo.length} logos partenaires manquants...`);

  const allWithoutLogo = withoutLogo;

  let count = 0;
  const failed: string[] = [];

  for (const p of allWithoutLogo) {
    const logoInfo = partenaireLogos[p.nom];
    if (!logoInfo) continue;

    const filePath = path.join(LOGOS_DIR, logoInfo.file);
    if (!fs.existsSync(filePath)) {
      strapi.log.warn(`Seed: logo non trouvé pour ${p.nom}: ${filePath}`);
      continue;
    }

    try {
      const stats = fs.statSync(filePath);
      const uploaded = await strapi.plugin('upload').service('upload').upload({
        data: {
          fileInfo: {
            name: logoInfo.file,
            alternativeText: `Logo ${p.nom}`,
          },
        },
        files: {
          originalFilename: logoInfo.file,
          mimetype: logoInfo.mime,
          size: stats.size,
          filepath: filePath,
        },
      });

      if (uploaded?.length > 0) {
        await strapi.documents('api::partenaire.partenaire').update({
          documentId: p.documentId,
          data: { logo: uploaded[0].id },
          status: 'published',
        });
        count++;
      }
    } catch (err) {
      failed.push(p.nom);
      strapi.log.warn(`Seed: échec upload logo ${p.nom}: ${err instanceof Error ? err.message : err}`);
    }
  }

  strapi.log.info(`Seed: ${count} logos uploadés${failed.length > 0 ? `, ${failed.length} en échec (${failed.join(', ')})` : ''}. Terminé.`);
}

// ── Conventions collectives par USN ─────────────────────────────────────────

// Source : Livret d'accueil FNECS CFE-CGC (document officiel)
const conventionsParUSN: Record<string, { nom: string; idcc: string }[]> = {
  // SNEC (Commerce)
  'Commerce de gros': [
    { nom: 'Commerces de gros', idcc: '573' },
  ],
  'Ameublement': [
    { nom: 'Négoce de l\'ameublement', idcc: '1880' },
    { nom: 'Diagnostic technique du bâti', idcc: '' }, // IDCC à confirmer
  ],
  'Chaussure': [
    { nom: 'Détaillants en chaussures', idcc: '733' },
    { nom: 'Commerce succursaliste de la chaussure', idcc: '468' },
    { nom: 'Commerce des articles de sports et équipements de loisirs', idcc: '1557' },
  ],
  'Habillement': [
    { nom: 'Commerce de détail de l\'habillement et des articles textiles', idcc: '1483' },
    { nom: 'Maisons à succursales de vente au détail d\'habillement', idcc: '675' },
  ],
  'Bricolage': [
    { nom: 'Bricolage (vente au détail en libre-service)', idcc: '1606' },
    { nom: 'Fleuristes, vente et services des animaux familiers', idcc: '1978' },
    { nom: 'Jardineries et graineteries', idcc: '1760' },
    { nom: 'Commerces de quincaillerie, fournitures industrielles, fers, métaux et équipement de la maison', idcc: '3243' },
  ],
  'Grands Magasins': [
    { nom: 'Grands magasins et magasins populaires', idcc: '2156' },
  ],
  'Import-Export': [
    { nom: 'Import-export et commerce international', idcc: '43' },
  ],
  'Audiovisuel': [
    { nom: 'Commerces et services de l\'audiovisuel, électronique et équipement ménager', idcc: '1686' },
    { nom: 'Commerce de gros électronique — Librairie', idcc: '3013' },
    { nom: 'Entreprises du bureau et du numérique — Commerces et services', idcc: '1539' },
  ],
  'Commerce de Détail non alimentaire': [
    { nom: 'Commerces de détail non alimentaires', idcc: '1517' },
  ],
  'Activités Diverses': [
    { nom: 'Professions de la photographie', idcc: '3168' },
    { nom: 'Parfumerie sélective', idcc: '3235' },
    { nom: 'Esthétique-cosmétique et enseignement technique et professionnel lié aux métiers de l\'esthétique et de la parfumerie', idcc: '3032' },
    { nom: 'Commerces de gros de l\'habillement, mercerie, chaussure et jouet', idcc: '500' },
    { nom: 'Négoce et prestations de services médico-techniques', idcc: '1982' },
    { nom: 'Optique-lunetterie de détail', idcc: '1431' },
    { nom: 'Commerce de détail de l\'horlogerie-bijouterie', idcc: '1487' },
    { nom: 'Coiffure et professions connexes', idcc: '2596' },
  ],
  'e-commerce': [
    { nom: 'Commerce à distance et e-commerce', idcc: '2198' },
  ],
  // SNES (Services)
  'Travail Temporaire': [
    { nom: 'Salariés intérimaires des entreprises de travail temporaire', idcc: '2378' },
    { nom: 'Salariés permanents des entreprises de travail temporaire', idcc: '1413' },
  ],
  'Prévention Sécurité': [
    { nom: 'Entreprises de prévention et de sécurité', idcc: '1351' },
  ],
  'Propreté 3D': [
    { nom: 'Entreprises de désinfection, désinsectisation, dératisation (3D)', idcc: '1605' },
    { nom: 'Entreprises de propreté et services associés', idcc: '3043' },
  ],
  'Tourisme': [
    { nom: 'Opérateurs de voyages et guides', idcc: '3245' },
    { nom: 'Organismes de tourisme', idcc: '1909' },
    { nom: 'Guides d\'expédition, guides accompagnateurs et guides animateurs en milieu amazonien', idcc: '2658' },
  ],
  'Services Funéraires': [
    { nom: 'Pompes funèbres', idcc: '759' },
  ],
  'Services Tertiaires - Prestataires de Services': [
    { nom: 'Personnel des prestataires de services dans le domaine du secteur tertiaire', idcc: '2098' },
    { nom: 'Entreprises de services à la personne', idcc: '3127' },
  ],
};

async function seedConventions({ strapi }: { strapi: Core.Strapi }) {
  // Vérifier via un marqueur : Bricolage a-t-elle l'IDCC 3243 (livret) ou 3160 (ancienne version) ?
  const bricolage = await strapi.documents('api::structure.structure').findFirst({
    filters: { type: 'usn', nom: 'Bricolage' },
    populate: ['conventions_collectives'],
    status: 'published',
  });
  const hasLivretData = bricolage?.conventions_collectives?.some(
    (c: any) => c.idcc === '3243'
  );
  if (hasLivretData) {
    strapi.log.info('Seed: conventions collectives (livret) déjà présentes, ignoré.');
    return;
  }

  strapi.log.info('Seed: mise à jour des conventions collectives (source livret d\'accueil)...');

  const allUSN = await strapi.documents('api::structure.structure').findMany({
    filters: { type: 'usn' },
    limit: 50,
    status: 'published',
  });

  let count = 0;
  for (const usn of allUSN) {
    const conventions = conventionsParUSN[usn.nom];
    if (!conventions) continue;

    await strapi.documents('api::structure.structure').update({
      documentId: usn.documentId,
      data: { conventions_collectives: conventions },
      status: 'published',
    });
    count++;
  }

  strapi.log.info(`Seed: conventions ajoutées à ${count} USN.`);
}
