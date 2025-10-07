# Portfolio - Jean-Philippe VONTHRON

Un portfolio numérique simple, moderne et responsive.

## Lancer en local

1. Ouvrez le dossier dans votre éditeur.
2. Double-cliquez sur `index.html` pour l'ouvrir dans votre navigateur.
   - Alternativement, servez le dossier via un serveur statique (recommandé) :

```bash
# Node
npx serve .

# Python
python -m http.server 8080
```

Ensuite, ouvrez `http://localhost:8080`.

## Personnalisation
- Modifiez le contenu dans `index.html` (projets, qualités, description EPITA).
- Ajustez les couleurs et styles dans `styles.css`.
- Personnalisez l'email du formulaire dans `script.js` (variable `mailto`).

## Licence
MIT 

## Export PDF — Portfolio écrit

Un modèle prêt à l'emploi est fourni: `portfolio-template.md`. Remplissez-le puis exportez-le en PDF.

### Option 1 — Google Docs
1. Ouvrez `portfolio-template.md` et copiez le contenu.
2. Collez dans Google Docs.
3. Insérez une table des matières: Insertion → Table des matières → avec numéros de page.
4. Appliquez les styles (Titre 1/2/3), police Times/Arial/Calibri taille 11–12, interligne 1,15–1,5.
5. Fichier → Télécharger → PDF.

### Option 2 — Microsoft Word
1. Ouvrez Word → Nouveau document.
2. Collez le contenu du modèle.
3. Références → Table des matières → Automatique.
4. Mettez en forme selon les consignes (styles, numérotation des pages, interligne).
5. Fichier → Exporter → Créer un document PDF/XPS.

### Option 3 — VS Code + extension Markdown PDF
1. Installez l’extension "Markdown PDF" (yzane.markdown-pdf).
2. Ouvrez `portfolio-template.md` → clic droit → Markdown PDF: Export (pdf).
3. Activez l’option de table des matières avec `@[toc]` si l’extension le supporte, sinon générez-la dans Word/Docs après import.

### Option 4 — Pandoc (qualité éditoriale élevée)
1. Installer Pandoc et LaTeX (TeX Live ou MikTeX sur Windows).
2. Commande (dans ce dossier):
   ```bash
   pandoc portfolio-template.md \
     --from markdown \
     --to pdf \
     --pdf-engine=xelatex \
     --toc \
     -V mainfont="Calibri" \
     -V geometry:margin=2.5cm \
     -o portfolio.pdf
   ```
3. Ouvrez `portfolio.pdf` pour vérifier la pagination et la table des matières.

Conseils: légendez chaque illustration, citez vos sources (APA/ISO), relisez l’orthographe.