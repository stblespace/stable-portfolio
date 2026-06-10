// Метод Анализа Иерархий (МАИ / AHP, Т. Саати)
// Дисциплина: Инструментарий принятия решений

// Случайный индекс согласованности (Random Index) по размерности матрицы n
export const RANDOM_INDEX: Record<number, number> = {
  1: 0,
  2: 0,
  3: 0.58,
  4: 0.9,
  5: 1.12,
  6: 1.24,
  7: 1.32,
  8: 1.41,
  9: 1.45,
  10: 1.49,
};

// Значения шкалы Саати (1..9 и обратные)
export const SAATY_VALUES: number[] = [
  1 / 9, 1 / 8, 1 / 7, 1 / 6, 1 / 5, 1 / 4, 1 / 3, 1 / 2,
  1,
  2, 3, 4, 5, 6, 7, 8, 9,
];

// Текстовое описание степени важности по шкале Саати
export const SAATY_DESCRIPTIONS: Record<number, string> = {
  1: "Равная важность",
  2: "Промежуточное значение",
  3: "Умеренное превосходство",
  4: "Промежуточное значение",
  5: "Существенное превосходство",
  6: "Промежуточное значение",
  7: "Значительное превосходство",
  8: "Промежуточное значение",
  9: "Абсолютное превосходство",
};

// Подпись значения в виде дроби: 5 -> "5", 0.2 -> "1/5"
export function fractionLabel(value: number): string {
  if (value >= 1) return String(Math.round(value));
  return `1/${Math.round(1 / value)}`;
}

// Компоненты главного собственного вектора (δ) — средние геометрические строк.
// δ_i = ( Π_j c_ij )^(1/n)
export function eigenvector(matrix: number[][]): number[] {
  const n = matrix.length;
  if (n === 0) return [];
  return matrix.map((row) => {
    const product = row.reduce((acc, v) => acc * v, 1);
    return Math.pow(product, 1 / n);
  });
}

// Вектор локальных приоритетов (весов) — нормированный собственный вектор:
// w_i = δ_i / Σ δ
export function priorityVector(matrix: number[][]): number[] {
  const ev = eigenvector(matrix);
  const sum = ev.reduce((acc, v) => acc + v, 0);
  return ev.map((g) => (sum > 0 ? g / sum : 0));
}

// Максимальное собственное значение λmax
export function lambdaMax(matrix: number[][], weights: number[]): number {
  const n = matrix.length;
  if (n === 0) return 0;
  // Aw — произведение матрицы на вектор приоритетов
  const aw = matrix.map((row) =>
    row.reduce((acc, v, j) => acc + v * weights[j], 0)
  );
  // λmax = среднее значение (Aw)_i / w_i
  const total = aw.reduce(
    (acc, v, i) => acc + (weights[i] > 0 ? v / weights[i] : 0),
    0
  );
  return total / n;
}

export interface Consistency {
  eigenvector: number[]; // δ — компоненты собственного вектора
  weights: number[]; // w — нормированные веса
  lambdaMax: number;
  ci: number; // индекс согласованности
  cr: number; // отношение согласованности
  ri: number; // случайный индекс
  consistent: boolean; // CR < 0.1
}

// Полный расчёт приоритетов и согласованности матрицы парных сравнений
export function analyzeMatrix(matrix: number[][]): Consistency {
  const n = matrix.length;
  const ev = eigenvector(matrix);
  const sum = ev.reduce((acc, v) => acc + v, 0);
  const weights = ev.map((g) => (sum > 0 ? g / sum : 0));
  const lm = lambdaMax(matrix, weights);
  const ci = n > 1 ? (lm - n) / (n - 1) : 0;
  const ri = RANDOM_INDEX[n] ?? 1.49;
  const cr = ri > 0 ? ci / ri : 0;
  return {
    eigenvector: ev,
    weights,
    lambdaMax: lm,
    ci,
    cr,
    ri,
    consistent: cr < 0.1,
  };
}

// Глобальные приоритеты альтернатив:
// global[a] = Σ_c ( вес критерия c × локальный приоритет альтернативы a по c )
export function globalPriorities(
  criteriaWeights: number[],
  alternativeLocalWeights: number[][] // [критерий][альтернатива]
): number[] {
  const altCount = alternativeLocalWeights[0]?.length ?? 0;
  const result = new Array(altCount).fill(0);
  for (let c = 0; c < criteriaWeights.length; c++) {
    for (let a = 0; a < altCount; a++) {
      result[a] += criteriaWeights[c] * (alternativeLocalWeights[c]?.[a] ?? 0);
    }
  }
  return result;
}
