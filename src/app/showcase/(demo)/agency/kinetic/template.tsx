import { Curtain } from "@/components/motion/Curtain";

export default function KineticTemplate({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Curtain className="bg-k-yellow" />
      {children}
    </>
  );
}
