import { cn } from "@/lib/utils";

export interface GradientBackgroundProps {
  className?: string;
  gradientFrom?: string;
  gradientTo?: string;
  gradientSize?: string;
  gradientPosition?: string;
  gradientStop?: string;
}

export const Component = ({
  className,
  gradientFrom = "#fff",
  gradientTo = "#63e",
  gradientSize = "125% 125%",
  gradientPosition = "50% 10%",
  gradientStop = "40%",
}: GradientBackgroundProps) => (
  <div
    aria-hidden="true"
    className={cn("pointer-events-none absolute inset-0 h-full w-full -z-10", className)}
    style={{ background: `radial-gradient(${gradientSize} at ${gradientPosition}, ${gradientFrom} ${gradientStop}, ${gradientTo} 100%)` }}
  />
);
