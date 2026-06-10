"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { PairwiseMatrix } from "@/components/ahp/PairwiseMatrix";
import { analyzeMatrix, globalPriorities, type Consistency } from "@/lib/ahp";

// ─── Утилиты для работы с матрицами ──────────────────────────────────────────

// Матрица парных сравнений вместе с картой заблокированных ячеек.
// locked[i][j] === true → ячейка хранит обратное значение и недоступна для ввода.
interface CompMatrix {
  m: number[][];
  locked: boolean[][];
}

// Создать/изменить размер матрицы до n×n, сохранив имеющиеся значения
function makeMatrix(n: number, prev?: CompMatrix): CompMatrix {
  return {
    m: Array.from({ length: n }, (_, i) =>
      Array.from({ length: n }, (_, j) => (i === j ? 1 : prev?.m[i]?.[j] ?? 1))
    ),
    locked: Array.from({ length: n }, (_, i) =>
      Array.from({ length: n }, (_, j) =>
        i === j ? false : prev?.locked[i]?.[j] ?? false
      )
    ),
  };
}

// Удалить строку и столбец с индексом idx
function removeIndex(cm: CompMatrix, idx: number): CompMatrix {
  const drop = <T,>(arr: T[][]) =>
    arr.filter((_, r) => r !== idx).map((row) => row.filter((_, c) => c !== idx));
  return { m: drop(cm.m), locked: drop(cm.locked) };
}

// Установить парное сравнение и его обратную величину.
// Отредактированная ячейка остаётся открытой, противоположная — блокируется.
// Возврат к значению 1 (равенство) снова открывает обе стороны пары.
function setPair(cm: CompMatrix, i: number, j: number, value: number): CompMatrix {
  const m = cm.m.map((row) => [...row]);
  const locked = cm.locked.map((row) => [...row]);
  m[i][j] = value;
  m[j][i] = 1 / value;
  const neutral = value === 1;
  locked[i][j] = false;
  locked[j][i] = !neutral;
  return { m, locked };
}

// ─── Стартовый пример (выбор ноутбука) ───────────────────────────────────────

const DEFAULT_GOAL = "Выбор ноутбука";
const DEFAULT_CRITERIA = ["Цена", "Производительность", "Дизайн"];
const DEFAULT_ALTERNATIVES = ["Ноутбук A", "Ноутбук B", "Ноутбук C"];

// ─── Бейдж согласованности ───────────────────────────────────────────────────

function ConsistencyBadge({ analysis }: { analysis: Consistency }) {
  const ok = analysis.consistent;
  return (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-xs font-montserrat text-gray-400">
      <span>
        λ<sub>max</sub> ={" "}
        <span className="text-gray-200">{analysis.lambdaMax.toFixed(3)}</span>
      </span>
      <span>
        ИС (CI) ={" "}
        <span className="text-gray-200">{analysis.ci.toFixed(3)}</span>
      </span>
      <span
        className={`px-2 py-0.5 rounded-full font-medium ${
          ok
            ? "bg-green-500/15 text-green-400"
            : "bg-red-500/15 text-red-400"
        }`}
      >
        ОС (CR) = {(analysis.cr * 100).toFixed(1)}%{" "}
        {ok ? "— согласовано" : "— требует пересмотра"}
      </span>
    </div>
  );
}

// ─── Редактируемый список (критерии / альтернативы) ──────────────────────────

function EditableList({
  title,
  items,
  placeholder,
  onRename,
  onAdd,
  onRemove,
}: {
  title: string;
  items: string[];
  placeholder: string;
  onRename: (index: number, value: string) => void;
  onAdd: () => void;
  onRemove: (index: number) => void;
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-white font-montserrat font-medium">{title}</h3>
        <button
          onClick={onAdd}
          className="text-xs bg-indigo-500/15 text-indigo-300 hover:bg-indigo-500/25 transition-colors px-3 py-1.5 rounded-full font-montserrat"
        >
          + Добавить
        </button>
      </div>
      <div className="space-y-2">
        {items.map((item, i) => (
          <div key={i} className="flex items-center gap-2">
            <span className="text-gray-600 text-sm w-5 text-right">
              {i + 1}.
            </span>
            <input
              value={item}
              placeholder={placeholder}
              onChange={(e) => onRename(i, e.target.value)}
              className="flex-1 bg-neutral-900 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:border-indigo-400 focus:outline-none transition-colors"
            />
            <button
              onClick={() => onRemove(i)}
              disabled={items.length <= 2}
              className="text-gray-500 hover:text-red-400 disabled:opacity-30 disabled:hover:text-gray-500 transition-colors p-2"
              title={items.length <= 2 ? "Минимум 2 элемента" : "Удалить"}
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Карточка-обёртка секции ─────────────────────────────────────────────────

function Card({
  step,
  title,
  subtitle,
  children,
}: {
  step: number;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.4 }}
      className="gradient-border-hover rounded-3xl"
    >
      <div className="bg-neutral-950 rounded-3xl p-8 md:p-12">
        <div className="flex items-start gap-4 mb-6">
          <span className="shrink-0 w-9 h-9 rounded-full bg-indigo-500/15 text-indigo-300 flex items-center justify-center font-press-start text-xs">
            {step}
          </span>
          <div>
            <h2 className="text-xl text-white font-montserrat font-semibold">
              {title}
            </h2>
            {subtitle && (
              <p className="text-gray-500 text-sm mt-1 font-montserrat">
                {subtitle}
              </p>
            )}
          </div>
        </div>
        {children}
      </div>
    </motion.section>
  );
}

// ─── Страница ────────────────────────────────────────────────────────────────

export default function AhpPage() {
  const [goal, setGoal] = useState(DEFAULT_GOAL);
  const [criteria, setCriteria] = useState<string[]>(DEFAULT_CRITERIA);
  const [alternatives, setAlternatives] =
    useState<string[]>(DEFAULT_ALTERNATIVES);

  const [criteriaMatrix, setCriteriaMatrix] = useState<CompMatrix>(() =>
    makeMatrix(DEFAULT_CRITERIA.length)
  );
  const [altMatrices, setAltMatrices] = useState<CompMatrix[]>(() =>
    DEFAULT_CRITERIA.map(() => makeMatrix(DEFAULT_ALTERNATIVES.length))
  );

  // ── Критерии ──
  const renameCriterion = (i: number, value: string) =>
    setCriteria((prev) => prev.map((c, idx) => (idx === i ? value : c)));

  const addCriterion = () => {
    setCriteria((prev) => [...prev, `Критерий ${prev.length + 1}`]);
    setCriteriaMatrix((prev) => makeMatrix(prev.m.length + 1, prev));
    setAltMatrices((prev) => [...prev, makeMatrix(alternatives.length)]);
  };

  const removeCriterion = (i: number) => {
    setCriteria((prev) => prev.filter((_, idx) => idx !== i));
    setCriteriaMatrix((prev) => removeIndex(prev, i));
    setAltMatrices((prev) => prev.filter((_, idx) => idx !== i));
  };

  const changeCriteriaCell = (i: number, j: number, value: number) =>
    setCriteriaMatrix((prev) => setPair(prev, i, j, value));

  // ── Альтернативы ──
  const renameAlternative = (i: number, value: string) =>
    setAlternatives((prev) => prev.map((a, idx) => (idx === i ? value : a)));

  const addAlternative = () => {
    const n = alternatives.length + 1;
    setAlternatives((prev) => [...prev, `Альтернатива ${prev.length + 1}`]);
    setAltMatrices((prev) => prev.map((cm) => makeMatrix(n, cm)));
  };

  const removeAlternative = (i: number) => {
    setAlternatives((prev) => prev.filter((_, idx) => idx !== i));
    setAltMatrices((prev) => prev.map((cm) => removeIndex(cm, i)));
  };

  const changeAltCell = (c: number, i: number, j: number, value: number) =>
    setAltMatrices((prev) =>
      prev.map((cm, idx) => (idx === c ? setPair(cm, i, j, value) : cm))
    );

  // ── Расчёты ──
  const criteriaAnalysis = useMemo(
    () => analyzeMatrix(criteriaMatrix.m),
    [criteriaMatrix]
  );

  const altAnalyses = useMemo(
    () => altMatrices.map((cm) => analyzeMatrix(cm.m)),
    [altMatrices]
  );

  const global = useMemo(
    () =>
      globalPriorities(
        criteriaAnalysis.weights,
        altAnalyses.map((a) => a.weights)
      ),
    [criteriaAnalysis, altAnalyses]
  );

  const ranking = useMemo(
    () =>
      alternatives
        .map((name, i) => ({ name, score: global[i] ?? 0, index: i }))
        .sort((a, b) => b.score - a.score),
    [alternatives, global]
  );

  const maxScore = Math.max(...global, 0);

  return (
    <main className="min-h-screen pt-12 pb-24 px-5 md:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Назад */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-gray-500 hover:text-white transition-colors text-sm font-montserrat mb-8"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          На главную
        </Link>

        {/* Заголовок */}
        <header className="mb-12">
          <p className="text-indigo-400 text-sm font-montserrat mb-2">
            Инструментарий принятия решений
          </p>
          <h1 className="text-3xl md:text-4xl text-white font-montserrat font-bold mb-4">
            Метод Анализа Иерархий
          </h1>
          <p className="text-gray-400 font-montserrat leading-relaxed">
            Метод Т. Саати (AHP) для многокритериального выбора. Задайте цель,
            критерии и альтернативы, заполните матрицы парных сравнений по шкале
            от 1 до 9 — система рассчитает веса, проверит согласованность (CR
            &lt; 10%) и определит наилучший вариант.
          </p>
        </header>

        <div className="space-y-8">
          {/* Шаг 1 — цель и критерии, альтернативы */}
          <Card
            step={1}
            title="Цель, критерии и альтернативы"
            subtitle="Сформулируйте задачу принятия решения"
          >
            <label className="block mb-6">
              <span className="text-gray-400 text-sm font-montserrat">
                Цель
              </span>
              <input
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                placeholder="Что нужно выбрать?"
                className="mt-1 w-full bg-neutral-900 border border-white/10 rounded-lg px-3 py-2 text-white focus:border-indigo-400 focus:outline-none transition-colors"
              />
            </label>
            <div className="grid md:grid-cols-2 gap-8">
              <EditableList
                title="Критерии"
                items={criteria}
                placeholder="Название критерия"
                onRename={renameCriterion}
                onAdd={addCriterion}
                onRemove={removeCriterion}
              />
              <EditableList
                title="Альтернативы"
                items={alternatives}
                placeholder="Название альтернативы"
                onRename={renameAlternative}
                onAdd={addAlternative}
                onRemove={removeAlternative}
              />
            </div>
          </Card>

          {/* Шаг 2 — сравнение критериев */}
          <Card
            step={2}
            title="Сравнение критериев"
            subtitle={`Насколько один критерий важнее другого для цели «${goal || "…"}»`}
          >
            <PairwiseMatrix
              labels={criteria}
              matrix={criteriaMatrix.m}
              locked={criteriaMatrix.locked}
              analysis={criteriaAnalysis}
              onChange={changeCriteriaCell}
            />
            <div className="mt-4">
              <ConsistencyBadge analysis={criteriaAnalysis} />
            </div>
          </Card>

          {/* Шаг 3 — сравнение альтернатив по каждому критерию */}
          <Card
            step={3}
            title="Сравнение альтернатив"
            subtitle="Для каждого критерия — насколько одна альтернатива лучше другой"
          >
            <div className="space-y-8">
              {criteria.map((criterion, c) => (
                <div key={c}>
                  <h4 className="text-indigo-300 font-montserrat font-medium mb-3 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                    По критерию «{criterion || `Критерий ${c + 1}`}»
                    <span className="text-gray-600 text-xs">
                      (вес {((criteriaAnalysis.weights[c] ?? 0) * 100).toFixed(1)}%)
                    </span>
                  </h4>
                  {altMatrices[c] && altAnalyses[c] && (
                    <>
                      <PairwiseMatrix
                        labels={alternatives}
                        matrix={altMatrices[c].m}
                        locked={altMatrices[c].locked}
                        analysis={altAnalyses[c]}
                        onChange={(i, j, v) => changeAltCell(c, i, j, v)}
                      />
                      <div className="mt-3">
                        <ConsistencyBadge analysis={altAnalyses[c]} />
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </Card>

          {/* Шаг 4 — результат */}
          <Card
            step={4}
            title="Результат"
            subtitle="Глобальные приоритеты альтернатив и итоговый рейтинг"
          >
            {ranking[0] && maxScore > 0 && (
              <div className="mb-6 p-4 rounded-xl bg-green-500/10 border border-green-500/20">
                <p className="text-green-400 text-sm font-montserrat">
                  Рекомендуемый выбор
                </p>
                <p className="text-white text-2xl font-montserrat font-bold mt-1">
                  {ranking[0].name || `Альтернатива ${ranking[0].index + 1}`}
                </p>
                <p className="text-gray-400 text-sm mt-1">
                  Глобальный приоритет {(ranking[0].score * 100).toFixed(1)}%
                </p>
              </div>
            )}

            <div className="space-y-3">
              {ranking.map((item, place) => (
                <div key={item.index}>
                  <div className="flex items-center justify-between text-sm font-montserrat mb-1">
                    <span className="text-gray-300">
                      <span className="text-gray-600 mr-2">{place + 1}.</span>
                      {item.name || `Альтернатива ${item.index + 1}`}
                    </span>
                    <span className="text-white font-medium">
                      {(item.score * 100).toFixed(1)}%
                    </span>
                  </div>
                  <div className="h-2.5 rounded-full bg-white/5 overflow-hidden">
                    <motion.div
                      className={`h-full rounded-full ${
                        place === 0
                          ? "bg-linear-to-r from-green-500 to-emerald-400"
                          : "bg-linear-to-r from-indigo-500 to-indigo-400"
                      }`}
                      initial={{ width: 0 }}
                      animate={{
                        width: `${maxScore > 0 ? (item.score / maxScore) * 100 : 0}%`,
                      }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {!criteriaAnalysis.consistent && (
              <p className="mt-6 text-xs text-amber-400/80 font-montserrat">
                ⚠ Матрица критериев не согласована (CR ≥ 10%). Пересмотрите
                парные сравнения для достоверного результата.
              </p>
            )}
          </Card>
        </div>
      </div>
    </main>
  );
}
