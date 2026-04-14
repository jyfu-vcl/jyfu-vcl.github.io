# jyfu-vcl simple homepage

Minimalist static homepage for **Jiaye Fu (付迦叶)**, inspired by Yuntao Lu's jemdoc-style page.

## Structure

```
jyfu-vcl-simple/
├── index.html              # Main page
├── assets/
│   ├── css/style.css       # Single stylesheet
│   └── images/             # Profile, social icons, WeChat QR
└── files/                  # CV + paper PDFs
```

## Preview locally

```bash
cd jyfu-vcl-simple
python3 -m http.server 8000
# open http://localhost:8000
```

No build step, no Jekyll, no Ruby. Just HTML + CSS.

## Deploy to GitHub Pages

Copy everything to the root of a GitHub Pages repo and add an empty `.nojekyll`
file so GitHub serves the files as-is.
