import { Curtain } from "@/components/motion/Curtain";

export default function NoirTemplate({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Curtain className="bg-[#ece7dd]" />
      {children}
    </>
  );
}
