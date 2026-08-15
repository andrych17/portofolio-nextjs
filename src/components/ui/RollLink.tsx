import Link from "next/link";

export function RollText({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={`roll ${className}`}>
      <span className="roll__a">{children}</span>
      <span aria-hidden className="roll__b">
        {children}
      </span>
    </span>
  );
}

interface RollLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  external?: boolean;
}

export function RollLink({ href, children, className = "", external = false }: RollLinkProps) {
  const content = <RollText>{children}</RollText>;

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {content}
    </Link>
  );
}
