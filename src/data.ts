import { getNonAsciiChars, type Word } from "./utils";

export interface Data {
  data: Word[];
  nonAsciiChars: string[];
}

export async function getData(vocab: string): Promise<Data> {
  const cached = localStorage.getItem("data");
  if (cached) {
    return {
      data: JSON.parse(cached),
      nonAsciiChars: JSON.parse(localStorage.getItem("awkward-chars")),
    };
  }
  const response = await fetch(vocab);
  if (!response.ok) {
    alert("Couldn't fetch data");
    throw new Error("Couldn't fetch data");
  }
  const text = await response.text();
  const nonAsciiChars = getNonAsciiChars(text);
  localStorage.setItem("awkward-chars", JSON.stringify(nonAsciiChars));
  const data: Word[] = text.split(/\r?\n/gms).map((line) => {
    const [term, definition] = line.split(" - ");
    return { term, definition };
  });
  const dataString = JSON.stringify(data);
  localStorage.setItem("wordlist", dataString);
  localStorage.setItem("data", dataString);
  return { data, nonAsciiChars };
}
