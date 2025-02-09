import type { ComponentProps } from "react";
import { browser } from "wxt/browser";

export function Anchor(props: ComponentProps<"a">) {
  const { href, onClick, ...rest } = props;

  const handleClick: React.MouseEventHandler<HTMLAnchorElement> = (e) => {
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
