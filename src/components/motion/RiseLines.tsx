import type { ElementType, ReactNode } from "react";

type RiseLinesProps = {
  lines: ReactNode[];
  as?: ElementType;
  className?: string;
  /** Delay before the first line, in ms. */
  delay?: number;
  stagger?: number;
  id?: string;
};

/** Hero heading that rises line by line with CSS only, so it plays before hydration. */
export function RiseLines({ lines, as: Tag = "h1", className, delay = 150, stagger = 90, id }: RiseLinesProps) {
  return (
    <Tag className={className} id={id}>
      {lines.map((line, i) => (
        <span key={i} className="rise-line">
          <span style={{ ["--d" as string]: delay + i * stagger }}>{line}</span>
        </span>
      ))}
    </Tag>
  );
}
