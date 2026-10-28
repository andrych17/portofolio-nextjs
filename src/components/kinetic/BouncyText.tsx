import { Fragment, type ReactNode } from "react";

type BouncyTextProps = { lines: ReactNode[][]; delay?: number; stagger?: number; className?: string };

/**
 * Heading made of letters that pop up one by one (CSS only, so it plays before
 * hydration). Each line is a list of words or extra nodes such as an inline image.
 */
export function BouncyText({ lines, delay = 120, stagger = 35, className = "" }: BouncyTextProps) {
  let n = 0;
  return (
    <span aria-hidden className={className}>
      {lines.map((parts, li) => (
        <span key={li} className="block overflow-hidden pb-[0.06em]">
          {parts.map((part, pi) => (
            <Fragment key={pi}>
              {pi > 0 && " "}
              {typeof part === "string" ? (
                // A space inside an inline-block letter collapses to nothing, so
                // words are split here and joined with plain text spaces.
                part.split(" ").map((word, wi) => (
                  <Fragment key={wi}>
                    {wi > 0 && " "}
                    <span className="inline-block whitespace-nowrap">
                      {[...word].map((ch, ci) => (
                        <span key={ci} className="k-letter" style={{ ["--d" as string]: delay + n++ * stagger }}>
                          {ch}
                        </span>
                      ))}
                    </span>
                  </Fragment>
                ))
              ) : (
                <span className="k-letter align-middle" style={{ ["--d" as string]: delay + n++ * stagger }}>
                  {part}
                </span>
              )}
            </Fragment>
          ))}
        </span>
      ))}
    </span>
  );
}
