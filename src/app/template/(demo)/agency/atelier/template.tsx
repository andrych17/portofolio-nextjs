import { Curtain } from "@/components/motion/Curtain";

export default function AtelierTemplate({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Curtain className="bg-accent" />
      {children}
    </>
  );
}
