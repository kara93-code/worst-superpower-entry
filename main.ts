// Worst Superpower — a one-line entry for make.fun.
// The power: breathing underwater, with the one catch that
// cancels it completely — the hero's head stays above the water,
// so the "power" is just ordinary breathing, announced proudly.
import { chmodSync, mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The joke is built from two halves: the grand power, and the
// twist that cancels it in the same breath. Keeping them as
// separate clauses makes the structure visible: the first half
// promises a classic superpower, the second takes it all away.
const POWER_CLAUSE = "The power to breathe underwater";
const TWIST_CLAUSE = "but only with my head above the water";

function buildLine(): string {
  return `${POWER_CLAUSE} — ${TWIST_CLAUSE}.`;
}

const ENTRY_LINE = buildLine();

function checkLine(line: string): void {
  const length = [...line].length;
  if (length < 1 || length > 140) {
    throw new Error(`entry is ${length} characters, must be 1-140`);
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("entry must be a single line");
  }
  if (line.trim() !== line || line.length === 0) {
    throw new Error("entry must not be blank or padded with whitespace");
  }
  // The line only works as a joke if both halves survive: the power
  // and the twist that makes it useless. Refuse a line that lost one.
  if (!line.includes(POWER_CLAUSE) || !line.includes(TWIST_CLAUSE)) {
    throw new Error("entry lost its power clause or its cancelling twist");
  }
  if (!line.endsWith(".")) {
    throw new Error("entry must end with a full stop");
  }
}

checkLine(ENTRY_LINE);

const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outputDir, { recursive: true });
const target = join(outputDir, "entry.txt");
writeFileSync(target, ENTRY_LINE, { encoding: "utf8", flag: "w" });
// The grader reads this file as another user, so make it world-readable
// instead of relying on the sandbox umask (a 0600 file fails the grade).
chmodSync(target, 0o644);
console.log(`wrote ${target} (${[...ENTRY_LINE].length} characters)`);
