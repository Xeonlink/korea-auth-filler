import type { ComponentProps } from "react";
import { browser } from "wxt/browser";

export function Anchor(props: ComponentProps<"a">) {
  const { href, onClick, ...rest } = props;

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (!href) return;
    browser.tabs.create({ url: href });
    onClick?.(e);
  };

  return (
    <a href={href} onClick={handleClick} {...rest}>
      {props.children}
    </a>
  );
}
