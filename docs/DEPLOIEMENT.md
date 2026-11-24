# Déploiement

## Circuit

| Étape | Où | Qui déclenche |
| --- | --- | --- |
| Travail | Branche `develop` | Chaque push est vérifié (contrôles + build), rien n'est publié |
| Aperçu | Sur le Mac, en local | Double-clic sur `Ouvrir_apercu_VIRALL.command` |
| Production | Branche `main` → GitHub Pages → virall.art | Fusion de `develop` dans `main`, uniquement sur accord du fondateur |

## Aperçu local

1. Construire : `npm run build` (le site complet est dans `out/`).
2. Copier `out/` dans un dossier du Mac, avec le fichier `Ouvrir_apercu_VIRALL.command`.
3. Double-cliquer sur le fichier : il lance un petit serveur (Python, inclus dans macOS) et ouvre http://localhost:4321/fr/ dans le navigateur. Fermer la fenêtre du Terminal arrête l'aperçu.

## Mise en production (première fois)

1. **GitHub Pages** : dépôt `sodara-cpu/virall-site` › Settings › Pages › Source : **GitHub Actions**.
2. **Domaine** : même page, Custom domain : `virall.art`, puis cocher **Enforce HTTPS** dès que GitHub le propose. Recommandé : vérifier le domaine dans les réglages du compte GitHub (Settings › Pages › Add a domain, enregistrement TXT).
3. **DNS chez OVH** (Zone DNS de virall.art). Ne toucher qu'aux lignes ci-dessous ; **ne jamais modifier les MX, SPF, DKIM ou la validation Google** : la messagerie virall@virall.art en dépend.

| Type | Sous-domaine | Cible |
| --- | --- | --- |
| A | (vide) | 185.199.108.153 |
| A | (vide) | 185.199.109.153 |
| A | (vide) | 185.199.110.153 |
| A | (vide) | 185.199.111.153 |
| AAAA | (vide) | 2606:50c0:8000::153, 2606:50c0:8001::153, 2606:50c0:8002::153, 2606:50c0:8003::153 (une ligne chacune) |
| CNAME | www | sodara-cpu.github.io. |

Supprimer auparavant l'ancien enregistrement A de la racine et l'enregistrement `www` qui pointent vers l'hébergement OVH (cluster129). La propagation prend de quelques minutes à quelques heures.

4. **Publier** : fusionner `develop` dans `main`. Le workflow `.github/workflows/deploy.yml` construit le site avec `CUSTOM_DOMAIN=virall.art` (fichier CNAME) et le publie.
5. **Vérifier** : https://virall.art/fr/, https://virall.art/en/, https://virall.art/confidentialite.html (page utilisée pour l'application Google), le certificat HTTPS, l'envoi et la réception d'un e-mail sur virall@virall.art.

## Mises à jour courantes

Modifier sur `develop`, vérifier l'aperçu, puis fusionner dans `main`. Le site est en ligne 2 à 3 minutes après la fusion (onglet Actions du dépôt).

## Retour arrière

Dans l'onglet Actions, relancer le déploiement d'un ancien commit de `main` (« Re-run jobs »), ou annuler le dernier commit (`git revert`) et pousser.

## Après la bascule

- L'hébergement web OVH n'est plus utilisé : il peut être résilié à son échéance (le domaine et la messagerie sont indépendants).
- Mettre à jour la page de marque de l'application Google si elle pointe encore vers une autre adresse.
