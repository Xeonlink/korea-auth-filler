import type { ComponentProps } from "react";
import { browser } from "wxt/browser";

export function Anchor(props: ComponentProps<"a">) {
  const { href, onClick, ...rest } = props;

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (!href) return;
    browser.tabs.create({ url: href });
  };

  return (
    <a href={href} onClick={handleClick} {...rest}>
      {props.children}
    </a>
  );
}
