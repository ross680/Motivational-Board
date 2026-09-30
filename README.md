# 3R Motivational TV Slideshow

Static GitHub Pages slideshow containing 22 3R motivational posters (optimized JPGs, ~6 MB total).

## Publish on GitHub Pages
1. Create or open a GitHub repository.
2. Upload the contents of this folder to the repository root.
3. In GitHub: **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select `main` and `/ (root)`, then Save.
6. Open the GitHub Pages URL on the TV browser.

## Controls
- Auto-rotates every 18 seconds.
- Right Arrow or Space: next
- Left Arrow: previous
- `P`: pause/resume
- `F`: fullscreen
- Hover to show controls and slide count.

## URL options
- `?seconds=25` changes the slide duration to 25 seconds.
- `?shuffle=1` randomizes the order at page load.
- `?reload=4` reloads the page every 4 hours (default) so new posters appear on the TV automatically.
- Combine them: `?seconds=25&shuffle=1`

## Add or remove posters
1. Put images in `assets/slides/` (JPG, 1920×1080 or similar 16:9).
2. Edit `slides.js` and add/remove the corresponding file paths.
3. Commit/push the changes. GitHub Pages will update automatically.
