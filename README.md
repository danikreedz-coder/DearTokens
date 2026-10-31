# Dear Tokens — PWA piloto 0.2.1

## Qué contiene
- `index.html`: aplicación completa.
- `manifest.json`: metadatos para instalación como PWA (íconos PNG y maskable incluidos).
- `service-worker.js`: caché para uso sin conexión (v3, con actualización automática en segundo plano).
- `icon.svg`, `icon-192.png`, `icon-512.png`, `icon-maskable-512.png`: íconos de la aplicación.

## Novedades de la 0.2
- **Entrada y salida por separado:** además del prompt, podés pegar la respuesta del modelo (desplegable “Sumar la respuesta del modelo”) y el costo se calcula con tarifas distintas para cada parte.
- **Tabla editable de modelos y precios:** agregá, quitá y editá modelos, con tarifa de entrada y de salida por millón de tokens y la fecha en que revisaste los precios. Los valores iniciales son ejemplos.
- **Cada sesión guarda la tarifa con la que se calculó**, así que cambiar los precios no altera el historial anterior.
- **Etiqueta o proyecto** opcional por sesión, y botón para borrar una sesión individual.
- **Anillo con meta diaria:** muestra qué porcentaje de tu meta (configurable, 50.000 tokens por defecto) llevás hoy, contando las sesiones guardadas y el texto actual. Se pone ámbar al superarla.
- **Exportar e importar:** JSON (copia completa, se puede reimportar sin duplicar sesiones) y CSV (separado por punto y coma y con coma decimal, pensado para Excel en español).
- **Service worker corregido:** ya no queda “pegado” a una versión vieja. Avisa cuando hay una versión nueva disponible.
- **Íconos PNG de 192 y 512 px** más un ícono maskable aparte, para una instalación correcta en Android.
- Las sesiones guardadas con la 0.1 se migran solas.

## Novedades de la 0.2.1
- Los coeficientes de la estimación quedaron en una constante `COEF` al comienzo del script de `index.html`, para pegar ahí el resultado de la calibración sin tocar la fórmula.
- Service worker en `v3`, así los dispositivos que ya tenían la 0.2 reciben la actualización.

## Cómo probar en una computadora
1. Descomprimí el archivo ZIP.
2. Abrí `index.html` en un navegador moderno para probar el estimador y el historial.
3. Para probar la instalación PWA y el modo sin conexión, serví la carpeta desde `localhost` o publicala en un hosting con HTTPS. Abrir el archivo directamente (`file://`) no activa las funciones PWA.

Si tenés Python instalado, desde una terminal ubicada en la carpeta podés ejecutar:
`python -m http.server 8000`
Después abrí `http://localhost:8000` en el navegador.

## Cómo probar en Android
Subí estos archivos a un sitio HTTPS (por ejemplo, GitHub Pages) y abrí la dirección desde Chrome. En el menú del navegador, elegí “Instalar aplicación” o “Añadir a pantalla de inicio” (el texto puede variar).

## Cómo publicar una actualización
Cada vez que cambies archivos de la app, subí el número de `VERSION` en `service-worker.js` (por ejemplo, de `'v2'` a `'v3'`). Así los dispositivos descargan la copia nueva y descartan la anterior.

## Límites conocidos
- El cálculo de tokens es una heurística general, no un tokenizador oficial. Falta calibrarla contra uno real.
- Las tarifas iniciales son ejemplos editables, no cotizaciones vigentes ni facturas reales. Verificalas en la página oficial de cada proveedor.
- Solo estima el texto que se pega en Dear Tokens; no puede leer otras apps ni conocer automáticamente el consumo de sus chats.
- El historial se guarda en el almacenamiento local del navegador: exportá copias de vez en cuando.
- No hay backend, cuentas de usuario ni integración con APIs.

## Próximos pasos recomendados
1. Calibrar la estimación con un tokenizador oficial y un set de textos (español, inglés, código, números), usando el script `calibrar.py` y pegando el resultado en `COEF`.
2. Pantalla de estadísticas (7 y 30 días, distribución por modelo) a partir del historial.
3. Cronómetro de sesión (“Iniciar/Detener conteo”) y registro rápido de tokens a mano.
4. Publicar en GitHub Pages y probar con usuarios reales.
