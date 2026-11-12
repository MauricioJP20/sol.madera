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

- **Descargar CSV** genera un archivo separado por punto y coma, compatible con Excel,
  con las referencias, medidas, cantidades, materiales, vetas y cantos calculados.
- **Imprimir / PDF** abre el diálogo de impresión del navegador para guardar el
  despiece como PDF. En el diálogo, elegí la opción **Guardar como PDF**.

## Maquina de destino 

- **el modelo de maquina es seccionadora horizaontal cnc marzica kdt quadra 320**

