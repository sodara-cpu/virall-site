# Design system

## Direction artistique

Une esthétique **éditoriale et documentaire** : de grandes images réalistes, sobres, un peu désaturées, avec un grain de film léger ; une typographie à empattements expressive pour les titres ; beaucoup d'espace. Le site alterne sections claires (papier, blanc, brume) et sombres (encre), comme le montage alterne les plans.

Le motif propre à VIRALL est **la bobine** du logo : ses cinq cartes correspondent aux cinq marques. Sur la page d'accueil, la bobine tourne pour amener la carte de la marque présentée en haut ; sur les pages, elle signale la marque active en colorant sa carte.

Les images suivent la **charte visuelle anti-IA** de VIRALL Époques (lumière naturelle, cadrage à hauteur d'homme et décentré, matières usées, pas de vue aérienne ni de lumière dorée partout), étendue à toutes les marques.

## Couleurs

Couleurs reprises des logos validés (Drive, dossier Logos et Kit, 21/11/2026).

| Nom | Code | Usage |
| --- | --- | --- |
| Encre | `#141B2D` | Textes, sections sombres, pied de page |
| Blanc | `#F7F8FA` | Fond principal, textes sur fond sombre |
| Papier | `#EFEEE9` | En-têtes de pages, section « Nos univers » |
| Brume | `#E6E8EC` | Section « Chiffres » |
| Ardoise | `#5B6474` | Textes secondaires |
| Accent | `#3557D4` | Carte du logo principal, numéros, liens actifs |
| Époques | `#6B2E5F` (clair `#C58AB9`) | Marque Histoire |
| Rire | `#C23B6E` (clair `#E98AAE`) | Marque Humour |
| Fiction | `#3E3A8C` (clair `#A29EE6`) | Marque Cinéma et fiction |
| Cité | `#2563A8` (clair `#86B4E6`) | Marque Politique et société |
| Pro | `#1F6B57` (clair `#79C7AD`) | Marque Monde professionnel |

Les teintes claires servent sur fond sombre. Sur fond clair, les petits textes en couleur de marque sont assombris de 20 % pour respecter le contraste 4,5:1.

## Typographies

| Police | Usage | Réglage |
| --- | --- | --- |
| Fraunces (police du logo) | Titres, chiffres, citations | Figée en taille optique 144, graisse 560 ; italique 400 |
| Inter | Textes, navigation, boutons | Variable 300 à 700 |

Les deux polices sont hébergées sur le site, réduites aux caractères latins (36 Ko pour Inter, 16 et 20 Ko pour Fraunces) et préchargées. Licence SIL Open Font License 1.1 (fichiers dans `app/fonts/`).

Échelle : titres de page `clamp(3rem, 8vw, 7.5rem)`, titres de section `clamp(2.4rem, 5vw, 5rem)`, texte courant 16 à 20 px, surtitres 11,5 px en capitales espacées.

## Grille et espacements

Grille de 12 colonnes, largeur maximale 1 440 px, marges latérales `clamp(1.25rem, 4vw, 4rem)`. Sections espacées de 96 à 144 px en hauteur. Les compositions sont asymétriques (image sur 7 colonnes, texte sur 4) et alternent de côté.

## Animations

| Animation | Où | Durée |
| --- | --- | --- |
| Lignes du titre qui montent | Hero, en-têtes de pages | 0,9 s |
| Apparition au défilement | Blocs marqués `data-reveal` | 1 s |
| Lent mouvement de caméra (5 % au plus) | Images plein écran | 22 s |
| Rotation de la bobine | « Nos univers » | 1,1 s |
| Zoom léger au survol | Cartes et images cliquables | 1,6 s |

Toutes les animations sont coupées si le visiteur a activé « Réduire les animations ». Sans JavaScript, tout le contenu reste visible.

## Accessibilité (WCAG 2.2 AA)

Lien d'évitement vers le contenu, navigation au clavier avec focus visible, menu mobile fermable par Échap, textes alternatifs bilingues pour chaque image, contrastes vérifiés, cibles tactiles de 44 px, formulaire avec erreurs annoncées, vidéo avec bouton pause. Score Lighthouse Accessibilité : 100 sur les pages testées.

## Mentions IA

Chaque image générée porte une mention discrète, en légende HTML (jamais incrustée dans l'image) :

| Type d'image | Mention |
| --- | --- |
| Reconstitution historique | « Reconstitution générée par IA, pas une archive » (version courte sur les cartes : « Reconstitution IA ») |
| Illustration d'un univers | « Image d'illustration générée par IA » |
