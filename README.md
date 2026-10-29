# Ajedrez para dos jugadores

Ajedrez para dos personas en el mismo dispositivo, pensado para una tableta en
horizontal.

**Abrir la aplicación:** https://jjdeharo.github.io/ajedrez/

- Solo deja hacer movimientos legales, también el enroque, la captura al paso y la
  promoción del peón.
- Avisa del jaque, del jaque mate y del ahogado.
- El tablero gira en cada turno para que cada jugador lo vea desde su lado; se puede
  desactivar.
- Se juega con el dedo, con el ratón o con el teclado (flechas para moverse, Intro o
  Espacio para elegir).

No guarda nada, no pide datos y no se comunica con ningún servidor.

## Organización

| Archivo | Para qué sirve |
|---|---|
| `index.html` | La aplicación entera: estructura, estilos y código. |
| `icono.svg` | Icono de la pestaña («chess-knight» de Lucide, licencia ISC). |
| `og.png` | Imagen de la vista previa al compartir el enlace. |
| `tests/app.spec.js` | Partidas de prueba y revisión de accesibilidad. |
| `playwright.config.js`, `package.json` | Configuración de las pruebas. |
| `.github/workflows/pruebas.yml` | Pasa las pruebas en GitHub con cada cambio. |
| `docs/adr/` | Registro de decisiones. |
| `CHANGELOG.md` | Cambios de cada versión. |

## Pruebas

```bash
npm ci
npx playwright install chromium firefox
npm test
```

Juegan el mate del pastor, una partida con el teclado y una promoción, en Chromium,
Firefox y un móvil, y comprueban con axe que no hay fallos de accesibilidad
(WCAG 2.1 AA).

## Licencias

- Código: [AGPL v3](LICENSE) (`AGPL-3.0-or-later`).
- Textos: [CC BY-SA 4.0](LICENSE-CONTENIDOS).
- Icono: «chess-knight» de [Lucide](https://lucide.dev), licencia ISC.

© 2025-2026 [Juan José de Haro](https://bilateria.org).

## Uso de IA

[Nivel 4 del MIAE](https://jjdeharo.github.io/miae/?nivel=4): programado con
DeepSeek en abril de 2025 y preparado para su publicación con Claude Code en octubre
de 2026.

Antes estaba en `bilateria.org/app/juegos/ajedrez.html`, que ahora redirige aquí.
