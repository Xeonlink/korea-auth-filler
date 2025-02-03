import { cn } from "@/utils/utils";

type TooltipProps = React.PropsWithChildren<{
  tip: string;
  open?: boolean;
  dir?: "left" | "right" | "top" | "bottom";
}>;

export function Tooltip(props: TooltipProps) {
  const { tip, dir = "top", children, open = false } = props;
  return (
    <div
      className={cn("tooltip", {
        "tooltip-top": dir === "top",
        "tooltip-right": dir === "right",
        "tooltip-bottom": dir === "bottom",
        "tooltip-left": dir === "left",
        "tooltip-open": open,
      })}
      data-tip={tip}
    >
      {children}
    </div>
  );
}
