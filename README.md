# Site officiel de VIRALL

Site vitrine du groupe média VIRALL et de ses cinq marques (Époques, Rire, Fiction, Cité, Pro), en français et en anglais. Production : **https://virall.art** (après bascule, voir [docs/DEPLOIEMENT.md](docs/DEPLOIEMENT.md)).

## En bref

| Élément | Choix |
| --- | --- |
| Technologie | Next.js 16 (App Router, export statique), TypeScript, Tailwind CSS 4 |
| Hébergement | GitHub Pages, déployé par GitHub Actions depuis `main` |
| Langues | `/fr/…` et `/en/…`, la racine redirige selon la langue du navigateur |
| Contenus | Fichiers du dossier `content/` (aucune base de données) |
| Images | `assets/images` (sources) → `public/img` (AVIF et WebP optimisés) |

## Commandes

```bash
npm install          # une fois
npm run dev          # site de travail sur http://localhost:3000/fr/
npm run images       # après ajout ou remplacement d'une image dans assets/images
npm run check        # types TypeScript + cohérence des contenus
npm run build        # site final dans out/
```

## Branches

- `develop` : travail en cours, vérifié automatiquement, jamais publié.
- `main` : production. Un push sur `main` publie le site.

## Documentation

| Document | Contenu |
| --- | --- |
| [ARCHITECTURE](docs/ARCHITECTURE.md) | Organisation du code, pages, composants |
| [DESIGN](docs/DESIGN.md) | Couleurs, typographies, grille, animations, accessibilité |
| [CONTENUS](docs/CONTENUS.md) | Ajouter une marque, une production, une image ; mettre à jour les chiffres |
| [ASSETS](docs/ASSETS.md) | Provenance et licence de chaque image et vidéo |
| [DEPLOIEMENT](docs/DEPLOIEMENT.md) | Aperçu local, mise en production, domaine virall.art |
| [DECISIONS](docs/DECISIONS.md) | Choix techniques et points à valider |
