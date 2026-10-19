import { redirect } from "next/navigation";
import { ARCHIVE } from "@/lib/v2/routes";

export default function WorksIndexPage() {
  redirect(ARCHIVE);
}
