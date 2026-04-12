# Guide de gestion du contenu — Site FNECS CFE-CGC

> Ce document décrit les contenus que vous pouvez gérer en autonomie depuis Strapi, le back-office éditorial de votre nouveau site.

---

## Principes généraux

Votre site s'appuie sur deux sources de contenu :

- **Strapi** — le back-office éditorial. C'est ici que vous gérez les actualités, les témoignages, les communiqués de presse, etc. Vous y accédez via un navigateur web, avec vos identifiants.
- **Dynamics 365** — votre CRM existant. Les formations, adhésions et données adhérents restent gérées dans Dynamics. Elles sont synchronisées automatiquement avec le site.

Le reste du site (textes institutionnels, pages fixes, navigation) est géré par La Faabrick Cherdet. Si vous souhaitez modifier ces éléments, contactez-nous.

---

## Contenus gérés dans Strapi

### 1. Articles (Actualités)

**Où ça apparaît sur le site :** page d'accueil (carousel), page Actualités, pages des secteurs (USN).

**Ce que vous pouvez faire :**
- Créer, modifier et supprimer des articles
- Choisir le format : **brève** (contenu court) ou **article de fond** (contenu long)
- Associer un article à un secteur (USN) et à des tags thématiques
- Réserver un article aux adhérents connectés (les visiteurs verront un aperçu avec un bouton pour adhérer)
- Programmer la publication via la date de publication

**Champs à remplir :**

| Champ | Description | Obligatoire |
|-------|-------------|:-----------:|
| Titre | Le titre de l'article | Oui |
| Slug | Généré automatiquement à partir du titre — c'est l'adresse web de l'article | Oui (auto) |
| Chapô | Le résumé affiché sur la carte de l'article (quelques lignes) | Oui |
| Contenu | Le corps de l'article. Vous pouvez y insérer du texte mis en forme, des images, des liens | Oui |
| Image de couverture | Le visuel principal de l'article (affiché sur la carte) | Oui |
| Format | Brève ou Article de fond | Oui |
| Secteur (USN) | Le secteur concerné (ex : Commerce de gros, Tourisme). Laissez vide si l'article concerne toute la fédération | Non |
| Tags | Mots-clés thématiques (ex : Négociation, Salaires, RGPD). Permet aux visiteurs de filtrer les articles | Non |
| Date de publication | La date affichée sur l'article et utilisée pour le tri | Oui |
| Réservé adhérents | Si activé, seuls les adhérents connectés verront l'article complet | Oui |
| Publié | Passez à "oui" quand l'article est prêt à être mis en ligne. Tant que c'est sur "non", l'article reste en brouillon | Oui |

---

### 2. Tags

**Où ça apparaît sur le site :** filtres sur la page Actualités.

**Ce que vous pouvez faire :**
- Créer de nouveaux tags thématiques au fil du temps
- Modifier ou supprimer des tags existants

**Champs à remplir :**

| Champ | Description | Obligatoire |
|-------|-------------|:-----------:|
| Nom | Le libellé du tag (ex : Négociation, Juridique, Élections) | Oui |
| Slug | Généré automatiquement | Oui (auto) |

---

### 3. Structures (Fédération, Syndicats, USN)

**Où ça apparaît sur le site :** page Contact, pages secteurs (Mon USN), organigramme.

Cette collection regroupe toutes les entités de la fédération :
- La **Fédération** CFE-CGC Commerce et Services
- Les **syndicats** : SNEC (Commerce) et SNES (Services)
- Les **USN** : les 19 secteurs d'activité (Tourisme, Services Funéraires, E-commerce, etc.)

**Ce que vous pouvez faire :**
- Mettre à jour les coordonnées de contact d'une structure
- Modifier la composition du bureau (ajouter, retirer ou modifier un membre et sa fonction)
- Modifier la présentation d'un secteur (description, image)

**Champs à remplir :**

| Champ | Description | Obligatoire |
|-------|-------------|:-----------:|
| Nom | Le nom de la structure (ex : CFE-CGC Tourisme) | Oui |
| Slug | Généré automatiquement | Oui (auto) |
| Type | Fédération, Syndicat ou USN | Oui |
| Email de contact | L'adresse générique (ex : tourisme@fnecs.org) | Non |
| Description | Présentation du secteur (texte enrichi) | Non |
| Image de couverture | Visuel du secteur | Non |
| Bureau | La liste des membres du bureau avec leur fonction (voir ci-dessous) | Non |

**Le bureau — comment ça marche :**

Le bureau est une liste de fiches. Chaque fiche associe un **membre** (sélectionné dans la liste des membres) à une **fonction** dans cette structure (ex : Secrétaire général, Trésorier).

Pour ajouter un membre au bureau :
1. Cliquez sur "Ajouter une entrée" dans la section Bureau
2. Sélectionnez le membre dans la liste déroulante
3. Indiquez sa fonction dans cette structure
4. Enregistrez

> Un même membre peut apparaître dans plusieurs structures avec des fonctions différentes. Par exemple, Yohann Chirez peut être Secrétaire général de l'USN Services Funéraires et Administrateur au niveau de la Fédération.

---

### 4. Membres

**Où ça apparaît sur le site :** page Contact, pages secteurs (Mon USN), potentiellement l'organigramme.

Un membre est une **personne physique**. Ses informations sont centralisées ici — si un numéro de téléphone change, vous le modifiez une seule fois et c'est à jour partout sur le site.

**Ce que vous pouvez faire :**
- Ajouter de nouveaux membres
- Mettre à jour les coordonnées ou la photo d'un membre
- Supprimer un membre qui n'est plus en activité

**Champs à remplir :**

| Champ | Description | Obligatoire |
|-------|-------------|:-----------:|
| Nom | Nom de famille | Oui |
| Prénom | Prénom | Oui |
| Email | Adresse email professionnelle | Non |
| Téléphone | Numéro de téléphone | Non |
| Photo | Portrait (format carré recommandé) | Non |
| Publié | Passez à "oui" pour que le membre soit visible sur le site | Oui |

---

### 5. Témoignages

**Où ça apparaît sur le site :** carousel de témoignages sur la page d'accueil.

**Ce que vous pouvez faire :**
- Ajouter des témoignages d'adhérents
- Choisir l'ordre d'affichage ou laisser le site les afficher aléatoirement
- Masquer un témoignage sans le supprimer (en passant "Publié" à non)

**Champs à remplir :**

| Champ | Description | Obligatoire |
|-------|-------------|:-----------:|
| Citation | Le témoignage de l'adhérent | Oui |
| Nom | Nom de la personne qui témoigne | Oui |
| Fonction | Son rôle (ex : Déléguée syndicale, Élu CSE). Laissez vide si la personne ne souhaite pas l'afficher | Non |
| Secteur (USN) | Le secteur de l'adhérent (ex : Commerce de gros) | Non |
| Photo | Portrait de la personne | Non |
| Ordre | Un numéro pour contrôler la position dans le carousel (1 = en premier). Laissez vide pour un affichage aléatoire | Non |
| Publié | Passez à "oui" pour afficher le témoignage sur le site | Oui |

---

### 6. Partenaires

**Où ça apparaît sur le site :** bandeau de logos sur la page d'accueil, le footer et d'autres pages.

**Ce que vous pouvez faire :**
- Ajouter ou retirer un partenaire
- Modifier l'ordre d'affichage des logos
- Ajouter un lien vers le site du partenaire

**Champs à remplir :**

| Champ | Description | Obligatoire |
|-------|-------------|:-----------:|
| Nom | Le nom du partenaire | Oui |
| Logo | Le logo du partenaire (fond transparent recommandé, format PNG ou SVG) | Oui |
| Lien | L'adresse du site du partenaire (les visiteurs y accèdent en cliquant sur le logo) | Non |
| Ordre | Un numéro pour contrôler la position dans le bandeau (1 = en premier) | Non |
| Publié | Passez à "oui" pour afficher le logo sur le site | Oui |

---

### 7. Magazines

**Où ça apparaît sur le site :** page Actualités.

Les magazines (MAG@GIR, Négociateurs de branches) sont hébergés sur Calameo. Strapi stocke la couverture et le lien — les visiteurs cliquent pour lire le magazine sur Calameo.

**Ce que vous pouvez faire :**
- Ajouter un nouveau numéro de magazine
- Modifier la couverture ou le lien Calameo

**Champs à remplir :**

| Champ | Description | Obligatoire |
|-------|-------------|:-----------:|
| Titre | Le titre du numéro (ex : MAG@GIR n°45 — Mars 2026) | Oui |
| Image de couverture | La première page du magazine | Oui |
| Lien Calameo | L'adresse du magazine sur Calameo | Oui |
| Date de publication | La date du numéro | Oui |
| Publié | Passez à "oui" pour afficher le magazine sur le site | Oui |

---

### 8. Capsules

**Où ça apparaît sur le site :** page Ressources (adhérents), pages secteurs (USN).

Les capsules sont des modules pédagogiques interactifs (conventions collectives des secteurs FNECS). En première version, elles sont hébergées sur Genially.

**Ce que vous pouvez faire :**
- Ajouter une nouvelle capsule
- Associer une capsule à un secteur
- Modifier le lien ou la couverture

**Champs à remplir :**

| Champ | Description | Obligatoire |
|-------|-------------|:-----------:|
| Titre | Le titre de la capsule (ex : Convention collective du Commerce de gros) | Oui |
| Image de couverture | Le visuel de la carte | Oui |
| Lien Genially | L'adresse de la capsule sur Genially | Oui |
| Secteur (USN) | Le secteur concerné par cette capsule | Non |
| Publié | Passez à "oui" pour afficher la capsule sur le site | Oui |

---

### 9. Presse

**Où ça apparaît sur le site :** page Espace Presse.

Cette collection regroupe tous les contenus presse : communiqués, dossiers, photothèque et revue de presse.

**Ce que vous pouvez faire :**
- Publier des communiqués de presse
- Déposer des dossiers de presse (PDF)
- Alimenter la photothèque et le kit média
- Ajouter des articles de revue de presse

**Champs à remplir :**

| Champ | Description | Obligatoire |
|-------|-------------|:-----------:|
| Titre | Le titre du contenu | Oui |
| Slug | Généré automatiquement | Oui (auto) |
| Type | Communiqué, Dossier de presse, Photo/Kit média ou Revue de presse | Oui |
| Contenu | Le texte du communiqué ou de l'article (pour les communiqués et revues de presse) | Non |
| Fichier | Le document à télécharger (PDF, pour les dossiers de presse) | Non |
| Image | La photo ou le visuel (pour la photothèque) | Non |
| Date de publication | La date du contenu | Oui |
| Publié | Passez à "oui" pour mettre en ligne | Oui |

---

## Contenus gérés dans Dynamics 365

Les contenus suivants ne sont **pas** dans Strapi. Ils sont gérés dans Dynamics 365 et synchronisés automatiquement avec le site :

- **Formations** — catalogue, sessions, inscriptions, places disponibles
- **Adhésions** — statut, renouvellement, cotisations
- **Données adhérents** — profil, documents, contacts

Pour toute question sur ces contenus, contactez Gérald.

---

## Contenus gérés par La Faabrick Cherdet

Les éléments suivants font partie de la structure du site. Si vous souhaitez les modifier, contactez La Faabrick Cherdet :

- Navigation (menus, ordre des onglets)
- Page La Fédération (mission, valeurs, histoire, organisation)
- Page J'adhère (argumentaire, tarifs, formulaire)
- Page Application mobile (tutoriel d'installation)
- Page Trouver mon syndicat
- Footer
- Mentions légales et politique de confidentialité

---

## Bonnes pratiques

- **Brouillon avant publication** — Créez toujours votre contenu en mode brouillon (Publié = non). Relisez avant de passer à "oui".
- **Images** — Privilégiez des images de bonne qualité, pas trop lourdes (moins de 1 Mo). Les logos partenaires doivent être en PNG ou SVG avec fond transparent.
- **Slugs** — Ne modifiez pas les slugs après publication. Cela changerait l'adresse web de la page et les anciens liens ne fonctionneraient plus.
- **Suppression** — Plutôt que de supprimer un contenu, passez-le en "non publié". Vous pourrez le réactiver plus tard si besoin.

---

*Document rédigé par La Faabrick Cherdet — avril 2026*
