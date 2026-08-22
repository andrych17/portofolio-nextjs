import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Special Note",
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function RelationshipLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
