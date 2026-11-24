# Architecture

## Principe

Le site est **entièrement statique** : `npm run build` produit des fichiers HTML, CSS, JS et images dans `out/`, servis tels quels par GitHub Pages. Il n'y a ni serveur, ni base de données, ni compte administrateur à protéger. Tous les contenus sont dans `content/` et versionnés avec le code.

## Arborescence

```
app/
  [lang]/                 une page par dossier, générée en fr et en en
    layout.tsx            <html>, en-tête, pied de page, polices, données structurées
    page.tsx              accueil (7 sections)
    medias/               liste des marques + medias/[slug] (une page par marque)
    productions/          catalogue des vidéos
    a-propos/  partenariats/  contact/
    mentions-legales/  confidentialite/  cookies/
  fonts/                  polices réduites (Fraunces, Inter) et leurs licences
  sitemap.ts  robots.ts   sitemap.xml et robots.txt
  globals.css             design system (couleurs, typographies, animations)
components/               briques réutilisables (voir plus bas)
content/                  textes, marques, productions, images, vidéos, mentions légales
lib/                      chemins, adresse du site, métadonnées SEO
scripts/                  optimisation des images, contrôles, finition du build
assets/images/            images sources (2 720 px), jamais servies directement
public/                   fichiers servis tels quels (logos, images optimisées, vidéo, favicon)
```

## Composants

| Composant | Rôle |
| --- | --- |
| `header` | Navigation, sélecteur FR/EN, menu mobile plein écran ; transparent sur les pages à image plein écran |
| `footer` | Logo, navigation, marques, réseaux d'Époques, liens légaux |
| `marks` | Bobine VIRALL dessinée en code (une carte colorée par marque) et mot-symbole extrait du logo |
| `universes` | Section « Nos univers » : la bobine tourne pour présenter la marque survolée ou visible |
| `picture` | Image AVIF/WebP responsive, aperçu flou, mention IA automatique |
| `production-card` | Carte verticale d'une production |
| `numbers` | Chiffres réels calculés depuis `content/` ; un indicateur sans valeur est masqué |
| `ambient-video` | Extrait vidéo muet, lu seulement s'il est visible, avec bouton pause |
| `video-facade` | Lecteur YouTube chargé au clic (aucun cookie avant) |
| `contact-form` | Formulaire qui prépare un e-mail dans la messagerie du visiteur |
| `legal-page`, `page-header`, `json-ld`, `reveal` | Pages légales, en-têtes de pages, données structurées, apparitions au défilement |

## Langues

`content/i18n.ts` contient tous les textes d'interface en français et en anglais. Les adresses sont identiques dans les deux langues (`/fr/medias/` et `/en/medias/`). Chaque page déclare sa version dans l'autre langue (`hreflang`). La racine `/` choisit la langue d'après le navigateur.

## SEO et données structurées

- Titre, description, URL canonique, Open Graph et Twitter par page (`lib/seo.ts`).
- `sitemap.xml` avec les deux langues, `robots.txt`.
- Données structurées schema.org : le groupe (`Organization`) et chaque marque (`subOrganization`).

## Sécurité

- Aucun secret dans le code : le site n'appelle aucune API.
- Aucun formulaire envoyé à un serveur ; un champ piège écarte les robots.
- Les liens externes s'ouvrent avec `rel="noopener"`.
- GitHub Pages sert le site en HTTPS.

## Évolutions prévues

| Besoin | Piste |
| --- | --- |
| Chiffres d'audience automatiques | Script qui lit Metricool ou les API des plateformes et écrit `stats` dans `content/brands.ts`, lancé par GitHub Actions chaque semaine |
| Édition des contenus sans code | Decap CMS ou Pages CMS branché sur le dépôt GitHub (pas de serveur à maintenir) |
| Formulaire envoyé directement | Service de formulaires conforme au RGPD, ou passage sur un hébergement avec fonctions serveur |
