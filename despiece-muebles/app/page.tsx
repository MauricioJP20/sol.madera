"use client";

import { useMemo, useState } from "react";

type FurnitureType = "bajo-mesada" | "cajonera";
type EdgeThickness = "" | "0.45" | "2";

type PartEdges = {
  cantoSup: EdgeThickness;
  cantoInf: EdgeThickness;
  cantoIzq: EdgeThickness;
  cantoDer: EdgeThickness;
};

type Part = PartEdges & {
  reference: string;
  length: number;
  width: number;
  quantity: number;
  material: string;
  grain: string;
  note?: string;
};

const templates: Record<
  FurnitureType,
  { name: string; description: string; icon: string }
> = {
  "bajo-mesada": {
    name: "Bajo mesada",
    description: "Módulo con puertas, estante y faldones",
    icon: "BM",
  },
  cajonera: {
    name: "Cajonera",
    description: "Módulo con faldones y cajones",
    icon: "CJ",
  },
};

const edgeLabels: {
  key: keyof PartEdges;
  label: string;
  shortLabel: string;
}[] = [
  { key: "cantoSup", label: "Superior", shortLabel: "Sup" },
  { key: "cantoInf", label: "Inferior", shortLabel: "Inf" },
  { key: "cantoIzq", label: "Izquierda", shortLabel: "Izq" },
  { key: "cantoDer", label: "Derecha", shortLabel: "Der" },
];

function edgeSet(
  thickness: Exclude<EdgeThickness, "">,
  ...sides: (keyof PartEdges)[]
): PartEdges {
  return {
    cantoSup: sides.includes("cantoSup") ? thickness : "",
    cantoInf: sides.includes("cantoInf") ? thickness : "",
    cantoIzq: sides.includes("cantoIzq") ? thickness : "",
    cantoDer: sides.includes("cantoDer") ? thickness : "",
  };
}

function formatMillimeters(value: number) {
  return `${Math.max(0, Math.round(value))} mm`;
}

function escapeCsvValue(value: string | number) {
  const text = String(value);
  return `"${text.replaceAll('"', '""')}"`;
}

export default function Home() {
  const [furniture, setFurniture] = useState<FurnitureType>("bajo-mesada");
  const [material, setMaterial] = useState("BLANCO");
  const [grain, setGrain] = useState("NO");
  const [width, setWidth] = useState(600);
  const [depth, setDepth] = useState(560);
  const [doors, setDoors] = useState(1);
  const dimensionsAreValid =
    Number.isFinite(width) &&
    width >= 250 &&
    Number.isFinite(depth) &&
    depth >= 200;

  const parts = useMemo<Part[]>(() => {
    const sharedMaterial = material.trim() || "BLANCO";
    const commonEdges = edgeSet(
      "0.45",
      "cantoIzq",
      "cantoSup",
      "cantoInf",
    );

    if (furniture === "bajo-mesada") {
      return [
        {
          reference: "LATERAL",
          length: 780,
          width: depth,
          quantity: 2,
          material: sharedMaterial,
          grain,
          ...commonEdges,
          note: "Altura fija",
        },
        {
          reference: "PISO",
          length: width - 36,
          width: depth,
          quantity: 1,
          material: sharedMaterial,
          grain,
          ...edgeSet("0.45", "cantoIzq"),
          note: "Ancho − 36",
        },
        {
          reference: "FALDÓN",
          length: width - 36,
          width: 120,
          quantity: 2,
          material: sharedMaterial,
          grain,
          ...edgeSet("0.45", "cantoIzq", "cantoDer"),
        },
        {
          reference: "ESTANTE",
          length: width - 38,
          width: depth - 10,
          quantity: 1,
          material: sharedMaterial,
          grain,
          ...edgeSet("0.45", "cantoIzq"),
          note: "Ancho − 38 · Profundidad − 10",
        },
        {
          reference: "FONDO",
          length: width - 9,
          width: depth - 9,
          quantity: 1,
          material: "FIBRO",
          grain: "NO",
          ...edgeSet("0.45"),
          note: "Ancho − 9 · Profundidad − 9",
        },
        {
          reference: 'PUERTA "NN"',
          length: 780 - 33,
          width: width / doors - 5,
          quantity: doors,
          material: sharedMaterial,
          grain,
          ...edgeSet(
            "2",
            "cantoSup",
            "cantoInf",
            "cantoIzq",
            "cantoDer",
          ),
          note: "780 − 33 · (Ancho ÷ puertas) − 5",
        },
      ];
    }

    return [
      {
        reference: "LATERAL",
        length: 780,
        width: depth,
        quantity: 2,
        material: sharedMaterial,
        grain,
        ...commonEdges,
        note: "Altura fija",
      },
      {
        reference: "PISO",
        length: width - 36,
        width: depth,
        quantity: 1,
        material: sharedMaterial,
        grain,
        ...edgeSet("0.45", "cantoIzq"),
        note: "Ancho − 36",
      },
      {
        reference: "FALDÓN SUPERIOR",
        length: width - 36,
        width: 120,
        quantity: 1,
        material: sharedMaterial,
        grain,
        ...edgeSet("0.45", "cantoIzq", "cantoDer"),
      },
      {
        reference: "FALDÓN INFERIOR",
        length: width - 36,
        width: 70,
        quantity: 1,
        material: sharedMaterial,
        grain,
        ...edgeSet("0.45", "cantoIzq", "cantoDer"),
      },
      {
        reference: "FONDO",
        length: width - 9,
        width: depth - 9,
        quantity: 1,
        material: "FIBRO",
        grain: "NO",
        ...edgeSet("0.45"),
        note: "Ancho − 9 · Profundidad − 9",
      },
      {
        reference: "CAJON NN",
        length: width - 111,
        width: 492,
        quantity: 3,
        material: sharedMaterial,
        grain,
        ...edgeSet("0.45"),
        note: "Ancho − 111",
      },
      {
        reference: "TRASERA CAJON NN",
        length: width - 123,
        width: 64,
        quantity: 1,
        material: sharedMaterial,
        grain,
        ...edgeSet("0.45", "cantoIzq"),
        note: "Ancho − 123",
      },
      {
        reference: "TRASERA CAJON NN",
        length: width - 123,
        width: 160,
        quantity: 2,
        material: sharedMaterial,
        grain,
        ...edgeSet("0.45", "cantoIzq", "cantoSup", "cantoInf"),
        note: "Ancho − 123",
      },
      {
        reference: 'CAJON "NN"',
        length: 169,
        width: width - 5,
        quantity: 1,
        material: sharedMaterial,
        grain,
        ...edgeSet(
          "2",
          "cantoSup",
          "cantoInf",
          "cantoIzq",
          "cantoDer",
        ),
        note: "169 · Ancho − 5",
      },
      {
        reference: 'CAJON "NN"',
        length: 268,
        width: width - 5,
        quantity: 2,
        material: sharedMaterial,
        grain,
        ...edgeSet(
          "2",
          "cantoSup",
          "cantoInf",
          "cantoIzq",
          "cantoDer",
        ),
        note: "268 · Ancho − 5",
      },
    ];
  }, [depth, doors, furniture, grain, material, width]);

  const totalPieces = parts.reduce((total, part) => total + part.quantity, 0);

  function downloadCsv() {
    const headers = [
      "Altura",
      "Ancho",
      "Cantidad",
      "Material",
      "Espesor",
      "Referencia",
      "Dirección de la Fibra",
      "Material de la Cinta superior",
      "Grosor de Cinta superior",
      "Material de la Cinta inferior",
      "Espesor Cinta Inferior",
      "Material de la Cinta izquierda",
      "Grosor de la Cinta izquierda",
      "Material de la Cinta derecha",
      "Grosor de la Cinta derecha",
    ];
    const rows = parts.map((part) => {
      const csvMaterial = part.material.trim().toUpperCase();
      return [
        Math.max(0, Math.round(part.length)),
        Math.max(0, Math.round(part.width)),
        part.quantity,
        csvMaterial,
        "",
        part.reference.toUpperCase(),
        part.grain === "SI" ? "1" : "",
        part.cantoSup ? csvMaterial : "",
        part.cantoSup,
        part.cantoInf ? csvMaterial : "",
        part.cantoInf,
        part.cantoIzq ? csvMaterial : "",
        part.cantoIzq,
        part.cantoDer ? csvMaterial : "",
        part.cantoDer,
      ];
    });
    const csv = `${[headers, ...rows]
      .map((row) => row.map(escapeCsvValue).join(";"))
      .join("\r\n")}\r\n`.replace(/^\uFEFF/, "");
    const bytes = new Uint8Array(csv.length);
    for (let index = 0; index < csv.length; index += 1) {
      bytes[index] = csv.charCodeAt(index) & 0xff;
    }
    const blob = new Blob([bytes], {
      type: "text/csv;charset=windows-1252;",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `opticut-${furniture}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  }

  function printPdf() {
    window.print();
  }

  return (
    <main className="app-shell">
      <header className="topbar">
        <div className="brand">
          <div className="brand-mark">SM</div>
          <div>
            <p className="eyebrow">SOLUCIONES MADERA</p>
            <p className="brand-name">Despiece de muebles</p>
          </div>
        </div>
        <div className="header-status">
          <span className="status-dot" />
          Conversor de plantillas
        </div>
      </header>

      <section className="hero">
        <div>
          <p className="eyebrow accent">PLANTILLAS 2026</p>
          <h1>Convertí tus medidas en un despiece listo para cortar.</h1>
          <p className="hero-copy">
            Seleccioná una plantilla, completá las variables del Excel y
            obtené las medidas calculadas de cada pieza.
          </p>
        </div>
        <div className="hero-badge">
          <span className="hero-badge-number">01</span>
          <span>Elegí una plantilla<br />para comenzar</span>
        </div>
      </section>

      <div className="workspace">
        <aside className="sidebar">
          <div className="section-heading">
            <span className="step">01</span>
            <div>
              <p className="eyebrow">PLANTILLA</p>
              <h2>Tipo de mueble</h2>
            </div>
          </div>
          <div className="template-list">
            {(Object.keys(templates) as FurnitureType[]).map((key) => (
              <button
                className={`template-card ${furniture === key ? "selected" : ""}`}
                key={key}
                onClick={() => setFurniture(key)}
                type="button"
              >
                <span className="template-icon">{templates[key].icon}</span>
                <span className="template-copy">
                  <strong>{templates[key].name}</strong>
                  <small>{templates[key].description}</small>
                </span>
                <span className="radio-dot" />
              </button>
            ))}
          </div>

          <div className="divider" />

          <div className="section-heading">
            <span className="step">02</span>
            <div>
              <p className="eyebrow">VARIABLES</p>
              <h2>Datos del módulo</h2>
            </div>
          </div>
          <div className="form-grid">
            <label className="field field-full">
              <span>Material</span>
              <input
                onChange={(event) => setMaterial(event.target.value)}
                value={material}
              />
              <small>VARIABLE 1 · Ej. BLANCO</small>
            </label>
            <label className="field">
              <span>Veta</span>
              <select onChange={(event) => setGrain(event.target.value)} value={grain}>
                <option value="NO">No</option>
                <option value="SI">Sí</option>
              </select>
              <small>VARIABLE 2</small>
            </label>
            {furniture === "bajo-mesada" && (
              <label className="field">
                <span>Puertas</span>
                <input
                  min="1"
                  onChange={(event) => setDoors(Math.max(1, Number(event.target.value)))}
                  type="number"
                  value={doors}
                />
                <small>VARIABLE 3</small>
              </label>
            )}
            <label className="field">
              <span>Ancho total <em>mm</em></span>
              <input
                min="250"
                onChange={(event) => setWidth(Number(event.target.value))}
                type="number"
                value={width}
              />
              <small>VARIABLE 4</small>
            </label>
            <label className="field">
              <span>Profundidad <em>mm</em></span>
              <input
                min="200"
                onChange={(event) => setDepth(Number(event.target.value))}
                type="number"
                value={depth}
              />
              <small>VARIABLE 6</small>
            </label>
          </div>
          {!dimensionsAreValid && (
            <p className="validation-alert" role="alert">
              Para generar el despiece, el ancho debe ser de al menos 250 mm y
              la profundidad debe ser de al menos 200 mm.
            </p>
          )}
          <div className="formula-hint">
            <span className="formula-icon">ƒx</span>
            <span>Las medidas se calculan según las fórmulas de la plantilla original.</span>
          </div>
        </aside>

        <section className="results">
          <div className="results-header">
            <div>
              <div className="result-title-row">
                <span className="result-icon">{templates[furniture].icon}</span>
                <div>
                  <p className="eyebrow">DESPIECE CALCULADO</p>
                  <h2>{templates[furniture].name}</h2>
                </div>
              </div>
            </div>
            <div className="summary">
              <span><b>{parts.length}</b> referencias</span>
              <span><b>{totalPieces}</b> piezas totales</span>
            </div>
          </div>

          <div className="export-actions" aria-label="Exportar despiece">
            <button
              className="export-button secondary"
              disabled={!dimensionsAreValid}
              onClick={downloadCsv}
              type="button"
            >
              Descargar CSV
            </button>
            <button className="export-button primary" onClick={printPdf} type="button">
              Imprimir / PDF
            </button>
          </div>

          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Referencia</th>
                  <th>Largo</th>
                  <th>Ancho</th>
                  <th>Cant.</th>
                  <th>Material</th>
                  <th>Veta</th>
                  <th>Cantos</th>
                </tr>
              </thead>
              <tbody>
                {parts.map((part, index) => (
                  <tr key={`${part.reference}-${index}`}>
                    <td>
                      <strong>{part.reference}</strong>
                      {part.note && <small>{part.note}</small>}
                    </td>
                    <td className="dimension">{formatMillimeters(part.length)}</td>
                    <td className="dimension">{formatMillimeters(part.width)}</td>
                    <td><span className="quantity">{part.quantity}</span></td>
                    <td><span className="material-chip">{part.material}</span></td>
                    <td><span className={`grain ${part.grain === "SI" ? "yes" : ""}`}>{part.grain}</span></td>
                    <td>
                      <div className="edges">
                        {edgeLabels.map(({ key, label, shortLabel }) =>
                          part[key] ? (
                            <span
                              aria-label={`${label}: ${part.material} ${part[key].replace(".", ",")} mm`}
                              key={key}
                              title={`${label}: ${part.material} ${part[key].replace(".", ",")} mm`}
                            >
                              {`${shortLabel} ${part[key].replace(".", ",")}`}
                            </span>
                          ) : null,
                        )}
                        {edgeLabels.every(({ key }) => !part[key]) && (
                          <span className="none">—</span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="legend">
            <span><i className="legend-line" /> Canto 0,45 mm</span>
            <span><i className="legend-line thick" /> Canto puerta 2 mm</span>
            <span className="legend-note">Pasá el cursor sobre un canto para ver el detalle</span>
          </div>

          <div className="conversion-note">
            <div className="note-icon">i</div>
            <div>
              <strong>Indicaciones de conversión</strong>
              <p>
                Las dimensiones están expresadas en milímetros. El fondo se
                calcula en FIBRO y las puertas distribuyen el ancho total entre
                la cantidad indicada, descontando 5 mm por puerta.
              </p>
            </div>
          </div>
        </section>
      </div>
      <footer>Basado en <strong>2026 PLANTILLAS MUEBLES.xlsx</strong> · Medidas de referencia para fabricación</footer>
    </main>
  );
}
