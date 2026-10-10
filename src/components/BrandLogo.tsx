import Image from "next/image";
import { cn } from "@/lib/utils";

export function BrandLogo({ className, priority = false }: { className?: string; priority?: boolean }) {
  return <span className={cn("inline-flex shrink-0 items-center px-3 py-2", className)}>
    <Image src="/images/Creatox Logo- new.png" alt="Creatox Designs" width={1471} height={514} priority={priority} className="block h-auto w-full object-contain" />
  </span>;
}
