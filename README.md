# YR System — Landing page

Estructura modular, lista para editar con Claude Code o cualquier IDE.

## Cómo correrlo

Necesitás un servidor local (no se puede abrir directo con `file://` porque Babel carga JSX externos).

**Opción 1 — Python (ya viene en Mac/Linux):**
```bash
cd src
python3 -m http.server 8000
# Abrí http://localhost:8000
```

**Opción 2 — Node:**
```bash
cd src
npx serve
```

**Opción 3 — VSCode:** instalá la extensión "Live Server" y click derecho en `index.html` → "Open with Live Server".

## Estructura

```
src/
├── index.html              # entrada — orquesta todo
├── theme.jsx               # paleta, colores, tokens, BackgroundGrid, Container
├── App.jsx                 # shell principal — composición de la página
├── i18n.jsx                # traducciones ES/EN (window.TRANSLATIONS)
├── tweaks-panel.jsx        # panel de ajustes (no tocar)
├── logo.png
└── components/
    ├── Nav.jsx             # navegación + toggle ES/EN
    ├── Hero.jsx            # logo gigante + anillos + badges
    ├── Counter.jsx         # helper: contador animado
    ├── StatusBar.jsx       # barra de stats (47 proyectos, 99.97%, etc.)
    ├── Services.jsx        # 6 servicios
    ├── CodeShowcase.jsx    # bloque de código con highlighting
    ├── Stack.jsx           # tech stack (Backend, Datos, Frontend, Infra)
    ├── Process.jsx         # proceso de 4 fases
    ├── Work.jsx            # 3 trabajos recientes (TaxSecure, BankSync, Web)
    ├── Pricing.jsx         # 3 planes
    ├── FAQ.jsx             # 6 preguntas frecuentes
    ├── Contact.jsx         # formulario + datos de contacto
    ├── Field.jsx           # helper: input/textarea
    └── Footer.jsx          # footer
```

## Cómo editar con Claude Code

Como cada archivo es chico (50-300 líneas), Claude Code puede leerlos sin problema.

**Ejemplos de prompts cortos:**

- *"Lee `src/components/Hero.jsx` y cambiale el headline a X"*
- *"En `src/components/Pricing.jsx` cambia el precio del plan Starter a $300"*
- *"Agrega un cuarto servicio en `src/components/Services.jsx`"*
- *"En `src/i18n.jsx` traduce todos los textos al portugués y agregalo como tercer idioma"*
- *"Cambia el color dorado en `src/theme.jsx` a un azul eléctrico"*

## Cómo subirlo a producción

Cualquier hosting estático sirve (Vercel, Netlify, GitHub Pages, hosting compartido):

1. Subí toda la carpeta `src/` al hosting
2. Apuntá el dominio a `index.html`
3. Listo

Para mejor performance en producción te conviene un build real (Vite + esbuild) — pero para empezar y mostrar a clientes, esto funciona perfecto.

## Tu identidad

- **Logo:** `logo.png` (cambiá este archivo y se actualiza en nav, hero y footer)
- **Tagline:** "Transformo ideas en sistemas" (en `i18n.jsx`)
- **Email:** yeinierrivero8@gmail.com (en `components/Contact.jsx` y `components/Footer.jsx`)
- **Teléfono:** +1 (786) 602-0720 (en `components/Contact.jsx`)
- **Ubicación:** Miami, FL (en `i18n.jsx` clave `ct_location`)

## Tweaks en vivo

Activá el botón "Tweaks" en el toolbar para cambiar tema (dark/light), color de acento, idioma, y mostrar/ocultar elementos sin tocar código.
