# 1. La app se publica en GitHub Pages y bilateria.org redirige a ella

Fecha: 2026-10-29 · Estado: aceptado

## Contexto

El juego nació en abril de 2025 como una página HTML suelta, hecha con DeepSeek y
alojada en `https://bilateria.org/app/juegos/ajedrez.html`, el hosting de IONOS de
Juanjo. No tenía repositorio ni licencia en el código: solo la declaraba su ficha en
el Repositorio de recursos educativos digitales de Vibe Coding Educativo. La revisión
de ese repositorio del 29-10-2026 la marcó como «sin licencia», y Juanjo pidió hacer
con ella lo mismo que con el Generador de Sonidos por Edad: pasarla a GitHub,
añadirle lo que le faltaba, dejar una redirección en bilateria y cambiar el enlace en
el repositorio.

## Decisión

- El código vive en `github.com/jjdeharo/ajedrez` y se publica con GitHub Pages
  desde la rama `main`, en `https://jjdeharo.github.io/ajedrez/`.
- La dirección antigua devuelve una redirección permanente (301) a la nueva, con una
  regla en el `.htaccess` de `app/juegos/`, y el archivo antiguo se sustituye por una
  página que también redirige, por si la regla dejara de aplicarse.
- La ficha del repositorio de VCE pasa al enlace nuevo, con la licencia del código.
- Sigue siendo una sola página HTML sin dependencias externas y sin analítica.

## Alternativas descartadas

- Dejarla en bilateria.org y añadir solo la licencia: sin repositorio no se puede
  examinar ni seguir con control de versiones.
- Una organización propia de GitHub: para una página suelta basta un repositorio en
  la cuenta de Juanjo, como el Generador de Sonidos por Edad.
- Borrar el archivo de bilateria: rompería los enlaces que ya circulan.

## Consecuencias

- Los cambios se hacen en el repositorio; el archivo de bilateria ya no se toca.

## Evidencia

- Archivo original descargado de IONOS el 29-10-2026 (51.076 bytes, modificado el
  02-04-2025). Es el primer commit de `index.html`.

## Riesgos y limitaciones

- Si la regla de IONOS desaparece, la página de respaldo sigue redirigiendo.

## Validación

- `curl -I` sobre la dirección antigua devuelve 301 con la nueva en `Location`.
