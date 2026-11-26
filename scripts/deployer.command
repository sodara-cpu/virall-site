#!/bin/bash
# Mise en ligne du site VIRALL (virall.art), sur accord du fondateur.
# Double-cliquer dans le Finder, ou lancer : bash ~/VIRALL_n8n/_site/scripts/deployer.command
# Étapes : vérifie les branches, lance les contrôles et la construction, enregistre les modifications
# sur develop, fusionne develop dans main et pousse main (GitHub Actions publie le site en 2 à 3 minutes).
set -euo pipefail
cd "$(dirname "$0")/.."

MESSAGE="${1:-Refonte de la direction artistique et des pages de sources (26/11/2026)}"

echo "1/5 Vérification des branches"
git fetch origin
if [ "$(git rev-parse --abbrev-ref HEAD)" != "develop" ]; then
  echo "Arrêt : le dépôt n'est pas sur la branche develop."; exit 1
fi
git merge --ff-only origin/develop
if [ -z "$(git config user.email || true)" ]; then
  echo "Arrêt : aucune identité Git. Lancer d'abord : git config --global user.name \"Votre nom\" ; git config --global user.email \"vous@exemple.com\""; exit 1
fi

echo "2/5 Contrôles et construction (environ 1 minute)"
npm run check
npm run build

echo "3/5 Enregistrement sur develop"
git add -A
if git diff --cached --quiet; then
  echo "Aucune modification à enregistrer."
else
  git commit -m "$MESSAGE" -m "Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
fi
git push origin develop

echo "4/5 Fusion de develop dans main"
git checkout main
git merge --ff-only origin/main
git merge --no-edit develop
git push origin main
git checkout develop

echo "5/5 Envoyé. Le site sera en ligne dans 2 à 3 minutes : https://github.com/sodara-cpu/virall-site/actions"
echo "Vérifier ensuite https://virall.art/fr/ et https://virall.art/s/cherbourg-1864"
