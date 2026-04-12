# FNECS CFE-CGC — Document maître projet
**La Faabrick Cherdet**
Version 2.1 — Mars 2026

> Statut : document maître de travail interne. Les documents précédents sont archivés et ne font plus foi.
> Usage : document de contexte à relire au début de chaque session de travail sur le projet.

## 0. Lecture rapide en début de session

### 0.1 À retenir immédiatement

- Projet : refonte du site FNECS CFE-CGC avec espace public, espace adhérent, back-office et gestion d'adhésion.
- Cible produit : PWA en lot initial, pas d'applications natives iOS / Android.
- Source métier de référence : Dynamics 365 reste le CRM maître côté fédération.
- CMS éditorial : Strapi headless.
- Authentification retenue : Better Auth, auto-hébergé.
- Hébergement applicatif : full Scaleway.
- Données applicatives : PostgreSQL + Object Storage sur Scaleway, en France.
- Paiement : SogeCommerce (Société Générale) — en validation, remplace Stripe.
- Hors V1 sauf arbitrage contraire : chatbot IA, système de tickets complet, SEA, fonctionnalités communautaires avancées.

### 0.2 Décisions encore ouvertes

- Prestataire paiement : SogeCommerce probable (remplace Stripe), à confirmer.
- Modèle paiement : ~75% prélèvement SEPA, ~25% chèque/virement/CB — gestion mixte à architecturer.
- Validation admin sur renouvellement : oui ou non.
- Politique de refus / remboursement sur adhésion rejetée.
- Liste USN exhaustive, nettoyée et validée.
- Règles d'accès aux ressources : universelles, filtrées par USN ou mixtes.

### 0.3 Priorité de travail actuelle

- Verrouiller la nomenclature V1.
- Préparer les ateliers client et les décisions à obtenir.
- Clarifier les flux d'adhésion et de synchronisation avant démarrage du build.
- Transformer les zones floues du document en décisions explicites.

---

## 1. Objet du document

Ce document est la base de départ opérationnelle après attribution du contrat. Il consolide :
- ce qui est acté (socle technique et fonctionnel),
- ce qui doit être challengé avant de coder quoi que ce soit,
- la nomenclature V0 à valider en atelier,
- les flux métier concrets (adhésion, accès, renouvellement),
- les décisions critiques à prendre avant build,
- le plan d'action des 30 premiers jours.

Il fera l'objet d'une prochaine révision après les ateliers de nomenclature avec la FNECS.

---

## 2. Ce qui est acté (socle)

- **Contrat remporté** — La Faabrick Cherdet est le prestataire retenu.
- **Cible produit** : PWA (pas d'apps natives en lot initial).
- **Périmètre V1** : site public + espace adhérent/intranet + back-office + gestion adhésions (paiement Stripe + sync Dynamics).
- **Hors V1** (sauf décision contraire) : chatbot IA, système de tickets, campagnes SEA, fonctionnalités communautaires avancées.
- **Source métier adhésions** : Dynamics 365 conservé comme CRM de référence côté fédération — à ne pas remplacer.
- **CMS éditorial** : Strapi headless (instance de démo déjà réalisée, acté).
- **Socle infrastructure acté** : application + PostgreSQL + Object Storage sur Scaleway, données en France.
- **Paiement** : SogeCommerce (Société Générale) en cours de validation — remplace Stripe.
- **Budget** : 37 000 € forfait (hors hébergement mensuel, hors maintenance récurrente).
- **Volume** : ~5 000 adhérents à migrer depuis Dynamics.

---

## 3. Stack technique cible

| Composant | Technologie | Statut |
|-----------|-------------|--------|
| Frontend | Next.js PWA | Acté |
| Authentification | **Better Auth** | Acté (voir §4.1) |
| CMS éditorial | Strapi headless | Acté |
| Base de données applicative | PostgreSQL (Scaleway) | Acté |
| CRM client | Dynamics 365 | Acté — source maître |
| Paiement | **SogeCommerce** (Société Générale) | En validation (remplace Stripe — voir §4.5) |
| Stockage fichiers | Scaleway Object Storage | Acté |
| Sync Dynamics → app | Power Automate (webhooks) | Côté client à configurer |
| Email transactionnel | Brevo | Recommandé |
| Hébergement app | **Scaleway (full)** | **Acté** (voir §4.6) |

---

## 4. Points à challenger avant build

### 4.1 Authentification : Better Auth retenu (Clerk écarté)

**Décision :** Better Auth remplace Clerk.

**Pourquoi Clerk a été écarté :**
- Entreprise américaine — données d'authentification hors UE par défaut.
- L'appartenance syndicale est une donnée sensible au sens de l'article 9 du RGPD (données révélant des opinions syndicales). Stocker les credentials d'adhérents chez un hébergeur US est juridiquement fragile.
- L'option "EU data residency" Clerk est sur plan payant (~50-100€/mois) — coût récurrent non prévu.
- Vendor lock-in fort : tous les `clerk_user_id` dans PostgreSQL rendent la migration ultérieure coûteuse.
- SPOF sur le flux d'activation : si l'API Clerk est en panne, plus aucun adhérent ne peut être activé.

**Pourquoi Better Auth :**
- Open source, MIT, auto-hébergé sur Scaleway France — RGPD natif, zéro dépendance externe.
- L'équipe Auth.js a officiellement rejoint Better Auth (septembre 2025) — Auth.js est en maintenance, Better Auth est le successeur recommandé.
- v1.5.2 en production (mars 2026), 26 900+ étoiles GitHub, 611 000 téléchargements/semaine, YC-backed.
- **Plugin invitation natif** : le flux d'activation adhérent (token → email → définition du mot de passe) est intégré, pas à construire from scratch.
- **Plugin magic link natif** : connexion par lien email sans mot de passe (voir §4.1.1).
- Plugin RBAC pour les rôles admin.
- Coût : 0€.

#### 4.1.1 Magic link — connexion sans mot de passe

**Décision :** activer le magic link en complément de l'authentification email + mot de passe (approche hybride).

**Principe :** l'adhérent entre son email → reçoit un lien temporaire → clique → connecté. Pas de mot de passe à retenir.

**Justification :**
- Les adhérents FNECS ne se connectent pas quotidiennement → oubli de mot de passe fréquent et prévisible.
- Public varié, pas tous à l'aise avec la gestion de mots de passe.
- Réduit significativement les demandes support "mot de passe oublié".
- Plugin Better Auth built-in — coût d'implémentation quasi nul.

**Approche hybride retenue :**
- Connexion classique email + mot de passe toujours disponible.
- Bouton alternatif "Recevoir un lien de connexion" sur la page de connexion.
- L'adhérent choisit le mode qu'il préfère à chaque connexion.
- Le reset mot de passe classique reste disponible en complément.

**Point de vigilance :** Better Auth dans le middleware Next.js peut causer des problèmes de build dans certaines configurations App Router. À tester en environnement d'intégration dès le début, pas à la fin.

---

### 4.2 Flux de validation manuelle : friction à anticiper

Le flux prévu crée un délai entre paiement et accès :

```
Adhérent paie → statut 'pending' → admin valide dans Dynamics
→ webhook → Better Auth invitation → email adhérent
```

**Risques concrets :**
- L'adhérent vient de payer et attend sans feedback clair → frustration, appels support.
- Si l'admin valide après 7 jours → token expiré → adhérent bloqué.
- Cas non traité : admin **refuse** l'adhésion (critères non remplis) → que se passe-t-il ? Remboursement Stripe ? Email automatique ?

**États métier à normaliser dès maintenant :**

| Statut | Description | Action système |
|--------|-------------|----------------|
| `pending` | Paiement reçu, validation admin en attente | Email de confirmation + délai expliqué |
| `active` | Validé par admin, accès accordé | Invitation Better Auth envoyée |
| `rejected` | Refusé par admin | Email + remboursement Stripe (politique à définir) |
| `expired` | Adhésion échue | Accès restreint, relances renouvellement |
| `suspended` | Suspendu manuellement | Accès bloqué, contact support |

**Décisions à prendre avec le client :**
- Quel est le délai réel de validation aujourd'hui ?
- Politique de remboursement en cas de refus ?
- La validation admin est-elle nécessaire sur les renouvellements, ou uniquement les nouvelles adhésions ?
- Durée d'expiration du token d'invitation (recommandation : 7 jours minimum).
- Bouton "renvoyer le lien" dans le back-office admin (indispensable).

---

### 4.3 Power Automate — dépendance côté client (SPOF)

La sync Dynamics → PostgreSQL passe par Power Automate configuré **par le client** dans son environnement Microsoft. Si ce flow tombe ou est mal configuré, les webhooks ne partent pas → désynchronisation silencieuse.

**Actions à planifier :**
- Identifier qui gère Dynamics / Power Automate côté FNECS (interne ? consultant ? Microsoft direct ?).
- Documenter précisément le flow attendu : déclencheurs, payload JSON, URL webhook, auth.
- Prévoir une session de configuration avec l'équipe FNECS.
- Endpoint de test `/api/webhooks/test` pour valider les payloads en dev.
- Le job de réconciliation quotidien est **non optionnel** — doit logger et alerter en cas d'écart.
- Prévoir une interface de monitoring dans le back-office admin (journal de sync, erreurs, reprise manuelle).

---

### 4.4 Migration des 5 000 adhérents — sujet le plus risqué

**Ce qu'on ne sait pas encore :**
- Qualité des données Dynamics : emails valides ? doublons ? formats homogènes ?
- Format d'export disponible (CSV, Excel, API Dataverse ?) .
- Faut-il migrer tous les adhérents ou uniquement les actifs ?
- Les adhérents expirés : compte sans accès ou pas de compte ?

**Actions :**
- Demander un export anonymisé (20-50 lignes) pour auditer la structure des données avant de modéliser quoi que ce soit.
- Définir les règles de migration : champs, statuts, exclusions.
- Phase de nettoyage / déduplication avant import.

**Stratégie d'activation :** ne pas envoyer 5 000 emails d'invitation en une fois — risque spam, flood support, tokens expirés en masse. Préférer une activation progressive par vague ou une mécanique "première connexion" au lancement.

---

### 4.5 Paiement : SogeCommerce en remplacement de Stripe

**Évolution post-atelier :** le client a indiqué utiliser **SogeCommerce** (Société Générale). Stripe est écarté.

**Raison métier clé :** SogeCommerce permet le **dispatching automatique des fonds** vers les comptes bancaires des deux syndicats de la fédération (SNES et SNEC) en fonction du secteur d'appartenance de l'adhérent. Avec Stripe, cela aurait nécessité Stripe Connect ou un traitement manuel.

**Données terrain (atelier) :**
- ~75% des adhésions sont en **prélèvement automatique** (SEPA).
- ~25% restants : chèque, virement ou CB.
- Deux relances envoyées : **janvier** et **mars** (pour la population non-prélèvement).

**Ce que ça implique techniquement :**
- L'intégration paiement se fait via l'API SogeCommerce (webhooks → backend → PostgreSQL) — architecture similaire à Stripe.
- Le prélèvement SEPA récurrent doit être supporté nativement par SogeCommerce (à vérifier).
- La qualité de l'API et de la documentation SogeCommerce est historiquement inférieure à Stripe — à évaluer tôt.
- Les délais d'ouverture de compte et de mise en production sont potentiellement plus longs qu'avec Stripe.

**Règle de prorata (atelier) :**
- Toute adhésion en cours d'année court jusqu'au **31 décembre**.
- Le montant est calculé **au prorata des mois restants**.
- Règle d'arrondi : une adhésion en cours de mois **entraîne le paiement du mois en cours** (mois entamé = mois dû).
- Exemple : adhésion le 15 septembre → paiement de septembre à décembre (4 mois).

**Ce que ça implique techniquement :**
- Logique de calcul du montant côté backend à partir du tarif annuel et de la date du jour.
- Le tarif annuel de référence doit être configurable (admin ou Strapi).
- À la date de renouvellement (janvier), tout le monde repasse sur le tarif annuel complet.

**Points à vérifier / décisions restantes :**
- Confirmation formelle du choix SogeCommerce par le client.
- Tarif d'adhésion : uniforme ou variable (par secteur, par statut) ?
- Les ~25% hors prélèvement : activation manuelle côté admin avec statut "payé hors ligne" ?
- Le dispatching SNES/SNEC est-il géré côté SogeCommerce ou côté back-office ?

---

### 4.6 Hébergement : full Scaleway (acté)

**Décision :** hébergement full Scaleway. Vercel écarté pour l'application principale.

**Raisonnement :**
- Le cahier des charges FNECS n'impose pas explicitement un hébergement sans acteur US, mais il demande un hébergement sécurisé et conforme RGPD.
- Pour l'application principale, on préfère une ligne simple : éviter que les flux adhérents, l'authentification, l'admin et les webhooks transitent par une infrastructure d'hébergement US.
- Vercel reste défendable juridiquement dans certains montages, mais il ajoute un débat RGPD et une dépendance supplémentaire qui n'apportent pas assez de valeur dans ce contexte.
- Full Scaleway est plus cohérent avec Better Auth auto-hébergé et avec notre volonté de garder le coeur adhérent sur une infrastructure française.

**Ce que ça implique :**
- Next.js déployé en container Docker sur Scaleway (Containers ou Kapsule).
- CI/CD à configurer (GitHub Actions → build → deploy Scaleway).
- Reverse proxy (Traefik ou Caddy) pour SSL et routing.
- Pas de preview deploys automatiques (ou à construire soi-même).
- Coût ops légèrement supérieur, mais prévisible et maîtrisé.

**Note :** full Scaleway ne signifie pas "zéro prestataire non-européen". Stripe reste conservé pour le paiement. Pour l'email transactionnel, Brevo est privilégié afin de garder cette brique sur un acteur européen. La ligne retenue est pragmatique : coeur adhérent et hébergement applicatif en France, exceptions limitées quand elles sont standard et justifiées.

---

### 4.7 Formations fédération — automatisation (nouveau périmètre V1)

**Contexte (atelier) :** Aujourd'hui, Gérald (FNECS) crée les formations dans Dynamics, les ressaisit manuellement sur le site, et met à jour le nombre de places à la main quand un adhérent s'inscrit par email. La refonte doit automatiser ce flux.

**Flux cible :**
```
Gérald crée une formation dans Dynamics 365
        ↓
Power Automate → webhook → backend
        ↓
PostgreSQL : INSERT dans table formations
(nom/session, nombre de places, date début, date fin, commentaire)
        ↓
Espace adhérent : onglet "Formations"
├── Calendrier des formations à venir
├── Détail : places restantes, dates, description
└── Bouton "S'inscrire" (si places disponibles + adhérent actif)
        ↓
Inscription → table formation_registrations
Places restantes décomptées automatiquement
        ↓
Sync → Dynamics (création inscription dans le CRM)
  - Cible : API Dataverse ou Power Automate entrant
  - Fallback : email automatique à Gérald
        ↓
Notification email à Gérald (confirmation)
```

**Modèle de données à ajouter (V0) :**
```sql
CREATE TABLE formations (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    dynamics_id     VARCHAR(255) UNIQUE NOT NULL,
    title           VARCHAR(500) NOT NULL,
    description     TEXT,
    comment         TEXT,                          -- case commentaire libre
    total_seats     INTEGER NOT NULL,
    start_date      TIMESTAMP NOT NULL,
    end_date        TIMESTAMP NOT NULL,
    status          VARCHAR(50) DEFAULT 'open',    -- open|full|cancelled|completed
    created_at      TIMESTAMP DEFAULT NOW(),
    updated_at      TIMESTAMP DEFAULT NOW()
);

CREATE TABLE formation_registrations (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    formation_id    UUID REFERENCES formations(id) ON DELETE CASCADE,
    member_id       UUID REFERENCES members(id) ON DELETE CASCADE,
    registered_at   TIMESTAMP DEFAULT NOW(),
    cancelled_at    TIMESTAMP,
    status          VARCHAR(50) DEFAULT 'registered', -- registered|cancelled|attended
    UNIQUE(formation_id, member_id)
);

CREATE INDEX idx_formations_status ON formations(status);
CREATE INDEX idx_formations_start ON formations(start_date);
CREATE INDEX idx_registrations_formation ON formation_registrations(formation_id);
CREATE INDEX idx_registrations_member ON formation_registrations(member_id);
```

**Décisions à prendre :**
- **Désinscription adhérent** : self-service depuis l'espace adhérent ou uniquement par email auprès de l'admin ? (pas encore tranché)
- **Sync inscriptions → Dynamics (confirmé)** : Gérald continue de gérer les inscriptions dans Dynamics. Chaque inscription sur le site doit **créer automatiquement l'inscription dans le CRM** (via API Dataverse ou Power Automate entrant). En fallback : email automatique à Gérald avec les détails de l'inscription. Recommandation : implémenter les deux (sync auto + email fallback en cas d'échec du webhook).
- Notification à Gérald quand quelqu'un s'inscrit et/ou quand la formation est complète ?
- Formations ouvertes à tous les adhérents ou filtrées par USN/secteur ?
- Modification d'une formation dans Dynamics (changement de date, ajout de places) → mise à jour automatique via webhook ?

---

### 4.8 Suivi adhérents par bureau USN — remplacement du reporting manuel

**Contexte (atelier) :** Chaque mois, Gérald dépose manuellement dans l'espace adhérent des membres du bureau de chaque USN un document listant les adhérents de leur secteur avec : statut (actif ou non), cotisation à jour, mandats. Processus répétitif et chronophage. L'enjeu principal est de vérifier que les adhérents qui ont un mandat sont bien à jour de cotisation.

**Deux options de restitution (à valider avec le bureau USN) :**

**Option A — Vue en ligne dans l'espace adhérent** : les membres du bureau se connectent et voient un tableau en temps réel des adhérents de leur USN. Toujours à jour, export PDF/Excel à la demande. Gérald ne fait plus rien.

**Option B — Génération automatique + envoi mail mensuel** : le système génère et envoie automatiquement le document chaque mois. Gérald ne fait plus rien non plus, les membres du bureau gardent l'habitude de recevoir un fichier.

Les deux options sont cumulables.

**Ce que ça implique dans tous les cas :**
- **Flag `is_bureau_usn`** sur la table `members` (booléen, synchro depuis Dynamics). Si `true`, l'adhérent accède au tableau de bord de son USN (déterminé par son `usn_id`). Accès lecture seule.
- Données affichées : nom, prénom, numéro adhérent, statut, cotisation à jour, mandats.
- **Mandats** : champ texte simple synchronisé depuis Dynamics (ex: "DS, élu CSE, RSS"). ~15 types de mandats différents, en général moins de 3 par adhérent. Sync via webhook Power Automate (même pattern que les autres données adhérent) + réconciliation quotidienne.

**Décisions à prendre :**
- Option A, B ou les deux ? À valider avec les membres du bureau USN.
- Le flag `is_bureau_usn` est géré par Gérald dans Dynamics (synchro webhook). À confirmer avec lui.
- Un membre du bureau peut-il voir plusieurs USN ou uniquement la sienne ? (si plusieurs, il faudra une table de liaison plutôt qu'un simple `usn_id`)

---

### 4.9 Notifications push — à cadrer précisément

**Points à définir avec le client :**
- Qui peut envoyer des push ? Admin fédé uniquement au lancement (recommandé) ou aussi USN ?
- Cas d'usage concrets : actualité importante, campagne adhésion, expiration imminente ?
- Notifications globales ou segmentées par secteur ?

**Recommandation :** démarrer admin-only, fréquence max 1/semaine. Ne pas ouvrir aux USN au lancement — risque de sur-sollicitation et désabonnements.

**Point de vigilance PWA :** les notifications push sur iOS nécessitent l'installation sur l'écran d'accueil ET un consentement explicite. La promesse "notifications comme une vraie app" suppose que l'adhérent installe la PWA. Prévoir un parcours d'installation guidé + taux d'activation cible à définir avec le client.

---

## 5. Nomenclature V0 — à valider en atelier

> **Priorité absolue.** La nomenclature conditionne les maquettes, le modèle Strapi et le développement. Rien ne peut démarrer sans une arborescence validée.

### 5.1 Constats sur le site actuel (à corriger en V1)

Analyse du site existant :
- Routes en doublon : `/actualite` et `/actualites` — à canoniser.
- Plusieurs points d'entrée pour l'espace adhérent : `/connexion`, `/espace-adherent`, `/adherent/mon-espace` — à simplifier en un seul.
- Labels confus : "adhérez", "adhésion en ligne", "espace adhérent" — vocabulaire à unifier.
- Pages USN orientées contact uniquement, peu orientées parcours ou ressources.

**Règles de nommage à appliquer dès la V1 :**
- Un seul slug canonique par contenu.
- Slugs en minuscules, tirets, sans accents (`/actualites`, `nos-secteurs`).
- Pluriels homogènes sur tout le site.
- Redirections 301 systématiques depuis les anciennes routes.
- Labels basés sur le vocabulaire utilisateur, pas technique.

---

### 5.2 Espace public

```
Accueil
│
├── La Fédération
│   ├── Qui sommes-nous
│   ├── Notre organisation (bureau fédéral, instances)
│   ├── Pourquoi adhérer
│   └── Histoire & valeurs
│
├── Nos secteurs (= pages USN)
│   ├── [Vue d'ensemble — recherche par secteur / code NAF]
│   ├── Activités diverses
│   ├── Ameublement
│   ├── Audiovisuel
│   ├── Bricolage
│   ├── Chaussure
│   ├── Commerce de détail
│   ├── Commerce de gros
│   ├── E-commerce
│   ├── Grands magasins
│   ├── Habillement
│   ├── Import-export
│   ├── Prestataires de services
│   ├── Professions libérales
│   ├── Propreté
│   ├── Sécurité-prévention
│   ├── Services funéraires
│   ├── Tourisme
│   ├── Travail temporaire
│   └── [...liste à valider avec la FNECS]
│
├── Actualités
│   └── [filtrables par secteur / thématique]
│
├── Publications & ressources publiques
│
├── Adhérer
│   └── Parcours d'adhésion (formulaire + paiement Stripe)
│
└── Contact
```

**Questions ouvertes :**
- 19 USN identifiées — liste exhaustive ? certaines à fusionner ou scinder ?
- Toutes les USN ont-elles une page dédiée au lancement, ou prioriser les plus actives ?
- Outil "trouver mon syndicat" par code NAF — V1 ou V2 ?
- "Publications" : documents publics uniquement ou aussi communiqués de presse, rapports annuels ?

---

### 5.3 Page USN — gabarit type (Strapi)

Chaque page USN suit un gabarit commun géré via Strapi par le contributeur USN :

```
[Nom de l'USN]
├── Présentation (texte libre)
├── Contacts clés (responsables, délégués — champs structurés)
├── Actualités sectorielles (filtrées depuis la liste générale)
├── Documents publics (tracts, guides, CCN — niveau confidentialité : public)
└── [Espace adhérent] Ressources internes USN (niveau : restreint USN)
```

---

### 5.4 Espace adhérent (post-connexion)

```
Mon espace
├── Tableau de bord
│   ├── Statut adhésion + date d'expiration
│   └── Alertes (renouvellement proche, nouveau document disponible)
│
├── Ressources fédération
│   ├── Capsules pédagogiques (conventions collectives)
│   ├── Guides pratiques
│   └── Modèles d'accords et tracts
│
├── Ressources USN (filtrées par secteur de l'adhérent)
│   ├── Documents sectoriels
│   └── Actualités réservées membres
│
├── Mes documents
│   ├── Attestation de cotisation (uploadée par l'admin)
│   └── Ma carte adhérent
│
├── Formations
│   ├── Calendrier des formations à venir
│   ├── Détail formation (places restantes, dates, description)
│   ├── S'inscrire / se désinscrire
│   └── Mes inscriptions (historique)
│
├── Mon adhésion
│   ├── Statut, date d'échéance
│   └── Renouveler / modifier mes informations
│
├── [Si bureau USN] Suivi adhérents de mon secteur
│   ├── Tableau : liste adhérents USN (statut, cotisation, mandats)
│   └── Export PDF / Excel
│
└── Mon profil
    └── Changer email / mot de passe
```

**Questions ouvertes :**
- Les ressources fédération sont-elles accessibles à tous les adhérents ou filtrées par secteur ?
- Un adhérent peut-il appartenir à plusieurs USN (multi-appartenance) ?
- Y a-t-il des ressources visibles uniquement par certains rôles syndicaux (délégués, élus CSE) ?

---

### 5.5 Back-office (trois espaces distincts)

```
1. STRAPI (gestion éditoriale)
   Qui : rédacteurs, contributeurs USN
   Quoi : actualités, pages USN, documents publics, médias
   Rôles : Super Admin / Admin Fédération / Contributeur USN / Rédacteur
   Auth : système interne Strapi (DB Strapi)

2. INTERFACE ADMIN CUSTOM (Next.js)
   Qui : admin fédération
   Quoi : gestion adhérents, upload documents, monitoring sync
   Sections :
   ├── Adhérents (liste, fiche, statut, historique paiements)
   ├── Documents (upload attestations, cartes)
   ├── Invitations (renvoyer lien, voir tokens expirés)
   └── Sync Dynamics (journal, erreurs, reprise manuelle)
   Auth : Better Auth — compte admin dédié (La Faabrick, seul accès admin)

3. DYNAMICS 365 (CRM)
   Qui : équipe FNECS
   Quoi : validation adhésions, gestion CRM
   Auth : Microsoft (hors de notre scope)
```

Ces trois espaces ne partagent pas d'authentification. Une même personne peut avoir un compte dans les trois — ce sont trois comptes indépendants.

---

### 5.6 Taxonomie transverse — axes de classification

À modéliser dans Strapi et dans PostgreSQL dès le départ :

| Axe | Valeurs |
|-----|---------|
| **USN** | Liste des 19+ secteurs (à valider) |
| **Type de contenu** | actualité, publication, guide, modèle, capsule, document administratif |
| **Thématique métier** | droits, négociation, CSE, conventions collectives, adhésion |
| **Audience** | public, adhérent, restreint USN, interne fédération |
| **Niveau de confidentialité** | public / adhérent / restreint USN / interne fédération |
| **Cycle de vie** | brouillon, en relecture, publié, archivé |

Le niveau de confidentialité conditionne directement les règles d'accès dans l'espace adhérent. C'est un champ à renseigner sur chaque ressource dans Strapi, et à contrôler dans le middleware Next.js.

---

## 6. Flux métier détaillés

### 6.1 Nouvelle adhésion

```
Visiteur remplit le formulaire sur /adherer
        ↓
Paiement Stripe (one-time ou abonnement — à trancher)
        ↓
Webhook Stripe → backend
        ↓
        ┌─────────────────────────┐
        ▼                         ▼
PostgreSQL                   Dynamics 365
status = 'pending'           CREATE contact (statut "en attente")
        ↓
Email de confirmation automatique à l'adhérent
("Votre demande est en cours de validation — délai : X jours ouvrés")
Notification à l'admin (email ou Teams)
        ↓
Admin valide dans Dynamics
        ↓
Power Automate → webhook → backend
        ↓
        ┌─────────────────────────┐
        ▼                         ▼
PostgreSQL                   Better Auth
status = 'active'            createInvitation() → token 7 jours
        ↓
Email adhérent : lien d'activation
        ↓
Adhérent clique → définit son mot de passe
        ↓
Compte actif — accès espace adhérent
```

**Cas de refus (statut `rejected`) :**
```
Admin refuse dans Dynamics
        ↓
Power Automate → webhook → backend
        ↓
PostgreSQL : status = 'rejected'
Stripe : remboursement automatique (si politique validée)
Email adhérent : motif de refus + contact support
```

---

### 6.2 Connexion au quotidien

```
Adhérent se connecte via Better Auth :
  - Option A : email + mot de passe (classique)
  - Option B : magic link (entre son email → reçoit un lien → clique → connecté)
        ↓
Session créée (cookie sécurisé, self-hosted)
        ↓
Middleware Next.js sur /espace-adherent/*

SELECT status, adhesion_expires_at, usn_id
FROM members
WHERE auth_user_id = [session.user.id]
        ↓
status = 'active' ET expires_at futur  → accès OK
status = 'active' ET expires_at dépassé → /renouveler
status = 'pending'                       → /adhesion-en-cours
status = 'rejected'                      → /adhesion-refusee
status = 'suspended'                     → /contact
Pas de membre trouvé                     → /connexion (erreur)
```

---

### 6.3 Renouvellement (Option A — paiement annuel)

```
J-30 : email automatique "Votre adhésion expire dans 30 jours"
J-7  : relance
J-0  : status → 'expired' dans PostgreSQL
       Accès espace adhérent restreint → /renouveler

Adhérent clique "Renouveler"
        ↓
Paiement Stripe
        ↓
Webhook Stripe → backend
        ↓
PostgreSQL : status = 'active', adhesion_expires_at = +1 an
Dynamics : UPDATE contact
        ↓
Accès restauré immédiatement
(pas de validation admin sur renouvellement — à confirmer)
```

---

### 6.4 Interface admin — gestion quotidienne

```
/admin/adherents
├── Liste avec filtres (statut, USN, expiration proche)
├── Fiche adhérent :
│   ├── Statut, dates, USN, historique paiements
│   ├── Upload document → Scaleway Object Storage + métadonnées PostgreSQL
│   ├── Renvoyer lien d'activation (token expiré)
│   └── Lien vers fiche Dynamics
└── Monitoring sync
    ├── Journal des webhooks reçus (succès / erreur)
    ├── Dernière réconciliation
    └── Bouton "forcer réconciliation"
```

---

## 7. Modèle de données PostgreSQL (V0)

```sql
-- Adhérents (projection applicative de Dynamics)
CREATE TABLE members (
    id                    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    -- Liens externes
    auth_user_id          VARCHAR(255) UNIQUE,          -- Better Auth, NULL avant activation
    dynamics_id           VARCHAR(255) UNIQUE NOT NULL,
    member_number         VARCHAR(50) UNIQUE NOT NULL,   -- numéro adhérent unique (attribué par Dynamics)
    stripe_customer_id    VARCHAR(255),
    -- Données copiées depuis Dynamics
    email                 VARCHAR(255) NOT NULL,
    first_name            VARCHAR(255),
    last_name             VARCHAR(255),
    usn_id                VARCHAR(100),                 -- secteur d'appartenance
    -- Statut applicatif
    status                VARCHAR(50) DEFAULT 'pending', -- pending|active|rejected|expired|suspended
    adhesion_expires_at   TIMESTAMP,
    -- Rôle back-office
    is_bureau_usn         BOOLEAN DEFAULT FALSE,         -- membre du bureau de son USN (synchro Dynamics)
    mandates              TEXT,                           -- mandats synchro Dynamics (texte libre, ex: "DS, élu CSE, RSS")
    -- Sync
    dynamics_synced_at    TIMESTAMP,
    created_at            TIMESTAMP DEFAULT NOW(),
    updated_at            TIMESTAMP DEFAULT NOW()
);

-- Documents adhérents
CREATE TABLE member_documents (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    member_id       UUID REFERENCES members(id) ON DELETE CASCADE,
    file_url        TEXT NOT NULL,                       -- URL Scaleway (pré-signée à la lecture)
    file_name       VARCHAR(255),
    file_type       VARCHAR(100),                        -- attestation_cotisation|carte_adherent
    file_size_bytes INTEGER,
    uploaded_by     VARCHAR(255),
    created_at      TIMESTAMP DEFAULT NOW()
);

-- Tokens d'invitation Better Auth (si non géré nativement par Better Auth)
CREATE TABLE member_invitations (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    member_id   UUID REFERENCES members(id),
    token       VARCHAR(255) UNIQUE NOT NULL,
    expires_at  TIMESTAMP NOT NULL,
    used_at     TIMESTAMP,
    created_at  TIMESTAMP DEFAULT NOW()
);

-- Journal de synchronisation Dynamics
CREATE TABLE sync_log (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    dynamics_id     VARCHAR(255),
    event_type      VARCHAR(100),                        -- status_change|data_update|delete
    payload         JSONB,
    status          VARCHAR(50),                         -- success|error|ignored
    error_message   TEXT,
    created_at      TIMESTAMP DEFAULT NOW()
);

-- Index
CREATE INDEX idx_members_auth_user_id   ON members(auth_user_id);
CREATE INDEX idx_members_dynamics_id    ON members(dynamics_id);
CREATE INDEX idx_members_status         ON members(status);
CREATE INDEX idx_members_expires_at     ON members(adhesion_expires_at);
CREATE INDEX idx_documents_member_id    ON member_documents(member_id);
CREATE INDEX idx_sync_log_dynamics_id   ON sync_log(dynamics_id);
```

---

## 8. Synchronisation Dynamics ↔ PostgreSQL

PostgreSQL n'est **pas un miroir** de Dynamics — c'est une projection applicative. On ne stocke que ce dont l'app a besoin. Dynamics reste propriétaire des données métier (statut, données personnelles, historique CRM). PostgreSQL est propriétaire des données applicatives (auth, documents, paiement).

| Champ | Propriétaire | Sync |
|-------|-------------|------|
| Statut adhésion | Dynamics | D→PG via Power Automate |
| Date expiration | Dynamics | D→PG via Power Automate |
| Numéro adhérent | Dynamics | D→PG via Power Automate (identifiant unique) |
| Mandats | Dynamics | D→PG via Power Automate |
| Flag bureau USN | Dynamics | D→PG via Power Automate |
| Nom, prénom, email | Dynamics | D→PG via Power Automate |
| USN / secteur | Dynamics | D→PG via Power Automate |
| auth_user_id | PostgreSQL | jamais vers Dynamics |
| stripe_customer_id | PostgreSQL | jamais vers Dynamics |
| Formations (création) | Dynamics | D→PG via Power Automate |
| Inscriptions formations | PostgreSQL + Dynamics | PG→D : chaque inscription crée une entrée dans Dynamics (API Dataverse ou Power Automate) + email fallback à Gérald |
| Documents | PostgreSQL + Scaleway | jamais vers Dynamics |

**En cas de conflit : Dynamics gagne.** Le job de réconciliation quotidien corrige PostgreSQL si un webhook a été raté.

---

## 9. Registre de risques (V0)

| Ref | Risque | Probabilité | Impact | Mesure |
|-----|--------|-------------|--------|--------|
| R1 | Glissement planning par validation tardive côté client | Haute | Moyen | Rituels de validation hebdomadaires, jalons signés |
| R2 | Désynchronisation Dynamics ↔ app sur cas limites | Moyenne | Haute | Job réconciliation + monitoring + sync_log |
| R3 | Complexité droits contributeurs USN sous-estimée | Moyenne | Moyen | Modéliser la matrice rôles dès l'atelier 1 |
| R4 | Migration des 5 000 adhérents (qualité données) | Haute | Haute | Export sample + audit avant build |
| R5 | Promesse PWA iOS trop ambitieuse (push, installation) | Moyenne | Moyen | Documenter les limites, parcours installation guidé |
| R6 | Power Automate mal configuré côté client | Moyenne | Haute | Session de configuration + endpoint de test |
| R7 | Better Auth dans middleware Next.js (build crash) | Faible | Moyen | Tester en environnement d'intégration dès le début |
| R8 | Périmètre V1 surchargé (tickets, IA, SEO) | Moyenne | Moyen | Définir explicitement le hors-périmètre V1 avec le client |

**Mesures transverses :**
- Journal des décisions (ADR) tenu dès la phase cadrage.
- Rituels de validation hebdomadaires avec la FNECS.
- Tests de synchronisation sur données réelles anonymisées avant la mise en prod.

---

## 10. Gouvernance — interlocuteurs à identifier

| Rôle | Qui ? | Canal |
|------|-------|-------|
| Décideur projet (validation maquettes, périmètre) | ? | |
| Admin back-office (gestion adhérents, upload docs) | ? | |
| Responsable Dynamics 365 / Power Automate | ? | |
| Référents USN (combien actifs au lancement ?) | ? | |
| Validation RGPD / DPO | ? | |
| Validation charte graphique CFE-CGC | ? | |

**RGPD :**
- Notre périmètre : mentions légales, politique de confidentialité, bannière cookies, consentement adhésion, registre de traitement.
- Hors périmètre sauf avenant : dépôt CNIL, audit RGPD complet.
- Même avec Better Auth self-hosted, vérifier Stripe et Brevo dans la cartographie des sous-traitants.

**RGAA :**
- Engagement pris en audition : conformité niveau AA sur les pages clés.
- À clarifier : audit final par nous ou cabinet tiers ? Rapport formel attendu ?

---

## 11. Plan d'action — 30 premiers jours

### Semaine 1 — Kickoff et préparation
- [ ] Kickoff projet avec la FNECS (objectifs, interlocuteurs, planning)
- [ ] Collecte charte graphique CFE-CGC (fichiers sources)
- [ ] Demande export Dynamics anonymisé (20-50 lignes)
- [ ] Inventaire contenus existants à migrer
- [ ] Préparation atelier 1 (présentation nomenclature V0)

**Pré-requis à demander à la FNECS avant l'atelier 1 :**
- Liste des contributeurs réels et leurs rôles
- Exemples de demandes adhérents fréquentes (pour orienter les parcours)
- Export Dynamics anonymisé pour audit du modèle de données
- Liste des USN actives et contacts référents

### Semaine 2 — Atelier 1 (2h)
- [ ] Aligner les objectifs métier prioritaires
- [ ] Valider les publics cibles et parcours clés
- [ ] Trier les contenus existants et futurs
- [ ] Proposer et dégager l'arborescence V1 candidate
- [ ] Premier ADR : flux adhésion et synchronisation

### Semaine 3 — Atelier 2 (2h) + cadrage technique
- [ ] Arbitrer les points de friction de nomenclature
- [ ] Valider taxonomie, labels, URLs, niveaux de confidentialité
- [ ] Valider la matrice rôles et droits (Strapi + back-office custom)
- [ ] Trancher : modèle Stripe (paiement ponctuel vs abonnement)
- [ ] Valider le plan de déploiement full Scaleway (conteneurs, proxy, CI/CD, monitoring)
- [ ] Trancher : politique de validation (renouvellements = validation admin ou automatique ?)

**Sorties attendues après les deux ateliers :**
- Nomenclature V1 signée
- Backlog priorisé lot 1 / lot 2
- Matrice rôles validée
- Liste des décisions bloquantes restantes avec échéances

### Semaine 4 — Go/no-go build
- [ ] Spécifications fonctionnelles lot 1 (flux adhésion, espace adhérent, pages USN)
- [ ] Modèle de données PostgreSQL finalisé
- [ ] Modèle de contenu Strapi finalisé (types, champs, rôles)
- [ ] Architecture de déploiement full Scaleway finalisée
- [ ] Backlog technique priorisé
- [ ] Planning détaillé avec jalons de recette signés

---

## 12. Arbitrages prioritaires avant build

Cette section sert de tableau de pilotage interne. Chaque sujet doit rester dans l'un des trois états suivants :
- `ouvert` : pas encore tranché ;
- `orientation interne` : recommandation formulée, en attente de validation ;
- `tranché` : décision prise, à répercuter dans le reste du document.

| Sujet | État | Recommandation interne actuelle | Impact si non tranché | Qui tranche | Échéance cible |
|-------|------|---------------------------------|-----------------------|-------------|----------------|
| Prestataire paiement (SogeCommerce vs Stripe) | orientation interne | **SogeCommerce** (Société Générale) indiqué par le client — dispatching natif SNES/SNEC, ~75% prélèvement SEPA existant. À confirmer formellement. | Bloque l'architecture paiement, le flux de renouvellement, les emails transactionnels et une partie du back-office. | FNECS + La Faabrick | Confirmation client rapide |
| Hébergement applicatif | **acté : full Scaleway** | Choix de simplicité et de cohérence : coeur adhérent, auth et application principale restent sur infrastructure française. | — | La Faabrick | Acté |
| Validation admin sur renouvellements | ouvert | Pencher vers **pas de validation admin sur renouvellement** si le renouvellement ne change pas la qualité d'adhérent et ne crée pas de contrôle métier spécifique. | Bloque le flux de renouvellement, les statuts et les traitements Dynamics. | FNECS | Atelier 2 |
| Politique en cas d'adhésion refusée (`rejected`) | ouvert | Exiger une **politique explicite** : motif, délai, remboursement automatique ou manuel, message envoyé à l'adhérent, responsable du traitement. | Bloque le flux d'adhésion complet, le comportement Stripe et les messages transactionnels. | FNECS | Atelier 2 |
| Liste USN exhaustive et normalisée | ouvert | Obtenir une **liste unique validée**, avec noms canoniques, éventuelles fusions/scissions et référent identifié par USN active. | Bloque la nomenclature, la taxonomie, le modèle de données et l'organisation Strapi. | FNECS | Atelier 1 ou juste après |
| Règles d'accès aux ressources adhérent | ouvert | Pencher vers un modèle **mixte** : ressources fédération communes + ressources sectorielles filtrées par USN. | Bloque le modèle d'accès, les règles de confidentialité, les filtres et une partie de l'UX espace adhérent. | FNECS + La Faabrick | Atelier 2 |
| Archivage et purge documentaire | ouvert | Définir une règle simple en V1 : conservation des documents utiles à l'adhérent actif, archivage des anciens documents, purge conditionnée à la politique RGPD. | Bloque partiellement le modèle de données, le stockage et la conformité documentaire. | La Faabrick + validation FNECS / RGPD | Avant spécifications détaillées |
| SLA de monitoring et support | ouvert | Distinguer clairement **incident critique**, **incident majeur** et **demande standard**, avec couverture campagne d'adhésion si nécessaire. | Bloque la proposition de maintenance post-garantie et le cadre d'exploitation. | La Faabrick puis validation client | Avant contractualisation maintenance |

### 12.1 Ordre de traitement recommandé

1. Liste USN exhaustive et normalisée.
2. Règles d'accès aux ressources adhérent.
3. Modèle Stripe.
4. Validation admin sur renouvellements.
5. Politique d'adhésion refusée.
6. Archivage documentaire.
7. SLA de monitoring et support.

### 12.2 Règle de mise à jour en session

Quand un arbitrage évolue :
- mettre à jour son `État` dans ce tableau ;
- reporter la décision dans les sections fonctionnelles ou techniques concernées ;
- supprimer les formulations devenues ambiguës ailleurs dans le document ;
- si besoin, noter explicitement ce qui change dans le périmètre V1.

---

## 13. Questions pour les ateliers client

1. **USN** : Liste complète validée ? Lesquelles ont un référent actif prêt à alimenter du contenu ?
2. **Ressources adhérent** : Universelles ou filtrées par secteur ? Multi-appartenance possible ?
3. **Adhésion** : Tarif actuel ? Uniforme ou variable ? Renouvellement conscient ou automatique ?
4. **Validation** : Délai réel aujourd'hui ? Nécessaire sur les renouvellements ?
5. **Refus d'adhésion** : Cela arrive ? Quelle est la politique (remboursement, délai, communication) ?
6. **Dynamics** : Qui gère / Power Automate ? Accès en lecture possible pour audit ?
7. **Contenus** : Quelles pages du site actuel conserver ? Textes, images, documents à migrer ?
8. **18 capsules pédagogiques** : Format actuel ? Hébergées où ? À intégrer telles quelles ou à retravailler ?
9. **Charte graphique** : Fichiers sources disponibles ? Guide d'utilisation ?
10. **Planning** : Date butoir ? AG, campagne d'adhésion, événement déclencheur ?
11. **RGPD** : DPO ou référent juridique en interne ? Qui valide les mentions légales ?
12. **Contributeurs** : Combien de comptes Strapi au lancement ? Qui forme les USN ?

---

## 14. Ce qui reste à traiter (hors document)

- **Contrat / CGV / planning signé** — avant de démarrer
- **Charte graphique CFE-CGC** — fichiers sources à récupérer
- **Coûts récurrents** — hébergement Scaleway + Brevo à présenter au client
- **Maintenance post-garantie** — tarif mensuel à contractualiser
- **Stratégie de migration Dynamics** — à construire après l'audit du jeu de données

---

## 15. Règles de maintenance du document

- Ce document reste interne et pragmatique : il doit privilégier les faits, les arbitrages et les risques réels.
- Toute décision prise en session doit être répercutée ici en priorité, avant d'être déclinée ailleurs.
- Toute zone encore floue doit être formulée explicitement comme `à trancher`, `à confirmer` ou `hypothèse`.
- Si une information devient obsolète, elle doit être corrigée ici plutôt que conservée pour mémoire.
- La lecture minimale recommandée en début de session est : sections 0, 2, 3, 4, 12 et 14.

---

*Document maître de travail interne La Faabrick Cherdet — v2.1 — Mars 2026*
*Consolide l'ancien foundation, le cadrage initial et les arbitrages d'authentification.*
