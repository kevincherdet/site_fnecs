# Refonte site FNECS CFE-CGC

## Projet

Refonte complète du site de la **FNECS CFE-CGC** (Fédération Nationale de l'Encadrement du Commerce et des Services). Site public + espace adhérent + back-office + gestion d'adhésions.

- **Client** : Tania DAUCHY — tania.dauchy@fnecs.org — 06.16.02.76.51
- **Interlocuteur opérationnel** : Gérald (gère Dynamics 365, formations, reporting adhérents)
- **Budget** : 37 000 € forfait (hébergement et maintenance récurrente en sus)
- **Site actuel** : https://cfecgc-commerce-services.org/
- **Cible produit** : PWA (pas d'applications natives en lot initial)

## Stack technique

| Composant | Technologie | Statut |
|-----------|-------------|--------|
| Frontend | Next.js PWA | Acté |
| Authentification | Better Auth (self-hosted Scaleway) | Acté |
| CMS éditorial | Strapi headless | Acté — ne pas remettre en question |
| BDD applicative | PostgreSQL (Scaleway) | Acté |
| CRM client | Dynamics 365 | Acté — source maître, NE PAS remplacer |
| Paiement | SogeCommerce (Société Générale) | En validation (remplace Stripe) |
| Stockage fichiers | Scaleway Object Storage | Acté |
| Sync Dynamics | Power Automate (webhooks côté client) | Acté |
| Email transactionnel | Brevo | Recommandé |
| Hébergement | Full Scaleway (Vercel écarté) | Acté |

## Périmètre

**V1 :** site public, espace adhérent, back-office Strapi, admin custom Next.js, adhésions SogeCommerce, sync Dynamics, formations.

**Hors V1 :** chatbot IA complet, système de tickets, SEA, apps natives, fonctionnalités communautaires avancées.

## Documents clés

| Fichier | Rôle |
|---------|------|
| `FNECS_Project_Foundation.md` | Document maître v2.1 — stack, archi, flux métier, modèle de données, risques. **À mettre à jour** pour refléter la nomenclature validée. |
| `FNECS_Nomenclature_V1.docx` | Proposition d'arborescence présentée par Kevin à la FNECS. Document historique. |
| `Site - Textes.pdf` | **Arborescence validée** par la FNECS après présentation. C'est la référence pour la nomenclature. |
| `Archives/` | Cahier des charges initial, préparation audition, réponses complémentaires. |

**Règle : en cas de conflit entre la nomenclature du Foundation et le PDF validé, c'est le PDF qui fait foi.**

## Nomenclature validée (Site - Textes.pdf)

### Navigation
```
Visiteur : La Fédération (Mission, Valeurs, Organigramme, Commerce, Services) – Actualités – Contact – [Se connecter] – [J'ADHÈRE]
Adhérent : La Fédération (…) – Actualités – Contact – Ressources – Formations – Mon espace – Bonjour Prénom
```

### Pages publiques
- **Accueil** : Hero → Carousel actus → Accompagnement (4 piliers) → Valeurs → CTA → Témoignages → App mobile → Newsletter → Partenaires
- **La Fédération** : Mission, Valeurs, Rôle, Organisation (entonnoir inversé), Organigramme (Fédé + SNEC + SNES + USN), Histoire
- **Actualités** : grille filtrée, 2 formats (brèves + articles de fond), contenus réservés adhérents avec teaser public
- **Contact** : fédération + tous les bureaux USN (19) + annuaire (phase 2)
- **J'adhère** : tarifs avec crédit d'impôt, simulation cotisation, formulaire en 2 temps (email puis formulaire)
- **FAQ** : capsules pédagogiques (ex "Découvrir") + questions fréquentes
- **Espace Presse** : communiqués, dossiers de presse, photothèque, kit média, revue de presse
- **Trouver mon syndicat** : parcours d'orientation (depuis hero, pas un onglet nav)

### Pages adhérent connecté
- **Ressources** : Agenda, Capsules de branche, Mes Outils (Juridique/Élections/Comptabilité/Communication), Avantages, Réservations, Assistant ressources
- **Formations** : Prochaines formations, Catalogue, Agenda/calendrier, Mes inscriptions
- **Mon espace (profil)** : Mon profil (email/mdp, RGPD, droit à l'image, demandes/échanges), Mon adhésion, Mes documents (attestation, carte, formations, docs utilitaires), Mes contacts, Mon tableau adhérents (bureau USN uniquement)

## Contraintes et pièges

### Architecture
- **Dynamics 365 est la source maître.** PostgreSQL est une projection applicative — on ne stocke que ce dont l'app a besoin. En cas de conflit : Dynamics gagne.
- **Power Automate est configuré par le client** — c'est un SPOF. Prévoir monitoring, job de réconciliation quotidien, endpoint de test.
- **Validation adhérent manuelle** côté admin dans Dynamics → webhook → Better Auth invitation. Délai entre paiement et accès.
- **Migration 5 000 adhérents** : sujet le plus risqué. Activation progressive par vague, pas 5 000 emails d'un coup.

### Auth
- Better Auth dans le middleware Next.js peut causer des problèmes de build (App Router). Tester en intégration dès le début.
- Magic link en complément de email+mot de passe (approche hybride).
- Trois back-offices indépendants (Strapi / Admin custom / Dynamics) = trois systèmes d'auth séparés.

### Paiement
- SogeCommerce (pas Stripe) — dispatching natif SNES/SNEC.
- ~75% prélèvement SEPA, ~25% chèque/virement/CB.
- Prorata : adhésion en cours d'année → paiement jusqu'au 31 décembre, mois entamé = mois dû.

## Décisions ouvertes

- [ ] Confirmation formelle SogeCommerce par le client
- [ ] Validation admin sur renouvellements (oui/non)
- [ ] Politique de refus/remboursement adhésion rejetée
- [ ] Règles d'accès ressources (universelles vs filtrées par USN)
- [ ] Tarif adhésion (uniforme ou variable par secteur/statut)
- [ ] Désinscription formations (self-service ou par email admin)
- [ ] Chatbot/assistant ressources (à décider en commission)

## Volumes

- ~5 000 adhérents dans Dynamics à migrer
- 17 USN (secteurs d'activité) réparties entre 2 syndicats
- 18 capsules pédagogiques existantes (conventions collectives)
- 2 syndicats : SNEC (Commerce) et SNES (Services)

### USN par syndicat

**SNEC — Commerce (11 USN) :**
Activités Diverses, Ameublement, Audiovisuel, Bricolage, Chaussure, Commerce de Détail non alimentaire, Commerce de gros, e-commerce, Grands Magasins, Habillement, Import-Export

**SNES — Services (6 USN) :**
Prévention Sécurité, Propreté 3D, Services Funéraires, Services Tertiaires - Prestataires de Services, Tourisme, Travail Temporaire
