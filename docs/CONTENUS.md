# Gérer les contenus

Tous les contenus se modifient dans le dossier `content/`, directement sur GitHub (bouton crayon) ou en local. Après modification : `npm run check`, puis `npm run build` pour vérifier.

## Renommer une marque

Dans `content/brands.ts`, modifier `name` (ex. `"Cité"`). Le nom change partout : navigation, pages, pied de page, données structurées. Remplacer aussi le logo dans `public/brand/` si le nom est dessiné dedans.

## Ajouter une marque

1. Copier un bloc de `content/brands.ts` et changer `slug` (adresse de la page), `name`, couleurs, textes FR et EN.
2. Ajouter son image signature (voir « Ajouter une image »).
3. `bladeAngle` : la bobine compte cinq cartes. Une sixième marque demande de redessiner la bobine dans `components/marks.tsx` (prévoir l'accord de la direction artistique).

La page `/fr/medias/<slug>/` est créée automatiquement, ainsi que sa place dans le sitemap.

## Retirer une marque

Supprimer son bloc dans `content/brands.ts`. Ses productions éventuelles doivent aussi être retirées de `content/productions.ts`.

## Lancer une marque

Passer `status` de `"development"` à `"launch"` et renseigner `socials` (plateforme, adresse, identifiant). Les comptes s'affichent sur la page de la marque et, pour Époques, dans le pied de page.

## Ajouter ou publier une production

Dans `content/productions.ts` :

| Champ | À renseigner |
| --- | --- |
| `title`, `summary` | En français et en anglais |
| `period`, `category`, `format` | Époque, catégorie, `vertical` ou `episode` |
| `durationSec` | Durée finale en secondes, ou `null` tant que le montage n'est pas définitif |
| `status` | `soon` (Bientôt) ou `published` |
| `links` | Liens YouTube, TikTok, Instagram, Facebook une fois publiée |
| `youtubeId` | Identifiant YouTube : le lecteur s'affiche sur la page Productions (chargé au clic) |
| `image` | Clé d'une image du registre |

## Mettre à jour les chiffres

Les chiffres de l'accueil sont calculés : nombre de marques, marques lancées, productions « Bientôt », plateformes. Les audiences viennent de `stats` dans chaque marque :

```ts
stats: { followers: 12500, views: 480000, videos: 14, asOf: "2027-01-15" },
```

Une valeur `null` masque l'indicateur. Ne jamais saisir d'estimation. Mettre à jour la date « au … » dans `components/numbers.tsx`.

## Ajouter une image

1. Déposer le fichier dans `assets/images/<cle>.webp` (ou `.png`, `.jpg`), au moins 1 920 px de large.
2. Ajouter son entrée dans `content/images.ts` : texte alternatif FR et EN, `source` (`creation`, `production` ou `externe`), provenance, licence, `ai`, `reconstitution` ou `conceptual`.
3. `npm run images` : crée les versions AVIF et WebP dans `public/img/`.
4. Compléter `docs/ASSETS.md`.

## Modifier un texte d'interface

Tous les textes hors marques et productions sont dans `content/i18n.ts`, partie `fr` puis partie `en`. Les deux langues doivent garder les mêmes clés (TypeScript le vérifie). En français, mettre une espace insécable avant `? ! : ;`.

## Ce qu'il ne faut pas publier

Aucune information interne sur les outils de production, les automatisations, les coûts, les objectifs financiers ou une éventuelle cession des marques.
