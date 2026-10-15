import type { ReactNode } from "react";
import { InnerShell } from "@/components/inner/shell";
import "./inner-pages.css";

export default function InnerLayout({ children }: { children: ReactNode }) {
  return <InnerShell>{children}</InnerShell>;
}
