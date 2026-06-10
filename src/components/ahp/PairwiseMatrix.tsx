"use client";

import {
  SAATY_VALUES,
  SAATY_DESCRIPTIONS,
  fractionLabel,
  type Consistency,
} from "@/lib/ahp";

interface PairwiseMatrixProps {
  labels: string[];
  matrix: number[][];
  locked: boolean[][]; // locked[i][j] === true → ячейка только для чтения (обратное значение)
  analysis: Consistency;
  onChange: (i: number, j: number, value: number) => void;
}

// Цвет ячейки-результата по величине приоритета
function weightColor(weight: number, max: number): string {
  if (max <= 0) return "text-gray-400";
  const ratio = weight / max;
  if (ratio > 0.66) return "text-green-400";
  if (ratio > 0.33) return "text-yellow-300";
  return "text-gray-400";
}

export function PairwiseMatrix({
  labels,
  matrix,
  locked,
  analysis,
  onChange,
}: PairwiseMatrixProps) {
  const n = labels.length;
  const maxWeight = Math.max(...analysis.weights, 0);

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr>
            <th className="p-2 text-left text-gray-500 font-montserrat font-normal" />
            {labels.map((label, j) => (
              <th
                key={j}
                className="p-2 text-center text-gray-300 font-montserrat font-medium min-w-[90px]"
                title={label}
              >
                <span className="line-clamp-1">{label || `Эл. ${j + 1}`}</span>
              </th>
            ))}
            <th className="p-2 text-center text-gray-400 font-montserrat font-medium min-w-[90px]">
              Собств.
              <br />
              вектор (δ)
            </th>
            <th className="p-2 text-center text-indigo-300 font-montserrat font-medium min-w-[80px]">
              Вес (w)
            </th>
          </tr>
        </thead>
        <tbody>
          {labels.map((rowLabel, i) => (
            <tr key={i} className="border-t border-white/5">
              <th
                className="p-2 text-left text-gray-300 font-montserrat font-medium whitespace-nowrap max-w-[160px]"
                title={rowLabel}
              >
                <span className="line-clamp-1">
                  {rowLabel || `Эл. ${i + 1}`}
                </span>
              </th>
              {Array.from({ length: n }, (_, j) => {
                const value = matrix[i]?.[j] ?? 1;
                if (i === j) {
                  return (
                    <td key={j} className="p-1 text-center">
                      <span className="inline-block border border-transparent rounded-md px-2 py-1 text-gray-500">
                        1
                      </span>
                    </td>
                  );
                }
                // Заблокированная ячейка — обратное значение, только чтение
                if (locked[i]?.[j]) {
                  return (
                    <td key={j} className="p-1 text-center">
                      <span
                        className="inline-block border border-transparent rounded-md px-2 py-1 text-gray-500"
                        title="Рассчитано автоматически (обратное значение)"
                      >
                        {fractionLabel(value)}
                      </span>
                    </td>
                  );
                }
                // Редактируемая ячейка (любая сторона, пока пара не заблокирована)
                return (
                  <td key={j} className="p-1 text-center">
                    <select
                      value={value}
                      onChange={(e) => onChange(i, j, Number(e.target.value))}
                      title={
                        value > 1
                          ? `«${rowLabel || "строка"}» важнее: ${
                              SAATY_DESCRIPTIONS[Math.round(value)] ?? ""
                            }`
                          : value < 1
                          ? `«${labels[j] || "столбец"}» важнее: ${
                              SAATY_DESCRIPTIONS[Math.round(1 / value)] ?? ""
                            }`
                          : "Равная важность"
                      }
                      className="bg-neutral-900 border border-white/10 rounded-md px-2 py-1 text-white text-center focus:border-indigo-400 focus:outline-none cursor-pointer hover:border-white/30 transition-colors"
                    >
                      {SAATY_VALUES.map((v) => (
                        <option key={v} value={v}>
                          {fractionLabel(v)}
                        </option>
                      ))}
                    </select>
                  </td>
                );
              })}
              <td className="p-2 text-center font-montserrat text-gray-300">
                {(analysis.eigenvector[i] ?? 0).toFixed(3)}
              </td>
              <td
                className={`p-2 text-center font-montserrat font-semibold ${weightColor(
                  analysis.weights[i] ?? 0,
                  maxWeight
                )}`}
              >
                {((analysis.weights[i] ?? 0) * 100).toFixed(1)}%
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
