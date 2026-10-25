export default function QueryProcessor(query: string): string {
  const largest = query.match(/which of the following numbers is the largest:\s*(.*?)\??$/i);
  if (largest) {
    const numbers = largest[1].split(",").map((n) => Number(n.trim()));
    if (numbers.length > 0 && numbers.every((n) => !isNaN(n))) {
      return String(Math.max(...numbers));
    }
  }

  const plus = query.match(/what is\s+(-?\d+)\s+plus\s+(-?\d+)/i);
  if (plus) {
    return String(Number(plus[1]) + Number(plus[2]));
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
    return "Yasa";
  }

  if (query.toLowerCase().includes("age")) {
    return "67";
  }



  return "";
}
