# sol.madera
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


## link de bitacora

https://docs.google.com/document/d/1256uY08l07OV7fSt3pDSfZ0Pk_1QUc4_/edit?usp=sharing&ouid=104321171438394785338&rtpof=true&sd=true
