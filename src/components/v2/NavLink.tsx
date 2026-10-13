"use client";

import type { ComponentProps } from "react";
import { usePathname } from "next/navigation";
import { HOME } from "@/lib/v2/routes";
import TransitionLink from "./TransitionLink";

type Props = Omit<ComponentProps<"a">, "href" | "ref"> & { section: string };

/** Link to a home section: a plain in-page anchor on the home page, a wiped route change from anywhere else. */
export default function NavLink({ section, ...rest }: Props) {
  const onHome = usePathname() === HOME;
  if (onHome) return <a href={`#${section}`} {...rest} />;
  return <TransitionLink href={`${HOME}#${section}`} {...rest} />;
}
