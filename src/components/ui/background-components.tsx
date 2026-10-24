import { cn } from "@/lib/utils";

export function Component({ className }: { className?: string }) {
  return (
    <div aria-hidden="true" className={cn("relative min-h-screen w-full bg-black", className)}>
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "radial-gradient(circle at center, #e4002b 0%, transparent 70%)",
          opacity: 0.2,
          mixBlendMode: "screen",
        }}
      />
    </div>
  );
}
