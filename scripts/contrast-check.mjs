const L = (hex) => {
  const c = hex.replace("#", "");
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(c.slice(i, i + 2), 16) / 255);
  const f = (v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4);
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
};
const ratio = (a, b) => {
  const [x, y] = [L(a), L(b)].sort((m, n) => n - m);
  return +((x + 0.05) / (y + 0.05)).toFixed(2);
};
const dark = "#07070a", light = "#f3f1ec";
const pairs = [
  ["accent #e9a86a on dark", ratio("#e9a86a", dark)],
  ["accent #e08b3f on dark", ratio("#e08b3f", dark)],
  ["accent #d1783a on dark", ratio("#d1783a", dark)],
  ["accent #f0c48a on dark", ratio("#f0c48a", dark)],
  ["ink on copper btn #d1783a", ratio("#1a0f04", "#d1783a")],
  ["ink on copper btn #c9793a", ratio("#1a0f04", "#c9793a")],
  ["ink on copper btn #e09a55", ratio("#1a0f04", "#e09a55")],
  ["light accent #9a5321 on cream", ratio("#9a5321", light)],
  ["light accent #8a4a1c on cream", ratio("#8a4a1c", light)],
  ["light accent #7d3f14 on cream", ratio("#7d3f14", light)],
  ["cream ink on light accent #8a4a1c", ratio("#f7f4ee", "#8a4a1c")],
  ["muted #a8a29a on dark", ratio("#a8a29a", dark)],
  ["faint #8f887d on dark", ratio("#8f887d", dark)],
  ["faint light #6f675c on cream", ratio("#6f675c", light)],
  ["ice #9dc6e0 on dark", ratio("#9dc6e0", dark)],
  ["ice light #2b6a8f on cream", ratio("#2b6a8f", light)],
];
console.log(pairs.map(([k, v]) => `${v >= 4.5 ? "PASS" : v >= 3 ? "AA-lg" : "FAIL"} ${v.toFixed(2)}  ${k}`).join("\n"));
