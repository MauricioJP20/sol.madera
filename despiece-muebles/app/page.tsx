"use client";

import { useMemo, useState } from "react";

type FurnitureType = "bajo-mesada" | "cajonera";
type Edge = "largo1" | "largo2" | "ancho1" | "ancho2";

type Part = {
  reference: string;
  length: number;
  width: number;
  quantity: number;
  material: string;
  grain: string;
  edges: Partial<Record<Edge, string>>;
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

const edgeLabels: { key: Edge; label: string }[] = [
  { key: "largo1", label: "Largo 1" },
  { key: "largo2", label: "Largo 2" },
  { key: "ancho1", label: "Ancho 1" },
  { key: "ancho2", label: "Ancho 2" },
];

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

  const parts = useMemo<Part[]>(() => {
    const sharedMaterial = material.trim() || "BLANCO";
    const commonEdges = {
      largo1: `${sharedMaterial} 0,45`,
      ancho1: `${sharedMaterial} 0,45`,
      ancho2: `${sharedMaterial} 0,45`,
    };

    if (furniture === "bajo-mesada") {
      return [
        {
          reference: "LATERAL",
          length: 780,
          width: depth,
          quantity: 2,
          material: sharedMaterial,
          grain: grain,
          edges: commonEdges,
          note: "Altura fija",
        },
        {
          reference: "PISO",
          length: width - 36,
          width: depth,
          quantity: 1,
          material: sharedMaterial,
          grain,
          edges: { largo1: `${sharedMaterial} 0,45` },
          note: "Ancho − 36",
        },
        {
          reference: "FALDÓN",
          length: width - 36,
          width: 120,
          quantity: 2,
          material: sharedMaterial,
          grain,
          edges: {
            largo1: `${sharedMaterial} 0,45`,
            largo2: `${sharedMaterial} 0,45`,
          },
        },
        {
          reference: "ESTANTE",
          length: width - 38,
          width: depth - 10,
          quantity: 1,
          material: sharedMaterial,
          grain,
          edges: { largo1: `${sharedMaterial} 0,45` },
          note: "Ancho − 38 · Profundidad − 10",
        },
        {
          reference: "FONDO",
          length: width - 9,
          width: depth - 9,
          quantity: 1,
          material: "FIBRO",
          grain: "NO",
          edges: {},
          note: "Ancho − 9 · Profundidad − 9",
        },
        {
          reference: 'PUERTA "NN"',
          length: 780 - 33,
          width: width / doors - 5,
          quantity: doors,
          material: sharedMaterial,
          grain,
          edges: {
            largo1: `${sharedMaterial} 2mm`,
            largo2: `${sharedMaterial} 2mm`,
            ancho1: `${sharedMaterial} 2mm`,
            ancho2: `${sharedMaterial} 2mm`,
          },
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
        edges: commonEdges,
        note: "Altura fija",
      },
      {
        reference: "PISO",
        length: width - 36,
        width: depth,
        quantity: 1,
        material: sharedMaterial,
        grain,
        edges: { largo1: `${sharedMaterial} 0,45` },
        note: "Ancho − 36",
      },
      {
        reference: "FALDÓN SUPERIOR",
        length: width - 36,
        width: 120,
        quantity: 1,
        material: sharedMaterial,
        grain,
        edges: {
          largo1: `${sharedMaterial} 0,45`,
          largo2: `${sharedMaterial} 0,45`,
        },
      },
      {
        reference: "FALDÓN INFERIOR",
        length: width - 36,
        width: 70,
        quantity: 1,
        material: sharedMaterial,
        grain,
        edges: {
          largo1: `${sharedMaterial} 0,45`,
          largo2: `${sharedMaterial} 0,45`,
        },
      },
      {
        reference: "FONDO",
        length: width - 9,
        width: depth - 9,
        quantity: 1,
        material: "FIBRO",
        grain: "NO",
        edges: {},
        note: "Ancho − 9 · Profundidad − 9",
      },
      {
        reference: "CAJON NN",
        length: width - 111,
        width: 492,
        quantity: 3,
        material: sharedMaterial,
        grain,
        edges: {},
        note: "Ancho − 111",
      },
      {
        reference: "TRASERA CAJON NN",
        length: width - 123,
        width: 64,
        quantity: 1,
        material: sharedMaterial,
        grain,
        edges: { largo1: `${sharedMaterial} 0,45` },
        note: "Ancho − 123",
      },
      {
        reference: "TRASERA CAJON NN",
        length: width - 123,
        width: 160,
        quantity: 2,
        material: sharedMaterial,
        grain,
        edges: {
          largo1: `${sharedMaterial} 0,45`,
          ancho1: `${sharedMaterial} 0,45`,
          ancho2: `${sharedMaterial} 0,45`,
        },
        note: "Ancho − 123",
      },
      {
        reference: 'CAJON "NN"',
        length: 169,
        width: width - 5,
        quantity: 1,
        material: sharedMaterial,
        grain,
        edges: {
          largo1: `${sharedMaterial} 2mm`,
          largo2: `${sharedMaterial} 2mm`,
          ancho1: `${sharedMaterial} 2mm`,
          ancho2: `${sharedMaterial} 2mm`,
        },
        note: "169 · Ancho − 5",
      },
      {
        reference: 'CAJON "NN"',
        length: 268,
        width: width - 5,
        quantity: 2,
        material: sharedMaterial,
        grain,
        edges: {
          largo1: `${sharedMaterial} 2mm`,
          largo2: `${sharedMaterial} 2mm`,
          ancho1: `${sharedMaterial} 2mm`,
          ancho2: `${sharedMaterial} 2mm`,
        },
        note: "268 · Ancho − 5",
      },
    ];
  }, [depth, doors, furniture, grain, material, width]);

  const totalPieces = parts.reduce((total, part) => total + part.quantity, 0);

  function downloadCsv() {
    const headers = [
      "Referencia",
      "Largo (mm)",
      "Ancho (mm)",
      "Cantidad",
      "Material",
      "Veta",
      "Cantos",
      "Observaciones",
    ];
    const rows = parts.map((part) => [
      part.reference,
      Math.max(0, Math.round(part.length)),
      Math.max(0, Math.round(part.width)),
      part.quantity,
      part.material,
      part.grain,
      Object.entries(part.edges)
        .map(([edge, value]) => `${edge}: ${value}`)
        .join(" | "),
      part.note ?? "",
    ]);
    const csv = [headers, ...rows]
      .map((row) => row.map(escapeCsvValue).join(";"))
      .join("\r\n");
    const blob = new Blob(["\uFEFF", csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `despiece-${furniture}.csv`;
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
            <label className="field">
              <span>Ancho total <em>mm</em></span>
              <input
                min="100"
                onChange={(event) => setWidth(Number(event.target.value))}
                type="number"
                value={width}
              />
              <small>VARIABLE 4</small>
            </label>
            <label className="field">
              <span>Profundidad <em>mm</em></span>
              <input
                min="100"
                onChange={(event) => setDepth(Number(event.target.value))}
                type="number"
                value={depth}
              />
              <small>VARIABLE 6</small>
            </label>
          </div>
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
            <button className="export-button secondary" onClick={downloadCsv} type="button">
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
                        {edgeLabels.map(({ key, label }) =>
                          part.edges[key] ? (
                            <span key={key} title={`${label}: ${part.edges[key]}`}>
                              {label.replace("Largo ", "L").replace("Ancho ", "A")}
                            </span>
                          ) : null,
                        )}
                        {Object.keys(part.edges).length === 0 && <span className="none">—</span>}
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
