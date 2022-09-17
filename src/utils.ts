const ASCII_RANGE = /[\x00-\x7F]/;

export function capitalise(text: string) {
  return text[0].toUpperCase() + text.substring(1);
}

export function randint(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function randChoice<T>(list: T[]): T {
  return list[randint(0, list.length - 1)];
}

export function getNonAsciiChars(text: string): string[] {
  const chars = text.split("");
  const badChars = [];
  for (const char of chars) {
    if (ASCII_RANGE.test(char)) continue;
    if (badChars.includes(char)) continue;
    badChars.push(char);
  }
  return badChars;
}

export interface Word {
  term: string;
  definition: string;
}

export function normaliseInput(input: string): string {
  return input.toLowerCase().replace(/[!,?]/, "");
}
