# 2. Licencias, pie, accesibilidad y juego con el teclado

Fecha: 2026-10-29 · Estado: aceptado

## Contexto

Al publicarla en un repositorio, la app tenía que cumplir la guía «Vibe coding
responsable»: licencia en el código, autoría, declaración del uso de IA y
accesibilidad revisada con herramienta. La versión original tenía tres problemas:

- Las piezas blancas eran las figuras huecas de Unicode (♔♕♖…) pintadas en blanco:
  sobre las casillas claras (#f0d9b5) casi no se veían.
- Las casillas eran `div` que solo respondían al ratón o al dedo: no se podía jugar
  con el teclado ni con un lector de pantalla.
- Con `overflow: hidden` y un tablero de hasta el 90 % del alto, en una pantalla de
  800 px de alto los controles quedaban cortados.

## Decisión

- Código bajo AGPL-3.0-or-later (`LICENSE`, línea SPDX) y textos bajo CC BY-SA 4.0
  (`LICENSE-CONTENIDOS`). Pie con `© 2025-2026 Juan José de Haro` enlazado a
  bilateria.org, versión, licencias, código fuente y declaración de IA (nivel 4 del
  MIAE, DeepSeek en abril de 2025 y Claude Code en octubre de 2026).
- Los dos bandos usan la figura rellena; las blancas van en blanco con un contorno
  oscuro (`text-shadow`), así se distinguen sobre las dos casillas.
- Teclado: el tablero es un solo punto del orden de tabulación (empieza en e2), las
  flechas mueven el foco en el sentido en que se ve el tablero e Intro o Espacio
  eligen. Cada casilla se anuncia como «e2, peón blanco», con «seleccionada», «se
  puede mover aquí» o «se puede capturar» cuando toca. El turno se anuncia
  (`aria-live`), el diálogo de promoción recibe el foco y sus opciones son botones.
- El tablero mide como mucho `min(90vh, 100vh − 175px)`: deja sitio al turno, los
  controles y el pie, y la página puede desplazarse en vertical si aun así no cabe.
- El verde del botón y del interruptor pasa de #4CAF50 a #2e7d32 (contraste 5,1:1
  con el texto blanco).

## Alternativas descartadas

- Dejar las figuras huecas y oscurecer las casillas claras: cambiaba el aspecto del
  tablero más que añadir un contorno a las piezas.
- Una tabulación por casilla (64 paradas): obliga a recorrer todo el tablero para
  llegar a los controles.

## Consecuencias

- Las pruebas automáticas comprueban la accesibilidad de cada pantalla.

## Evidencia

- axe-core 4.14.0 con `@axe-core/playwright` 4.14.0 (reglas WCAG 2.0 y 2.1 A y AA),
  en la posición inicial, tras jugar con el teclado y con el diálogo de promoción.

## Riesgos y limitaciones

- axe no comprueba el contraste de las figuras con sombra; se revisó en pantalla.

## Validación

- `npx playwright test`: 11 pruebas superadas en Chromium, Firefox y móvil (Pixel 7)
  el 29-10-2026.
