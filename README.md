# Chakra · Learn & Balance

Static site (no build step) for GitHub Pages.

```
index.html      page + SEO meta + JSON-LD
css/style.css   styles
js/app.js       logic
data/chakras.js chakra content (English + Assamese)
data/ui.js      UI labels
data/site.js    promo box, FAQ, links (edit here)
robots.txt, sitemap.xml, favicon.svg, og-image.png
```

## Deploy
1. Push all files to a GitHub repo, then Settings > Pages > Deploy from branch (`main`, `/root`).
2. Replace `https://YOUR-USERNAME.github.io/YOUR-REPO/` with your real URL in `index.html`, `robots.txt`, `sitemap.xml`.
3. Add the site in Google Search Console and submit `sitemap.xml`.
