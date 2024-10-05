# Projet Pokédex

Ce projet est une application Pokédex fullstack, comprenant un backend Node.js avec Express et PostgreSQL, et un frontend React.

## Structure du projet

- Un dossier back.
- Un dossier front.
- Un dossier docs.

## Back

Le back est construit avec Node.js, Express, et utilise PostgreSQL comme ORM pour la Base de Données.

### Configuration

- Naviguer dans le dossier "back".
- Installer les dépendances avec `pnpm i`.
- Configurer son fichier `.env`.
- Créer la base de données dans son terminal avec PostgreSQL.
- Utiliser les scripts dans le fichier `package.json` pour les fichiers SQL. (db:create, db:seeding, db:reset)

### Lancement du serveur

`pnpm dev`

## Front

Le front est construit avec React.

### Configuration

- Naviguer dans le dossier "front".
- Installer les dépendances avec `pnpm i`.

### Lancement de l'apllication

`pnpm dev`

## Documentation

La documentation du projet se trouve dans le dossier `docs`.

Elle comprend :

- Le dictionnaire des données
- Le Modèle Conceptuel des Données (MCD).
- Le Modèle Logique des Données (MLD).
- Le Modèle Physique des Données (MPD).
