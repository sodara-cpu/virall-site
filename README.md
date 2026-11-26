# Site officiel de VIRALL

Site vitrine du groupe média VIRALL et de ses cinq marques (Époques, Rire, Fiction, Cité, Pro), en français et en anglais : **https://virall.art**.

| Élément | Choix |
| --- | --- |
| Technologie | Next.js (App Router, export statique), TypeScript, Tailwind CSS |
| Hébergement | GitHub Pages, déployé par GitHub Actions depuis `main` |
| Langues | `/fr/…` et `/en/…`, la racine redirige selon la langue du navigateur |
| Contenus | Dossier `content/` (aucune base de données) |
| Images | `assets/images` (sources) → `public/img` (AVIF et WebP optimisés) |

```bash
npm ci               # dépendances
npm run dev          # site de travail sur http://localhost:3000/fr/
npm run images       # après ajout d'une image dans assets/images
npm run sync         # applique un export de contenus (scripts/sync-content.mjs)
npm run check        # types TypeScript + cohérence des contenus
npm run build        # site final dans out/
```

Branches : `develop` (vérifiée, jamais publiée) et `main` (production). Sécurité : voir [SECURITY.md](SECURITY.md).
