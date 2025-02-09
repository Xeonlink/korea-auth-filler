import type { VariantProps } from "class-variance-authority";
import { cn } from "@/utils/utils";
import { cva } from "class-variance-authority";

export type ButtonProps = VariantProps<typeof buttonVariants> &
  React.ComponentPropsWithoutRef<"button">;

export const buttonVariants = cva("btn", {
  variants: {
    variant: {
      default: "",
      ghost: "btn-ghost",
      outline: "btn-outline",
    },
    size: {
      default: "btn-md",
      sm: "btn-sm",
      lg: "btn-lg",
      xs: "btn-xs",
      wide: "btn-wide",
      block: "btn-block",
      circle: "btn-circle",
      square: "btn-square",
    },
    color: {
      default: "",
      neutral: "btn-neutral",
      primary: "btn-primary",
      secondary: "btn-secondary",
      accent: "btn-accent",
      info: "btn-info",
      success: "btn-success",
      warning: "btn-warning",
      error: "btn-error",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
    color: "default",
  },
});

export function Button(props: ButtonProps) {
  const { className, children, variant, size, color, ...rest } = props;

  return (
    <button className={cn(buttonVariants({ variant, size, color }), className)} {...rest}>
      {children}
    </button>
  );
}
