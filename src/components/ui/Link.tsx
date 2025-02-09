type LinkProps = React.PropsWithChildren<{
  to: string;
}> &
  React.ComponentPropsWithoutRef<"a">;

export function Link(props: LinkProps) {
  const { to, children, ...rest } = props;

  function preventReload(e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    window.history.pushState({}, "", to);
    const navigationEvent = new PopStateEvent("navigate");
    window.dispatchEvent(navigationEvent);
  }

  return (
    <a href={to} onClick={preventReload} {...rest}>
      {children}
    </a>
  );
}
