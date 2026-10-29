# 3. El jaque mate y el ahogado se comprueban en el bando que tiene que mover

Fecha: 2026-10-29 · Estado: aceptado

## Contexto

Al preparar las pruebas, el mate del pastor (1.e4 e5 2.Ac4 Cc6 3.Dh5 Cf6 4.Dxf7#)
no terminaba la partida: el rótulo seguía en «Turno de las Negras». Pasaba igual en
la versión original de bilateria.org. `checkGameStatus()` se llama después de cambiar
el turno, pero miraba al bando contrario al que tiene que mover, es decir, al que
acababa de mover, que nunca está en jaque. Por eso no detectaba el jaque mate, el
ahogado ni el jaque.

## Decisión

`checkGameStatus()` comprueba el bando que tiene el turno. Si está en jaque y no tiene
movimientos legales, la partida termina con «¡Jaque mate! Ganador: …»; si no está en
jaque y no tiene movimientos, «¡Ahogado! Empate»; si está en jaque, el rótulo dice
«¡Jaque! … en jaque». Al reiniciar se borra el aviso anterior.

## Alternativas descartadas

- Cambiar el orden de las llamadas (comprobar antes de cambiar el turno): obligaba a
  tocar también la promoción, que repite la misma secuencia.

## Consecuencias

- La partida termina cuando debe; antes se podía seguir moviendo tras un mate.

## Evidencia

- Prueba `mate del pastor con el ratón y reinicio` en `tests/app.spec.js`. Con el
  archivo original, el mismo recorrido deja el rótulo en «Turno de las Negras».

## Riesgos y limitaciones

- No se ha revisado el resto de reglas (enroque, captura al paso) más allá de lo que
  recorren las pruebas.

## Validación

- Las pruebas del mate y de la promoción pasan en Chromium, Firefox y móvil.
