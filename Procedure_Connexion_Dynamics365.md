# Connexion du site FNECS avec Dynamics 365 — Actions côté FNECS

*Bonjour Jean-René,*

*Dans le cadre de la refonte du site, nous avons besoin de connecter le nouveau site à votre Dynamics 365 pour synchroniser les données adhérents. Voici les 3 actions que nous avons besoin que vous réalisiez de votre côté depuis votre compte administrateur.*

*On vous propose de faire ça ensemble en visio (30 min environ) — ce document vous sert de résumé avant et après.*

---

## Action 1 — Créer une « carte d'identité » pour le site dans Azure

C'est ce qui permettra au site de communiquer avec Dynamics de manière sécurisée et automatique.

1. Allez sur [portal.azure.com](https://portal.azure.com) et connectez-vous avec votre compte admin FNECS
2. Dans la barre de recherche en haut, tapez **« Inscriptions d'applications »** et cliquez sur le résultat
3. Cliquez sur **+ Nouvelle inscription**
4. Remplissez :
   - **Nom** : `Site FNECS`
   - **Types de comptes** : choisissez la première option (*cet annuaire uniquement*)
   - Le reste : ne touchez à rien
5. Cliquez **Inscrire**
6. Vous arrivez sur une page avec deux codes — **copiez-les et envoyez-les-nous** :
   - « ID d'application (client) »
   - « ID de l'annuaire (locataire) »
7. Dans le menu à gauche, cliquez sur **Certificats et secrets**
8. Cliquez **+ Nouveau secret client** > description : `Site FNECS` > cliquez **Ajouter**
9. **Copiez immédiatement la valeur qui apparaît** (la colonne « Valeur », pas « ID secret ») — elle disparaît définitivement si vous quittez la page

> Envoyez-nous ces 3 informations (les 2 identifiants + le secret) par un canal sécurisé — **pas par email en clair**. Un message privé Teams ou un lien de partage sécurisé conviennent.

---

## Action 2 — Autoriser le site à accéder aux données Dynamics

1. Allez sur [admin.powerplatform.microsoft.com](https://admin.powerplatform.microsoft.com)
2. Dans le menu à gauche, cliquez sur **Environnements**
3. Cliquez sur votre environnement (celui où se trouvent vos adhérents)
4. Cliquez sur **Paramètres** en haut de la page
5. Cliquez sur **Utilisateurs + autorisations** puis sur **Utilisateurs d'application**
6. Cliquez sur **+ Nouvel utilisateur d'application**
7. Cliquez sur **+ Ajouter une application** > cherchez `Site FNECS` > sélectionnez-le > cliquez **Ajouter**
8. Choisissez votre division
9. Pour les **rôles de sécurité** : on choisira ensemble le bon rôle pendant la visio (on a besoin d'un accès en lecture sur les adhérents, adhésions et formations — pas plus)
10. Cliquez **Enregistrer** puis **Créer**

---

## Action 3 — M'ouvrir un accès temporaire pour créer et tester les flux

Les flux qui synchronisent automatiquement Dynamics avec le site (adhérent validé, mise à jour de profil, désactivation, etc.) seront configurés de mon côté dans votre environnement Power Automate.

Comme je vais les construire et les tester progressivement, j'ai besoin d'un accès temporaire me permettant d'avancer de façon autonome, puis de vous restituer une configuration propre une fois les tests terminés.

### 3a — M'ajouter comme utilisateur externe

1. Allez sur [portal.azure.com](https://portal.azure.com)
2. Dans la barre de recherche, tapez **« Utilisateurs »** et cliquez sur le résultat sous Microsoft Entra ID
3. Cliquez sur **+ Inviter un utilisateur externe**
4. Renseignez mon adresse email : *(à compléter)*
5. Cliquez sur **Inviter**

### 3b — Me donner les droits nécessaires dans l'environnement Power Platform

1. Allez sur [admin.powerplatform.microsoft.com](https://admin.powerplatform.microsoft.com)
2. Cliquez sur **Environnements**
3. Sélectionnez votre environnement Dynamics
4. Allez dans **Paramètres** > **Utilisateurs + autorisations** > **Utilisateurs**
5. Vérifiez que mon compte invité apparaît bien dans la liste
6. Attribuez-moi le rôle **Environment Maker**

Cela me permettra de créer les flux et de faire les tests techniques sans bloquer vos équipes.

### 3c — Vérifier la couverture licence

Pour que je puisse créer et tester les flux avec les connecteurs nécessaires (Dataverse et HTTP), il faut vérifier que mon compte invité pourra bien utiliser les licences disponibles sur votre tenant.

1. Allez sur [admin.microsoft.com](https://admin.microsoft.com)
2. Ouvrez **Facturation** > **Licences**
3. Envoyez-nous une capture d'écran de cette page
4. Nous vous confirmerons si la couverture est suffisante ou s'il faut prévoir un ajustement

### 3d — Cadre de test

Pendant cette phase, je ferai uniquement des tests ciblés sur quelques enregistrements de test identifiables.

- Les tests se feront sur un nombre limité de fiches
- Les données de test créées dans Dynamics et dans la base du site seront supprimées une fois la recette terminée
- Une fois la configuration validée, les flux seront transférés à un compte FNECS pour que vous restiez pleinement autonomes

---

## Ce qui se passe ensuite

Une fois ces 3 actions faites :

1. **Je configure les flux automatisés** dans votre environnement Power Automate — ce sont eux qui préviendront le site quand un adhérent est validé, modifié ou désactivé dans Dynamics
2. **Je teste** que tout fonctionne
3. **On fait le transfert** : je vous ajoute (vous ou Gérald) comme propriétaire des flux, vous remplacez ma connexion par la vôtre, et je me retire. Comme ça, les flux tournent sous un compte FNECS et ne dépendent plus de mon accès invité

---

## Informations à nous transmettre

*(par un canal sécurisé — message privé Teams, lien de partage sécurisé, etc.)*

| Information | Où la trouver |
|-------------|---------------|
| ID d'application (client) | Page de l'application créée à l'action 1 |
| ID de l'annuaire (locataire) | Page de l'application créée à l'action 1 |
| Secret client (la valeur) | Certificats et secrets de l'action 1 |
| URL de votre environnement Dynamics | Format : `https://fnecs.crm4.dynamics.com` ou similaire |
| Capture d'écran des licences | Action 3c |

De notre côté, nous vous fournirons les informations techniques nécessaires à la configuration des flux (adresses du site, clés d'authentification, format des données attendu).

---

## Une question à trancher ensemble

Quand un adhérent s'inscrit à une formation via le site, est-ce que vous préférez :

- **A.** Que l'inscription remonte automatiquement dans Dynamics (sans action de votre part)
- **B.** Qu'il y ait une étape de validation de votre côté avant que ça apparaisse dans Dynamics

On en discutera pendant la visio.

---

*On planifie un créneau de 30 minutes ensemble pour faire les actions 1, 2 et 3 ?*

*Kevin — La Faabrick Cherdet*
