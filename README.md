# Portafolio Personal — React + Vite

Portafolio de desarrollador construido con React, Vite y CSS Modules, con tema
claro/oscuro y soporte bilingüe (ES/EN). Pensado como **plantilla reutilizable**:
todo el contenido y todos los colores se controlan desde dos únicos lugares.

## Puesta en marcha

```bash
npm install
npm run dev      # servidor de desarrollo
npm run build    # build de producción en /dist
npm run preview  # sirve el build de producción localmente
```

---

## 1. Reutilizar la plantilla con los datos de otra persona

Todo el contenido del sitio (textos, experiencia, proyectos, skills, terminal,
formulario de contacto, redes sociales) vive en **un solo archivo**:

```
src/data/profile.json
```

No hace falta tocar ningún componente `.jsx` para cambiar la persona del
portafolio — basta con editar este JSON.

### Estructura del archivo

```jsonc
{
  "meta": {
    "name": "Jhonny Sota",          // nombre mostrado en el Hero
    "siteTitle": "...",              // <title> de la pestaña del navegador
    "avatar": "avatar.jpg",          // nombre del archivo dentro de /public
    "resume": "cv.pdf",              // nombre del archivo dentro de /public
    "resumeDownloadName": "..."      // nombre con el que se descarga el CV
  },
  "social": {
    "github": "https://...",
    "linkedin": "https://...",
    "whatsapp": "https://wa.me/...",
    "home": "#"
  },
  "skills": [ /* lista de tecnologías, es la misma para ambos idiomas */ ],
  "es": { /* todo el contenido en español */ },
  "en": { /* todo el contenido en inglés */ }
}
```

Dentro de `"es"` y `"en"` encontrarás, con la misma forma en ambos idiomas:

| Clave | Qué controla |
|---|---|
| `nav` | Textos del menú de navegación |
| `hero.name` / `hero.phrases` | Nombre grande y frases de la máquina de escribir |
| `about` | Texto "sobre mí" y las 4 estadísticas (`stats`) |
| `skills.tag` / `skills.title` | Encabezado de la sección de habilidades |
| `experience.items` | Lista de experiencia laboral (timeline) |
| `projects.items` | Lista de proyectos destacados |
| `terminal.lines` | Líneas que se "escriben" en la sección terminal |
| `contact` | Etiquetas del formulario y mensajes de estado |
| `footer.text` | Texto del pie de página |

**Importante:** edita siempre `es` y `en` en paralelo — si un campo solo se
cambia en un idioma, el sitio mostrará contenido desactualizado al cambiar de
idioma con el switch ES/EN.

### Imagen de perfil y CV

No son parte del JSON porque son archivos binarios. Para reemplazarlos:

1. Sustituye `public/avatar.jpg` por la foto de la nueva persona (mismo nombre,
   o cambia el valor de `meta.avatar` si usas otro nombre de archivo).
2. Sustituye `public/cv.pdf` por el nuevo CV (o cambia `meta.resume`).

Al estar en `/public`, Vite los sirve tal cual, sin necesidad de tocar ningún
`import` en el código.

---

## 2. Personalizar los colores (branding)

Todos los colores del sitio son **variables CSS** definidas en un único
archivo:

```
src/styles/variables.css
```

Hay dos bloques: uno para el tema oscuro (`[data-theme="dark"]`, también el
valor por defecto en `:root`) y otro para el tema claro (`[data-theme="light"]`).
Para adaptar la marca a otra persona, cambia los valores dentro de cada bloque
— **no hace falta tocar CSS de ningún componente**.

### Los colores que más definen la identidad visual

| Variable | Qué es | Dónde se nota |
|---|---|---|
| `--neon` | Color de acento principal | Textos destacados, bordes, iconos, degradado del logo y de las líneas bajo los títulos |
| `--neon2` | Color de acento secundario | Segundo color del degradado (logo, líneas, glitch del Hero) |
| `--dark` | Fondo general de la página | `body` |
| `--card-bg` | Fondo de tarjetas (inputs, proyectos) | Formularios, tarjetas |
| `--title` | Color del texto de los títulos grandes | Nombre del Hero, títulos de sección |
| `--button-bg` | Color de fondo del botón primario | Botones "Ver proyectos", "Enviar mensaje" |
| `--btn-hover-bg` / `--btn-hover-text` | Colores del botón primario al pasar el mouse | Hover de botones primarios |

Cambiando solo `--neon` y `--neon2` ya se transforma la mayor parte de la
identidad visual, porque casi todos los degradados y acentos del sitio se
construyen a partir de esos dos valores (`linear-gradient(90deg, var(--neon), var(--neon2))`).

### El resto de variables (ajuste fino)

| Variable | Qué es |
|---|---|
| `--dark2` | Segundo tono de fondo (degradados, avatar) |
| `--text` / `--text-secondary` / `--text-muted` | Jerarquías de color de texto |
| `--border-color` / `--tag-border` / `--input-border` | Colores de bordes |
| `--nav-bg` | Fondo translúcido de la barra de navegación |
| `--section-bg` / `--skill-bg` / `--skill-bg-module` | Fondos sutiles de secciones y tarjetas |
| `--card-bg-alt` / `--bg-project-card` | Variantes de fondo de tarjetas |
| `--number-project-card` | Color del número decorativo grande en cada tarjeta de proyecto |
| `--tagcolor` / `--text-tag` | Color del texto de las etiquetas (tags) |
| `--track-bg` | Fondo de la barra de progreso de habilidades |
| `--stat-bg` / `--stat-border` | Fondo/borde de las cajas de estadísticas |
| `--terminal-bg` / `--terminal-header` | Fondo de la sección terminal (se mantiene oscura en ambos temas a propósito) |
| `--gradient-start` / `--gradient-end` | Degradado de fondo decorativo |
| `--sociallink` / `--copytext` | Color de iconos sociales y texto del footer |
| `--lang-active-text` | Color del texto activo en el switch de idioma |
| `--cursor-opacity` | Opacidad del cursor personalizado |

### Recomendación al re-brandear

1. Cambia `--neon` y `--neon2` en **ambos** bloques (dark y light) por los
   colores principales de la nueva marca/persona.
2. Revisa el contraste en modo claro: al ser un fondo mayormente blanco, un
   `--neon` muy claro puede volverse difícil de leer — usa un tono
   suficientemente oscuro para el tema claro (como ya ocurre con `--neon: #030325`).
3. Prueba ambos temas (botón de sol/luna en la navbar) y ambos idiomas antes
   de dar por terminado el cambio.
