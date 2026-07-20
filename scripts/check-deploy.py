#!/usr/bin/env python3
"""
Contrôle avant publication sur GitHub Pages.

Vérifie les quatre causes de panne qui ne se voient PAS en local :

  1. CNAME manquant        -> GitHub perd le domaine krancos.fr
  2. Casse des chemins     -> macOS ne distingue pas Logo/ et logo/, Linux si
  3. Fichier non versionné -> présent en local, absent du site publié
  4. Erreur de syntaxe JS  -> nav, pied de page et favicon disparaissent
                              sur TOUTES les pages (ils sont injectés)

Usage :  python3 scripts/check-deploy.py
Sortie :  code 0 si tout est bon, 1 sinon.
"""

import os
import re
import subprocess
import sys

RACINE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DOMAINE = "krancos.fr"

erreurs = []
avert = []


def chemin_reel(rel):
    """Résout un chemin en respectant la casse, comme le ferait Linux."""
    courant = RACINE
    for part in rel.split("/"):
        if part in ("", "."):
            continue
        try:
            entrees = os.listdir(courant)
        except NotADirectoryError:
            return False
        except FileNotFoundError:
            return False
        if part not in entrees:          # comparaison sensible à la casse
            return False
        courant = os.path.join(courant, part)
    return True


# --- 1. CNAME ---------------------------------------------------------------
cname = os.path.join(RACINE, "CNAME")
if not os.path.exists(cname):
    erreurs.append("CNAME absent : GitHub va retirer le domaine personnalisé.")
else:
    contenu = open(cname, encoding="utf-8").read().strip()
    if contenu != DOMAINE:
        erreurs.append(f"CNAME contient {contenu!r} au lieu de {DOMAINE!r}.")

# --- 2. .nojekyll -----------------------------------------------------------
if not os.path.exists(os.path.join(RACINE, ".nojekyll")):
    avert.append(".nojekyll absent : Jekyll ignorera tout fichier commençant "
                 "par « _ » ou « . ».")

# --- 3. Fichiers suivis par git --------------------------------------------
try:
    suivis = set(subprocess.run(
        ["git", "ls-files"], cwd=RACINE, capture_output=True, text=True,
        check=True).stdout.split("\n"))
except Exception:
    suivis = None
    avert.append("git indisponible : contrôle du versionnement ignoré.")

# --- 4. Références locales dans le HTML et le JS ----------------------------
pages = [f for f in os.listdir(RACINE) if f.endswith(".html")]
refs = []

for page in pages:
    txt = open(os.path.join(RACINE, page), encoding="utf-8").read()
    for m in re.finditer(r'(?:src|href)="([^"#?][^"]*)"', txt):
        refs.append((page, m.group(1)))

js = os.path.join(RACINE, "js", "site.js")
if os.path.exists(js):
    txt = open(js, encoding="utf-8").read()
    for m in re.finditer(r'"(assets/[^"]+)"', txt):
        refs.append(("js/site.js", m.group(1)))
    for m in re.finditer(r"var LOGO = \"([^\"]+)\"", txt):
        refs.append(("js/site.js", m.group(1)))

for source, ref in refs:
    if re.match(r"^(https?:|mailto:|tel:|data:|//)", ref):
        continue
    propre = ref.split("#")[0].split("?")[0]
    if not propre:
        continue
    if not chemin_reel(propre):
        erreurs.append(f"{source} -> « {propre} » introuvable "
                       f"(ou casse différente).")
    elif suivis is not None and propre not in suivis:
        erreurs.append(f"{source} -> « {propre} » existe en local mais n'est "
                       f"PAS versionné : absent du site publié.")

# --- 5. Syntaxe du JavaScript ----------------------------------------------
if os.path.exists(js):
    r = subprocess.run(["node", "--check", js], capture_output=True, text=True)
    if r.returncode != 0:
        erreurs.append("js/site.js : erreur de syntaxe -> nav, pied de page "
                       "et favicon absents sur tout le site.\n     "
                       + r.stderr.strip().split("\n")[0])

# --- Rapport ----------------------------------------------------------------
print(f"Pages vérifiées : {len(pages)}   références locales : {len(refs)}\n")

for a in avert:
    print(f"  [avertissement] {a}")
for e in erreurs:
    print(f"  [ERREUR] {e}")

if erreurs:
    print(f"\n{len(erreurs)} problème(s) bloquant(s). Ne pas publier en l'état.")
    sys.exit(1)

print("Tout est bon : le site peut être publié.")
sys.exit(0)
