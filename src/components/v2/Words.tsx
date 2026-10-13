import type { ElementType } from "react";

interface WordsProps {
  text: string;
  as?: ElementType;
  className?: string;
  /** Clip each word in its own mask so it can rise into place (headings). Off for running text. */
  mask?: boolean;
  /** data-r kind picked up by reveal(). */
  r?: "words" | "para";
}

/** Splits text into word spans at render time, so React keeps owning the DOM (language switches stay correct). */
export function Words({ text, as: Tag = "span", className, mask = true, r }: WordsProps) {
  const words = text.split(" ");
  return (
    <Tag className={className} data-r={r}>
      {words.map((word, i) => (
        <span key={i}>
          <span className={mask ? "v2-w v2-w-mask" : "v2-w"}>
            <span className="v2-wi">{word}</span>
          </span>
          {i < words.length - 1 ? " " : null}
        </span>
      ))}
    </Tag>
  );
}
