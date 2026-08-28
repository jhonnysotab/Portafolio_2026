---
name: ui-ux-pro-max-skill
description: Guía de UI/UX de este portafolio (React + Vite, atomic design, CSS Modules, temas dark/light, i18n). Úsala siempre que se cree o modifique un componente visual, una sección, un color, una animación o el layout del sitio.
---

# UI/UX Pro Max — Portafolio de Jhonny Sota

Guía de diseño para mantener consistencia visual en este proyecto. Cárgala antes de tocar cualquier componente de `src/components`, estilos globales, o al crear nuevas secciones/páginas.

## 1. Arquitectura del proyecto

- Atomic design: `components/atoms` → `molecules` → `organisms`. Un componente nuevo va en la capa correcta según su complejidad (no meter lógica de sección en un átomo).
- Cada componente vive en su propia carpeta con `Nombre.jsx` + `Nombre.module.css` (CSS Modules, nunca clases globales sueltas).
- Tokens de diseño centralizados en `src/styles/variables.css` (dark = `:root`/`[data-theme="dark"]`, light = `[data-theme="light"]`). **Nunca hardcodear colores** en un `.module.css`: siempre usar `var(--token)`. Si falta un token, agregarlo en ambos bloques (dark y light) con nombre semántico (`--card-bg`, no `--color1`).
- Estilos generales/reset en `src/styles/globals.css`.
- Textos vía i18n: `src/i18n/en.json` y `es.json` + `useLanguage` hook. Nunca hardcodear strings visibles en JSX; agregar la clave en ambos idiomas.
- Datos de contenido (proyectos, skills, experiencia, terminal) van en `src/data/*.js`, no inline en componentes.

## 2. Lenguaje visual (identidad actual)

- Estética: dark-tech/cyberpunk sobrio con acento **neon cian** (`--neon: #00f5d4`) y **violeta** (`--neon2: #7b2fff`) sobre fondo casi-negro (`--dark`, `--dark2`).
- En light mode los mismos roles semánticos se invierten a una paleta clara con acento índigo/azul (`--neon: #030325`, `--neon2: #586eff`) — mantener el mismo contraste relativo, no solo invertir blanco/negro.
- Bordes y sombras sutiles con opacidad baja (`rgba(0,245,212,0.1)` style) — evitar bordes sólidos duros; el estilo del sitio es "glow" tenue, no bloques planos.
- Tipografía: `'Segoe UI', sans-serif` por defecto; el `TerminalSection` usa estética monoespaciada de terminal — mantenerla ahí, no expandirla a otras secciones.
- Cursor custom (`CustomCursor`) se desactiva en móvil (`cursor: auto` bajo 768px) — cualquier interacción nueva debe respetar ese breakpoint.

## 3. Reglas de trabajo con temas

- Todo nuevo elemento visual debe verse bien en **ambos** temas antes de darse por terminado. Si se agrega una variable en `[data-theme="dark"]`, agregar su contraparte en `[data-theme="light"]` en el mismo commit.
- Transición de tema ya cubierta globalmente (`transition: background-color 0.3s ease, color 0.3s ease` en `body`); no reinventar transiciones de tema por componente salvo que el color no herede de `body`.
- `ThemeToggle`/`ThemeContext` son la única fuente de verdad del tema — no leer `prefers-color-scheme` directamente en un componente nuevo.

## 4. Componentes y patrones existentes (reutilizar antes de crear)

- Botones → `atoms/Button`. Etiquetas/pills → `atoms/Tag`. Encabezados de sección → `atoms/SectionHeader` (para título+subtítulo consistente en cada organism).
- Tarjetas de proyecto/skill → `molecules/ProjectCard`, `molecules/SkillCard`. Números/estadísticas → `molecules/StatBox`. Línea de tiempo → `molecules/TimelineItem`.
- Revelado al hacer scroll → hook `useScrollReveal` / `useIntersectionObserver` (no reimplementar IntersectionObserver a mano).
- Efecto de escritura tipo terminal → `useTypewriter`. Fondo de partículas → `useParticleBackground` + `ParticleBackground`.
- Antes de crear un componente nuevo, revisar si ya existe uno equivalente en `atoms/molecules/organisms`.

## 5. Checklist UX antes de dar por terminada una sección

1. **Responsive**: probar mobile (<768px), tablet, desktop. El sitio usa cursor custom solo en desktop — no romper esa regla.
2. **Contraste**: texto legible en ambos temas usando los tokens `--text`, `--text-secondary`, `--text-muted` (no gris sobre gris).
3. **Motion**: animaciones sutiles (glow, fade/slide on scroll), nunca abruptas ni bloqueantes; respetar el patrón `useScrollReveal` ya usado en otras secciones.
4. **i18n**: todo texto visible tiene clave en `en.json` y `es.json`.
5. **Accesibilidad básica**: `alt` en imágenes, foco visible en elementos interactivos, tamaños de click ≥ 40px en móvil, jerarquía de encabezados coherente (`h1`→`h2`→`h3`).
6. **Consistencia de espaciado**: reutilizar el ritmo vertical de secciones existentes (mirar `Hero`, `About`, `Projects` como referencia) en vez de inventar paddings nuevos.

## 6. Cuándo NO aplicar esta guía

- Cambios puramente de lógica (hooks, contexts, data fetching) sin impacto visual no requieren este checklist completo, pero sí seguir la convención de carpetas/archivos.
