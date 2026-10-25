const SCRABBLE_POINTS: { [letter: string]: number } = {
  a: 1, e: 1, i: 1, o: 1, u: 1, l: 1, n: 1, s: 1, t: 1, r: 1,
  d: 2, g: 2,
  b: 3, c: 3, m: 3, p: 3,
  f: 4, h: 4, v: 4, w: 4, y: 4,
  k: 5,
  j: 8, x: 8,
  q: 10, z: 10,
};

function sortLetters(word: string): string {
  return word.toLowerCase().split("").sort().join("");
}

function scrabbleScore(word: string): number {
  return word
    .toLowerCase()
    .split("")
    .reduce((total, letter) => total + (SCRABBLE_POINTS[letter] || 0), 0);
}

export default function QueryProcessor(query: string): string {
  const largest = query.match(/which of the following numbers is the largest:\s*(.*?)\??$/i);
  if (largest) {
    const numbers = largest[1].split(",").map((n) => Number(n.trim()));
    if (numbers.length > 0 && numbers.every((n) => !isNaN(n))) {
      return String(Math.max(...numbers));
    }
  }

  const squareCube = query.match(/which of the following numbers is both a square and a cube:\s*(.*?)\??$/i);
  if (squareCube) {
    const isPerfectPower = (n: number, k: number) =>
      n >= 0 && Math.round(Math.pow(n, 1 / k)) ** k === n;
    const matches = squareCube[1]
      .split(",")
      .map((n) => Number(n.trim()))
      .filter((n) => isPerfectPower(n, 2) && isPerfectPower(n, 3));
    return matches.join(", ");
  }

  const primes = query.match(/which of the following numbers are primes:\s*(.*?)\??$/i);
  if (primes) {
    const isPrime = (n: number) => {
      if (!Number.isInteger(n) || n < 2) return false;
      for (let d = 2; d * d <= n; d++) {
        if (n % d === 0) return false;
      }
      return true;
    };
    return primes[1]
      .split(",")
      .map((n) => Number(n.trim()))
      .filter(isPrime)
      .join(", ");
  }

  const anagram = query.match(/which of the following is an anagram of\s+([a-z]+):\s*(.*?)\??$/i);
  if (anagram) {
    const target = sortLetters(anagram[1]);
    return anagram[2]
      .split(",")
      .map((w) => w.trim())
      .filter((w) => w.toLowerCase() !== anagram[1].toLowerCase() && sortLetters(w) === target)
      .join(", ");
  }

  const scrabble = query.match(/scrabble score of\s+([a-z]+)/i);
  if (scrabble) {
    return String(scrabbleScore(scrabble[1]));
  }

  const power = query.match(/what is\s+(-?\d+)\s+to the power of\s+(\d+)\s*\??$/i);
  if (power) {
    // BigInt keeps large results exact instead of rounding to a float
    const base = BigInt(power[1]);
    let result = BigInt(1);
    for (let i = 0; i < Number(power[2]); i++) {
      result = result * base;
    }
    return result.toString();
  }

  const arithmetic = query.match(
    /what is\s+(-?\d+(?:\s*(?:plus|minus|multiplied by|times|divided by)\s*-?\d+)+)\s*\??$/i
  );
  if (arithmetic) {
    const tokens = arithmetic[1]
      .split(/\s*(plus|minus|multiplied by|times|divided by)\s*/i)
      .map((t) => t.toLowerCase());
    // multiplication and division bind tighter than addition and subtraction
    const terms: number[] = [Number(tokens[0])];
    const signs: number[] = [1];
    for (let i = 1; i < tokens.length; i += 2) {
      const op = tokens[i];
      const n = Number(tokens[i + 1]);
      if (op === "plus" || op === "minus") {
        terms.push(n);
        signs.push(op === "plus" ? 1 : -1);
      } else if (op === "divided by") {
        terms[terms.length - 1] /= n;
      } else {
        terms[terms.length - 1] *= n;
      }
    }
    return String(terms.reduce((total, t, i) => total + signs[i] * t, 0));
  }

  if (query.toLowerCase().includes("shakespeare")) {
    return (
      "William Shakespeare (26 April 1564 - 23 April 1616) was an " +
      "English poet, playwright, and actor, widely regarded as the greatest " +
      "writer in the English language and the world's pre-eminent dramatist."
    );
  }

  if (query.toLowerCase().includes("andrew id")) {
    return "muhamma4";
  }

  if (query.toLowerCase().includes("name")) {
    return "YasaKhan";
  }

  if (query.toLowerCase().includes("age")) {
    return "67";
  }



  return "";
}
