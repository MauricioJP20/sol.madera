# Despiece de muebles

Aplicación web para convertir las plantillas de **2026 PLANTILLAS MUEBLES.xlsx** en un despiece calculado. Permite elegir entre las plantillas de bajo mesada y cajonera, ingresar las variables del módulo y consultar las medidas, cantidades, materiales, vetas y cantos de cada pieza.

## Desarrollo

```bash
npm install
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000).

## Comandos

```bash
npm run build
npm run start
npm run lint
```

## Fórmulas incluidas

- **Bajo mesada:** laterales, piso, faldones, estante, fondo y puertas.
- **Cajonera:** laterales, piso, faldón superior, faldón inferior, fondo,
  cajones y traseras de cajón.
- Las medidas se expresan en milímetros.
- El fondo se calcula con material `FIBRO`.
- Las puertas se dividen por la cantidad indicada y descuentan 5 mm.

## Exportación

- **Descargar CSV** genera `opticut-<mueble>.csv` delimitado por punto y coma,
  listo para importar en OptiCut. El archivo contiene estas 15 columnas, en este
  orden: `Altura`, `Ancho`, `Cantidad`, `Material`, `Espesor`, `Referencia`,
  `Dirección de la Fibra`, `Material de la Cinta superior`,
  `Grosor de Cinta superior`, `Material de la Cinta inferior`,
  `Espesor Cinta Inferior`, `Material de la Cinta izquierda`,
  `Grosor de la Cinta izquierda`, `Material de la Cinta derecha` y
  `Grosor de la Cinta derecha`.
- Las cintas se exportan por borde con sus espesores en punto decimal (`0.45`
  o `2`). El CSV usa codificación ANSI Windows-1252, no incluye BOM y termina
  sus líneas con CRLF.
- **Imprimir / PDF** abre el diálogo de impresión del navegador para guardar el
  despiece como PDF. En el diálogo, elegí la opción **Guardar como PDF**.

## Maquina de destino 

- **el modelo de maquina es seccionadora horizaontal cnc marzica kdt quadra 320**
