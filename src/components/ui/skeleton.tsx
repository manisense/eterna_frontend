import { cn } from "./utils";

type SkeletonProps = {
  variant?: "rectangular" | "circular" | string;
  width?: string | number;
  height?: string | number;
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>;

function Skeleton({ className, variant, width, height, style, ...props }: SkeletonProps) {
  const styles = {
    ...(width !== undefined ? { width: typeof width === "number" ? `${width}px` : width } : {}),
    ...(height !== undefined ? { height: typeof height === "number" ? `${height}px` : height } : {}),
    ...style,
  } as React.CSSProperties;

  return (
    <div
      data-slot="skeleton"
      className={cn(
        "bg-accent animate-pulse",
        variant === "circular" ? "rounded-full" : "rounded-md",
        className,
      )}
      style={styles}
      {...props}
    />
  );
}

export { Skeleton };
